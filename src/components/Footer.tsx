import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/products", label: "All laptops" },
      { href: "/compare", label: "Compare models" },
      { href: "/ai", label: "AI Assistant" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/business", label: "Business solutions" },
      { href: "/repair", label: "Repair & service" },
      { href: "/blog", label: "Journal" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/demo-dashboard", label: "Customer dashboard" },
      { href: "/contact", label: "Contact support" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink noise">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="PSComputers" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
              <span className="font-display text-[15px] text-bone">PSComputers</span>
            </Link>
            <p className="text-sm text-bone-faint max-w-xs leading-relaxed">
              AI-inspected, professionally restored laptops. Every unit passes a 42-point
              diagnostic before it reaches you.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <div className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-4">
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-bone-dim hover:text-bone transition-colors inline-flex items-center gap-1 group"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="fade-line my-10" />
        <div className="flex flex-col sm:flex-row justify-between gap-4 text-xs text-bone-faint">
          <p>&copy; 2026 PSComputers. Demo product concept &mdash; no real transactions occur.</p>
          <div className="flex gap-6">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Warranty policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
