"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Home,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";

import { BottomNav } from "../../src/components/ui/nav/BottomNav";
import { TopNav } from "../../src/components/ui/nav/TopNav";
import { Button } from "../../src/components/ui/Button";
import { EmptyState } from "../../src/components/ui/EmptyState";
import { ErrorState } from "../../src/components/ui/ErrorState";
import { Skeleton } from "../../src/components/ui/Skeleton";

import { ActiveOrderCard } from "../../src/components/student/ActiveOrderCard";
import { PastOrderCard } from "../../src/components/student/PastOrderCard";

import { mockOrders } from "../../src/data/mock-orders";

import type { MockOrder, OrderStatus } from "../../src/types/order";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Orders", href: "/orders", icon: ShoppingBag },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
  { label: "Profile", href: "/profile", icon: User },
];

const CURRENT_ORDER_KEY = "campus-canteen-current-order";
const ORDER_HISTORY_KEY = "campus-canteen-order-history";

type OrdersPageState = "loaded" | "loading" | "error";

export default function OrdersPage() {
  const [state, setState] = useState<OrdersPageState>("loading");

  const [currentOrder, setCurrentOrder] =
    useState<MockOrder | null>(null);

  const [orderHistory, setOrderHistory] = useState<MockOrder[]>([]);

  useEffect(() => {
    try {
      const savedCurrent = window.localStorage.getItem(
        CURRENT_ORDER_KEY,
      );

      const savedHistory = window.localStorage.getItem(
        ORDER_HISTORY_KEY,
      );

      const parsedCurrent = savedCurrent
        ? (JSON.parse(savedCurrent) as MockOrder)
        : null;

      const parsedHistory = savedHistory
        ? (JSON.parse(savedHistory) as MockOrder[])
        : [];

      setCurrentOrder(parsedCurrent);
      setOrderHistory(
        Array.isArray(parsedHistory) ? parsedHistory : [],
      );

      setState("loaded");
    } catch (error) {
      console.error("Failed to load orders:", error);

      setCurrentOrder(null);
      setOrderHistory([]);
      setState("error");
    }
  }, []);

  const fallbackActiveOrder = mockOrders.find(
    (order) =>
      !(["COLLECTED", "CANCELLED"] as OrderStatus[]).includes(
        order.status,
      ),
  );

  const activeOrder = currentOrder ?? fallbackActiveOrder;

  const pastOrders = [
    ...orderHistory.filter((order) =>
      (["COLLECTED", "CANCELLED"] as OrderStatus[]).includes(
        order.status,
      ),
    ),

    ...mockOrders.filter((order) =>
      (["COLLECTED", "CANCELLED"] as OrderStatus[]).includes(
        order.status,
      ),
    ),
  ].filter(
    (order, index, orders) =>
      orders.findIndex(
        (item) => item.orderNumber === order.orderNumber,
      ) === index,
  );

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <TopNav items={navItems} />

      <main className="mx-auto max-w-[1180px] px-5 pb-10 pt-7 sm:px-6 md:pt-9 lg:px-8">

        {/* PAGE HEADER */}
        <header className="max-w-2xl">
          <p className="text-meta font-medium uppercase tracking-[0.14em] text-content-muted">
            Campus Canteen
          </p>

          <h1 className="mt-3 text-page-heading tracking-[-0.02em] text-content-primary sm:text-[34px]">
            Your orders
          </h1>

          <p className="mt-2 text-body text-content-secondary">
            Track what&apos;s being prepared and find your recent orders.
          </p>
        </header>

        {/* CURRENT ORDER */}
        <section
          className="mt-8"
          aria-label="Current order"
        >
          {state === "loading" ? (
            <div className="space-y-4 rounded-card border border-border bg-surface p-5 sm:p-6">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : state === "error" ? (
            <ErrorState
              title="We couldn't load your orders"
              description="Please refresh the page and try again."
            />
          ) : !activeOrder ? (
            <EmptyState
              title="No active order"
              description="Your current order will appear here while it is being prepared."
              action={
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center justify-center rounded-control bg-primary px-4 text-body-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  Browse today&apos;s menu
                </Link>
              }
            />
          ) : (
            <div>
              <ActiveOrderCard order={activeOrder} />

              {/* CURRENT ORDER RECEIPT BUTTON */}
              <div className="mt-3 flex justify-end">
                <Link
                  href={`/checkout/success?order=${encodeURIComponent(
                    activeOrder.orderNumber,
                  )}`}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-control border border-border bg-surface px-4 text-body-sm font-semibold text-content-primary transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <Receipt size={16} />
                  View receipt
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* PAST ORDERS */}
        {state === "loaded" ? (
          <section
            className="mt-10"
            aria-labelledby="past-orders-heading"
          >
            <div>
              <h2
                id="past-orders-heading"
                className="text-section-heading text-content-primary"
              >
                Past orders
              </h2>

              <p className="mt-1 text-body-sm text-content-secondary">
                Your recent canteen orders.
              </p>
            </div>

            {pastOrders.length > 0 ? (
              <div className="mt-4 space-y-4">
                {pastOrders.map((order) => (
                  <div key={order.id}>
                    <PastOrderCard order={order} />

                    {/* PAST ORDER RECEIPT BUTTON */}
                    <div className="mt-2 flex justify-end">
                      <Link
                        href={`/checkout/success?order=${encodeURIComponent(
                          order.orderNumber,
                        )}`}
                        className="inline-flex min-h-9 items-center justify-center gap-2 rounded-control px-3 text-body-sm font-medium text-primary transition-colors hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      >
                        <Receipt size={15} />
                        View receipt
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                className="mt-4"
                title="No past orders"
                description="Completed orders will appear here."
              />
            )}
          </section>
        ) : null}
      </main>

      <BottomNav
        items={navItems}
        cartCount={0}
      />
    </div>
  );
}