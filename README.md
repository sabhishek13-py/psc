# PSComputers — AI Powered Refurbished Computing

A design-first, fully mocked concept site for a refurbished-laptop startup. Next.js 15 (App
Router), React 19, TypeScript, Tailwind CSS v4, and Framer Motion. No backend, no auth, no
real payments — every number, order, and review is mock data in `src/lib/data.ts`.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Requires internet access on first run/build so Next.js can
fetch the Google Fonts (Space Grotesk, Inter, JetBrains Mono) used in `src/app/layout.tsx`.

```bash
npm run build && npm run start   # production build
```

## What's built

All 12 routes from the brief are implemented and interactive:

- `/` — landing page (hero, featured products, AI recommendation panel, how-it-works,
  why-refurbished, business + repair teasers, testimonials, FAQ, newsletter)
- `/products` — filterable, searchable grid across 30 mock laptops
- `/products/[id]` — Apple-style product showcase (specs, benchmarks, inspection checklist,
  reviews, related items)
- `/compare` — 3-slot side-by-side comparison with an AI "best value" call-out
- `/ai` — chat-style AI assistant demo with keyword-matched recommendations
- `/business` — enterprise landing page (tiers, case studies, logos)
- `/repair` — repair timeline, before/after condition slider, pricing table
- `/trade-in` — drag-and-drop mock upload + AI estimate flow
- `/about`, `/blog`, `/contact` — story, journal listing, contact form
- `/demo-dashboard` — customer dashboard (orders, wishlist, repairs, invoices, notifications)
- `/admin` — internal ops dashboard (KPIs, revenue chart, top products, recent orders)

## Design system

Deliberately steers away from the generic "AI-generated" defaults (warm cream + serif,
or black + acid green). The palette:

- **Ink surfaces** — near-black graphite (`#0b0c0e` → `#1c1e23`), warmer than pure black
- **Amber** (`#e8a33d`) — the "restoration" accent, used for warmth/value cues
- **Teal** (`#5eead4`) — the "AI-verified" accent, used for inspection/data cues
- **Type** — Space Grotesk (display), Inter (body), JetBrains Mono (data/specs)

The signature element is the **diagnostic scan + condition-score ring**: an animated
scanline and a hand-built SVG ring badge that shows an AI-generated 0–100 condition score
on every product. Product imagery is a custom generative SVG laptop render
(`src/components/LaptopVisual.tsx`) rather than stock photography — this keeps every
listing visually consistent, avoids broken/mismatched image links, and matches the
abstract-render aesthetic of the sites this brief cites (Linear, Vercel, Arc).

## Structure

```
src/
  app/            route segments (one folder per page from the brief)
  components/     Nav, Footer, ProductCard, LaptopVisual, ConditionRing
  lib/
    data.ts       30 laptops, 20 testimonials, site-wide stats
    utils.ts      cn() class merge helper, formatUSD()
```

## Notes / next steps

- Cart, checkout, and account auth are intentionally out of scope (per brief: mock only).
- The AI assistant on `/ai` and the AI search bar on `/` use keyword-matching against the
  mock inventory rather than a real model — swap in an actual API call in `respond()`
  (`src/app/ai/page.tsx`) if you want it live.
- Images are generated SVG, not photography — see "Design system" above for why.
