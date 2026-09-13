import { db } from "./db";

export async function generateNextStaffNumber(): Promise<string> {
  const lastStaff = await db.user.findFirst({
    where: {
      staffNumber: {
        startsWith: "STF-",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      staffNumber: true,
    },
  });

  let nextIndex = 1001;

  if (lastStaff?.staffNumber) {
    const parsed = parseInt(
      lastStaff.staffNumber.replace("STF-", ""),
      10
    );

    if (!Number.isNaN(parsed)) {
      nextIndex = parsed + 1;
    }
  }

  let candidate = `STF-${nextIndex}`;

  let exists = await db.user.findUnique({
    where: {
      staffNumber: candidate,
    },
  });

  while (exists) {
    nextIndex += 1;
    candidate = `STF-${nextIndex}`;

    exists = await db.user.findUnique({
      where: {
        staffNumber: candidate,
      },
    });
  }

  return candidate;
}