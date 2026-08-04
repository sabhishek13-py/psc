import "server-only";
import fs from "node:fs";
import path from "node:path";
import { laptops as seedLaptops, type Laptop } from "@/lib/data";

const DATA_DIR = path.join(process.cwd(), "data");
const CATALOG_FILE = path.join(DATA_DIR, "catalog-overrides.json");

interface Overrides {
  custom: Laptop[];
  deletedIds: string[];
}

function readOverrides(): Overrides {
  try {
    const raw = fs.readFileSync(CATALOG_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return {
      custom: Array.isArray(parsed.custom) ? parsed.custom : [],
      deletedIds: Array.isArray(parsed.deletedIds) ? parsed.deletedIds : [],
    };
  } catch {
    return { custom: [], deletedIds: [] };
  }
}

function writeOverrides(overrides: Overrides) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(CATALOG_FILE, JSON.stringify(overrides, null, 2));
}

// Always re-reads from disk so every request (SSR or API) sees the latest admin edits.
export function getAllLaptops(): Laptop[] {
  const { custom, deletedIds } = readOverrides();
  const deleted = new Set(deletedIds);
  return [
    ...seedLaptops.filter((l) => !deleted.has(l.id)),
    ...custom.filter((l) => !deleted.has(l.id)),
  ];
}

export function getLaptopBySlug(slug: string): Laptop | undefined {
  return getAllLaptops().find((l) => l.slug === slug);
}

export function getRelatedLaptops(current: Laptop, count = 3): Laptop[] {
  const all = getAllLaptops();
  return all
    .filter((l) => l.id !== current.id && l.category === current.category)
    .slice(0, count)
    .concat(all.filter((l) => l.id !== current.id && l.category !== current.category))
    .slice(0, count);
}

const CHASSIS_BY_CATEGORY: Record<Laptop["category"], Laptop["chassis"]> = {
  Ultrabook: "clamshell",
  Workstation: "clamshell",
  "2-in-1": "convertible",
  Creator: "creator",
  Gaming: "gaming",
};

const COLORWAYS: [string, string][] = [
  ["#8a8d93", "#3a3c42"],
  ["#c9cdd3", "#6b6f76"],
  ["#5b6472", "#242830"],
  ["#a9b4c0", "#4a525d"],
  ["#9aa5b1", "#3f4750"],
];

export interface NewLaptopInput {
  id: string;
  brand: string;
  model: string;
  tagline: string;
  description: string;
  category: Laptop["category"];
  price: number;
  originalPrice: number;
  grade: Laptop["grade"];
  conditionScore: number;
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  display: string;
  battery: string;
  weight: string;
  warrantyMonths: number;
  photoPaths: string[];
}

export function addLaptop(input: NewLaptopInput): Laptop {
  const { custom, deletedIds } = readOverrides();

  const slugBase = `${input.brand}-${input.model}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const slug = `${slugBase}-${input.id.slice(0, 8)}`;

  const highlights = input.description
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 6);

  const laptop: Laptop = {
    id: input.id,
    slug,
    brand: input.brand,
    model: input.model,
    tagline: input.tagline,
    category: input.category,
    chassis: CHASSIS_BY_CATEGORY[input.category] ?? "clamshell",
    colorway: COLORWAYS[custom.length % COLORWAYS.length],
    grade: input.grade,
    conditionScore: input.conditionScore,
    price: input.price,
    originalPrice: input.originalPrice,
    cpu: input.cpu,
    ram: input.ram,
    storage: input.storage,
    gpu: input.gpu,
    display: input.display,
    battery: input.battery,
    weight: input.weight,
    ports: ["USB-C", "USB-A", "HDMI"],
    releaseYear: new Date().getFullYear(),
    warrantyMonths: input.warrantyMonths,
    highlights: highlights.length > 0 ? highlights : [input.tagline],
    included: ["Charger", "42-point inspection report", "Original packaging (if available)"],
    rating: 5,
    reviewCount: 0,
    inspectionChecks: [
      { label: "Screen & pixel integrity", pass: true },
      { label: "Battery health ≥ 85%", pass: true },
      { label: "Keyboard & trackpad", pass: true },
      { label: "Hinge & chassis stress test", pass: true },
      { label: "Ports & I/O", pass: true },
      { label: "Thermal performance", pass: true },
    ],
    benchmarks: [],
    photos: input.photoPaths,
  };

  writeOverrides({ custom: [...custom, laptop], deletedIds });
  return laptop;
}

export function deleteLaptop(id: string) {
  const { custom, deletedIds } = readOverrides();
  const laptop = custom.find((l) => l.id === id);
  const remainingCustom = custom.filter((l) => l.id !== id);
  const newDeletedIds = deletedIds.includes(id) ? deletedIds : [...deletedIds, id];

  writeOverrides({ custom: remainingCustom, deletedIds: newDeletedIds });

  if (laptop?.photos && laptop.photos.length > 0) {
    const uploadDir = path.dirname(path.join(process.cwd(), "public", laptop.photos[0].replace(/^\//, "")));
    fs.rm(uploadDir, { recursive: true, force: true }, () => {});
  }
}
