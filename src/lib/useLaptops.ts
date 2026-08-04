"use client";

import { useEffect, useState } from "react";
import { laptops as seedLaptops, type Laptop } from "@/lib/data";

// Seeds with the static catalog for a fast, hydration-safe first paint, then
// refetches the live catalog (static + admin-added/removed) so storefront
// pages pick up admin changes without a code change or redeploy.
export function useLaptops(): Laptop[] {
  const [laptops, setLaptops] = useState<Laptop[]>(seedLaptops);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      fetch("/api/laptops", { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!cancelled && Array.isArray(data?.laptops)) {
            setLaptops(data.laptops);
          }
        })
        .catch(() => {});
    };

    load();
    const onFocus = () => load();
    window.addEventListener("focus", onFocus);
    const interval = setInterval(load, 15000);

    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
      clearInterval(interval);
    };
  }, []);

  return laptops;
}
