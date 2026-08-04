"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CATEGORIES = ["All", "Buying guides", "Sustainability", "Repair", "Business"];

const POSTS = [
  { title: "How our 42-point inspection actually works", category: "Buying guides", read: "6 min", featured: true, excerpt: "A walkthrough of every check a laptop passes before it earns a condition score \u2014 from hinge stress tests to battery cycle counts." },
  { title: "M1 vs M2 vs M3: which MacBook is worth buying refurbished", category: "Buying guides", read: "8 min" },
  { title: "The real carbon cost of a new laptop", category: "Sustainability", read: "5 min" },
  { title: "Battery health explained: what 85% actually means", category: "Buying guides", read: "4 min" },
  { title: "Inside our restoration lab: a technician's typical day", category: "Repair", read: "7 min" },
  { title: "How to prep your fleet for a bulk laptop refresh", category: "Business", read: "6 min" },
  { title: "Grade A vs Grade B: is the discount worth the trade-off?", category: "Buying guides", read: "5 min" },
  { title: "What happens to the laptops that don't pass inspection", category: "Sustainability", read: "4 min" },
  { title: "ThinkPad vs Latitude vs EliteBook for IT fleets", category: "Business", read: "9 min" },
  { title: "Repairing a liquid-damaged MacBook, step by step", category: "Repair", read: "6 min" },
  { title: "Why we publish condition scores instead of star ratings", category: "Buying guides", read: "4 min" },
  { title: "The hidden cost of ewaste in corporate refresh cycles", category: "Sustainability", read: "5 min" },
  { title: "Setting up a refurbished laptop for a new employee", category: "Business", read: "5 min" },
  { title: "Hinge failures: the most common repair we see", category: "Repair", read: "3 min" },
  { title: "Buying for a student: what actually matters", category: "Buying guides", read: "6 min" },
];

export default function BlogPage() {
  const [featured, ...rest] = POSTS;
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12">
          <div className="text-[11px] uppercase tracking-wider text-amber-soft font-mono mb-3">Journal</div>
          <h1 className="font-display text-4xl md:text-5xl text-bone text-balance">
            Notes on hardware, restoration, and sustainability
          </h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((c, i) => (
            <button
              key={c}
              className={`rounded-full px-4 py-2 text-[13px] border transition-colors ${
                i === 0 ? "bg-bone text-ink border-bone" : "border-line text-bone-dim bg-ink-raised/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.a
          href="#"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="block rounded-3xl border border-line bg-ink-raised/40 p-10 md:p-14 mb-14 hover:border-teal/30 transition-colors"
        >
          <div className="text-[11px] uppercase tracking-wider text-teal-soft font-mono mb-4">
            {featured.category} &middot; {featured.read} read
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-bone text-balance mb-4 max-w-2xl">
            {featured.title}
          </h2>
          <p className="text-bone-dim max-w-xl leading-relaxed mb-6">{featured.excerpt}</p>
          <span className="inline-flex items-center gap-1.5 text-sm text-bone">
            Read article <ArrowRight className="h-4 w-4" />
          </span>
        </motion.a>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 3) * 0.06 }}
              className="rounded-2xl border border-line bg-ink-raised/30 p-6 hover:border-teal/30 hover:bg-ink-raised/50 transition-colors"
            >
              <div className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-3">
                {p.category} &middot; {p.read} read
              </div>
              <h3 className="font-display text-lg text-bone text-balance leading-snug">{p.title}</h3>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
