"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";

const TIMELINE = [
  { year: "2021", title: "Founded in a repair shop", detail: "Started restoring 12 laptops a month by hand, grading condition on a paper checklist." },
  { year: "2022", title: "First AI inspection model", detail: "Automated the diagnostic pipeline, cutting inspection time from 3 hours to 40 minutes." },
  { year: "2023", title: "Crossed 50,000 units restored", detail: "Opened a second restoration facility to keep up with trade-in volume." },
  { year: "2024", title: "Business program launched", detail: "Started fleet imaging and bulk pricing for teams of 10 to 10,000 seats." },
  { year: "2026", title: "214,000 laptops and counting", detail: "Now inspecting on a 42-point model with condition scores accurate within 2 points of technician review." },
];

const VALUES = [
  { title: "Radical transparency", detail: "Every condition score, every inspection point, visible before you buy \u2014 not after." },
  { title: "Hardware deserves a second life", detail: "A restored laptop is one less device mined, shipped, and landfilled." },
  { title: "Support that answers", detail: "Real warranty coverage, handled by people who know the hardware." },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <section className="mx-auto max-w-[1000px] px-6 md:px-10 mb-24 text-center">
        <div className="text-[11px] uppercase tracking-wider text-amber-soft font-mono mb-3">Our story</div>
        <h1 className="font-display text-4xl md:text-6xl text-bone text-balance leading-[1.02] mb-6">
          We think restoration deserves the same rigor as manufacturing
        </h1>
        <p className="text-bone-dim text-lg leading-relaxed max-w-2xl mx-auto">
          PSComputers started with a simple frustration: refurbished listings that said
          &ldquo;good condition&rdquo; and meant almost anything. We built an AI inspection
          pipeline to replace that guesswork with a number you can trust.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 rounded-2xl border border-line bg-ink-raised/40 p-8 md:p-10">
          {[
            { value: `${(stats.laptopsRestored / 1000).toFixed(0)}K+`, label: "Laptops restored" },
            { value: `${(stats.co2SavedTons / 1000).toFixed(1)}K tons`, label: "CO\u2082 avoided" },
            { value: stats.customerRating.toFixed(1), label: "Avg. rating" },
            { value: `${stats.inspectionPoints}`, label: "Inspection points" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl text-bone mb-1">{s.value}</div>
              <div className="text-[11px] text-bone-faint font-mono uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-6 md:px-10 mb-24">
        <h2 className="font-display text-3xl text-bone mb-12 text-center">How we got here</h2>
        <div className="relative pl-8">
          <div className="absolute left-2.5 top-2 bottom-2 w-px bg-line" />
          <div className="space-y-10">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                <div className="absolute -left-8 top-1 h-3 w-3 rounded-full bg-teal border-2 border-ink" />
                <div className="text-[11px] font-mono text-teal-soft mb-1">{t.year}</div>
                <h3 className="font-display text-lg text-bone mb-1.5">{t.title}</h3>
                <p className="text-[13px] text-bone-faint leading-relaxed">{t.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10">
        <h2 className="font-display text-3xl text-bone mb-10 text-center">What we believe</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl border border-line bg-ink-raised/40 p-7">
              <h3 className="font-display text-lg text-bone mb-2">{v.title}</h3>
              <p className="text-[13px] text-bone-faint leading-relaxed">{v.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
