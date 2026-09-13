"use client";

import { Check, CreditCard, WalletCards } from "lucide-react";
import type { PaymentMethod } from "../../types/order";
import { Card } from "../ui/Card";

interface CheckoutPaymentMethodsProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

const methods = [
  { id: "CASH" as const, name: "Cash at counter", description: "Pay when you collect your order.", icon: WalletCards },
  { id: "ONLINE" as const, name: "Online payment", description: "UPI, cards and other online methods — demo for now.", icon: CreditCard },
];

export function CheckoutPaymentMethods({ value, onChange }: CheckoutPaymentMethodsProps) {
  return (
    <section aria-labelledby="checkout-payment-heading">
      <div>
        <h2 id="checkout-payment-heading" className="text-section-heading text-content-primary">Payment method</h2>
        <p className="mt-1 text-body-sm text-content-secondary">Choose how you&apos;d like to pay for this order.</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {methods.map((method) => {
          const selected = value === method.id;
          const Icon = method.icon;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onChange(method.id)}
              aria-pressed={selected}
              className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <Card className={`relative h-full p-4 transition-colors sm:p-5 ${selected ? "border-primary/30 bg-primary-light/35" : "hover:border-primary/20"}`}>
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${selected ? "bg-primary text-white" : "bg-background text-content-secondary"}`}>
                    <Icon size={19} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-body-sm font-semibold text-content-primary">{method.name}</p>
                        <p className="mt-1 text-meta leading-5 text-content-secondary">{method.description}</p>
                      </div>
                      {selected ? (
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white" aria-label="Selected">
                          <Check size={14} strokeWidth={2.5} />
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Card>
            </button>
          );
        })}
      </div>

      {value === "ONLINE" ? (
        <p className="mt-3 rounded-sm bg-background px-3 py-2 text-meta text-content-secondary">
          Demo mode: no real payment details are requested or processed.
        </p>
      ) : null}
    </section>
  );
}
