import type { MockOrder } from "../types/order";

export const mockOrders: MockOrder[] = [
  {
    id: "order-1042",
    orderNumber: "CC-1042",
    createdAt: "Today · 1:18 PM",
    status: "PREPARING",
    paymentMethod: "CASH",
    paymentStatus: "NOT_REQUIRED",
    items: [
      { id: "paneer-roll", name: "Paneer Roll", quantity: 1, unitPrice: 60 },
      { id: "cold-coffee", name: "Cold Coffee", quantity: 1, unitPrice: 50 },
    ],
    total: 110,
  },
  {
    id: "order-1037",
    orderNumber: "CC-1037",
    createdAt: "Yesterday · 12:42 PM",
    status: "READY",
    paymentMethod: "ONLINE",
    paymentStatus: "CONFIRMED",
    items: [
      { id: "chicken-burger", name: "Chicken Burger", quantity: 1, unitPrice: 90 },
      { id: "french-fries", name: "French Fries", quantity: 1, unitPrice: 60 },
    ],
    total: 150,
  },
  {
    id: "order-1029",
    orderNumber: "CC-1029",
    createdAt: "Sep 2 · 1:05 PM",
    status: "COLLECTED",
    paymentMethod: "CASH",
    paymentStatus: "NOT_REQUIRED",
    items: [
      { id: "masala-dosa", name: "Masala Dosa", quantity: 1, unitPrice: 70 },
      { id: "samosa", name: "Samosa", quantity: 2, unitPrice: 20 },
    ],
    total: 110,
  },
  {
    id: "order-1018",
    orderNumber: "CC-1018",
    createdAt: "Aug 30 · 12:16 PM",
    status: "COLLECTED",
    paymentMethod: "ONLINE",
    paymentStatus: "CONFIRMED",
    items: [
      { id: "veg-sandwich", name: "Veg Sandwich", quantity: 1, unitPrice: 55 },
      { id: "cold-coffee", name: "Cold Coffee", quantity: 1, unitPrice: 50 },
    ],
    total: 105,
  },
];
