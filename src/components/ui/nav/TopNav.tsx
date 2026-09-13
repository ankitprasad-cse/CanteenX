"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../../lib/utils/cn";

export interface TopNavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export function TopNav({ items, className }: { items: TopNavItem[]; className?: string }) {
  const pathname = usePathname();

  return (
    <header className={cn("top-nav hidden border-b border-border bg-surface md:block", className)}>
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-body font-semibold text-primary-dark">Campus Canteen</Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-1">
          {items.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link key={href} href={href} aria-current={active ? "page" : undefined}
                className={cn("flex items-center gap-2 rounded-control px-3 py-2 text-body-sm transition-colors",
                  active ? "bg-primary-light font-semibold text-primary-dark" : "text-content-secondary hover:bg-background hover:text-content-primary")}>
                {Icon && <Icon size={18} strokeWidth={1.9} />}
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}