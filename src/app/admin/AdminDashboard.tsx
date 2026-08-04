"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, ShoppingCart, Clock, PackageCheck, LogOut, Package } from "lucide-react";
import type { Laptop } from "@/lib/data";
import type { Order, OrderStatus } from "@/lib/orders";
import { formatINR } from "@/lib/utils";
import { adminLogout } from "@/app/actions/admin-auth";

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  inTransitOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  avgOrderValue: number;
}

interface Props {
  stats: Stats;
  recentOrders: Order[];
  pendingOrders: Order[];
  revenueByWeek: number[];
  topProducts: Laptop[];
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  Delivered: "bg-teal-12 text-teal-soft",
  "In transit": "bg-amber-12 text-amber-soft",
  Processing: "bg-ink-raised-2 text-bone-dim",
  Pending: "bg-amber-24 text-amber-soft",
  Cancelled: "bg-ink-raised-2 text-bone-faint",
};

export default function AdminDashboard({ stats, recentOrders, pendingOrders, revenueByWeek, topProducts }: Props) {
  const maxWeekRevenue = Math.max(...revenueByWeek, 1);

  const kpis = [
    { label: "Total revenue", value: formatINR(stats.totalRevenue), icon: TrendingUp },
    { label: "Total orders", value: stats.totalOrders.toLocaleString(), icon: ShoppingCart },
    { label: "Pending orders", value: stats.pendingOrders.toLocaleString(), icon: Clock },
    { label: "Avg. order value", value: formatINR(Math.round(stats.avgOrderValue)), icon: PackageCheck },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-amber-soft font-mono mb-3">
              Admin dashboard
            </div>
            <h1 className="font-display text-4xl text-bone">Operations overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/inventory"
              className="inline-flex items-center gap-2 rounded-lg bg-teal text-ink font-medium px-4 py-2 text-sm hover:opacity-90 transition-opacity"
            >
              <Package className="h-4 w-4" />
              Manage inventory
            </Link>
            <form action={adminLogout}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-bone-dim hover:text-bone hover:border-teal transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-line bg-ink-raised/40 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <k.icon className="h-4 w-4 text-teal" />
              </div>
              <div className="font-display text-2xl text-bone mb-1">{k.value}</div>
              <div className="text-[11px] text-bone-faint font-mono uppercase tracking-wide">{k.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5 mb-10">
          <div className="rounded-2xl border border-line bg-ink-raised/40 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg text-bone">Revenue, last 12 weeks</h2>
              <span className="text-[11px] text-bone-faint font-mono">in ₹</span>
            </div>
            <div className="flex items-end gap-2 h-40">
              {revenueByWeek.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / maxWeekRevenue) * 100}%` }}
                  transition={{ delay: i * 0.03, duration: 0.5 }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-teal/40 to-teal-soft/60"
                  title={formatINR(v)}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-ink-raised/40 p-6">
            <h2 className="font-display text-lg text-bone mb-6">Top products</h2>
            <div className="space-y-4">
              {topProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[13px] text-bone truncate">{p.model}</div>
                    <div className="text-[11px] text-bone-faint">{p.reviewCount} reviews</div>
                  </div>
                  <div className="text-[13px] text-teal-soft font-mono shrink-0">{formatINR(p.price)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line overflow-hidden mb-10">
          <div className="p-6 border-b border-line flex items-center justify-between">
            <h2 className="font-display text-lg text-bone">Pending orders</h2>
            <span className="text-[11px] text-bone-faint font-mono">{pendingOrders.length} awaiting action</span>
          </div>
          {pendingOrders.length === 0 ? (
            <div className="p-6 text-sm text-bone-faint">No pending orders.</div>
          ) : (
            <OrdersTable orders={pendingOrders} />
          )}
        </div>

        <div className="rounded-2xl border border-line overflow-hidden">
          <div className="p-6 border-b border-line">
            <h2 className="font-display text-lg text-bone">Recent orders</h2>
          </div>
          <OrdersTable orders={recentOrders} />
        </div>
      </div>
    </div>
  );
}

function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-ink-raised/40">
        <tr>
          {["Order", "Product", "Customer", "Total", "Status"].map((h) => (
            <th key={h} className="text-left p-4 text-[11px] uppercase tracking-wider text-bone-faint font-mono">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orders.map((o, i) => (
          <tr key={o.id} className={i % 2 ? "bg-ink-raised/20" : ""}>
            <td className="p-4 text-bone-dim font-mono">{o.id}</td>
            <td className="p-4 text-bone-dim">{o.laptop.model}</td>
            <td className="p-4 text-bone-dim">{o.customer}</td>
            <td className="p-4 text-bone-dim font-mono">{formatINR(o.total)}</td>
            <td className="p-4">
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-mono ${STATUS_STYLES[o.status]}`}>
                {o.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
