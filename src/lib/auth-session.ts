import { cookies } from "next/headers";
import crypto from "crypto";

export const SESSION_COOKIE_NAME = "campus-canteen-session";

function getSecretKey(): string {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is missing.");
  }

  return secret;
}

export interface SessionPayload {
  userId: string;
  name: string;
  role: "STUDENT" | "STAFF" | "ADMIN";
  identifier: string;
}

function computeSignature(payloadBase64: string): string {
  return crypto
    .createHmac("sha256", getSecretKey())
    .update(payloadBase64)
    .digest("base64url");
}

export function createSignedSessionToken(
  payload: SessionPayload
): string {
  const payloadBase64 = Buffer.from(
    JSON.stringify(payload)
  ).toString("base64url");

  const signature = computeSignature(payloadBase64);

  return `${payloadBase64}.${signature}`;
}

export function verifySignedSessionToken(
  token?: string | null
): SessionPayload | null {
  if (!token || token === "demo") {
    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [payloadBase64, providedSignature] = parts;
  const expectedSignature = computeSignature(payloadBase64);

  const sigBuf = Buffer.from(providedSignature);
  const expBuf = Buffer.from(expectedSignature);

  if (
    sigBuf.length !== expBuf.length ||
    !crypto.timingSafeEqual(sigBuf, expBuf)
  ) {
    return null;
  }

  try {
    const raw = Buffer.from(payloadBase64, "base64url").toString("utf-8");
    return JSON.parse(raw) as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(
  payload: SessionPayload
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(
    SESSION_COOKIE_NAME,
    createSignedSessionToken(payload),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    }
  );
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}