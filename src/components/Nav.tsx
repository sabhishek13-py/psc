"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ArrowUpRight, LogOut } from "lucide-react";
import type { CustomerProfile } from "@/lib/customer-token";

const LINKS = [
  { href: "/products", label: "Shop" },
  { href: "/compare", label: "Compare" },
  { href: "/ai", label: "AI Assistant" },
  { href: "/business", label: "Business" },
  { href: "/repair", label: "Repair" },
  { href: "/trade-in", label: "Trade-in" },
  { href: "/about", label: "About" },
];

export default function Nav({ user }: { user: CustomerProfile | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-ink/80 border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-line-soft bg-ink-raised">
            <span className="h-2 w-2 rounded-full bg-teal" />
          </span>
          <span className="font-display text-[15px] tracking-tight text-bone">PSComputers</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3.5 py-2 text-[13px] text-bone-dim hover:text-bone transition-colors rounded-full hover:bg-ink-raised"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {user && (
            <Link
              href="/demo-dashboard"
              className="text-[13px] text-bone-dim hover:text-bone transition-colors"
            >
              Dashboard
            </Link>
          )}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setAccountOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border border-line pl-1.5 pr-3 py-1.5 hover:border-teal transition-colors"
              >
                {user.picture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.picture} alt="" className="h-6 w-6 rounded-full" referrerPolicy="no-referrer" />
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-12 text-teal text-[11px] font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="text-[13px] text-bone max-w-[100px] truncate">{user.name}</span>
              </button>

              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl border border-line bg-ink-raised p-1.5 shadow-lg"
                  >
                    <div className="px-3 py-2 text-[12px] text-bone-faint truncate border-b border-line-soft mb-1">
                      {user.email}
                    </div>
                    <form action="/api/auth/logout" method="POST">
                      <button
                        type="submit"
                        className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] text-bone-dim hover:text-bone hover:bg-ink-raised-2 transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        Sign out
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-[13px] text-bone-dim hover:text-bone transition-colors"
            >
              Sign in
            </Link>
          )}

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-full bg-bone text-ink text-[13px] font-medium px-4 py-2 hover:bg-amber-soft transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Shop now
          </Link>
        </div>

        <button
          className="lg:hidden text-bone"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-ink border-b border-line"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-[15px] text-bone-dim hover:text-bone flex items-center justify-between border-b border-line-soft"
                >
                  {l.label}
                  <ArrowUpRight className="h-4 w-4 opacity-40" />
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    href="/demo-dashboard"
                    onClick={() => setOpen(false)}
                    className="py-2.5 text-[15px] text-bone-dim hover:text-bone flex items-center justify-between border-b border-line-soft"
                  >
                    Dashboard
                    <ArrowUpRight className="h-4 w-4 opacity-40" />
                  </Link>
                  <div className="flex items-center justify-between py-2.5 border-b border-line-soft">
                    <span className="text-[15px] text-bone-dim truncate">{user.name}</span>
                    <form action="/api/auth/logout" method="POST">
                      <button type="submit" className="text-[13px] text-bone-faint hover:text-bone">
                        Sign out
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-[15px] text-bone-dim hover:text-bone flex items-center justify-between border-b border-line-soft"
                >
                  Sign in
                  <ArrowUpRight className="h-4 w-4 opacity-40" />
                </Link>
              )}

              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-bone text-ink text-sm font-medium px-4 py-2.5"
              >
                Shop now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
