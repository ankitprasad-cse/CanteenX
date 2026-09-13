"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { OrderStatus } from "../../src/types/order";

interface DemoStaffOrder {
  id: string;
  orderNumber: string;
  token?: string;
  customerName?: string;
  itemsSummary: string;
  total: number;
  status: OrderStatus;
  time: string;
}

const INITIAL_ORDERS: DemoStaffOrder[] = [
  {
    id: "ord_1",
    orderNumber: "CC-4297",
    token: "0d8a",
    customerName: "Aarav Sharma",
    itemsSummary: "Paneer Roll × 1",
    total: 60,
    status: "PLACED",
    time: "Just now",
  },
  {
    id: "ord_2",
    orderNumber: "CC-7880",
    token: "eb8b",
    customerName: "Ananya Patel",
    itemsSummary: "Veg Sandwich × 1, Masala Dosa × 1",
    total: 125,
    status: "PREPARING",
    time: "5 mins ago",
  },
  {
    id: "ord_3",
    orderNumber: "CC-1081",
    token: "f79c",
    customerName: "Rohan Verma",
    itemsSummary: "Masala Dosa × 1",
    total: 70,
    status: "READY",
    time: "12 mins ago",
  },
];

export default function StaffDashboardClient() {
  const [orders, setOrders] = useState<DemoStaffOrder[]>(INITIAL_ORDERS);
  const [activeFilter, setActiveFilter] = useState<"ALL" | OrderStatus>("ALL");

  const handleStatusChange = (orderId: string, nextStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  const filteredOrders =
    activeFilter === "ALL"
      ? orders
      : orders.filter((o) => o.status === activeFilter);

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case "PLACED":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "PREPARING":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "READY":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "COLLECTED":
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-surface-subtle p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-surface border border-border rounded-card p-6 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Counter Live
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-content-primary">
              Staff Portal
            </h1>
            <p className="text-sm text-content-secondary mt-0.5">
              Live counter order queuing and student QR verification
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/staff/verify?demo=payment-success"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-control transition-colors shadow-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7V5a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2m4-8h6m-3-3v6"
                />
              </svg>
              Scan Student QR
            </Link>
            <Link
              href="/"
              className="px-4 py-2.5 bg-surface-subtle hover:bg-surface border border-border text-content-primary font-medium text-sm rounded-control transition-colors"
            >
              Home
            </Link>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-surface border border-border rounded-card p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-content-muted">
              Total Active
            </p>
            <p className="text-2xl sm:text-3xl font-black text-content-primary mt-1">
              {orders.filter((o) => o.status !== "COLLECTED").length}
            </p>
          </div>
          <div className="bg-surface border border-border rounded-card p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Placed
            </p>
            <p className="text-2xl sm:text-3xl font-black text-content-primary mt-1">
              {orders.filter((o) => o.status === "PLACED").length}
            </p>
          </div>
          <div className="bg-surface border border-border rounded-card p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Preparing
            </p>
            <p className="text-2xl sm:text-3xl font-black text-content-primary mt-1">
              {orders.filter((o) => o.status === "PREPARING").length}
            </p>
          </div>
          <div className="bg-surface border border-border rounded-card p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Ready for Pickup
            </p>
            <p className="text-2xl sm:text-3xl font-black text-content-primary mt-1">
              {orders.filter((o) => o.status === "READY").length}
            </p>
          </div>
        </div>

        {/* Orders Queue Section */}
        <section className="bg-surface border border-border rounded-card shadow-sm overflow-hidden">
          {/* Section Controls */}
          <div className="p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-content-primary">
                Live Order Queue
              </h2>
              <p className="text-xs text-content-muted">
                Update item preparation statuses as the counter progresses
              </p>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {(["ALL", "PLACED", "PREPARING", "READY", "COLLECTED"] as const).map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-control text-xs font-medium transition-colors whitespace-nowrap ${
                      activeFilter === filter
                        ? "bg-primary text-white"
                        : "bg-surface-subtle hover:bg-surface border border-border text-content-secondary"
                    }`}
                  >
                    {filter === "ALL" ? "All Orders" : filter}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Orders Table / Cards */}
          <div className="divide-y divide-border">
            {filteredOrders.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm font-medium text-content-primary">
                  No orders in this queue
                </p>
                <p className="text-xs text-content-muted mt-1">
                  Orders will appear here as students checkout
                </p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-subtle/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-content-primary">
                        Order #{order.orderNumber}
                      </span>
                      {order.token && (
                        <span className="text-xs px-2 py-0.5 rounded-md bg-surface-subtle border border-border text-content-secondary font-mono">
                          Token: {order.token}
                        </span>
                      )}
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      <span className="text-xs text-content-muted">
                        • {order.time}
                      </span>
                    </div>

                    <p className="text-sm text-content-secondary">
                      {order.itemsSummary}
                    </p>

                    {order.customerName && (
                      <p className="text-xs text-content-muted">
                        Student: {order.customerName}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
                    <span className="text-base font-bold text-content-primary sm:mr-2">
                      ₹{order.total.toFixed(2)}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {order.status === "PLACED" && (
                        <button
                          onClick={() => handleStatusChange(order.id, "PREPARING")}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-control transition-colors"
                        >
                          Start Preparing
                        </button>
                      )}
                      {order.status === "PREPARING" && (
                        <button
                          onClick={() => handleStatusChange(order.id, "READY")}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-control transition-colors"
                        >
                          Mark Ready
                        </button>
                      )}
                      {order.status === "READY" && (
                        <button
                          onClick={() => handleStatusChange(order.id, "COLLECTED")}
                          className="px-3 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-medium rounded-control transition-colors"
                        >
                          Complete Pickup
                        </button>
                      )}
                      {order.status === "COLLECTED" && (
                        <span className="text-xs text-content-muted font-medium">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}