import dbConnect from "@/lib/db";
import Project from "@/model/Project";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params;
    const { clientId } = await req.json();

    if (!clientId) {
      return NextResponse.json(
        { error: "Client ID required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const isObjectId = /^[a-fA-F0-9]{24}$/.test(projectId);
    const filter = isObjectId
      ? { _id: projectId }
      : { slug: projectId };

    const updated = await Project.findOneAndUpdate(
      { ...filter, viewedBy: { $ne: clientId } },
      { $addToSet: { viewedBy: clientId }, $inc: { views: 1 } },
      { new: true }
    );

    if (updated) {
      return NextResponse.json({
        success: true,
        views: updated.views,
      });
    }

    const project = await Project.findOne(filter);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      views: project.views,
      alreadyViewed: true,
    });
  } catch (error) {
    console.error("View API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
