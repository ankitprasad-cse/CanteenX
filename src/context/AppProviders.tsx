"use client";

import type { ReactNode } from "react";
import { CartProvider } from "./CartContext";
import { OrderSessionProvider } from "./OrderSessionContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <OrderSessionProvider>{children}</OrderSessionProvider>
    </CartProvider>
  );
}
