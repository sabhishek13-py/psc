"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ScanLine, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { formatINR } from "@/lib/utils";

const BRANDS = ["Apple", "Dell", "Lenovo", "HP", "Microsoft", "ASUS"];
const CONDITIONS = ["Like new", "Light wear", "Moderate wear", "Heavy wear"];

export default function TradeInPage() {
  const [brand, setBrand] = useState("Apple");
  const [year, setYear] = useState(2022);
  const [condition, setCondition] = useState("Light wear");
  const [stage, setStage] = useState<"form" | "scanning" | "offer">("form");
  const [dragOver, setDragOver] = useState(false);

  const estimate = useCallback(() => {
    const base: Record<string, number> = { Apple: 900, Dell: 550, Lenovo: 500, HP: 480, Microsoft: 520, ASUS: 460 };
    const conditionMult: Record<string, number> = {
      "Like new": 1,
      "Light wear": 0.85,
      "Moderate wear": 0.65,
      "Heavy wear": 0.4,
    };
    const ageDiscount = Math.max(0.4, 1 - (2026 - year) * 0.09);
    return Math.round(base[brand] * conditionMult[condition] * ageDiscount);
  }, [brand, year, condition]);

  const runScan = () => {
    setStage("scanning");
    setTimeout(() => setStage("offer"), 2200);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-[1000px] px-6 md:px-10">
        <div className="text-center mb-14">
          <div className="text-[11px] uppercase tracking-wider text-teal-soft font-mono mb-3">Trade-in</div>
          <h1 className="font-display text-4xl md:text-5xl text-bone text-balance mb-4">
            What&apos;s your old laptop actually worth?
          </h1>
          <p className="text-bone-dim max-w-lg mx-auto">
            Answer a few questions and our AI will generate an instant estimate based on
            current market demand.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {stage === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-line bg-ink-raised/40 p-8 md:p-12"
            >
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                }}
                className={`rounded-2xl border-2 border-dashed p-10 text-center mb-10 transition-colors ${
                  dragOver ? "border-teal/60 bg-teal-12" : "border-line-soft"
                }`}
              >
                <Upload className="h-6 w-6 text-bone-faint mx-auto mb-3" />
                <p className="text-sm text-bone-dim mb-1">Drag photos of your laptop here</p>
                <p className="text-[12px] text-bone-faint">Optional &mdash; helps refine your estimate. PNG or JPG.</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 mb-10">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-3 block">
                    Brand
                  </label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full rounded-xl border border-line bg-ink px-3.5 py-2.5 text-sm text-bone outline-none focus:border-teal/50"
                  >
                    {BRANDS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-3 block">
                    Purchase year
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full rounded-xl border border-line bg-ink px-3.5 py-2.5 text-sm text-bone outline-none focus:border-teal/50"
                  >
                    {[2024, 2023, 2022, 2021, 2020, 2019].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-3 block">
                    Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full rounded-xl border border-line bg-ink px-3.5 py-2.5 text-sm text-bone outline-none focus:border-teal/50"
                  >
                    {CONDITIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={runScan}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-bone text-ink px-6 py-3.5 text-sm font-medium hover:bg-amber-soft transition-colors"
              >
                Get my estimate <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {stage === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-line bg-ink-raised/40 p-16 flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="scanline" style={{ top: "20%" }} />
              <ScanLine className="h-8 w-8 text-teal mb-6 animate-pulse" />
              <h2 className="font-display text-xl text-bone mb-2">Running AI inspection model&hellip;</h2>
              <p className="text-sm text-bone-faint">Cross-referencing {brand} resale data and current demand.</p>
            </motion.div>
          )}

          {stage === "offer" && (
            <motion.div
              key="offer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-teal/30 bg-teal-12 p-10 md:p-14 text-center"
            >
              <CheckCircle2 className="h-8 w-8 text-teal mx-auto mb-5" />
              <div className="text-[11px] uppercase tracking-wider text-teal-soft font-mono mb-3">
                Estimated trade-in value
              </div>
              <div className="font-display text-6xl text-bone mb-6">{formatINR(estimate())}</div>
              <p className="text-sm text-bone-dim max-w-sm mx-auto mb-8">
                This estimate is valid for 14 days. Ship your laptop free and we&apos;ll confirm the
                final offer after a physical inspection &mdash; typically within 1% of this number.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setStage("form")}
                  className="rounded-full border border-line px-6 py-3 text-sm text-bone hover:border-teal/40 transition-colors"
                >
                  Adjust details
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-bone text-ink px-6 py-3 text-sm font-medium hover:bg-amber-soft transition-colors">
                  <Sparkles className="h-4 w-4" /> Lock in this offer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
