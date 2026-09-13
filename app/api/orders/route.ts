import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "../../../src/lib/db";
import {
  SESSION_COOKIE_NAME,
  verifySignedSessionToken,
} from "../../../src/lib/auth-session";
import { PaymentMethod, PaymentStatus } from "@prisma/client";
import crypto from "crypto";

interface CreateOrderItemInput {
  name: string;
  quantity: number;
  unitPrice: number;
}

interface CreateOrderRequestBody {
  orderNumber: string;
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
  total: number;
  items: CreateOrderItemInput[];
}

export async function POST(request: Request) {
  try {
    // 1. Extract authenticated student session if present
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = verifySignedSessionToken(sessionCookie);

    // 2. Parse and validate caller payload from OrderSessionContext
    const body = (await request.json()) as CreateOrderRequestBody;

    if (!body || !body.orderNumber || !Array.isArray(body.items)) {
      return NextResponse.json(
        { error: "Invalid order data. orderNumber and items are required." },
        { status: 400 }
      );
    }

    // 3. Generate unique QR token for the order
    const qrToken = crypto.randomUUID();

    // 4. Persist order with strongly-typed Prisma enums
    const createdOrder = await db.order.create({
      data: {
        orderNumber: body.orderNumber,
        qrToken,
        status: "PLACED",
        paymentMethod: body.paymentMethod ? (body.paymentMethod as PaymentMethod) : undefined,
        paymentStatus: body.paymentStatus ? (body.paymentStatus as PaymentStatus) : PaymentStatus.PENDING,
        total: Number(body.total) || 0,
        ...(session?.userId ? { userId: session.userId } : {}),
        items: {
          create: body.items.map((item) => ({
            name: item.name,
            quantity: Number(item.quantity) || 1,
            unitPrice: Number(item.unitPrice) || 0,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // 5. Return expected MockOrder object matching client structure
    const formattedOrder = {
      id: createdOrder.id,
      orderNumber: createdOrder.orderNumber,
      qrToken: createdOrder.qrToken,
      createdAt: createdOrder.createdAt.toISOString(),
      status: createdOrder.status,
      paymentMethod: createdOrder.paymentMethod,
      paymentStatus: createdOrder.paymentStatus,
      total: Number(createdOrder.total),
      items: createdOrder.items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
      })),
    };

    return NextResponse.json({
      ...formattedOrder,
      order: formattedOrder,
      success: true,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to place order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}