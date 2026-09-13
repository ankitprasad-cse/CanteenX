"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../../lib/utils/cn";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export function BottomNav({ items, className, cartCount = 0 }: { items: NavItem[]; className?: string; cartCount?: number }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className={cn(
      "bottom-nav fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-sm md:hidden",
      className
    )}>
      <div className="mx-auto grid w-full max-w-lg grid-cols-4 gap-1">
        {items.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link key={href} href={href} aria-current={active ? "page" : undefined}
                className={cn("flex min-h-14 min-w-0 flex-col items-center justify-center gap-1.5 rounded-control px-1 text-meta transition-colors",
                active ? "text-primary" : "text-content-muted hover:text-content-primary")}>
              <span className="relative">
                <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
                {label === "Cart" && cartCount > 0 ? (
                  <span className="absolute -right-3 -top-2 grid min-h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-white">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                ) : null}
              </span>
              <span className="whitespace-nowrap">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}