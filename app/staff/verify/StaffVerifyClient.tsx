"use client";

import Link from "next/link";
import type {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../../../src/types/order";

interface StaffVerifyClientProps {
  demo?: string;
  data?: string;
}

interface DecodedOrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

interface DecodedOrder {
  orderNumber: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  total: number;
  qrToken?: string;
  items: DecodedOrderItem[];
}

function parseOrderPayload(rawPayload: string | undefined): DecodedOrder | null {
  if (!rawPayload) return null;

  try {
    const decodedUrlParam = decodeURIComponent(rawPayload);
    const binaryString = atob(decodedUrlParam);
    const jsonString = decodeURIComponent(
      binaryString
        .split("")
        .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const parsed = JSON.parse(jsonString);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      typeof parsed.on !== "string" ||
      !Array.isArray(parsed.it)
    ) {
      return null;
    }

    const items: DecodedOrderItem[] = parsed.it
      .filter((entry: unknown) => Array.isArray(entry) && entry.length >= 3)
      .map((entry: [unknown, unknown, unknown]) => {
        const name = String(entry[0] || "Item");
        const quantity = Number(entry[1]) || 1;
        const unitPrice = Number(entry[2]) || 0;
        return {
          name,
          quantity,
          unitPrice,
          subtotal: quantity * unitPrice,
        };
      });

    const statusList: OrderStatus[] = [
      "PLACED",
      "ACCEPTED",
      "PREPARING",
      "READY",
      "COLLECTED",
      "CANCELLED",
    ];
    const status: OrderStatus = statusList.includes(parsed.st)
      ? parsed.st
      : "PLACED";

    const paymentMethod: PaymentMethod =
      parsed.pm === "ONLINE" ? "ONLINE" : "CASH";

    const paymentStatusList: PaymentStatus[] = [
      "PENDING",
      "CONFIRMED",
      "NOT_REQUIRED",
    ];
    const paymentStatus: PaymentStatus = paymentStatusList.includes(parsed.ps)
      ? parsed.ps
      : "CONFIRMED";

    const total =
      Number(parsed.tt) ||
      items.reduce((sum, item) => sum + item.subtotal, 0);

    return {
      orderNumber: parsed.on,
      status,
      paymentMethod,
      paymentStatus,
      total,
      qrToken: typeof parsed.qt === "string" ? parsed.qt : undefined,
      items,
    };
  } catch {
    return null;
  }
}

export default function StudentOrderVerifyClient({
  demo,
  data,
}: StaffVerifyClientProps) {
  const isSuccess = demo === "payment-success";
  const order = isSuccess ? parseOrderPayload(data) : null;

  if (!isSuccess) {
    return (
      <div className="min-h-screen bg-surface-subtle flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-surface border border-border rounded-card p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            ✕
          </div>
          <h1 className="text-2xl font-bold text-content-primary mb-2">
            Verification Failed
          </h1>
          <p className="text-sm text-content-muted mb-6">
            Unable to verify this QR code.
          </p>
          <Link
            href="/staff"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-control transition-colors shadow-sm"
          >
            Staff Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-subtle flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg bg-surface border border-border rounded-card shadow-sm overflow-hidden">
        {/* Verification Success Header */}
        <div className="bg-emerald-600 p-6 text-white text-center">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-black">
            ✓
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Payment Successful
          </h1>
          <p className="text-xs uppercase tracking-wider font-semibold opacity-90 mt-1">
            Order verified for pickup
          </p>
        </div>

        <div className="p-6 space-y-6">
          {order ? (
            <>
              {/* Order Number & Token */}
              <div className="bg-surface-subtle border border-border rounded-card p-4 text-center">
                {order.qrToken && (
                  <div className="mb-1">
                    <p className="text-xs uppercase font-bold text-content-muted tracking-wider">
                      Pickup Token
                    </p>
                    <p className="text-3xl font-extrabold text-primary tracking-tight">
                      {order.qrToken}
                    </p>
                  </div>
                )}
                <p className="text-sm font-semibold text-content-secondary">
                  Order #{order.orderNumber}
                </p>
              </div>

              {/* Order Metadata */}
              <div className="grid grid-cols-2 gap-3 text-xs border-y border-border py-4">
                <div>
                  <span className="text-content-muted block">Order Status</span>
                  <span className="font-semibold text-content-primary uppercase">
                    {order.status}
                  </span>
                </div>
                <div>
                  <span className="text-content-muted block">Payment Method</span>
                  <span className="font-semibold text-content-primary uppercase">
                    {order.paymentMethod}
                  </span>
                </div>
                <div>
                  <span className="text-content-muted block">Payment Status</span>
                  <span className="font-semibold text-emerald-600 uppercase">
                    {order.paymentStatus}
                  </span>
                </div>
                <div>
                  <span className="text-content-muted block">Verification</span>
                  <span className="font-semibold text-content-primary">
                    Instant Demo
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h2 className="text-xs uppercase font-bold tracking-wider text-content-muted mb-3">
                  Items to Dispense
                </h2>
                <div className="space-y-3 divide-y divide-border">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="pt-3 first:pt-0 flex items-center justify-between text-sm"
                    >
                      <div className="pr-4">
                        <p className="font-medium text-content-primary">
                          {item.name}
                        </p>
                        <p className="text-xs text-content-muted">
                          {item.quantity} × ₹{item.unitPrice.toFixed(2)}
                        </p>
                      </div>
                      <span className="font-semibold text-content-primary shrink-0">
                        ₹{item.subtotal.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Summary */}
              <div className="border-t border-border pt-3 flex items-baseline justify-between">
                <span className="text-sm font-bold text-content-primary">
                  Total Bill Paid
                </span>
                <span className="text-2xl font-black text-primary">
                  ₹{order.total.toFixed(2)}
                </span>
              </div>
            </>
          ) : (
            <div className="text-center py-4 space-y-2">
              <p className="text-sm font-medium text-content-primary">
                Your order payment has been successfully verified.
              </p>
              <p className="text-xs text-content-muted">
                No embedded item details were attached to this verification link.
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <Link
              href="/staff"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-surface-subtle hover:bg-surface border border-border text-content-primary font-semibold text-sm rounded-control transition-colors"
            >
              Back to Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}