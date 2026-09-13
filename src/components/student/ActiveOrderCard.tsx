import { Clock3, CreditCard, IndianRupee, ReceiptText, WalletCards } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import Link from "next/link";
import { OrderStatus } from "./OrderStatus";
import type { MockOrder } from "../../types/order";

function statusLabel(status: MockOrder["status"]) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function paymentLabel(order: MockOrder) {
  if (order.paymentMethod === "ONLINE") return "Online · Demo";
  return "Cash at counter";
}

export function ActiveOrderCard({ order }: { order: MockOrder }) {
  const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card className="overflow-hidden border-primary/10 shadow-soft">
      <div className="border-b border-border bg-primary-light/50 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-meta font-medium uppercase tracking-[0.12em] text-content-muted">Current order</p>
            <div className="mt-1 flex items-center gap-2">
              <h2 className="text-[22px] font-semibold tracking-[-0.015em] text-content-primary">#{order.orderNumber}</h2>
              <Badge tone={order.status === "READY" ? "success" : "warning"}>{statusLabel(order.status)}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-body-sm text-content-secondary">
            <Clock3 size={16} />
            {order.createdAt}
          </div>
        </div>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        <div>
          <p className="mb-3 text-body-sm font-semibold text-content-primary">Order progress</p>
          <OrderStatus status={order.status} />
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center justify-between border-b border-border pb-2">
              <p className="text-body-sm font-semibold text-content-primary">Your items</p>
              <span className="text-meta text-content-muted">{itemCount} {itemCount === 1 ? "item" : "items"}</span>
            </div>
            <ul className="divide-y divide-border">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-body-sm font-medium text-content-primary">{item.name}</p>
                    <p className="mt-0.5 text-meta text-content-secondary">Qty {item.quantity} · ₹{item.unitPrice} each</p>
                  </div>
                  <span className="shrink-0 text-body-sm font-semibold text-content-primary">₹{item.unitPrice * item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:min-w-[190px] md:border-l md:border-border md:pl-6">
            <div className="flex items-center gap-2 text-body-sm text-content-secondary">
              {order.paymentMethod === "ONLINE" ? <CreditCard size={16} /> : <WalletCards size={16} />}
              <span>{paymentLabel(order)}</span>
            </div>
            {order.paymentStatus === "CONFIRMED" ? (
              <p className="mt-1 text-meta font-medium text-success">Payment confirmed</p>
            ) : (
              <p className="mt-1 text-meta text-content-muted">Pay when you collect</p>
            )}
            <div className="mt-5 border-t border-border pt-4">
              <p className="text-meta text-content-secondary">Total</p>
              <p className="mt-1 flex items-center text-[22px] font-semibold text-content-primary">
                <IndianRupee size={18} strokeWidth={2.2} />{order.total}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-body-sm font-medium text-content-primary">You can wait elsewhere.</p>
            <p className="mt-1 text-body-sm text-content-secondary">We&apos;ll move your order through the queue as it&apos;s prepared.</p>
          </div>

          <Link
            href={`/checkout/success?order=${encodeURIComponent(order.orderNumber)}`}
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-control border border-border bg-surface px-4 text-body-sm font-semibold text-content-primary transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <ReceiptText size={16} />
            View receipt
          </Link>
        </div>
      </div>
    </Card>
  );
}
