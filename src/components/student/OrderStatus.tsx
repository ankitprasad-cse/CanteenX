import { Check } from "lucide-react";
import { cn } from "../../lib/utils/cn";
import { ORDER_STATUS_STEPS, type OrderStatus } from "../../types/order";

const labels: Record<OrderStatus, string> = {
  PLACED: "Order Placed",
  ACCEPTED: "Order Accepted",
  PREPARING: "Preparing",
  READY: "Ready for Collection",
  COLLECTED: "Collected",
  CANCELLED: "Order Cancelled",
};

export function OrderStatus({ status }: { status: OrderStatus }) {
  if (status === "CANCELLED") {
    return (
      <div className="rounded-control border border-red-100 bg-red-50 px-3 py-2 text-body-sm font-medium text-error">
        Order cancelled
      </div>
    );
  }

  const currentIndex = ORDER_STATUS_STEPS.indexOf(status);

  return (
    <ol aria-label={`Order status: ${labels[status]}`} className="grid grid-cols-5 gap-1">
      {ORDER_STATUS_STEPS.map((step, index) => {
        const complete = index < currentIndex;
        const current = index === currentIndex;

        return (
          <li key={step} className="min-w-0">
            <div className="flex items-center">
              <div
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-meta",
                  complete && "border-primary bg-primary text-white",
                  current && "border-primary bg-primary-light text-primary-dark ring-2 ring-primary/10",
                  index > currentIndex && "border-border bg-surface text-content-muted"
                )}
              >
                {complete ? <Check size={14} strokeWidth={2.5} /> : index + 1}
              </div>
              {index < ORDER_STATUS_STEPS.length - 1 ? (
                <div
                  aria-hidden="true"
                  className={cn(
                    "mx-1 h-px min-w-2 flex-1",
                    index < currentIndex ? "bg-primary" : "bg-border"
                  )}
                />
              ) : null}
            </div>
            <p
              className={cn(
                "mt-2 truncate text-[11px] leading-4",
                current ? "font-semibold text-primary-dark" : complete ? "text-content-secondary" : "text-content-muted"
              )}
            >
              {labels[step]}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
