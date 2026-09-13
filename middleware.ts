import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("campus-canteen-session")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedPath =
    pathname.startsWith("/student") ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/staff") ||
    pathname.startsWith("/cart") ||
    pathname.startsWith("/profile");

  if (isProtectedPath && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/orders/:path*",
    "/staff/:path*",
    "/cart/:path*",
    "/profile/:path*",
  ],
};