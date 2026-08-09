export type Grade = "A+" | "A" | "B+" | "B";

export type Chassis = "clamshell" | "convertible" | "creator" | "gaming";

export interface Laptop {
  id: string;
  slug: string;
  brand: string;
  model: string;
  tagline: string;
  category: "Ultrabook" | "Workstation" | "2-in-1" | "Creator" | "Gaming";
  chassis: Chassis;
  colorway: [string, string]; // gradient pair used by LaptopVisual
  grade: Grade;
  conditionScore: number; // 0-100, AI inspection score
  price: number;
  originalPrice: number;
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  display: string;
  battery: string;
  weight: string;
  ports: string[];
  releaseYear: number;
  warrantyMonths: number;
  aiTag?: string;
  highlights: string[];
  included: string[];
  rating: number;
  reviewCount: number;
  inspectionChecks: { label: string; pass: boolean }[];
  benchmarks: { label: string; value: number; max: number; unit: string }[];
  photos?: string[]; // uploaded photo URLs; falls back to the generated LaptopVisual when absent
}

const inspection = (extra: string[] = []) => [
  { label: "Screen & pixel integrity", pass: true },
  { label: "Battery health ≥ 85%", pass: true },
  { label: "Keyboard & trackpad", pass: true },
  { label: "Hinge & chassis stress test", pass: true },
  { label: "Ports & I/O", pass: true },
  { label: "Thermal performance", pass: true },
  ...extra.map((label) => ({ label, pass: true })),
];

export const laptops: Laptop[] = [
  {
    id: "l4",
    slug: "dell-latitude-7440",
    brand: "Dell",
    model: "Latitude 7440",
    tagline: "Business-grade endurance with 13th Gen Intel muscle.",
    category: "Ultrabook",
    chassis: "clamshell",
    colorway: ["#8f9196", "#4a4c50"],
    grade: "A",
    conditionScore: 93,
    price: 899,
    originalPrice: 1899,
    cpu: "Intel Core i7-1365U (13th Gen), 10-core / 12-thread, 1.3\u20135.2 GHz, 12MB cache",
    ram: "32GB LPDDR5 \u2014 4800 MT/s, dual-channel",
    storage: "512GB M.2 2230 PCIe Gen 4 NVMe SSD",
    gpu: "Intel Iris Xe Graphics",
    display: "14\u2033 16:10 FHD+ 1920\u00d71200 IPS/WVA anti-glare, up to 400 nits, touch available",
    battery: "Integrated lithium-ion, capacity varies by configuration",
    weight: "From 1.055 kg (Ultralight) / 1.33 kg (Aluminum)",
    ports: [
      "2x USB-A 3.2 Gen 1",
      "2x Thunderbolt 4 with Power Delivery & DisplayPort",
      "HDMI 2.0",
      "3.5mm audio jack",
    ],
    releaseYear: 2023,
    warrantyMonths: 12,
    aiTag: "Best for Business",
    highlights: [
      "Intel Wi-Fi 6E AX211 with Bluetooth 5.3",
      "TPM 2.0 with optional fingerprint & IR/Windows Hello",
      "Spill-resistant backlit keyboard, precision clickpad",
    ],
    included: ["Power adapter", "Restoration report"],
    rating: 4.6,
    reviewCount: 54,
    inspectionChecks: inspection(["TPM 2.0 verification"]),
    benchmarks: [
      { label: "Multi-core", value: 83, max: 100, unit: "pts" },
      { label: "Graphics", value: 55, max: 100, unit: "pts" },
      { label: "Battery efficiency", value: 80, max: 100, unit: "pts" },
    ],
    photos: [
      "/images/dell-latitude-7440-1.avif",
      "/images/dell-latitude-7440-2.avif",
      "/images/dell-latitude-7440-3.avif",
    ],
  },
  {
    id: "l31",
    slug: "dell-latitude-7420",
    brand: "Dell",
    model: "Latitude 7420",
    tagline: "11th Gen vPro reliability for the road warrior.",
    category: "Ultrabook",
    chassis: "clamshell",
    colorway: ["#8f9196", "#4a4c50"],
    grade: "A",
    conditionScore: 90,
    price: 649,
    originalPrice: 1499,
    cpu: "Intel Core i7-1185G7 vPro (11th Gen), 4-core / 8-thread, up to 4.8 GHz, 12MB cache",
    ram: "32GB LPDDR4x-4266 MHz (soldered, not upgradeable)",
    storage: "512GB M.2 PCIe NVMe SSD",
    gpu: "Intel Iris Xe Graphics",
    display: "14″ FHD 1920×1080, 250/400-nit options, touch available on select configurations",
    battery: "4-cell, 63 Wh",
    weight: "From 1.22 kg (carbon-fiber version)",
    ports: [
      "2x Thunderbolt 4 / USB-C",
      "1x USB 3.2 Gen 1 with PowerShare",
      "HDMI 2.0",
      "microSD card reader",
      "3.5mm audio jack",
    ],
    releaseYear: 2021,
    warrantyMonths: 12,
    aiTag: "Best for Business",
    highlights: [
      "Intel Wi-Fi 6 AX201 with Bluetooth 5.2",
      "Optional fingerprint reader, IR/720p or 1080p webcam",
      "65W USB-C fast charging",
    ],
    included: ["65W USB-C charger", "Restoration report"],
    rating: 4.5,
    reviewCount: 41,
    inspectionChecks: inspection(["TPM 2.0 verification"]),
    benchmarks: [
      { label: "Multi-core", value: 74, max: 100, unit: "pts" },
      { label: "Graphics", value: 51, max: 100, unit: "pts" },
      { label: "Battery efficiency", value: 77, max: 100, unit: "pts" },
    ],
    photos: [
      "/images/dell-latitude-7420-1.avif",
      "/images/dell-latitude-7420-2.avif",
      "/images/dell-latitude-7420-3.avif",
    ],
  },
  {
    id: "l32",
    slug: "dell-latitude-7430",
    brand: "Dell",
    model: "Latitude 7430",
    tagline: "12th Gen efficiency cores for the hybrid office.",
    category: "Ultrabook",
    chassis: "clamshell",
    colorway: ["#8f9196", "#4a4c50"],
    grade: "A",
    conditionScore: 91,
    price: 749,
    originalPrice: 1699,
    cpu: "Intel Core i7-1265U (12th Gen), 10-core / 12-thread, up to 4.8 GHz",
    ram: "32GB DDR4",
    storage: "512GB NVMe SSD",
    gpu: "Intel Iris Xe Graphics (integrated)",
    display: "14″ Full HD 1920×1080",
    battery: "Up to 12 hrs",
    weight: "2.9 lb",
    ports: ["2x Thunderbolt 4", "USB-A", "HDMI 2.0", "microSD", "3.5mm audio"],
    releaseYear: 2022,
    warrantyMonths: 12,
    aiTag: "Best for Business",
    highlights: [
      "Wi-Fi 6 with Bluetooth 5.2",
      "Backlit keyboard depending on unit",
      "Fingerprint reader depending on unit",
    ],
    included: ["USB-C charger", "Restoration report"],
    rating: 4.6,
    reviewCount: 37,
    inspectionChecks: inspection(["TPM 2.0 verification"]),
    benchmarks: [
      { label: "Multi-core", value: 80, max: 100, unit: "pts" },
      { label: "Graphics", value: 53, max: 100, unit: "pts" },
      { label: "Battery efficiency", value: 79, max: 100, unit: "pts" },
    ],
    photos: [
      "/images/dell-latitude-7430-1.avif",
      "/images/dell-latitude-7430-2.avif",
      "/images/dell-latitude-7430-3.avif",
    ],
  },
  {
    id: "l33",
    slug: "macbook-pro-13-a2251-2020",
    brand: "Apple",
    model: "MacBook Pro 13″ (2020, A2251)",
    tagline: "The last Touch Bar 13″, still Retina-sharp.",
    category: "Ultrabook",
    chassis: "clamshell",
    colorway: ["#8a8d93", "#3a3c42"],
    grade: "A",
    conditionScore: 92,
    price: 849,
    originalPrice: 1799,
    cpu: "Intel Core i5/i7 — 2.0GHz quad-core i5 (Turbo Boost to 3.8GHz) or 2.3GHz quad-core i7 (Turbo Boost to 4.1GHz), 10th Gen Intel",
    ram: "16GB 3733MHz LPDDR4X (onboard, up to 32GB)",
    storage: "512GB SSD (up to 4TB configurations)",
    gpu: "Intel Iris Plus Graphics",
    display: "13.3″ Retina, 2560×1600, 227ppi, IPS, 500 nits, P3 wide color, True Tone",
    battery: "58.2Wh lithium-polymer — up to 10 hrs wireless web",
    weight: "About 1.4 kg",
    ports: ["4x Thunderbolt 3 / USB-C (up to 40Gb/s)", "3.5mm headphone jack"],
    releaseYear: 2020,
    warrantyMonths: 12,
    aiTag: "Best for Creators",
    highlights: [
      "Backlit Magic Keyboard with Touch Bar & Touch ID",
      "Force Touch trackpad",
      "Three-mic array, stereo speakers with high dynamic range",
    ],
    included: ["61W USB-C charger", "Restoration report"],
    rating: 4.7,
    reviewCount: 129,
    inspectionChecks: inspection(["Touch Bar & Touch ID verification"]),
    benchmarks: [
      { label: "Multi-core", value: 76, max: 100, unit: "pts" },
      { label: "Graphics", value: 48, max: 100, unit: "pts" },
      { label: "Battery efficiency", value: 82, max: 100, unit: "pts" },
    ],
    photos: [
      "/images/macbook-pro-13-a2251-1.avif",
      "/images/macbook-pro-13-a2251-2.avif",
      "/images/macbook-pro-13-a2251-3.avif",
    ],
  },
];


export const testimonials = [
  { name: "Priya Raman", role: "Design Lead, Northwind Studio", quote: "The condition score matched exactly what arrived. Genuinely couldn't tell it wasn't new.", rating: 5 },
  { name: "Marcus Idowu", role: "Freelance Editor", quote: "Bought the 16\u2033 M1 Max for half the price of new. Renders exports 8K ProRes without a hiccup.", rating: 5 },
  { name: "Jenna Cho", role: "IT Manager, Alden Health", quote: "We fleet-ordered 40 ThinkPads. Every unit passed our imaging process on the first try.", rating: 5 },
  { name: "Tomás Herrera", role: "Architecture Student", quote: "The AI inspection report gave me more detail than the retail store gave on a brand new machine.", rating: 5 },
  { name: "Aisha Bello", role: "Product Manager", quote: "Trade-in estimate was spot on, and the payout landed two days after they received my old laptop.", rating: 4 },
  { name: "Wei Zhang", role: "Data Scientist", quote: "Battery health was rated 91% and a year later it still holds a full workday of charge.", rating: 5 },
  { name: "Sofia Marin", role: "Motion Designer", quote: "The XPS 15 I bought handles After Effects renders better than my old new-in-box machine did.", rating: 5 },
  { name: "Daniel Okafor", role: "Startup Founder", quote: "Kitted out a five-person team for less than the price of two new laptops.", rating: 5 },
  { name: "Grace Lindqvist", role: "University Researcher", quote: "Warranty support actually picked up the phone. Replaced a keyboard within the week.", rating: 4 },
  { name: "Ben Okafor", role: "Video Editor", quote: "Grade A+ meant zero cosmetic marks. I was expecting at least a scuff.", rating: 5 },
  { name: "Lucia Ferreira", role: "UX Researcher", quote: "The AI assistant actually steered me away from an overpowered (and overpriced) option. Appreciated the honesty.", rating: 5 },
  { name: "Omar Siddiqui", role: "Systems Administrator", quote: "TPM verification listed on the inspection report saved me a support ticket during Windows 11 setup.", rating: 5 },
  { name: "Hannah Voss", role: "Illustrator", quote: "OLED color accuracy on the Zenbook is shockingly close to my calibrated studio monitor.", rating: 4 },
  { name: "Kwame Mensah", role: "Consultant", quote: "Three business trips in and the hinge feels as tight as day one.", rating: 5 },
  { name: "Emilia Novak", role: "Grad Student", quote: "Financed a ThinkPad through their student plan. Cheaper monthly than my coffee budget.", rating: 4 },
  { name: "Rahul Deshmukh", role: "DevOps Engineer", quote: "Ran a full week of CI builds on the P1 without a single thermal throttle.", rating: 5 },
  { name: "Chloe Bennett", role: "Photographer", quote: "Color-critical work on a refurbished machine felt like a gamble. It wasn't.", rating: 5 },
  { name: "Yusuf Karimi", role: "Operations Director", quote: "The bulk order dashboard made outfitting 120 employees almost boring \u2014 in a good way.", rating: 5 },
  { name: "Nina Petrov", role: "Front-end Developer", quote: "Keyboard feel on the X1 Carbon is better than most brand-new laptops I've tried this year.", rating: 5 },
  { name: "Isaac Osei", role: "High School Teacher", quote: "Bought ten Vivobooks for a classroom set. Every single one arrived within the promised week.", rating: 4 },
];

export const stats = {
  laptopsRestored: 214000,
  co2SavedTons: 4820,
  avgSavingsPercent: 46,
  customerRating: 4.8,
  warrantyDefaultMonths: 12,
  inspectionPoints: 42,
};
