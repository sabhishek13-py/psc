"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  Leaf,
  Wallet,
  Sparkles,
  ScanLine,
  Truck,
  Wrench,
  PackageCheck,
  Star,
  Building2,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import LaptopVisual from "@/components/LaptopVisual";
import ConditionRing from "@/components/ConditionRing";
import ProductCard from "@/components/ProductCard";
import { testimonials, stats } from "@/lib/data";
import type { Laptop } from "@/lib/data";
import { useLaptops } from "@/lib/useLaptops";
import { formatINR } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

export default function Home() {
  const laptops = useLaptops();
  const featured = laptops.filter((l) => l.aiTag).slice(0, 6);
  const heroLaptop = laptops.find((l) => l.slug === "macbook-pro-14-m3") ?? laptops[0];

  return (
    <div>
      <Hero heroLaptop={heroLaptop} />
      <TrustStrip />
      <Featured featured={featured} />
      <AIRecommend laptops={laptops} />
      <HowItWorks />
      <WhyRefurbished />
      <BusinessTeaser />
      <RepairTeaser />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </div>
  );
}

function Hero({ heroLaptop }: { heroLaptop: Laptop }) {
  const [query, setQuery] = useState("");
  return (
    <section className="relative overflow-hidden pt-40 pb-28 md:pt-48 md:pb-36">
      <div className="pointer-events-none absolute inset-0 gradient-drift bg-[radial-gradient(60%_50%_at_20%_10%,var(--amber-12),transparent),radial-gradient(50%_40%_at_85%_20%,var(--teal-12),transparent)]" />
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 relative">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 rounded-full border border-line-soft bg-ink-raised/60 backdrop-blur px-3.5 py-1.5 mb-8"
            >
              <ScanLine className="h-3.5 w-3.5 text-teal" />
              <span className="text-[12px] text-bone-dim font-mono">
                42-point AI inspection on every unit
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="font-display text-balance text-[13vw] leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.4rem] text-bone"
            >
              Restored to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-soft to-teal-soft">
                first-day form.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-7 max-w-lg text-base md:text-lg text-bone-dim leading-relaxed"
            >
              PSComputers finds, verifies, and restores premium laptops with an AI-driven
              inspection pipeline &mdash; then hands you the full report. Same performance,
              a fraction of the price.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-9 flex flex-col sm:flex-row gap-3"
            >
              <div className="flex items-center gap-2.5 rounded-full border border-line bg-ink-raised px-4 py-3 flex-1 max-w-md focus-within:border-teal/50 transition-colors">
                <Search className="h-4 w-4 text-bone-faint shrink-0" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask AI: “best laptop for video editing under ₹1,25,000”"
                  className="bg-transparent outline-none text-sm text-bone placeholder:text-bone-faint w-full"
                />
              </div>
              <Link
                href={`/ai${query ? `?q=${encodeURIComponent(query)}` : ""}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-bone text-ink px-5 py-3 text-sm font-medium hover:bg-amber-soft transition-colors whitespace-nowrap"
              >
                Ask AI <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-12 grid grid-cols-3 gap-6 max-w-md"
            >
              {[
                { value: `${(stats.laptopsRestored / 1000).toFixed(0)}K+`, label: "Restored" },
                { value: `${stats.avgSavingsPercent}%`, label: "Avg. savings" },
                { value: stats.customerRating.toFixed(1), label: "Customer rating" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl text-bone">{s.value}</div>
                  <div className="text-[11px] text-bone-faint font-mono mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md">
              <LaptopVisual colorway={heroLaptop.colorway} floatAnim scanning tiltDeg={-10} />
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="absolute -right-2 top-4 rounded-xl border border-line-soft bg-ink-raised/90 backdrop-blur px-3.5 py-3 shadow-2xl"
              >
                <ConditionRing score={heroLaptop.conditionScore} label="Condition score" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="absolute -left-4 bottom-10 rounded-xl border border-line-soft bg-ink-raised/90 backdrop-blur px-3.5 py-2.5 shadow-2xl"
              >
                <div className="text-[10px] text-bone-faint font-mono uppercase tracking-wide">
                  {heroLaptop.brand} {heroLaptop.model}
                </div>
                <div className="text-sm text-bone font-display">{formatINR(heroLaptop.price)}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: ShieldCheck, label: `${stats.warrantyDefaultMonths}-month warranty` },
    { icon: ScanLine, label: `${stats.inspectionPoints}-point inspection` },
    { icon: Leaf, label: `${(stats.co2SavedTons / 1000).toFixed(1)}K tons CO\u2082 saved` },
    { icon: Wallet, label: `${stats.avgSavingsPercent}% avg. savings` },
  ];
  return (
    <section className="border-y border-line-soft bg-ink-raised/30">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2 text-bone-dim text-[13px]">
            <it.icon className="h-4 w-4 text-teal" />
            {it.label}
          </div>
        ))}
      </div>
    </section>
  );
}

function Featured({ featured }: { featured: Laptop[] }) {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-amber-soft font-mono mb-3">
              Featured
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-bone text-balance max-w-lg">
              Six machines our AI keeps recommending
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-bone-dim hover:text-bone transition-colors whitespace-nowrap"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((l, i) => (
            <ProductCard key={l.id} laptop={l} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AIRecommend({ laptops }: { laptops: Laptop[] }) {
  const steps = [
    { label: "You describe the need", detail: "\u201cSomething light for a 6-hour bootcamp day, under \u20b958,000.\u201d" },
    { label: "AI cross-references inventory", detail: "Matches battery life, weight, and CPU class against 30 live listings." },
    { label: "You get ranked picks", detail: "With plain-language reasoning, not just a spec dump." },
  ];
  return (
    <section className="py-24 md:py-32 bg-ink-raised/20 border-y border-line-soft">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-teal-soft font-mono mb-3">
            AI Recommendation
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-bone text-balance mb-6">
            It reasons about trade-offs, not just filters
          </h2>
          <p className="text-bone-dim leading-relaxed max-w-md mb-10">
            Our assistant reads your actual constraints &mdash; workload, budget, portability
            &mdash; and explains why one machine beats another for your case, the way a
            knowledgeable friend would.
          </p>
          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-teal/30 text-teal text-[11px] font-mono">
                  {i + 1}
                </div>
                <div>
                  <div className="text-bone text-sm font-medium mb-1">{s.label}</div>
                  <div className="text-bone-faint text-[13px] leading-relaxed">{s.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <Link
            href="/ai"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-line bg-ink-raised px-5 py-3 text-sm text-bone hover:border-teal/40 transition-colors"
          >
            Try the AI Assistant <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-line bg-ink-raised p-6"
        >
          <div className="flex items-center gap-2 mb-5 text-bone-faint text-xs font-mono">
            <Sparkles className="h-3.5 w-3.5 text-amber" /> PSComputers AI
          </div>
          <div className="rounded-xl bg-ink-raised-2 border border-line-soft p-4 mb-4 text-[13px] text-bone-dim">
            best laptop for video editing under ₹1,25,000
          </div>
          <div className="space-y-3">
            {laptops
              .filter((l) => l.aiTag === "Best for Video Editing" || l.aiTag === "Best for Creators")
              .slice(0, 2)
              .map((l) => (
                <div
                  key={l.id}
                  className="flex items-center gap-3 rounded-xl border border-line-soft bg-ink p-3"
                >
                  <div className="w-14 shrink-0">
                    <LaptopVisual colorway={l.colorway} tiltDeg={-4} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-bone truncate">{l.model}</div>
                    <div className="text-[11px] text-bone-faint truncate">{l.highlights[0]}</div>
                  </div>
                  <div className="text-sm text-teal-soft font-mono shrink-0">{formatINR(l.price)}</div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: ScanLine, title: "AI inspection", detail: "Every unit runs a 42-point diagnostic covering battery, display, thermals, and ports." },
    { icon: Wrench, title: "Professional restoration", detail: "Technicians replace worn components and re-certify performance benchmarks." },
    { icon: PackageCheck, title: "Verified & graded", detail: "A condition score and full report ship with the machine \u2014 no surprises." },
    { icon: Truck, title: "Delivered & backed", detail: "Fast shipping plus a minimum 6-month warranty on every order." },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="text-[11px] uppercase tracking-wider text-amber-soft font-mono mb-3">
          How it works
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-bone text-balance max-w-lg mb-14">
          From trade-in to your desk, every step is measured
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-ink p-7"
            >
              <div className="text-[11px] font-mono text-bone-faint mb-6">0{i + 1}</div>
              <s.icon className="h-5 w-5 text-teal mb-4" />
              <h3 className="font-display text-lg text-bone mb-2">{s.title}</h3>
              <p className="text-[13px] text-bone-faint leading-relaxed">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyRefurbished() {
  const points = [
    { icon: Wallet, title: "40&ndash;60% less", detail: "Than equivalent new hardware, every time." },
    { icon: Leaf, title: "One fewer laptop", detail: "Manufactured, mined, and eventually landfilled." },
    { icon: ShieldCheck, title: "Real warranty", detail: "Not a vague \u201cas-is\u201d listing from a marketplace stranger." },
    { icon: ScanLine, title: "Full transparency", detail: "You see the exact inspection report before you buy." },
  ];
  return (
    <section className="py-24 md:py-32 bg-ink-raised/20 border-y border-line-soft">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-teal-soft font-mono mb-3">
              Why refurbished
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-bone text-balance">
              The upgrade nobody warns you about
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <p.icon className="h-5 w-5 text-amber mb-3" />
                <h3
                  className="font-display text-xl text-bone mb-1.5"
                  dangerouslySetInnerHTML={{ __html: p.title }}
                />
                <p className="text-[13px] text-bone-faint leading-relaxed">{p.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BusinessTeaser() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-line bg-ink-raised p-10 md:p-16"
        >
          <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_100%_0%,var(--amber-12),transparent)]" />
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <Building2 className="h-6 w-6 text-amber mb-5" />
              <h2 className="font-display text-3xl md:text-4xl text-bone text-balance mb-4 max-w-lg">
                Outfit a whole team without a whole new budget
              </h2>
              <p className="text-bone-dim max-w-md leading-relaxed">
                Bulk pricing, GST billing, dedicated account support, and fleet-ready imaging
                &mdash; for teams from 10 to 10,000 seats.
              </p>
            </div>
            <Link
              href="/business"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-bone text-ink px-6 py-3.5 text-sm font-medium hover:bg-amber-soft transition-colors whitespace-nowrap"
            >
              Explore business plans <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RepairTeaser() {
  const steps = ["Pickup scheduled", "AI diagnosis", "Repair in lab", "Quality delivery"];
  return (
    <section className="py-24 md:py-32 bg-ink-raised/20 border-y border-line-soft">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-amber-soft font-mono mb-3">
            Repair services
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-bone text-balance mb-6">
            Already own a laptop? We&apos;ll fix that too.
          </h2>
          <p className="text-bone-dim leading-relaxed max-w-md mb-8">
            Screen swaps, battery replacement, keyboard repair, and data recovery &mdash;
            tracked from pickup to delivery.
          </p>
          <Link
            href="/repair"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-ink px-5 py-3 text-sm text-bone hover:border-teal/40 transition-colors"
          >
            See repair process <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-4 bottom-4 w-px bg-line" />
          <div className="space-y-8">
            {steps.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-center gap-5 pl-1"
              >
                <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-ink border border-teal/40 text-teal text-[11px] font-mono shrink-0">
                  {i + 1}
                </div>
                <div className="rounded-xl border border-line-soft bg-ink-raised px-4 py-3 text-sm text-bone-dim flex-1">
                  {s}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const shown = testimonials.slice(0, 9);
  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 mb-12">
        <div className="text-[11px] uppercase tracking-wider text-teal-soft font-mono mb-3">
          Testimonials
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-bone text-balance max-w-lg">
          214,000 laptops restored. A few of the people who bought them.
        </h2>
      </div>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shown.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
            className="rounded-2xl border border-line bg-ink-raised/50 p-6"
          >
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`h-3.5 w-3.5 ${idx < t.rating ? "fill-amber text-amber" : "text-line"}`}
                />
              ))}
            </div>
            <p className="text-[14px] text-bone-dim leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
            <div className="text-sm text-bone">{t.name}</div>
            <div className="text-[12px] text-bone-faint">{t.role}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How do you grade condition?", a: "Every laptop runs a 42-point AI-assisted diagnostic covering display, battery health, keyboard, ports, hinge stress, and thermal performance. The resulting score and full report ship with your order." },
    { q: "What warranty is included?", a: "Every unit includes a minimum 6-month warranty, with 12-month coverage standard on Grade A and A+ machines. Extended plans are available at checkout." },
    { q: "Can I return a laptop?", a: "Yes \u2014 a 30-day return window applies to every order, no restocking fee, as long as the unit matches the condition it shipped in." },
    { q: "Do you buy back old laptops?", a: "Yes, our trade-in estimator gives you an instant AI-generated offer based on model, condition, and current market demand." },
    { q: "Is bulk / business pricing available?", a: "Yes \u2014 teams of 10 or more get volume pricing, GST-compliant billing, and a dedicated account manager. See the Business page for details." },
  ];
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[900px] px-6 md:px-10">
        <div className="text-center mb-14">
          <div className="text-[11px] uppercase tracking-wider text-amber-soft font-mono mb-3">FAQ</div>
          <h2 className="font-display text-3xl md:text-4xl text-bone">Common questions</h2>
        </div>
        <div className="divide-y divide-line-soft border-t border-b border-line-soft">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-bone text-[15px]">{f.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-bone-faint shrink-0 transition-transform ${
                    openIdx === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIdx === i ? "auto" : 0, opacity: openIdx === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-[14px] text-bone-faint leading-relaxed max-w-2xl">{f.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="py-24 md:py-32 border-t border-line-soft">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="rounded-3xl border border-line bg-ink-raised p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,var(--teal-12),transparent)]" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl text-bone mb-4">
              Get notified when your grade lands in stock
            </h2>
            <p className="text-bone-dim mb-8 max-w-md mx-auto">
              Weekly drops, restock alerts, and trade-in price movements &mdash; no spam.
            </p>
            {sent ? (
              <div className="text-teal-soft text-sm font-mono">You&rsquo;re on the list.</div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="flex-1 rounded-full border border-line bg-ink px-4 py-3 text-sm text-bone outline-none placeholder:text-bone-faint focus:border-teal/50 transition-colors"
                />
                <button
                  type="submit"
                  className="rounded-full bg-bone text-ink px-5 py-3 text-sm font-medium hover:bg-amber-soft transition-colors"
                >
                  Notify me
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
