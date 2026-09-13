import { Check, CreditCard, WalletCards } from "lucide-react";
import { Card } from "../ui/Card";

const methods = [
  {
    id: "CASH",
    name: "Cash at counter",
    description: "Pay when you collect your order.",
    icon: WalletCards,
    selected: true,
  },
  {
    id: "ONLINE",
    name: "Online payment",
    description: "UPI, cards and other online methods — demo for now.",
    icon: CreditCard,
    selected: false,
  },
] as const;

export function PaymentMethods() {
  return (
    <section aria-labelledby="payment-methods-heading" className="mt-10">
      <div>
        <h2 id="payment-methods-heading" className="text-section-heading text-content-primary">Payment methods</h2>
        <p className="mt-1 max-w-2xl text-body-sm text-content-secondary">Choose how you&apos;d like to pay when placing your next order.</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {methods.map((method) => {
          const Icon = method.icon;
          return (
            <Card
              key={method.id}
              className={`relative p-4 sm:p-5 ${method.selected ? "border-primary/30 bg-primary-light/35" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${method.selected ? "bg-primary text-white" : "bg-background text-content-secondary"}`}>
                  <Icon size={19} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-body-sm font-semibold text-content-primary">{method.name}</p>
                      <p className="mt-1 text-meta leading-5 text-content-secondary">{method.description}</p>
                    </div>
                    {method.selected ? (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white" aria-label="Selected">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
