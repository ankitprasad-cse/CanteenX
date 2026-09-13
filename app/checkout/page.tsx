"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { BottomNav } from "../../src/components/ui/nav/BottomNav";
import { TopNav } from "../../src/components/ui/nav/TopNav";
import { Button } from "../../src/components/ui/Button";
import { Card } from "../../src/components/ui/Card";
import { EmptyState } from "../../src/components/ui/EmptyState";
import { ErrorState } from "../../src/components/ui/ErrorState";
import { useCart } from "../../src/context/CartContext";
import { useOrderSession } from "../../src/context/OrderSessionContext";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Orders", href: "/orders", icon: ShoppingBag },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
  { label: "Profile", href: "/profile", icon: User },
];

export default function CheckoutPage() {
  const router = useRouter();

  const { items, totalItems, subtotal, clearCart } = useCart();
  const { createOrder } = useOrderSession();

  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(false);

  const handlePlaceOrder = async () => {
    if (placing || items.length === 0) return;

    setPlacing(true);
    setError(false);

    try {
      const order = await createOrder({
        items: items.map(({ item, quantity }) => ({
          id: item.id,
          name: item.name,
          quantity,
          unitPrice: item.price,
        })),
        total: subtotal,
        paymentMethod: "CASH",
      });

      clearCart();

      router.push(
        `/checkout/success?order=${encodeURIComponent(order.orderNumber)}`,
      );
    } catch {
      setPlacing(false);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28 md:pb-8">
      <TopNav items={navItems} />

      <main className="mx-auto max-w-[1080px] px-5 pb-12 pt-7 sm:px-6 md:pt-9 lg:px-8">
        <Link
          href="/cart"
          className="inline-flex min-h-9 items-center gap-2 text-body-sm font-medium text-content-secondary transition-colors hover:text-content-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <ArrowLeft size={16} />
          Back to cart
        </Link>

        <header className="mt-4 max-w-2xl">
          <p className="text-meta font-medium uppercase tracking-[0.14em] text-content-muted">
            Campus Canteen
          </p>

          <h1 className="mt-3 text-page-heading tracking-[-0.02em] text-content-primary sm:text-[34px]">
            Review your order
          </h1>

          <p className="mt-2 text-body text-content-secondary">
            Confirm your items and payment method before placing the order.
          </p>
        </header>

        {items.length === 0 ? (
          <section className="mt-8">
            <EmptyState
              title="Nothing to checkout"
              description="Your cart is empty. Add something from today's menu to continue."
              action={
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center justify-center rounded-control bg-primary px-4 text-body-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Browse today&apos;s menu
                </Link>
              }
            />
          </section>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="space-y-7">
              {/* Order Items */}
              <section aria-labelledby="review-items-heading">
                <div className="mb-3 flex items-end justify-between gap-4">
                  <div>
                    <h2
                      id="review-items-heading"
                      className="text-section-heading text-content-primary"
                    >
                      Your items
                    </h2>

                    <p className="mt-1 text-body-sm text-content-secondary">
                      {totalItems}{" "}
                      {totalItems === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>

                <Card className="overflow-hidden p-0">
                  <ul className="divide-y divide-border">
                    {items.map(
                      ({ item, quantity, subtotal: itemSubtotal }) => (
                        <li key={item.id} className="p-3 sm:p-5">
                          <div className="flex gap-3 sm:gap-4">
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-control bg-primary-light sm:h-24 sm:w-24">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="(max-width: 639px) 80px, 96px"
                                loading="lazy"
                                unoptimized
                                onError={(event) => {
                                  event.currentTarget.src =
                                    "/food-image-fallback.svg";
                                }}
                                className="object-cover"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <h3 className="truncate text-body font-semibold text-content-primary">
                                    {item.name}
                                  </h3>

                                  <p className="mt-1 line-clamp-2 text-body-sm text-content-secondary">
                                    {item.description}
                                  </p>

                                  <p className="mt-1.5 text-meta text-content-muted">
                                    ₹{item.price} each
                                  </p>
                                </div>

                                <p className="shrink-0 text-body font-semibold text-content-primary">
                                  ₹{itemSubtotal}
                                </p>
                              </div>

                              <p className="mt-3 text-body-sm font-medium text-content-secondary">
                                Quantity: {quantity}
                              </p>
                            </div>
                          </div>
                        </li>
                      ),
                    )}
                  </ul>
                </Card>
              </section>

              {/* Payment Information */}
              <section
                aria-labelledby="payment-heading"
                className="rounded-card border border-border bg-surface p-5 sm:p-6"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-primary-light text-primary">
                    <span className="text-lg font-semibold">₹</span>
                  </div>

                  <div>
                    <h2
                      id="payment-heading"
                      className="text-section-heading text-content-primary"
                    >
                      Payment
                    </h2>

                    <p className="mt-1 text-body-sm font-medium text-content-secondary">
                      Cash at counter
                    </p>

                    <p className="mt-2 text-meta leading-5 text-content-muted">
                      Pay when you collect your order from the canteen counter.
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t border-border pt-4">
                  <h3 className="text-body-sm font-semibold text-content-primary">
                    Online payment
                  </h3>

                  <p className="mt-1 text-body-sm text-content-secondary">
                    Online payments are coming soon.
                  </p>

                  <p className="mt-1 text-meta leading-5 text-content-muted">
                    UPI, cards and other digital payment methods will be
                    available in a future version.
                  </p>
                </div>
              </section>
            </div>

            {/* Order Summary */}
            <aside
              className="lg:sticky lg:top-6"
              aria-labelledby="checkout-summary-heading"
            >
              <Card className="p-5 sm:p-6">
                <h2
                  id="checkout-summary-heading"
                  className="text-section-heading text-content-primary"
                >
                  Order summary
                </h2>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between gap-4 text-body-sm">
                    <span className="text-content-secondary">
                      Subtotal
                    </span>

                    <span className="font-semibold text-content-primary">
                      ₹{subtotal}
                    </span>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between gap-4 text-body-sm">
                      <span className="text-content-secondary">
                        Payment method
                      </span>

                      <span className="text-right font-medium text-content-primary">
                        Cash at counter
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-end justify-between gap-4">
                      <span className="text-body-sm font-medium text-content-secondary">
                        Total
                      </span>

                      <span className="text-[25px] font-semibold tracking-[-0.02em] text-content-primary">
                        ₹{subtotal}
                      </span>
                    </div>
                  </div>

                  {error ? (
                    <ErrorState
                      title="We couldn't place the order"
                      description="Please try again."
                    />
                  ) : null}

                  <Button
                    type="button"
                    size="lg"
                    className="mt-1 w-full"
                    loading={placing}
                    disabled={placing || items.length === 0}
                    onClick={handlePlaceOrder}
                  >
                    {placing ? "Placing order" : "Place order"}

                    {!placing ? <ArrowRight size={17} /> : null}
                  </Button>

                  <p className="text-center text-meta text-content-muted">
                    You&apos;ll pay at the counter when you collect your order.
                  </p>
                </div>
              </Card>
            </aside>
          </div>
        )}
      </main>

      <BottomNav items={navItems} cartCount={totalItems} />
    </div>
  );
}