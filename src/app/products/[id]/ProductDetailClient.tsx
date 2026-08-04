"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ShieldCheck,
  Truck,
  Star,
  Cpu,
  MemoryStick,
  HardDrive,
  MonitorSmartphone,
  BatteryFull,
  Weight,
  Plug,
} from "lucide-react";
import LaptopVisual from "@/components/LaptopVisual";
import ConditionRing from "@/components/ConditionRing";
import ProductCard from "@/components/ProductCard";
import { formatINR } from "@/lib/utils";
import type { Laptop } from "@/lib/data";

export default function ProductDetailClient({
  laptop,
  related,
}: {
  laptop: Laptop;
  related: Laptop[];
}) {
  const discount = Math.round((1 - laptop.price / laptop.originalPrice) * 100);
  const [activePhoto, setActivePhoto] = useState(0);
  const specs = [
    { icon: Cpu, label: "Processor", value: laptop.cpu },
    { icon: MemoryStick, label: "Memory", value: laptop.ram },
    { icon: HardDrive, label: "Storage", value: laptop.storage },
    { icon: MonitorSmartphone, label: "Display", value: laptop.display },
    { icon: BatteryFull, label: "Battery", value: laptop.battery },
    { icon: Weight, label: "Weight", value: laptop.weight },
    { icon: Plug, label: "Ports", value: laptop.ports.join(", ") },
  ];

  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 mb-8">
        <div className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-3">
          {laptop.brand} &middot; {laptop.category}
        </div>
        <div className="grid lg:grid-cols-2 gap-4 items-start">
          <h1 className="font-display text-4xl md:text-6xl text-bone text-balance leading-[1.02]">
            {laptop.model}
          </h1>
          <p className="text-bone-dim text-lg leading-relaxed lg:pt-3">{laptop.tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="relative rounded-3xl border border-line bg-ink-raised/40 flex flex-col items-center justify-center p-16 min-h-[420px]"
        >
          {laptop.photos && laptop.photos.length > 0 ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={laptop.photos[activePhoto]}
                alt={`${laptop.brand} ${laptop.model}`}
                className="w-full max-h-[340px] object-contain rounded-2xl relative"
              />
              {laptop.photos.length > 1 && (
                <div className="flex gap-2 mt-6 relative">
                  {laptop.photos.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setActivePhoto(i)}
                      className={`h-14 w-14 rounded-lg overflow-hidden border transition-colors ${
                        i === activePhoto ? "border-teal" : "border-line-soft opacity-70 hover:opacity-100"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,var(--amber-12),transparent_60%)] rounded-3xl" />
              <div className="w-full max-w-md relative">
                <LaptopVisual colorway={laptop.colorway} scanning floatAnim tiltDeg={-8} />
              </div>
            </>
          )}
          <span className="absolute top-6 left-6 inline-flex items-center rounded-full bg-ink/80 backdrop-blur border border-line-soft px-3 py-1.5 text-[11px] font-mono text-bone-dim">
            Grade {laptop.grade}
          </span>
        </motion.div>

        <div>
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(laptop.rating) ? "fill-amber text-amber" : "text-line"}`}
              />
            ))}
            <span className="text-sm text-bone-faint ml-2">
              {laptop.rating} &middot; {laptop.reviewCount} reviews
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-1">
            <span className="font-display text-4xl text-bone">{formatINR(laptop.price)}</span>
            <span className="text-base text-bone-faint line-through">{formatINR(laptop.originalPrice)}</span>
          </div>
          <div className="text-amber-soft text-sm font-mono mb-7">
            You save {formatINR(laptop.originalPrice - laptop.price)} ({discount}%)
          </div>

          <div className="rounded-2xl border border-line bg-ink-raised p-5 mb-7">
            <ConditionRing score={laptop.conditionScore} size={56} label="AI condition score" />
            <div className="fade-line my-4" />
            <div className="grid grid-cols-2 gap-y-2.5 text-[13px]">
              {laptop.inspectionChecks.slice(0, 6).map((c) => (
                <div key={c.label} className="flex items-center gap-2 text-bone-dim">
                  <Check className="h-3.5 w-3.5 text-teal shrink-0" />
                  <span className="truncate">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-7">
            <button className="flex-1 rounded-full bg-bone text-ink px-6 py-3.5 text-sm font-medium hover:bg-amber-soft transition-colors">
              Add to cart
            </button>
            <button className="rounded-full border border-line px-6 py-3.5 text-sm text-bone hover:border-teal/40 transition-colors">
              Add to compare
            </button>
          </div>

          <div className="flex items-center gap-6 text-[13px] text-bone-faint">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-teal" /> {laptop.warrantyMonths}-mo warranty
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-teal" /> Ships in 2&ndash;4 days
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 mb-24">
        <h2 className="font-display text-2xl md:text-3xl text-bone mb-8">Specifications</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line rounded-2xl overflow-hidden">
          {specs.map((s) => (
            <div key={s.label} className="bg-ink p-6">
              <s.icon className="h-4 w-4 text-bone-faint mb-3" />
              <div className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-1.5">
                {s.label}
              </div>
              <div className="text-sm text-bone">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benchmarks */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 mb-24">
        <h2 className="font-display text-2xl md:text-3xl text-bone mb-8">Performance</h2>
        <div className="space-y-6 max-w-2xl">
          {laptop.benchmarks.map((b) => (
            <div key={b.label}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-bone-dim">{b.label}</span>
                <span className="font-mono text-bone-faint">
                  {b.value}/{b.max} {b.unit}
                </span>
              </div>
              <div className="h-2 rounded-full bg-ink-raised-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(b.value / b.max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-teal to-amber-soft"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights + Included */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 mb-24 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl text-bone mb-6">Highlights</h2>
          <ul className="space-y-3">
            {laptop.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-bone-dim text-sm">
                <Check className="h-4 w-4 text-amber shrink-0 mt-0.5" /> {h}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl text-bone mb-6">What&rsquo;s included</h2>
          <ul className="space-y-3">
            {laptop.included.map((h) => (
              <li key={h} className="flex gap-3 text-bone-dim text-sm">
                <Check className="h-4 w-4 text-teal shrink-0 mt-0.5" /> {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <ReviewsSection laptop={laptop} />

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1400px] px-6 md:px-10">
          <h2 className="font-display text-2xl md:text-3xl text-bone mb-8">You might also like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((l, i) => (
              <ProductCard key={l.id} laptop={l} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ReviewsSection({ laptop }: { laptop: Laptop }) {
  const mock = [
    { name: "J. Alvarez", rating: 5, text: "Exactly as described. Condition score matched what arrived down to the scuff-free hinge." },
    { name: "S. Whitfield", rating: 5, text: "Battery health reads 93% six months in, no complaints running Xcode all day." },
    { name: "R. Nakamura", rating: 4, text: "Great machine, took a day longer to ship than estimated but support was responsive." },
  ];
  const [visible, setVisible] = useState(3);
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 mb-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-2xl md:text-3xl text-bone">
          Reviews &middot; {laptop.reviewCount}
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mock.slice(0, visible).map((r) => (
          <div key={r.name} className="rounded-2xl border border-line bg-ink-raised/40 p-6">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-amber text-amber" : "text-line"}`} />
              ))}
            </div>
            <p className="text-[13px] text-bone-dim leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
            <div className="text-sm text-bone">{r.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
