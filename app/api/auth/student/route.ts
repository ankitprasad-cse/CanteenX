import { NextResponse } from "next/server";
import { db } from "../../../../src/lib/db";
import { setSessionCookie } from "../../../../src/lib/auth-session";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const action =
      typeof body.action === "string" ? body.action : "";
    const sin =
      typeof body.sin === "string" ? body.sin.trim() : "";
    const name =
      typeof body.name === "string" ? body.name.trim() : "";
    const dob =
      typeof body.dob === "string" ? body.dob.trim() : "";

    if (!sin) {
      return NextResponse.json(
        { error: "SIN is required." },
        { status: 400 }
      );
    }

    if (action === "signup") {
      if (!name || !dob) {
        return NextResponse.json(
          { error: "Name and Date of Birth are required." },
          { status: 400 }
        );
      }

      const existingStudent = await db.user.findUnique({
        where: {
          sin,
        },
      });

      if (existingStudent) {
        return NextResponse.json(
          { error: "A student with this SIN already exists." },
          { status: 409 }
        );
      }

      const user = await db.user.create({
        data: {
          name,
          sin,
          dob,
          role: "STUDENT",
        },
      });

      await setSessionCookie({
        userId: user.id,
        name: user.name,
        role: "STUDENT",
        identifier: user.sin!,
      });

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
          sin: user.sin,
        },
      });
    }

    if (action === "login") {
      const user = await db.user.findUnique({
        where: {
          sin,
        },
      });

      if (!user || user.role !== "STUDENT") {
        return NextResponse.json(
          { error: "Invalid Student Identification Number." },
          { status: 401 }
        );
      }

      await setSessionCookie({
        userId: user.id,
        name: user.name,
        role: "STUDENT",
        identifier: user.sin!,
      });

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
          sin: user.sin,
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid authentication action." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Student authentication error:", error);

    return NextResponse.json(
      { error: "Student authentication failed." },
      { status: 500 }
    );
  }
}