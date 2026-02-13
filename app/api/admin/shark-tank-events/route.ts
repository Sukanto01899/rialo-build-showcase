import dbConnect from "@/lib/db";
import SharkTankEvent from "@/model/SharkTankEvent";
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

    const status = data.status === "ended" ? "ended" : "upcoming";

    const event = await SharkTankEvent.create({
      title: data.title,
      description: data.description,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      image: data.image,
      hostTwitter: data.hostTwitter,
      hostGithub: data.hostGithub,
      hostBy: data.hostBy,
      websiteLink: data.websiteLink,
      location: data.location,
      status,
    });

    return NextResponse.json({
      success: true,
      event: {
        id: event._id,
        title: event.title,
      },
    });
  } catch (error) {
    console.error("Admin shark tank create error:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
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
      status === "upcoming" || status === "ended" ? { status } : {};
    const events = await SharkTankEvent.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, events });
  } catch (error) {
    console.error("Admin shark tank fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
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
        { error: "Event id and status required" },
        { status: 400 }
      );
    }

    if (!["upcoming", "ended"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    await dbConnect();
    const event = await SharkTankEvent.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Admin shark tank update error:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
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
      return NextResponse.json({ error: "Event id required" }, { status: 400 });
    }

    await dbConnect();
    const event = await SharkTankEvent.findByIdAndDelete(id);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin shark tank delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
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
      return NextResponse.json({ error: "Event id required" }, { status: 400 });
    }

    await dbConnect();

    const status = data.status === "ended" ? "ended" : "upcoming";

    const update = {
      title: data.title,
      description: data.description,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      image: data.image,
      hostTwitter: data.hostTwitter,
      hostGithub: data.hostGithub,
      hostBy: data.hostBy,
      websiteLink: data.websiteLink,
      location: data.location,
      status,
    };

    const event = await SharkTankEvent.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Admin shark tank update error:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 }
    );
  }
}
