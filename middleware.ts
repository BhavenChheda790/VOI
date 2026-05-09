import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function secretKey() {
  const s = process.env.SESSION_SECRET;
  if (s && s.length >= 16) return new TextEncoder().encode(s);
  if (process.env.NODE_ENV === "development") {
    return new TextEncoder().encode("dev-only-session-secret-key-min-32");
  }
  return null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const key = secretKey();
  if (!key) {
    return NextResponse.redirect(new URL("/admin/login?err=config", req.url));
  }

  const token = req.cookies.get("voi_admin_session")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    await jwtVerify(token, key);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
