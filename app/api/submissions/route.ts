import dbConnect from "@/lib/db";
import Submission from "@/model/Submission";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    await dbConnect();

    const normalizeList = (value: unknown) =>
      Array.isArray(value)
        ? value.map((item) => String(item).trim()).filter(Boolean)
        : typeof value === "string"
          ? value
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [];

    const projectName =
      typeof data.projectName === "string" ? data.projectName.trim() : "";
    const description =
      typeof data.description === "string" ? data.description.trim() : "";
    const builderXUsername =
      typeof data.builderXUsername === "string"
        ? data.builderXUsername.trim()
        : "";
    const discordUsername =
      typeof data.discordUsername === "string"
        ? data.discordUsername.trim()
        : "";
    const githubUrl =
      typeof data.githubUrl === "string" ? data.githubUrl.trim() : "";
    const liveUrl = typeof data.liveUrl === "string" ? data.liveUrl.trim() : "";
    const imageUrl =
      typeof data.imageUrl === "string" ? data.imageUrl.trim() : "";
    const category = normalizeList(data.category);
    const tech = normalizeList(data.tech);
    const tags = normalizeList(data.tags);

    if (
      !projectName ||
      !description ||
      !builderXUsername ||
      !discordUsername ||
      !githubUrl ||
      category.length === 0 ||
      tech.length === 0 ||
      tags.length === 0
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const submission = await Submission.create({
      projectName,
      description,
      category,
      tech,
      builderXUsername,
      discordUsername,
      tags,
      githubUrl,
      liveUrl,
      imageUrl,
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
