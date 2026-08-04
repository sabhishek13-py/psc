"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Sparkles, Trophy } from "lucide-react";
import LaptopVisual from "@/components/LaptopVisual";
import ConditionRing from "@/components/ConditionRing";
import { useLaptops } from "@/lib/useLaptops";
import { formatINR, cn } from "@/lib/utils";
import type { Laptop } from "@/lib/data";

const ROWS: { label: string; key: keyof Laptop }[] = [
  { label: "Price", key: "price" },
  { label: "Processor", key: "cpu" },
  { label: "Memory", key: "ram" },
  { label: "Storage", key: "storage" },
  { label: "Graphics", key: "gpu" },
  { label: "Display", key: "display" },
  { label: "Battery", key: "battery" },
  { label: "Weight", key: "weight" },
  { label: "Warranty", key: "warrantyMonths" },
];

export default function ComparePage() {
  const laptops = useLaptops();
  const [slots, setSlots] = useState<(Laptop | null)[]>([laptops[0], laptops[5], null]);
  const [pickerIndex, setPickerIndex] = useState<number | null>(null);

  const active = slots.filter(Boolean) as Laptop[];
  const winner =
    active.length > 1
      ? active.reduce((best, l) =>
          l.conditionScore / l.price > best.conditionScore / best.price ? l : best
        )
      : null;

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12">
          <div className="text-[11px] uppercase tracking-wider text-teal-soft font-mono mb-3">
            Compare
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-bone text-balance">
            Put two or three machines side by side
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {slots.map((laptop, i) => (
            <div key={i} className="rounded-2xl border border-line bg-ink-raised/40 min-h-[280px] flex flex-col">
              {laptop ? (
                <div className="p-6 flex flex-col h-full">
                  <button
                    onClick={() => setSlots((s) => s.map((x, idx) => (idx === i ? null : x)))}
                    className="self-end text-bone-faint hover:text-bone transition-colors mb-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="w-full max-w-[160px] mx-auto mb-4">
                    <LaptopVisual colorway={laptop.colorway} tiltDeg={-5} />
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] text-bone-faint font-mono">{laptop.brand}</div>
                    <div className="font-display text-base text-bone mb-2">{laptop.model}</div>
                    <div className="flex justify-center mb-2">
                      <ConditionRing score={laptop.conditionScore} size={44} />
                    </div>
                    <div className="font-display text-xl text-bone">{formatINR(laptop.price)}</div>
                    {winner?.id === laptop.id && (
                      <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-teal-12 border border-teal/25 px-2.5 py-1 text-[11px] text-teal-soft">
                        <Trophy className="h-3 w-3" /> Best value here
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setPickerIndex(i)}
                  className="flex-1 flex flex-col items-center justify-center gap-2 text-bone-faint hover:text-bone transition-colors"
                >
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Add a laptop</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {active.length > 1 && (
          <div className="overflow-x-auto rounded-2xl border border-line mb-16">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-line bg-ink-raised/40">
                  <th className="text-left font-mono text-[11px] uppercase tracking-wider text-bone-faint p-4">
                    Spec
                  </th>
                  {active.map((l) => (
                    <th key={l.id} className="text-left p-4 text-bone font-display font-normal">
                      {l.model}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, ri) => (
                  <tr key={row.label} className={cn(ri % 2 === 0 ? "bg-transparent" : "bg-ink-raised/20")}>
                    <td className="p-4 text-bone-faint font-mono text-[12px]">{row.label}</td>
                    {active.map((l) => (
                      <td key={l.id} className="p-4 text-bone-dim">
                        {row.key === "price" ? formatINR(l.price) : String(l[row.key])}
                        {row.key === "warrantyMonths" ? " mo" : ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {winner && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-teal/25 bg-teal-12 p-6 flex items-start gap-4"
          >
            <Sparkles className="h-5 w-5 text-teal shrink-0 mt-0.5" />
            <div>
              <div className="text-sm text-bone mb-1 font-medium">AI recommendation</div>
              <p className="text-[13px] text-bone-dim leading-relaxed">
                Based on condition score relative to price, the{" "}
                <span className="text-teal-soft">{winner.model}</span> gives you the strongest
                value in this comparison &mdash; {winner.conditionScore}/100 condition at{" "}
                {formatINR(winner.price)}.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {pickerIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={() => setPickerIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[70vh] overflow-y-auto rounded-2xl border border-line bg-ink-raised p-4"
            >
              <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-sm text-bone">Choose a laptop</span>
                <button onClick={() => setPickerIndex(null)}>
                  <X className="h-4 w-4 text-bone-faint" />
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {laptops.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setSlots((s) => s.map((x, idx) => (idx === pickerIndex ? l : x)));
                      setPickerIndex(null);
                    }}
                    className="flex items-center gap-3 rounded-xl border border-line-soft bg-ink p-3 text-left hover:border-teal/40 transition-colors"
                  >
                    <div className="w-10 shrink-0">
                      <LaptopVisual colorway={l.colorway} tiltDeg={-4} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-bone truncate">{l.model}</div>
                      <div className="text-[11px] text-bone-faint font-mono">{formatINR(l.price)}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
