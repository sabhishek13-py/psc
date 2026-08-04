"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Heart, Wrench, Receipt, Bell, Eye } from "lucide-react";
import LaptopVisual from "@/components/LaptopVisual";
import ConditionRing from "@/components/ConditionRing";
import { laptops } from "@/lib/data";
import { formatINR } from "@/lib/utils";
import type { CustomerProfile } from "@/lib/customer-token";

const TABS = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "repairs", label: "Repairs", icon: Wrench },
  { id: "invoices", label: "Invoices", icon: Receipt },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "recent", label: "Recently viewed", icon: Eye },
];

const ORDERS = [
  { laptop: laptops[0], status: "Delivered", date: "Jul 14, 2026", id: "PSC-88213" },
  { laptop: laptops[10], status: "In transit", date: "Aug 1, 2026", id: "PSC-88467" },
];

const REPAIRS = [
  { device: "MacBook Air 13″ M1", issue: "Battery replacement", status: "In lab", eta: "Aug 6, 2026" },
];

const NOTIFICATIONS = [
  { text: "Your order PSC-88467 has shipped.", time: "2h ago" },
  { text: "Price dropped ₹6,640 on a wishlist item.", time: "1d ago" },
  { text: "Repair PSC-RP-2291 moved to “In lab”.", time: "2d ago" },
];

export default function DashboardClient({ user }: { user: CustomerProfile }) {
  const [tab, setTab] = useState("orders");
  const firstName = user.name.split(" ")[0];

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 flex items-center gap-4">
          {user.picture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.picture} alt="" className="h-12 w-12 rounded-full" referrerPolicy="no-referrer" />
          ) : (
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-12 text-teal text-lg font-medium">
              {firstName.charAt(0).toUpperCase()}
            </span>
          )}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-teal-soft font-mono mb-1">
              Customer dashboard
            </div>
            <h1 className="font-display text-4xl text-bone">Welcome back, {firstName}</h1>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10 border-b border-line-soft pb-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] transition-colors ${
                tab === t.id ? "bg-bone text-ink" : "text-bone-dim hover:text-bone bg-ink-raised/40"
              }`}
            >
              <t.icon className="h-3.5 w-3.5" /> {t.label}
            </button>
          ))}
        </div>

        {tab === "orders" && (
          <div className="space-y-4">
            {ORDERS.map((o) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl border border-line bg-ink-raised/40 p-5"
              >
                <div className="w-16 shrink-0">
                  <LaptopVisual colorway={o.laptop.colorway} tiltDeg={-4} />
                </div>
                <div className="flex-1">
                  <div className="text-bone text-sm">{o.laptop.model}</div>
                  <div className="text-bone-faint text-[12px] font-mono">{o.id} &middot; {o.date}</div>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-mono w-fit ${
                    o.status === "Delivered" ? "bg-teal-12 text-teal-soft" : "bg-amber-12 text-amber-soft"
                  }`}
                >
                  {o.status}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "wishlist" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {laptops.slice(3, 7).map((l) => (
              <div key={l.id} className="rounded-2xl border border-line bg-ink-raised/40 p-5 flex items-center gap-4">
                <div className="w-14 shrink-0">
                  <LaptopVisual colorway={l.colorway} tiltDeg={-4} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-bone truncate">{l.model}</div>
                  <div className="text-[12px] text-teal-soft font-mono">{formatINR(l.price)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "repairs" && (
          <div className="space-y-4">
            {REPAIRS.map((r) => (
              <div key={r.device} className="rounded-2xl border border-line bg-ink-raised/40 p-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-bone">{r.device}</div>
                  <div className="text-[12px] text-bone-faint">{r.issue}</div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center rounded-full bg-amber-12 text-amber-soft px-3 py-1.5 text-[11px] font-mono">
                    {r.status}
                  </span>
                  <div className="text-[11px] text-bone-faint mt-1.5">ETA {r.eta}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "invoices" && (
          <div className="rounded-2xl border border-line overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-ink-raised/40 border-b border-line">
                <tr>
                  {["Invoice", "Date", "Amount", "Status"].map((h) => (
                    <th key={h} className="text-left p-4 text-[11px] uppercase tracking-wider text-bone-faint font-mono">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o, i) => (
                  <tr key={o.id} className={i % 2 ? "bg-ink-raised/20" : ""}>
                    <td className="p-4 text-bone-dim font-mono">{o.id}</td>
                    <td className="p-4 text-bone-dim">{o.date}</td>
                    <td className="p-4 text-bone-dim">{formatINR(o.laptop.price)}</td>
                    <td className="p-4 text-teal-soft">Paid</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "notifications" && (
          <div className="space-y-3 max-w-lg">
            {NOTIFICATIONS.map((n, i) => (
              <div key={i} className="flex justify-between gap-4 rounded-xl border border-line-soft bg-ink-raised/30 px-4 py-3 text-sm">
                <span className="text-bone-dim">{n.text}</span>
                <span className="text-bone-faint text-[12px] shrink-0">{n.time}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "recent" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {laptops.slice(7, 11).map((l) => (
              <div key={l.id} className="rounded-2xl border border-line bg-ink-raised/40 p-5">
                <div className="w-full max-w-[100px] mx-auto mb-3">
                  <LaptopVisual colorway={l.colorway} tiltDeg={-4} />
                </div>
                <div className="text-center">
                  <div className="text-[13px] text-bone truncate">{l.model}</div>
                  <ConditionRing score={l.conditionScore} size={32} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
