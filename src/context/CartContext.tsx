"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { mockMenu, type MockFoodItem } from "../data/mock-menu";

export interface CartEntry {
  foodId: string;
  quantity: number;
}

interface CartContextValue {
  entries: CartEntry[];
  items: Array<{ item: MockFoodItem; quantity: number; subtotal: number }>;
  totalItems: number;
  subtotal: number;
  addItem: (foodId: string) => void;
  removeItem: (foodId: string) => void;
  setQuantity: (foodId: string, quantity: number) => void;
  clearCart: () => void;
  getQuantity: (foodId: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<CartEntry[]>([]);

  const setQuantity = useCallback((foodId: string, quantity: number) => {
    setEntries((current) => {
      const existing = current.find((entry) => entry.foodId === foodId);

      if (quantity <= 0) {
        return current.filter((entry) => entry.foodId !== foodId);
      }

      if (existing) {
        return current.map((entry) =>
          entry.foodId === foodId ? { ...entry, quantity } : entry
        );
      }

      return [...current, { foodId, quantity }];
    });
  }, []);

  const addItem = useCallback((foodId: string) => {
    setEntries((current) => {
      const existing = current.find((entry) => entry.foodId === foodId);
      const food = mockMenu.find((item) => item.id === foodId);

      if (!food?.available) return current;

      if (existing) {
        return current.map((entry) =>
          entry.foodId === foodId
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }

      return [...current, { foodId, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((foodId: string) => {
    setEntries((current) => {
      const existing = current.find((entry) => entry.foodId === foodId);
      if (!existing) return current;

      if (existing.quantity <= 1) {
        return current.filter((entry) => entry.foodId !== foodId);
      }

      return current.map((entry) =>
        entry.foodId === foodId
          ? { ...entry, quantity: entry.quantity - 1 }
          : entry
      );
    });
  }, []);

  const clearCart = useCallback(() => setEntries([]), []);

  const getQuantity = useCallback(
    (foodId: string) => entries.find((entry) => entry.foodId === foodId)?.quantity ?? 0,
    [entries]
  );

  const items = useMemo(
    () =>
      entries.flatMap((entry) => {
        const item = mockMenu.find((food) => food.id === entry.foodId);
        if (!item) return [];
        return [{ item, quantity: entry.quantity, subtotal: item.price * entry.quantity }];
      }),
    [entries]
  );

  const totalItems = useMemo(
    () => entries.reduce((sum, entry) => sum + entry.quantity, 0),
    [entries]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, entry) => sum + entry.subtotal, 0),
    [items]
  );

  const value = useMemo(
    () => ({ entries, items, totalItems, subtotal, addItem, removeItem, setQuantity, clearCart, getQuantity }),
    [entries, items, totalItems, subtotal, addItem, removeItem, setQuantity, clearCart, getQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
