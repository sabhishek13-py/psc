import { laptops, testimonials } from "@/lib/data";

export type OrderStatus = "Pending" | "Processing" | "In transit" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  laptop: (typeof laptops)[number];
  customer: string;
  status: OrderStatus;
  total: number;
  placedAt: string; // ISO date
}

const STATUS_CYCLE: OrderStatus[] = [
  "Pending",
  "Pending",
  "Processing",
  "In transit",
  "Delivered",
  "Delivered",
  "Delivered",
  "Cancelled",
];

// Deterministic mock order book, generated from the product catalog so the
// dashboard has something realistic to summarize without a real backend.
export const orders: Order[] = Array.from({ length: 48 }, (_, i) => {
  const laptop = laptops[i % laptops.length];
  const status = STATUS_CYCLE[i % STATUS_CYCLE.length];
  const daysAgo = i * 2 + (i % 5);
  const placedAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();

  return {
    id: `PSC-${8000 + i * 37}`,
    laptop,
    customer: testimonials[i % testimonials.length].name,
    status,
    total: laptop.price,
    placedAt,
  };
});

export function getOrderStats() {
  const revenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const pending = orders.filter((o) => o.status === "Pending");
  const processing = orders.filter((o) => o.status === "Processing");
  const inTransit = orders.filter((o) => o.status === "In transit");
  const delivered = orders.filter((o) => o.status === "Delivered");
  const cancelled = orders.filter((o) => o.status === "Cancelled");

  return {
    totalRevenue: revenue,
    totalOrders: orders.length,
    pendingOrders: pending.length,
    processingOrders: processing.length,
    inTransitOrders: inTransit.length,
    deliveredOrders: delivered.length,
    cancelledOrders: cancelled.length,
    avgOrderValue: revenue / Math.max(orders.length - cancelled.length, 1),
  };
}

export function getRecentOrders(limit = 8) {
  return [...orders]
    .sort((a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime())
    .slice(0, limit);
}

export function getPendingOrders() {
  return orders
    .filter((o) => o.status === "Pending")
    .sort((a, b) => new Date(a.placedAt).getTime() - new Date(b.placedAt).getTime());
}

export function getRevenueByWeek(weeks = 12) {
  const buckets = Array.from({ length: weeks }, () => 0);
  const now = Date.now();

  for (const order of orders) {
    if (order.status === "Cancelled") continue;
    const ageMs = now - new Date(order.placedAt).getTime();
    const weekIndex = weeks - 1 - Math.floor(ageMs / (7 * 24 * 60 * 60 * 1000));
    if (weekIndex >= 0 && weekIndex < weeks) {
      buckets[weekIndex] += order.total;
    }
  }

  return buckets;
}
