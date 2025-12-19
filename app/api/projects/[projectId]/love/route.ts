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

    // Allow lookups by either MongoDB _id or slug
    const isObjectId = /^[a-fA-F0-9]{24}$/.test(projectId);
    const project = isObjectId
      ? await Project.findById(projectId)
      : await Project.findOne({ slug: projectId });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const lovedBy = project.lovedBy || [];

    // Check if already loved
    if (lovedBy.includes(clientId)) {
      return NextResponse.json({ error: "Already loved" }, { status: 400 });
    }

    // Add love
    project.loves += 1;
    project.lovedBy = [...lovedBy, clientId];
    await project.save();

    return NextResponse.json({
      success: true,
      loves: project.loves,
    });
  } catch (error) {
    console.error("Love API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE to unlike
export async function DELETE(
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
    const project = isObjectId
      ? await Project.findById(projectId)
      : await Project.findOne({ slug: projectId });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const lovedBy = project.lovedBy || [];

    // Check if loved
    if (!lovedBy.includes(clientId)) {
      return NextResponse.json({ error: "Not loved yet" }, { status: 400 });
    }

    // Remove love
    project.loves -= 1;
    project.lovedBy = lovedBy.filter((id: string) => id !== clientId);
    await project.save();

    return NextResponse.json({
      success: true,
      loves: project.loves,
    });
  } catch (error) {
    console.error("Unlike API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
