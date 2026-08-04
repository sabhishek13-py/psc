"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="mb-14">
          <div className="text-[11px] uppercase tracking-wider text-amber-soft font-mono mb-3">Contact</div>
          <h1 className="font-display text-4xl md:text-5xl text-bone text-balance">
            Talk to a human, not a queue
          </h1>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14">
          <div className="space-y-6">
            {[
              { icon: Mail, title: "Email", detail: "support@pscomputers.example", sub: "Replies within one business day" },
              { icon: Phone, title: "Phone", detail: "+1 (555) 019\u20130142", sub: "Mon\u2013Fri, 9am\u20136pm ET" },
              { icon: MessageCircle, title: "AI Assistant", detail: "Instant answers, 24/7", sub: "For quick spec or order questions" },
            ].map((c) => (
              <div key={c.title} className="flex gap-4 rounded-2xl border border-line bg-ink-raised/40 p-6">
                <c.icon className="h-5 w-5 text-teal shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-bone mb-0.5">{c.title}</div>
                  <div className="text-bone-dim text-sm mb-1">{c.detail}</div>
                  <div className="text-[12px] text-bone-faint">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-line bg-ink-raised/40 p-8 md:p-10"
          >
            {sent ? (
              <div className="flex flex-col items-center text-center py-10">
                <CheckCircle2 className="h-8 w-8 text-teal mb-4" />
                <h2 className="font-display text-xl text-bone mb-2">Message sent</h2>
                <p className="text-sm text-bone-faint">We&apos;ll get back to you within one business day.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-2 block">
                      Name
                    </label>
                    <input required className="w-full rounded-xl border border-line bg-ink px-3.5 py-2.5 text-sm text-bone outline-none focus:border-teal/50" />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-2 block">
                      Email
                    </label>
                    <input required type="email" className="w-full rounded-xl border border-line bg-ink px-3.5 py-2.5 text-sm text-bone outline-none focus:border-teal/50" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-2 block">
                    Topic
                  </label>
                  <select className="w-full rounded-xl border border-line bg-ink px-3.5 py-2.5 text-sm text-bone outline-none focus:border-teal/50">
                    <option>Order support</option>
                    <option>Business / bulk order</option>
                    <option>Repair inquiry</option>
                    <option>Trade-in question</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-2 block">
                    Message
                  </label>
                  <textarea required rows={5} className="w-full rounded-xl border border-line bg-ink px-3.5 py-2.5 text-sm text-bone outline-none focus:border-teal/50 resize-none" />
                </div>
                <button type="submit" className="w-full rounded-full bg-bone text-ink px-6 py-3.5 text-sm font-medium hover:bg-amber-soft transition-colors">
                  Send message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
