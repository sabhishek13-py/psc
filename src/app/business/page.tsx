"use client";

import { motion } from "framer-motion";
import { Building2, ShieldCheck, FileText, Headset, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import LaptopVisual from "@/components/LaptopVisual";
import { useLaptops } from "@/lib/useLaptops";

const LOGOS = ["Northwind", "Alden Health", "Cobalt Labs", "Marrow & Finch", "Ferro Systems", "Quill Partners"];

const CASE_STUDIES = [
  { company: "Alden Health", result: "40 ThinkPads fleet-imaged in one week", detail: "Zero-touch deployment with pre-loaded MDM profiles cut IT onboarding time by 70%." },
  { company: "Cobalt Labs", result: "₹71.4 lakh saved on a 60-seat refresh", detail: "Grade A MacBook Airs replaced aging fleet at 45% of new-unit cost, warrantied for 12 months." },
  { company: "Quill Partners", result: "120-seat rollout across 3 offices", detail: "Regional pickup + delivery scheduling coordinated through a single account manager." },
];

const TIERS = [
  { name: "Team", seats: "10\u201349 seats", discount: "8% off list", features: ["Standard warranty", "Email support", "Net-15 invoicing"] },
  { name: "Business", seats: "50\u2013249 seats", discount: "15% off list", features: ["Extended 18-mo warranty", "Dedicated account manager", "GST-compliant billing", "Fleet imaging service"] },
  { name: "Enterprise", seats: "250+ seats", discount: "Custom pricing", features: ["Priority inventory access", "On-site deployment options", "Custom SLAs", "Quarterly business reviews"] },
];

export default function BusinessPage() {
  const laptops = useLaptops();
  return (
    <div className="pt-32 pb-24">
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 mb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line-soft bg-ink-raised/60 px-3.5 py-1.5 mb-7">
              <Building2 className="h-3.5 w-3.5 text-amber" />
              <span className="text-[12px] text-bone-dim font-mono">For teams of 10 to 10,000</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl text-bone text-balance leading-[1.02] mb-6">
              Outfit your team without a new-hardware budget
            </h1>
            <p className="text-bone-dim text-lg leading-relaxed max-w-lg mb-9">
              Bulk pricing, GST-compliant billing, fleet imaging, and a dedicated account
              manager who actually answers. Built for procurement teams, not consumers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-bone text-ink px-6 py-3.5 text-sm font-medium hover:bg-amber-soft transition-colors">
                Talk to sales <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/products" className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm text-bone hover:border-teal/40 transition-colors">
                Browse inventory
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {laptops.slice(2, 6).map((l, i) => (
              <motion.div
                key={l.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-line bg-ink-raised/40 p-5"
              >
                <LaptopVisual colorway={l.colorway} tiltDeg={-5} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line-soft bg-ink-raised/20 py-10 mb-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-center text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-6">
            Trusted by procurement teams at
          </div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {LOGOS.map((l) => (
              <span key={l} className="font-display text-lg text-bone-faint">{l}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 mb-20">
        <h2 className="font-display text-3xl text-bone mb-10">Built for how procurement actually works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden">
          {[
            { icon: ShieldCheck, title: "Extended warranty", detail: "Up to 18 months on business tier orders." },
            { icon: FileText, title: "GST billing", detail: "Compliant invoicing generated automatically." },
            { icon: Headset, title: "Dedicated support", detail: "One account manager for the whole relationship." },
            { icon: Building2, title: "Fleet imaging", detail: "Pre-loaded MDM profiles before machines ship." },
          ].map((f) => (
            <div key={f.title} className="bg-ink p-7">
              <f.icon className="h-5 w-5 text-teal mb-4" />
              <h3 className="font-display text-lg text-bone mb-2">{f.title}</h3>
              <p className="text-[13px] text-bone-faint leading-relaxed">{f.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10 mb-20">
        <h2 className="font-display text-3xl text-bone mb-10">Pricing by seat count</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border p-7 ${i === 1 ? "border-teal/40 bg-teal-12" : "border-line bg-ink-raised/40"}`}
            >
              <div className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-2">{t.seats}</div>
              <h3 className="font-display text-2xl text-bone mb-1">{t.name}</h3>
              <div className="text-teal-soft text-sm font-mono mb-6">{t.discount}</div>
              <ul className="space-y-2.5 mb-7">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2 text-[13px] text-bone-dim">
                    <Check className="h-3.5 w-3.5 text-teal shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm text-bone hover:text-teal-soft transition-colors">
                Get a quote <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 md:px-10">
        <h2 className="font-display text-3xl text-bone mb-10">Case studies</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {CASE_STUDIES.map((c) => (
            <div key={c.company} className="rounded-2xl border border-line bg-ink-raised/40 p-7">
              <div className="text-[11px] uppercase tracking-wider text-amber-soft font-mono mb-3">{c.company}</div>
              <h3 className="font-display text-lg text-bone mb-3 text-balance">{c.result}</h3>
              <p className="text-[13px] text-bone-faint leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
