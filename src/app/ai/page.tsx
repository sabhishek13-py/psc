"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Wrench, Scale, ArrowRight } from "lucide-react";
import LaptopVisual from "@/components/LaptopVisual";
import ConditionRing from "@/components/ConditionRing";
import { useLaptops } from "@/lib/useLaptops";
import { formatINR, USD_TO_INR } from "@/lib/utils";
import type { Laptop } from "@/lib/data";

type Message =
  | { role: "user"; text: string }
  | { role: "assistant"; text: string; recs?: Laptop[] };

const SUGGESTED = [
  "Best laptop for video editing under ₹1,25,000",
  "Lightest laptop for a 6-hour flight",
  "Compare MacBook Pro vs Dell Latitude",
  "My laptop's battery drains fast \u2014 what's wrong?",
  "Something for a first-year CS student",
];

function respond(query: string, laptops: Laptop[]): Message {
  const q = query.toLowerCase();

  if (q.includes("battery") && (q.includes("drain") || q.includes("wrong") || q.includes("fix"))) {
    return {
      role: "assistant",
      text:
        "That's usually one of three things: background app refresh, an aging battery cycle count, or display brightness left high. If it's a refurbished unit from us, check the condition report first \u2014 every listing states battery health at time of sale. If it's dropped meaningfully since, our repair team can run a diagnostic and replace the cell if it's below 80% capacity.",
    };
  }

  if (q.includes("compare") || q.includes(" vs ")) {
    const mac = laptops.find((l) => l.slug === "macbook-pro-13-a2251-2020");
    const dell = laptops.find((l) => l.slug === "dell-latitude-7440");
    const picks = [mac, dell].filter((l): l is Laptop => Boolean(l));
    return {
      role: "assistant",
      text:
        "Here's the honest trade-off: the MacBook Pro wins on display quality and macOS polish, while the Latitude wins on repairability, port selection, and IT manageability if you're in a Windows environment. If you don't need Windows-specific software, I'd lean Mac.",
      recs: picks.length ? picks : laptops.slice(0, 2),
    };
  }

  if (q.includes("video edit") || q.includes("editing") || q.includes("premiere") || q.includes("resolve")) {
    const picks = laptops
      .filter((l) => (l.category === "Creator" || l.category === "Workstation") && l.price <= 1600)
      .sort((a, b) => b.benchmarks[1].value - a.benchmarks[1].value)
      .slice(0, 2);
    return {
      role: "assistant",
      text:
        "For video editing under ₹1,25,000, memory bandwidth and GPU decode matter more than raw clock speed. These two handle 4K timelines comfortably without thermal throttling on sustained exports.",
      recs: picks,
    };
  }

  if (q.includes("light") || q.includes("flight") || q.includes("travel") || q.includes("portab")) {
    const picks = [...laptops].sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight)).slice(0, 2);
    return {
      role: "assistant",
      text:
        "Weight and battery life matter more than raw power for travel. Here are the two lightest options in stock right now, both rated for 13+ hours of real-world use.",
      recs: picks,
    };
  }

  if (q.includes("student") || q.includes("college") || q.includes("cs ") || q.includes("computer science")) {
    const picks = laptops.filter((l) => l.aiTag === "Best for Students");
    return {
      role: "assistant",
      text:
        "For CS coursework, you want enough RAM to run an IDE plus a VM or Docker containers comfortably, and a keyboard you can type on for hours. These two hit that budget-to-capability sweet spot.",
      recs: picks,
    };
  }

  if (q.includes("gam")) {
    const picks = laptops.filter((l) => l.category === "Gaming").slice(0, 2);
    return {
      role: "assistant",
      text:
        "For gaming, the discrete GPU matters most. Both of these pack an RTX 3070-class or better card at meaningfully below launch price \u2014 worth checking the thermal test results in the inspection report before buying, which I've verified below.",
      recs: picks,
    };
  }

  // default: budget-aware generic recommendation (budgets are typed in rupees; convert to
  // the catalog's internal USD-scale price field for filtering)
  const budgetMatch = q.replace(/,/g, "").match(/₹?\s?(\d{4,7})/);
  const budget = budgetMatch ? Math.round(parseInt(budgetMatch[1], 10) / USD_TO_INR) : null;
  const picks = budget
    ? laptops.filter((l) => l.price <= budget).sort((a, b) => b.conditionScore - a.conditionScore).slice(0, 2)
    : laptops.filter((l) => l.aiTag).slice(0, 2);

  return {
    role: "assistant",
    text: budget
      ? `Under ${formatINR(budget)}, here's what scores highest on condition without compromising on the specs you'd actually notice day-to-day.`
      : "Here's a solid starting point based on overall demand and condition score. Tell me your budget or main use-case (editing, coding, travel, gaming) and I'll narrow it down further.",
    recs: picks,
  };
}

export default function AIPage() {
  const laptops = useLaptops();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi \u2014 I'm the PSComputers assistant. Tell me your budget and what you'll use the laptop for, and I'll match you against live inventory. You can also ask me to compare two models or troubleshoot a repair issue.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    // eslint-disable-next-line react-hooks/purity -- runs inside a user-triggered event handler, not render
    const delay = 900 + Math.floor(Math.random() * 500);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, respond(text, laptops)]);
    }, delay);
  };

  return (
    <div className="pt-32 pb-16 h-screen flex flex-col max-h-screen">
      <div className="mx-auto max-w-[900px] px-6 md:px-10 w-full flex flex-col flex-1 min-h-0">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-teal-soft font-mono mb-2">
              AI Assistant
            </div>
            <h1 className="font-display text-3xl text-bone">Ask about anything in stock</h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[12px] text-bone-faint">
            <Wrench className="h-3.5 w-3.5" /> Repair questions welcome too
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto rounded-2xl border border-line bg-ink-raised/30 p-5 md:p-6 space-y-5"
        >
          {messages.map((m, i) => (
            <ChatBubble key={i} message={m} />
          ))}
          {typing && (
            <div className="flex items-center gap-2 text-bone-faint text-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber animate-pulse" />
              <TypingDots />
            </div>
          )}
        </div>

        {messages.length < 3 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-line bg-ink-raised px-3.5 py-2 text-[12.5px] text-bone-dim hover:border-teal/40 hover:text-bone transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="mt-4 flex items-center gap-2.5 rounded-full border border-line bg-ink-raised px-4 py-3 focus-within:border-teal/50 transition-colors"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your budget and use-case&hellip;"
            className="flex-1 bg-transparent outline-none text-sm text-bone placeholder:text-bone-faint"
          />
          <button
            type="submit"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-bone text-ink hover:bg-amber-soft transition-colors shrink-0"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-bone-faint"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`max-w-[85%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-3`}>
        {!isUser && (
          <div className="flex items-center gap-1.5 text-[11px] text-bone-faint font-mono">
            <Sparkles className="h-3 w-3 text-amber" /> PSComputers AI
          </div>
        )}
        <div
          className={`rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed ${
            isUser ? "bg-bone text-ink" : "bg-ink-raised-2 text-bone-dim border border-line-soft"
          }`}
        >
          {message.text}
        </div>
        {"recs" in message && message.recs && (
          <div className="grid sm:grid-cols-2 gap-3 w-full">
            {message.recs.map((l) => (
              <a
                key={l.id}
                href={`/products/${l.slug}`}
                className="flex items-center gap-3 rounded-xl border border-line-soft bg-ink p-3 hover:border-teal/40 transition-colors"
              >
                <div className="w-12 shrink-0">
                  <LaptopVisual colorway={l.colorway} tiltDeg={-4} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] text-bone truncate">{l.model}</div>
                  <div className="text-[11px] text-bone-faint truncate">{l.tagline}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[13px] text-teal-soft font-mono">{formatINR(l.price)}</div>
                  <ConditionRing score={l.conditionScore} size={26} />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
