import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const token = formData.get("token")?.toString();
  const adminTokenRaw = process.env.ADMIN_TOKEN;
  const adminToken = adminTokenRaw ? adminTokenRaw.replace(/^\"|\"$/g, "") : "";

  if (!adminToken || token !== adminToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.redirect(new URL("/admin", req.url));
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
