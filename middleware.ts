import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const adminTokenRaw = process.env.ADMIN_TOKEN;
  const adminToken = adminTokenRaw ? adminTokenRaw.replace(/^\"|\"$/g, "") : "";
  if (!adminToken) {
    return NextResponse.next();
  }

  const cookieToken = req.cookies.get("admin_token")?.value;
  const queryToken = searchParams.get("token");
  const token = cookieToken || queryToken;

  if (token === adminToken) {
    if (queryToken && queryToken === adminToken) {
      const url = req.nextUrl.clone();
      url.searchParams.delete("token");
      const res = NextResponse.redirect(url);
      res.cookies.set("admin_token", queryToken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
      return res;
    }
    return NextResponse.next();
  }

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.search = "";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
