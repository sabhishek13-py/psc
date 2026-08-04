"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useLaptops } from "@/lib/useLaptops";
import { formatINR } from "@/lib/utils";

const CATEGORIES = ["All", "Ultrabook", "Creator", "Workstation", "2-in-1", "Gaming"] as const;
const SORTS = ["Recommended", "Price: Low to High", "Price: High to Low", "Condition score"] as const;

export default function ProductsPage() {
  const laptops = useLaptops();
  const BRANDS = useMemo(() => Array.from(new Set(laptops.map((l) => l.brand))).sort(), [laptops]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [brands, setBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleBrand = (b: string) =>
    setBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));

  const filtered = useMemo(() => {
    let list = laptops.filter((l) => {
      const matchesQuery =
        query.trim() === "" ||
        `${l.brand} ${l.model} ${l.tagline}`.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || l.category === category;
      const matchesBrand = brands.length === 0 || brands.includes(l.brand);
      const matchesPrice = l.price <= maxPrice;
      return matchesQuery && matchesCategory && matchesBrand && matchesPrice;
    });

    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Condition score") list = [...list].sort((a, b) => b.conditionScore - a.conditionScore);

    return list;
  }, [laptops, query, category, brands, maxPrice, sort]);

  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-10">
          <div className="text-[11px] uppercase tracking-wider text-amber-soft font-mono mb-3">
            Shop all
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-bone text-balance">
            {filtered.length} restored laptops, inspected and ready
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex items-center gap-2.5 rounded-full border border-line bg-ink-raised px-4 py-3 flex-1 focus-within:border-teal/50 transition-colors">
            <Search className="h-4 w-4 text-bone-faint shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search model, brand, or use-case&hellip;"
              className="bg-transparent outline-none text-sm text-bone placeholder:text-bone-faint w-full"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as (typeof SORTS)[number])}
            className="rounded-full border border-line bg-ink-raised px-4 py-3 text-sm text-bone-dim outline-none focus:border-teal/50 transition-colors"
          >
            {SORTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            onClick={() => setFiltersOpen((o) => !o)}
            className="sm:hidden inline-flex items-center justify-center gap-2 rounded-full border border-line bg-ink-raised px-4 py-3 text-sm text-bone-dim"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-[13px] transition-colors border ${
                category === c
                  ? "bg-bone text-ink border-bone"
                  : "border-line text-bone-dim hover:border-line hover:text-bone bg-ink-raised/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-10">
          <AnimatePresence>
            {(filtersOpen || true) && (
              <motion.aside
                initial={false}
                className={`${filtersOpen ? "block" : "hidden"} lg:block space-y-8 h-fit rounded-2xl border border-line bg-ink-raised/40 p-6`}
              >
                <div className="flex items-center justify-between lg:hidden">
                  <span className="text-sm text-bone">Filters</span>
                  <button onClick={() => setFiltersOpen(false)}>
                    <X className="h-4 w-4 text-bone-faint" />
                  </button>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-4">
                    Brand
                  </div>
                  <div className="space-y-2.5">
                    {BRANDS.map((b) => (
                      <label key={b} className="flex items-center gap-2.5 text-sm text-bone-dim cursor-pointer">
                        <input
                          type="checkbox"
                          checked={brands.includes(b)}
                          onChange={() => toggleBrand(b)}
                          className="accent-teal h-3.5 w-3.5"
                        />
                        {b}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-bone-faint font-mono mb-4">
                    Max price: {formatINR(maxPrice)}
                  </div>
                  <input
                    type="range"
                    min={300}
                    max={2500}
                    step={50}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-teal"
                  />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          <div>
            {filtered.length === 0 ? (
              <div className="text-center py-24 text-bone-faint">
                No laptops match those filters yet. Try widening your search.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((l, i) => (
                  <ProductCard key={l.id} laptop={l} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
