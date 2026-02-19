import dbConnect from "@/lib/db";
import VoteIdea from "@/model/VoteIdea";
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
    if (!data.title || !data.description || !data.weekKey) {
      return NextResponse.json(
        { error: "Title, description, and weekKey required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const idea = await VoteIdea.create({
      title: data.title,
      description: data.description,
      weekKey: data.weekKey,
      active: data.active !== false,
    });

    return NextResponse.json({ success: true, idea });
  } catch (error) {
    console.error("Admin vote idea create error:", error);
    return NextResponse.json(
      { error: "Failed to create idea" },
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
    const weekKey = req.nextUrl.searchParams.get("weekKey");
    const filter = weekKey ? { weekKey } : {};
    const ideas = await VoteIdea.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, ideas });
  } catch (error) {
    console.error("Admin vote idea fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch ideas" },
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
    if (!id) {
      return NextResponse.json({ error: "Idea id required" }, { status: 400 });
    }

    await dbConnect();
    const update = {
      active: data.active,
      weekKey: data.weekKey,
    } as Record<string, unknown>;

    const idea = await VoteIdea.findByIdAndUpdate(id, update, { new: true });
    if (!idea) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, idea });
  } catch (error) {
    console.error("Admin vote idea update error:", error);
    return NextResponse.json(
      { error: "Failed to update idea" },
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
      return NextResponse.json({ error: "Idea id required" }, { status: 400 });
    }

    if (!data.title || !data.description || !data.weekKey) {
      return NextResponse.json(
        { error: "Title, description, and weekKey required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const update = {
      title: data.title,
      description: data.description,
      weekKey: data.weekKey,
      active: data.active !== false,
    };
    const idea = await VoteIdea.findByIdAndUpdate(id, update, { new: true });
    if (!idea) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, idea });
  } catch (error) {
    console.error("Admin vote idea update error:", error);
    return NextResponse.json(
      { error: "Failed to update idea" },
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
      return NextResponse.json({ error: "Idea id required" }, { status: 400 });
    }

    await dbConnect();
    const idea = await VoteIdea.findByIdAndDelete(id);
    if (!idea) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin vote idea delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete idea" },
      { status: 500 }
    );
  }
}
