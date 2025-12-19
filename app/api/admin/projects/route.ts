import dbConnect from "@/lib/db";
import Project from "@/model/Project";
import { NextRequest, NextResponse } from "next/server";

function isAuthorized(req: NextRequest) {
  const token =
    req.headers.get("x-admin-token") ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    req.cookies.get("admin_token")?.value ||
    req.nextUrl.searchParams.get("token");
  const adminTokenRaw = process.env.ADMIN_TOKEN;
  const adminToken = adminTokenRaw ? adminTokenRaw.replace(/^\"|\"$/g, "") : "";
  return Boolean(adminToken && token && token === adminToken);
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    await dbConnect();

    const normalizeList = (value: unknown) =>
      typeof value === "string"
        ? value
            .split(",")
            .map((item) => item.trim().toLowerCase())
            .filter(Boolean)
        : [];
    const category = normalizeList(data.category);
    const tech = normalizeList(data.tech);

    const status =
      data.status === "pending" || data.status === "rejected"
        ? data.status
        : "approved";

    const project = await Project.create({
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail,
      gitRepo: data.gitRepo,
      liveLink: data.liveLink,
      verified: Boolean(data.verified),
      httpsEnabled: Boolean(data.httpsEnabled),
      category,
      tech,
      builder: {
        name: data.builderName,
        email: data.builderEmail,
        username: data.builderUsername,
        image: data.builderImage,
        xLink: data.builderXLink,
        about: data.builderAbout,
      },
      status,
    });

    return NextResponse.json({
      success: true,
      project: {
        id: project._id,
        slug: project.slug,
        title: project.title,
      },
    });
  } catch (error) {
    console.error("Admin project create error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const status = req.nextUrl.searchParams.get("status");
    const filter =
      status === "approved" || status === "pending" || status === "rejected"
        ? { status }
        : {};
    const projects = await Project.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("Admin projects fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const id = data.id as string | undefined;
    const status = data.status as string | undefined;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Project id and status required" },
        { status: 400 }
      );
    }

    if (!["approved", "pending", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    await dbConnect();
    const project = await Project.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Admin project update error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Project id required" }, { status: 400 });
    }

    await dbConnect();
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin project delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const id = data.id as string | undefined;

    if (!id) {
      return NextResponse.json({ error: "Project id required" }, { status: 400 });
    }

    await dbConnect();

    const normalizeList = (value: unknown) =>
      typeof value === "string"
        ? value
            .split(",")
            .map((item) => item.trim().toLowerCase())
            .filter(Boolean)
        : Array.isArray(value)
          ? value.map((item) => String(item).trim().toLowerCase()).filter(Boolean)
          : [];

    const status =
      data.status === "pending" || data.status === "rejected"
        ? data.status
        : "approved";

    const update = {
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail,
      gitRepo: data.gitRepo,
      liveLink: data.liveLink,
      verified: Boolean(data.verified),
      httpsEnabled: Boolean(data.httpsEnabled),
      category: normalizeList(data.category),
      tech: normalizeList(data.tech),
      builder: {
        name: data.builderName,
        email: data.builderEmail,
        username: data.builderUsername,
        image: data.builderImage,
        xLink: data.builderXLink,
        about: data.builderAbout,
      },
      status,
    };

    const project = await Project.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("Admin project update error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}
