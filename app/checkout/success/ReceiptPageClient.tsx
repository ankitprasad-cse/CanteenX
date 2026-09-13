"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import type { MockOrder, MockOrderItem } from "../../../src/types/order";

interface ReceiptPageClientProps {
  requestedOrderNumber: string | null;
}

function resolveOrderSnapshot(
  requestedOrderNumber: string | null
): MockOrder | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawCurrent = localStorage.getItem("campus-canteen-current-order");
    const currentOrder: MockOrder | null = rawCurrent
      ? JSON.parse(rawCurrent)
      : null;

    const rawHistory = localStorage.getItem("campus-canteen-order-history");
    const orderHistory: MockOrder[] = rawHistory ? JSON.parse(rawHistory) : [];

    if (requestedOrderNumber) {
      if (currentOrder && currentOrder.orderNumber === requestedOrderNumber) {
        return currentOrder;
      }
      const matched = orderHistory.find(
        (o) => o.orderNumber === requestedOrderNumber
      );
      return matched || null;
    }

    return currentOrder;
  } catch {
    return null;
  }
}
function encodeOrderPayload(order: MockOrder): string {
  try {
    const payload = {
      on: order.orderNumber,
      st: order.status,
      pm: order.paymentMethod,
      ps: order.paymentStatus,
      tt: order.total,
      qt: order.qrToken,
      it: order.items.map((item) => [
        item.name,
        item.quantity,
        item.unitPrice,
      ]),
    };

    const jsonStr = JSON.stringify(payload);
    const binaryStr = encodeURIComponent(jsonStr).replace(
      /%([0-9A-F]{2})/g,
      (_, p1) => String.fromCharCode(parseInt(p1, 16))
    );

    return encodeURIComponent(btoa(binaryStr));
  } catch {
    return "";
  }
}

export default function ReceiptPageClient({
  requestedOrderNumber,
}: ReceiptPageClientProps) {
  const [order, setOrder] = useState<MockOrder | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loadedOrder = resolveOrderSnapshot(requestedOrderNumber);
      setOrder(loadedOrder);
      setIsLoaded(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [requestedOrderNumber]);

  if (!isLoaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-content-muted font-medium text-sm">
          Loading digital receipt...
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-surface border border-border rounded-card text-center shadow-sm">
        <div className="w-12 h-12 bg-surface-subtle border border-border text-content-secondary rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
          !
        </div>
        <h2 className="text-xl font-bold text-content-primary mb-2">
          Order Not Found
        </h2>
        <p className="text-sm text-content-secondary mb-6">
          {requestedOrderNumber
            ? `We could not find any receipt for order #${requestedOrderNumber}.`
            : "No active order details are available."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/orders"
            className="px-4 py-2 bg-surface-subtle hover:bg-surface border border-border text-content-primary text-sm font-medium rounded-control transition text-center"
          >
            My Orders
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-control transition text-center shadow-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "";
const encodedData = order ? encodeOrderPayload(order) : "";
const qrDemoUrl = origin
  ? encodedData
    ? `${origin}/payment-success?data=${encodedData}`
    : `${origin}/payment-success`
  : "";

  const formattedDate = new Date(order.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="max-w-lg mx-auto my-8 px-4">
      <div className="bg-surface border border-border rounded-card shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-surface-subtle border-b border-border px-6 py-5 text-center">
          <p className="text-xs uppercase tracking-wider font-semibold text-content-muted mb-1">
            Campus Canteen
          </p>
          <h1 className="text-2xl font-black tracking-tight text-content-primary mb-2">
            CanteenX
          </h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-border rounded-full text-xs font-semibold text-content-secondary">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Order Confirmed • {order.status}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Identifier & QR Token */}
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

          {/* QR Code Verification Section */}
          <div className="flex flex-col items-center justify-center p-5 bg-surface-subtle border border-dashed border-border rounded-card text-center">
            {qrDemoUrl ? (
              <div className="p-2 bg-white rounded-control shadow-sm border border-border">
                <QRCodeSVG
                  value={qrDemoUrl}
                  size={180}
                  level="M"
                  includeMargin={true}
                />
              </div>
            ) : (
              <div className="w-[180px] h-[180px] bg-surface border border-border animate-pulse rounded-control flex items-center justify-center text-xs text-content-muted">
                Generating QR...
              </div>
            )}
            <p className="mt-3 text-xs font-bold text-content-primary">
              Scan at counter to verify
            </p>
            <p className="text-[11px] text-content-muted mt-0.5">
              Present this QR code or token to the canteen staff
            </p>
          </div>

          {/* Order Metadata */}
          <div className="grid grid-cols-2 gap-3 text-xs border-y border-border py-4">
            <div>
              <span className="text-content-muted block">Date & Time</span>
              <span className="font-semibold text-content-primary">
                {formattedDate}
              </span>
            </div>
            <div>
              <span className="text-content-muted block">Status</span>
              <span className="font-semibold text-content-primary">
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
              <span className="font-semibold text-content-primary uppercase">
                {order.paymentStatus}
              </span>
            </div>
          </div>

          {/* Itemized Receipt Table */}
          <div>
            <h2 className="text-xs uppercase font-bold tracking-wider text-content-muted mb-3">
              Items Ordered
            </h2>
            <div className="space-y-3 divide-y divide-border">
              {order.items.map((item: MockOrderItem) => {
                const itemSubtotal = item.unitPrice * item.quantity;

                return (
                  <div
                    key={item.id}
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
                      ₹{itemSubtotal.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing Total */}
          <div className="border-t border-border pt-3 space-y-1.5 text-sm">
            <div className="flex justify-between items-baseline pt-2 font-bold text-content-primary">
              <span className="text-base">Total</span>
              <span className="text-2xl text-primary font-black">
                ₹{order.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/orders"
              className="flex-1 py-2.5 bg-surface-subtle hover:bg-surface border border-border text-content-primary font-semibold text-sm rounded-control transition text-center"
            >
              View All Orders
            </Link>
            <Link
              href="/"
              className="flex-1 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-control transition text-center shadow-sm"
            >
              Order More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}