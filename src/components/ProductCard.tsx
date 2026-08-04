"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import type { Laptop } from "@/lib/data";
import { formatINR } from "@/lib/utils";
import LaptopVisual from "./LaptopVisual";
import ConditionRing from "./ConditionRing";

export default function ProductCard({ laptop, index = 0 }: { laptop: Laptop; index?: number }) {
  const discount = Math.round((1 - laptop.price / laptop.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: [0.4, 0, 0.2, 1] }}
      className="group relative rounded-2xl border border-line bg-ink-raised/60 hover:bg-ink-raised transition-colors overflow-hidden"
    >
      <Link href={`/products/${laptop.slug}`} className="block">
        <div className="relative aspect-[4/3] flex items-center justify-center p-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,var(--amber-12),transparent_60%)]" />
          {laptop.aiTag && (
            <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 rounded-full bg-ink/80 backdrop-blur border border-line-soft px-2.5 py-1 text-[10px] uppercase tracking-wide text-amber-soft font-mono">
              {laptop.aiTag}
            </span>
          )}
          <span className="absolute top-4 right-4 z-10 inline-flex items-center rounded-full bg-teal-12 border border-teal/20 px-2 py-1 text-[10px] font-mono text-teal-soft">
            Grade {laptop.grade}
          </span>
          {laptop.photos && laptop.photos.length > 0 ? (
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={laptop.photos[0]}
                alt={`${laptop.brand} ${laptop.model}`}
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>
          ) : (
            <motion.div
              className="w-full max-w-[220px]"
              whileHover={{ scale: 1.04, rotate: -1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <LaptopVisual colorway={laptop.colorway} tiltDeg={-6} />
            </motion.div>
          )}
        </div>

        <div className="p-5 pt-1 border-t border-line-soft">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-bone-faint font-mono">{laptop.brand}</div>
              <h3 className="font-display text-[15px] text-bone leading-snug">{laptop.model}</h3>
            </div>
            <ConditionRing score={laptop.conditionScore} size={40} />
          </div>
          <p className="text-[13px] text-bone-faint mb-4 line-clamp-1">{laptop.tagline}</p>

          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-xl text-bone">{formatINR(laptop.price)}</span>
                <span className="text-xs text-bone-faint line-through">{formatINR(laptop.originalPrice)}</span>
              </div>
              <div className="text-[11px] text-amber-soft font-mono">Save {discount}%</div>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-bone-faint group-hover:text-teal-soft transition-colors">
              <Scale className="h-3.5 w-3.5" /> Compare
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
