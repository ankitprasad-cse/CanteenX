import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE_NAME,
  verifySignedSessionToken,
} from "../../../../src/lib/auth-session";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = verifySignedSessionToken(token);

    if (!session) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: session,
    });
  } catch (error) {
    console.error("Session lookup error:", error);

    return NextResponse.json(
      { user: null },
      { status: 401 }
    );
  }
}