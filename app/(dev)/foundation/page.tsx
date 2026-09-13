"use client";

import { useState } from "react";
import { ClipboardList, Home, Plus, RefreshCw, ShoppingBag, User } from "lucide-react";
import { Badge } from "../../../src/components/ui/Badge";
import { Button } from "../../../src/components/ui/Button";
import { Card } from "../../../src/components/ui/Card";
import { EmptyState } from "../../../src/components/ui/EmptyState";
import { ErrorState } from "../../../src/components/ui/ErrorState";
import { Input } from "../../../src/components/ui/Input";
import { Skeleton } from "../../../src/components/ui/Skeleton";
import { BottomNav, type NavItem } from "../../../src/components/ui/nav/BottomNav";
import { TopNav, type TopNavItem } from "../../../src/components/ui/nav/TopNav";

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Orders", href: "/orders", icon: ClipboardList },
  { label: "Cart", href: "/cart", icon: ShoppingBag },
  { label: "Profile", href: "/profile", icon: User }
];

const topItems: TopNavItem[] = navItems;

export default function FoundationPage() {
  const [inputError, setInputError] = useState(false);

  return (
    <main className="min-h-screen bg-background pb-24 md:pb-8">
      <TopNav items={topItems} />
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
        <header className="max-w-2xl">
          <p className="text-meta uppercase tracking-[0.14em] text-content-muted">Internal review</p>
          <h1 className="mt-2 text-page-heading text-content-primary">Frontend foundation</h1>
          <p className="mt-3 text-body text-content-secondary">Reusable components, variants and interaction states for the Campus Canteen product.</p>
        </header>

        <section className="mt-10">
          <h2 className="text-section-heading">Buttons</h2>
          <Card className="mt-4 p-5"><div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="danger">Danger</Button>
            <Button size="sm">Small</Button><Button size="lg">Large</Button><Button loading>Loading</Button><Button disabled>Disabled</Button>
            <Button><Plus size={17} />Add item</Button>
          </div></Card>
        </section>

        <section className="mt-10">
          <h2 className="text-section-heading">Inputs</h2>
          <Card className="mt-4 grid gap-4 p-5 md:grid-cols-3">
            <Input placeholder="Default input" />
            <Input value="Disabled input" disabled readOnly />
            <div>
              <Input placeholder="Error input" error={inputError} aria-describedby="input-error" />
              {inputError && <p id="input-error" className="mt-1 text-meta text-error">Check this value.</p>}
            </div>
            <Button size="sm" variant="secondary" onClick={() => setInputError(v => !v)}>Toggle error</Button>
          </Card>
        </section>

        <section className="mt-10">
          <h2 className="text-section-heading">Badges</h2>
          <Card className="mt-4 flex flex-wrap gap-2 p-5">
            <Badge>Default</Badge><Badge tone="success">Ready</Badge><Badge tone="warning">Preparing</Badge>
            <Badge tone="error">Unavailable</Badge><Badge tone="special">Special</Badge>
          </Card>
        </section>

        <section className="mt-10">
          <h2 className="text-section-heading">Cards</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Card className="p-5"><p className="text-meta text-content-muted">Example</p>
              <h3 className="mt-1 text-section-heading text-content-primary">Reusable surface</h3>
              <p className="mt-2 text-body-sm text-content-secondary">Moderate radius, subtle border and controlled elevation.</p>
            </Card>
            <Card className="overflow-hidden"><div className="aspect-[16/7] bg-primary-light" />
              <div className="p-5"><h3 className="text-section-heading text-content-primary">Composed card</h3>
                <p className="mt-2 text-body-sm text-content-secondary">The shell can be composed into domain-specific cards later.</p>
              </div>
            </Card>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-section-heading">Loading</h2>
          <Card className="mt-4 p-5"><div className="grid gap-3 md:grid-cols-3">
            <Skeleton className="h-5 w-3/4" /><Skeleton className="h-10 w-full" /><Skeleton className="h-24 w-full" />
          </div></Card>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div><h2 className="text-section-heading">Empty state</h2>
            <EmptyState className="mt-4" title="No orders yet" description="Your completed and active orders will appear here."
              action={<Button size="sm">Browse menu</Button>} />
          </div>
          <div><h2 className="text-section-heading">Error state</h2>
            <ErrorState className="mt-4" title="Menu unavailable" description="We couldn't load today's menu. Try again in a moment."
              action={<Button size="sm" variant="secondary"><RefreshCw size={16} />Try again</Button>} />
          </div>
        </section>
      </div>
      <BottomNav items={navItems} />
    </main>
  );
}