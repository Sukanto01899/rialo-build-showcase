import dbConnect from "@/lib/db";
import Submission from "@/model/Submission";
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

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const submissions = await Submission.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, submissions });
  } catch (error) {
    console.error("Admin submissions fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
