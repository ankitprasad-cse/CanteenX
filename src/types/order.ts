export type OrderStatus =
  | "PLACED"
  | "ACCEPTED"
  | "PREPARING"
  | "READY"
  | "COLLECTED"
  | "CANCELLED";

export type PaymentMethod = "CASH" | "ONLINE";
export type PaymentStatus = "PENDING" | "CONFIRMED" | "NOT_REQUIRED";

export interface MockOrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface MockOrder {
  id: string;
  orderNumber: string;
  qrToken?: string;
  createdAt: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  items: MockOrderItem[];
  total: number;
}

export const ORDER_STATUS_STEPS: OrderStatus[] = [
  "PLACED",
  "ACCEPTED",
  "PREPARING",
  "READY",
  "COLLECTED",
];
