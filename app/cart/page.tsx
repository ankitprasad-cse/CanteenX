"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Home, Minus, Plus, ShoppingBag, ShoppingCart, Trash2, User, WalletCards } from "lucide-react";
import { BottomNav } from "../../src/components/ui/nav/BottomNav";
import { TopNav } from "../../src/components/ui/nav/TopNav";
import { Button } from "../../src/components/ui/Button";
import { Card } from "../../src/components/ui/Card";
import { EmptyState } from "../../src/components/ui/EmptyState";
import { useCart } from "../../src/context/CartContext";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Orders", href: "/orders", icon: ShoppingBag },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
  { label: "Profile", href: "/profile", icon: User },
];

function CartFoodImage({ name, src }: { name: string; src: string }) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-control bg-primary-light sm:h-24 sm:w-24">
      <Image
        src={imageSrc}
        alt={name}
        fill
        sizes="(max-width: 639px) 72px, 96px"
        loading="lazy"
        unoptimized
        onError={() => setImageSrc("/food-image-fallback.svg")}
        className="object-cover"
      />
    </div>
  );
}

export default function CartPage() {
  const { items, totalItems, subtotal, addItem, removeItem, setQuantity, clearCart } = useCart();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = (foodId: string) => {
    setRemovingId(foodId);
    window.setTimeout(() => {
      setQuantity(foodId, 0);
      setRemovingId(null);
    }, 140);
  };

  return (
    <div className="min-h-screen bg-background pb-28 md:pb-8">
      <TopNav items={navItems} />

      <main className="mx-auto max-w-[1180px] px-5 pb-10 pt-7 sm:px-6 md:pt-9 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-meta font-medium uppercase tracking-[0.14em] text-content-muted">Campus Canteen</p>
          <h1 className="mt-3 text-page-heading tracking-[-0.02em] text-content-primary sm:text-[34px]">Your cart</h1>
          <p className="mt-2 text-body text-content-secondary">Review your items before placing your order.</p>
        </header>

        {items.length === 0 ? (
          <section className="mt-8" aria-label="Empty cart">
            <EmptyState
              title="Your cart is empty"
              description="Add something from today&apos;s menu and it&apos;ll appear here."
              action={
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control bg-primary px-4 text-body-sm font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Browse today&apos;s menu
                </Link>
              }
            />
          </section>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <section aria-labelledby="cart-items-heading">
              <div className="mb-3 flex items-end justify-between gap-4">
                <div>
                  <h2 id="cart-items-heading" className="text-section-heading text-content-primary">Your items</h2>
                  <p className="mt-1 text-body-sm text-content-secondary">{totalItems} {totalItems === 1 ? "item" : "items"}</p>
                </div>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-body-sm font-medium text-content-secondary transition-colors hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Clear cart
                </button>
              </div>

              <Card className="overflow-hidden p-0">
                <ul className="divide-y divide-border">
                  {items.map(({ item, quantity, subtotal: itemSubtotal }) => (
                    <li
                      key={item.id}
                      className={`p-3 transition-opacity duration-150 sm:p-5 ${removingId === item.id ? "opacity-40" : "opacity-100"}`}
                    >
                      <div className="flex gap-3 sm:gap-4">
                        <CartFoodImage name={item.name} src={item.image} />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="truncate text-body font-semibold text-content-primary">{item.name}</h3>
                              <p className="mt-1 line-clamp-2 max-w-[34rem] text-body-sm text-content-secondary">{item.description}</p>
                              <p className="mt-1.5 text-meta text-content-muted">₹{item.price} each</p>
                            </div>
                            <p className="shrink-0 text-body font-semibold text-content-primary">₹{itemSubtotal}</p>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3 sm:mt-4">
                            <div className="flex items-center rounded-control border border-border bg-surface p-1" aria-label={`Quantity for ${item.name}`}>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                aria-label={`Decrease ${item.name} quantity`}
                                className="grid h-9 w-9 place-items-center rounded-sm text-content-primary transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                              >
                                <Minus size={15} />
                              </button>
                              <span className="min-w-7 text-center text-body-sm font-semibold text-content-primary" aria-live="polite">{quantity}</span>
                              <button
                                type="button"
                                onClick={() => addItem(item.id)}
                                aria-label={`Increase ${item.name} quantity`}
                                className="grid h-9 w-9 place-items-center rounded-sm text-content-primary transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                              >
                                <Plus size={15} />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemove(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                              className="inline-flex min-h-9 min-w-9 items-center justify-center gap-1.5 rounded-control px-2 text-meta font-medium text-content-secondary transition-colors hover:bg-red-50 hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                            >
                              <Trash2 size={15} />
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </section>

            <aside className="lg:sticky lg:top-6" aria-labelledby="order-summary-heading">
              <Card className="p-5 sm:p-6">
                <h2 id="order-summary-heading" className="text-section-heading text-content-primary">Order summary</h2>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between gap-4 text-body-sm">
                    <span className="text-content-secondary">Subtotal</span>
                    <span className="font-semibold text-content-primary">₹{subtotal}</span>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-2.5">
                        <WalletCards size={18} className="mt-0.5 shrink-0 text-content-secondary" />
                        <div>
                          <p className="text-body-sm font-medium text-content-primary">Payment method</p>
                          <p className="mt-1 text-meta text-content-secondary">Cash at counter</p>
                        </div>
                      </div>
                      <span className="text-meta text-content-muted">Change</span>
                    </div>
                    <p className="mt-3 rounded-sm bg-background px-3 py-2 text-meta text-content-secondary">
                      Pay when you collect your order.
                    </p>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-end justify-between gap-4">
                      <span className="text-body-sm font-medium text-content-secondary">Total</span>
                      <span className="text-[25px] font-semibold tracking-[-0.02em] text-content-primary">₹{subtotal}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="mt-1 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-control bg-primary px-5 text-body font-semibold text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    Proceed to checkout
                    <ArrowRight size={17} />
                  </Link>
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
