"use client";

import { useEffect, useMemo, useState } from "react";
import { Home, ShoppingBag, ShoppingCart, User, Search, SlidersHorizontal } from "lucide-react";
import { BottomNav } from "../../src/components/ui/nav/BottomNav";
import { TopNav } from "../../src/components/ui/nav/TopNav";
import { Button } from "../../src/components/ui/Button";
import { EmptyState } from "../../src/components/ui/EmptyState";
import { Input } from "../../src/components/ui/Input";
import { categories, mockMenu, type FoodCategory } from "../../src/data/mock-menu";
import { FoodCard } from "../../src/components/student/FoodCard";
import { FoodSection } from "../../src/components/student/FoodSection";
import { SpecialFoodCard } from "../../src/components/student/SpecialFoodCard";
import { useCart } from "../../src/context/CartContext";

const navItems = [
  { label: "Home", href: "/student", icon: Home },
  { label: "Orders", href: "/orders", icon: ShoppingBag },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
  { label: "Profile", href: "/profile", icon: User },
];

interface CurrentUser {
  userId: string;
  name: string;
  role: string;
  identifier: string;
}

interface AuthMeResponse {
  user: CurrentUser | null;
}

export default function StudentHomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | FoodCategory>("All");
  const [userName, setUserName] = useState<string | null>(null);
  const { addItem, removeItem, getQuantity, totalItems } = useCart();

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        const response = await fetch("/api/auth/me");
        if (!response.ok) {
          if (isMounted) {
            setUserName("Student");
          }
          return;
        }

        const data: unknown = await response.json();
        const parsedData = (data && typeof data === "object" ? data : {}) as AuthMeResponse;

        if (isMounted) {
          if (parsedData.user?.name) {
            setUserName(parsedData.user.name);
          } else {
            setUserName("Student");
          }
        }
      } catch {
        if (isMounted) {
          setUserName("Student");
        }
      }
    }

    void loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const special = mockMenu.find((item) => item.isSpecial);
  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return mockMenu.filter((item) => {
      const categoryMatch =
        category === "All" || item.category === category;

      const searchMatch =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery);

      return categoryMatch && searchMatch;
    });
  }, [category, query]);

  const popular = filteredItems.slice(0, 4);
  const todaysMenu = filteredItems.slice(4);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <TopNav items={navItems} />

      <main className="mx-auto max-w-[1180px] px-5 pb-10 pt-8 sm:px-6 md:pt-10 lg:px-8">
        <header className="max-w-3xl">
          <p className="text-meta font-medium uppercase tracking-[0.14em] text-content-muted">
            Campus Canteen
          </p>

          <div className="mt-3">
            <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.02em] text-content-primary sm:text-[36px]">
              Good afternoon{userName ? `, ${userName}` : ""}
            </h1>
            <p className="mt-2 text-body text-content-secondary">
              What are you having today?
            </p>
          </div>
        </header>

        <section className="mt-7" aria-label="Search menu">
          <div className="flex gap-2">
            <div className="relative min-w-0 flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-content-muted"
              />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search today&apos;s menu"
                aria-label="Search today's menu"
                className="pl-10"
              />
            </div>

            <Button
              variant="secondary"
              size="md"
              aria-label="Menu filters"
              className="px-3 sm:px-4"
            >
              <SlidersHorizontal size={18} />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </section>

        <section className="mt-5" aria-label="Menu categories">
          <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex w-max snap-x snap-mandatory gap-6 border-b border-border pb-px pr-5 sm:gap-7 lg:pr-8">
              {categories.map((item) => {
                const selected = item === category;

                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setCategory(item)}
                    className={[
                      "min-h-10 shrink-0 snap-start border-b-2 px-0.5 text-body-sm font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                      selected
                        ? "border-primary text-primary"
                        : "border-transparent text-content-secondary hover:text-content-primary",
                    ].join(" ")}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {special && !query && category === "All" ? (
          <div className="mt-8">
            <FoodSection title="Today&apos;s special">
              <SpecialFoodCard
                item={special}
                quantity={getQuantity(special.id)}
                onAdd={() => addItem(special.id)}
              />
            </FoodSection>
          </div>
        ) : null}

        {filteredItems.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="No food found"
              description="Try a different search or clear the selected category."
              action={
                <Button variant="secondary" onClick={clearFilters}>
                  Clear search
                </Button>
              }
            />
          </div>
        ) : (
          <div className="mt-9 space-y-10">
            <FoodSection title="Popular today">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {popular.map((item) => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    quantity={getQuantity(item.id)}
                    onAdd={() => addItem(item.id)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </div>
            </FoodSection>

            {todaysMenu.length > 0 ? (
              <FoodSection title="Today&apos;s menu">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {todaysMenu.map((item) => (
                    <FoodCard
                      key={item.id}
                      item={item}
                      quantity={getQuantity(item.id)}
                      onAdd={() => addItem(item.id)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                </div>
              </FoodSection>
            ) : null}
          </div>
        )}
      </main>

      <BottomNav items={navItems} cartCount={totalItems} />
    </div>
  );
}