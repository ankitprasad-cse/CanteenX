"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { MockOrder, MockOrderItem, PaymentMethod } from "../types/order";

interface CreateOrderInput {
  items: MockOrderItem[];
  total: number;
  paymentMethod: PaymentMethod;
}

interface OrderSessionContextValue {
  currentOrder: MockOrder | null;
  orderHistory: MockOrder[];
  createOrder: (input: CreateOrderInput) => Promise<MockOrder>;
  clearCurrentOrder: () => void;
}

const CURRENT_ORDER_KEY = "campus-canteen-current-order";
const ORDER_HISTORY_KEY = "campus-canteen-order-history";

const OrderSessionContext = createContext<OrderSessionContextValue | undefined>(undefined);

function makeOrderNumber() {
  const value = Math.floor(1000 + Math.random() * 9000);
  return `CC-${value}`;
}

function readInitialCurrentOrder(): MockOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const savedCurrent = window.localStorage.getItem(CURRENT_ORDER_KEY);
    return savedCurrent ? (JSON.parse(savedCurrent) as MockOrder) : null;
  } catch {
    window.localStorage.removeItem(CURRENT_ORDER_KEY);
    return null;
  }
}

function readInitialOrderHistory(): MockOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const savedHistory = window.localStorage.getItem(ORDER_HISTORY_KEY);
    return savedHistory ? (JSON.parse(savedHistory) as MockOrder[]) : [];
  } catch {
    window.localStorage.removeItem(ORDER_HISTORY_KEY);
    return [];
  }
}

export function OrderSessionProvider({ children }: { children: ReactNode }) {
  const [currentOrder, setCurrentOrder] = useState<MockOrder | null>(() =>
    readInitialCurrentOrder()
  );
  const [orderHistory, setOrderHistory] = useState<MockOrder[]>(() =>
    readInitialOrderHistory()
  );

  useEffect(() => {
    try {
      if (currentOrder) {
        window.localStorage.setItem(CURRENT_ORDER_KEY, JSON.stringify(currentOrder));
      } else {
        window.localStorage.removeItem(CURRENT_ORDER_KEY);
      }
    } catch {
      // Local persistence is a convenience for this prototype.
    }
  }, [currentOrder]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(orderHistory));
    } catch {
      // Local persistence is a convenience for this prototype.
    }
  }, [orderHistory]);

  const createOrder = useCallback(
    async ({ items, total, paymentMethod }: CreateOrderInput): Promise<MockOrder> => {
      console.log("--> EXECUTING CONTEXT CREATE_ORDER");
      // Online payment is intentionally disabled in this prototype.
      // Keep this guard here as a second layer of protection so an online
      // order can never be created even if another UI path calls createOrder.
      if (paymentMethod === "ONLINE") {
        throw new Error("Online payment is demo-only and is not available.");
      }

      const orderNumber = makeOrderNumber();

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderNumber,
          paymentMethod,
          paymentStatus: "PENDING",
          total,
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        }),
      });

      if (!response.ok) {
        let errorMessage = "Failed to create order. Please try again.";
        try {
          const errorData = await response.json();
          if (errorData && typeof errorData.error === "string") {
            errorMessage = errorData.error;
          }
        } catch {
          // Fall back to generic message if error response is not JSON
        }
        throw new Error(errorMessage);
      }

      const order: MockOrder = await response.json();

      setCurrentOrder(order);
      setOrderHistory((previous) => [
        order,
        ...previous.filter((item) => item.orderNumber !== order.orderNumber),
      ]);

      return order;
    },
    [],
  );

  const clearCurrentOrder = useCallback(() => setCurrentOrder(null), []);

  const value = useMemo(
    () => ({
      currentOrder,
      orderHistory,
      createOrder,
      clearCurrentOrder,
    }),
    [currentOrder, orderHistory, createOrder, clearCurrentOrder],
  );

  return (
    <OrderSessionContext.Provider value={value}>
      {children}
    </OrderSessionContext.Provider>
  );
}

export function useOrderSession() {
  const context = useContext(OrderSessionContext);

  if (!context) {
    throw new Error("useOrderSession must be used within OrderSessionProvider");
  }

  return context;
}