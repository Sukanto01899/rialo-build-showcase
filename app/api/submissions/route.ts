import dbConnect from "@/lib/db";
import Submission from "@/model/Submission";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    await dbConnect();

    const tags = Array.isArray(data.tags)
      ? data.tags
      : typeof data.tags === "string"
        ? data.tags
            .split(",")
            .map((tag: string) => tag.trim())
            .filter(Boolean)
        : [];

    const submission = await Submission.create({
      projectName: data.projectName,
      description: data.description,
      builderXUsername: data.builderXUsername,
      discordUsername: data.discordUsername,
      tags,
      githubUrl: data.githubUrl,
      liveUrl: data.liveUrl,
      imageUrl: data.imageUrl,
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      submissionId: submission._id,
    });
  } catch (error) {
    console.error("Submission create error:", error);
    return NextResponse.json(
      { error: "Failed to submit project" },
      { status: 500 }
    );
  }
}
