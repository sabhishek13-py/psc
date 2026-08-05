"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Truck, ScanLine, Wrench, PackageCheck, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const STEPS = [
  { icon: Truck, title: "Pickup scheduled", detail: "Free courier pickup within 48 hours of booking, tracked door to door.", eta: "Day 0\u20131" },
  { icon: ScanLine, title: "AI diagnosis", detail: "Automated diagnostics isolate the fault \u2014 hardware, software, or both \u2014 before a technician touches it.", eta: "Day 2" },
  { icon: Wrench, title: "Repair in lab", detail: "Certified technicians replace parts with grade-matched components and re-run the 42-point check.", eta: "Day 3\u20135" },
  { icon: PackageCheck, title: "Quality delivery", detail: "A final inspection report ships with your laptop, plus a 90-day repair warranty.", eta: "Day 6\u20137" },
];

const SERVICES = [
  { name: "Screen replacement", price: "from \u20b910,700", time: "2\u20133 days" },
  { name: "Battery replacement", price: "from \u20b97,400", time: "1\u20132 days" },
  { name: "Keyboard repair", price: "from \u20b98,200", time: "2\u20133 days" },
  { name: "Data recovery", price: "from \u20b912,400", time: "3\u20135 days" },
  { name: "Liquid damage treatment", price: "from \u20b914,900", time: "4\u20136 days" },
  { name: "Hinge & chassis repair", price: "from \u20b99,900", time: "3\u20134 days" },
];

export default function RepairPage() {
  const [before, setBefore] = useState(30);

  return (
    <div className="pt-32 pb-24">
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 mb-20">
        <div className="text-[11px] uppercase tracking-wider text-amber-soft font-mono mb-3">Repair &amp; Service</div>
        <h1 className="font-display text-4xl md:text-6xl text-bone text-balance leading-[1.02] mb-6 max-w-2xl">
          Already own a laptop? We&apos;ll bring it back to life too.
        </h1>
        <p className="text-bone-dim text-lg leading-relaxed max-w-lg mb-9">
          The same AI-driven diagnostic pipeline that grades our inventory is available for
          your own hardware &mdash; tracked end to end, with a 90-day warranty on every repair.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-bone text-ink px-6 py-3.5 text-sm font-medium hover:bg-amber-soft transition-colors">
          Book a service <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 mb-24">
        <h2 className="font-display text-3xl text-bone mb-12">From pickup to delivery</h2>
        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-line" />
          <div className="grid lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-ink mb-5">
                  <s.icon className="h-6 w-6 text-teal" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-bone-faint font-mono mb-2">
                  <Clock className="h-3 w-3" /> {s.eta}
                </div>
                <h3 className="font-display text-lg text-bone mb-2">{s.title}</h3>
                <p className="text-[13px] text-bone-faint leading-relaxed">{s.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 mb-24">
        <h2 className="font-display text-3xl text-bone mb-4">See the difference</h2>
        <p className="text-bone-faint text-sm mb-8 max-w-md">
          Drag to compare a real intake condition score against the post-repair score.
        </p>
        <div className="rounded-2xl border border-line bg-ink-raised/40 p-8 max-w-xl">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-bone-dim">Before</span>
            <span className="text-bone-dim">After</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={before}
            onChange={(e) => setBefore(Number(e.target.value))}
            className="w-full accent-teal mb-6"
          />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-4xl font-display text-bone-faint mb-1">{Math.round(58 - before * 0.1)}</div>
              <div className="text-[11px] text-bone-faint font-mono uppercase tracking-wide">Intake score</div>
            </div>
            <div>
              <div className="text-4xl font-display text-teal-soft mb-1">{Math.round(94 + before * 0.05)}</div>
              <div className="text-[11px] text-bone-faint font-mono uppercase tracking-wide">Post-repair score</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10">
        <h2 className="font-display text-3xl text-bone mb-10">Common repairs &amp; pricing</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line rounded-2xl overflow-hidden">
          {SERVICES.map((s) => (
            <div key={s.name} className="bg-ink p-6 flex flex-col justify-between">
              <h3 className="font-display text-base text-bone mb-4">{s.name}</h3>
              <div className="flex items-end justify-between">
                <span className="text-teal-soft font-mono text-sm">{s.price}</span>
                <span className="text-bone-faint text-[12px]">{s.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
