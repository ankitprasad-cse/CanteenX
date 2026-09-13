import Link from "next/link";
import { ChevronDown, ChevronUp, CreditCard, ReceiptText, WalletCards } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import type { MockOrder } from "../../types/order";

export function PastOrderCard({ order }: { order: MockOrder }) {
  const [open, setOpen] = useState(false);
  const itemSummary = order.items
    .map((item) => `${item.name} × ${item.quantity}`)
    .join(", ");

  return (
    <Card className="overflow-hidden shadow-none">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-background sm:p-5"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-body font-semibold text-content-primary">
              #{order.orderNumber}
            </h3>
            <Badge tone={order.status === "CANCELLED" ? "error" : "success"}>
              {order.status === "CANCELLED" ? "Cancelled" : "Collected"}
            </Badge>
          </div>
          <p className="mt-1 text-meta text-content-muted">{order.createdAt}</p>
          <p className="mt-2 truncate text-body-sm text-content-secondary">
            {itemSummary}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="text-body font-semibold text-content-primary">
            ₹{order.total}
          </span>
          {open ? (
            <ChevronUp size={18} className="text-content-muted" />
          ) : (
            <ChevronDown size={18} className="text-content-muted" />
          )}
        </div>
      </button>

      {open ? (
        <div className="border-t border-border bg-background px-4 py-4 sm:px-5">
          <ul className="space-y-2">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between gap-4 text-body-sm"
              >
                <span className="text-content-secondary">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-content-primary">
                  ₹{item.unitPrice * item.quantity}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3 text-meta text-content-secondary">
            {order.paymentMethod === "ONLINE" ? (
              <CreditCard size={15} />
            ) : (
              <WalletCards size={15} />
            )}
            {order.paymentMethod === "ONLINE"
              ? "Online · Demo"
              : "Cash at counter"}
            {order.paymentStatus === "CONFIRMED"
              ? "· Payment confirmed"
              : "· Paid at collection"}
          </div>

          <Link
            href={`/checkout/success?order=${encodeURIComponent(order.orderNumber)}`}
            className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-control border border-border bg-surface px-4 text-body-sm font-semibold text-content-primary transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <ReceiptText size={16} />
            View receipt
          </Link>
        </div>
      ) : null}
    </Card>
  );
}
