import { NextResponse } from "next/server";
import { db } from "../../../../src/lib/db";
import { setSessionCookie } from "../../../../src/lib/auth-session";
import { generateNextStaffNumber } from "../../../../src/lib/staff-number";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const action =
      typeof body.action === "string" ? body.action : "";
    const staffNumber =
      typeof body.staffNumber === "string"
        ? body.staffNumber.trim()
        : "";
    const name =
      typeof body.name === "string" ? body.name.trim() : "";
    const dob =
      typeof body.dob === "string" ? body.dob.trim() : "";

    if (action === "signup") {
      if (!name || !dob) {
        return NextResponse.json(
          { error: "Name and Date of Birth are required." },
          { status: 400 }
        );
      }

      const assignedStaffNumber =
        await generateNextStaffNumber();

      const user = await db.user.create({
        data: {
          name,
          dob,
          staffNumber: assignedStaffNumber,
          role: "STAFF",
        },
      });

      await setSessionCookie({
        userId: user.id,
        name: user.name,
        role: "STAFF",
        identifier: assignedStaffNumber,
      });

      return NextResponse.json({
        success: true,
        staffNumber: assignedStaffNumber,
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
        },
      });
    }

    if (action === "login") {
      if (!staffNumber) {
        return NextResponse.json(
          { error: "Staff Number is required." },
          { status: 400 }
        );
      }

      const user = await db.user.findUnique({
        where: {
          staffNumber,
        },
      });

      if (!user || user.role !== "STAFF") {
        return NextResponse.json(
          { error: "Invalid Staff Number." },
          { status: 401 }
        );
      }

      await setSessionCookie({
        userId: user.id,
        name: user.name,
        role: "STAFF",
        identifier: user.staffNumber!,
      });

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
          staffNumber: user.staffNumber,
        },
      });
    }

    return NextResponse.json(
      { error: "Invalid authentication action." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Staff authentication error:", error);

    return NextResponse.json(
      { error: "Staff authentication failed." },
      { status: 500 }
    );
  }
}