import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = NextResponse.redirect(
    new URL("/", request.url)
  );

  response.cookies.set("campus-canteen-session", "demo", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}