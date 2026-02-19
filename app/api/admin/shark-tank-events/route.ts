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

    const explicitWeek = Number.isFinite(Number(data.weekNumber))
      ? Number(data.weekNumber)
      : undefined;
    let weekNumber = explicitWeek;
    if (!weekNumber) {
      const latestWeek = await SharkTankEvent.findOne({
        weekNumber: { $exists: true },
      })
        .sort({ weekNumber: -1 })
        .select("weekNumber")
        .lean();
      weekNumber = latestWeek?.weekNumber ? latestWeek.weekNumber + 1 : 1;
    }

    const event = await SharkTankEvent.create({
      title: data.title,
      description: data.description,
      image: data.image,
      hostTwitter: data.hostTwitter,
      hostGithub: data.hostGithub,
      hostBy: data.hostBy,
      websiteLink: data.websiteLink,
      location: data.location,
      weekNumber,
      winnerTitle: data.winnerTitle,
      winnerTagline: data.winnerTagline,
      winnerBy: data.winnerBy,
      winnerLink: data.winnerLink,
      winnerImage: data.winnerImage,
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
    const events = await SharkTankEvent.find({}).sort({ createdAt: -1 });

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
    if (!id) {
      return NextResponse.json(
        { error: "Event id required" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Status updates are disabled" },
      { status: 400 }
    );
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

    const weekNumber = Number.isFinite(Number(data.weekNumber))
      ? Number(data.weekNumber)
      : undefined;

    const update = {
      title: data.title,
      description: data.description,
      image: data.image,
      hostTwitter: data.hostTwitter,
      hostGithub: data.hostGithub,
      hostBy: data.hostBy,
      websiteLink: data.websiteLink,
      location: data.location,
      weekNumber,
      winnerTitle: data.winnerTitle,
      winnerTagline: data.winnerTagline,
      winnerBy: data.winnerBy,
      winnerLink: data.winnerLink,
      winnerImage: data.winnerImage,
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
