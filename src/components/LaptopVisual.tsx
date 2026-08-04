"use client";

import { motion } from "framer-motion";
import type { Chassis } from "@/lib/data";

interface LaptopVisualProps {
  colorway: [string, string];
  chassis?: Chassis;
  scanning?: boolean;
  floatAnim?: boolean;
  className?: string;
  tiltDeg?: number;
}

/**
 * A generative, art-directed laptop render built from gradients + SVG.
 * Deliberately not a stock photo: keeps every product image visually
 * consistent, brand-safe, and on-theme with the diagnostic/restoration story.
 */
export default function LaptopVisual({
  colorway,
  scanning = false,
  floatAnim = false,
  className = "",
  tiltDeg = -8,
}: LaptopVisualProps) {
  const [c1, c2] = colorway;
  const gradId = `lg-${c1.replace("#", "")}-${c2.replace("#", "")}`;
  const glowId = `glow-${c1.replace("#", "")}`;

  return (
    <div
      className={`relative ${floatAnim ? "float" : ""} ${className}`}
      style={{ ["--tilt" as string]: `${tiltDeg}deg` }}
    >
      <svg
        viewBox="0 0 560 400"
        className="w-full h-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
        style={{ transform: `perspective(1200px) rotateX(8deg) rotateY(${tiltDeg}deg)` }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={c1} />
            <stop offset="100%" stopColor={c2} />
          </linearGradient>
          <radialGradient id={glowId} cx="50%" cy="0%" r="80%">
            <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="screen-sheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.10" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* base shadow */}
        <ellipse cx="280" cy="368" rx="190" ry="16" fill="#000" opacity="0.45" />

        {/* base / keyboard deck */}
        <path d="M70 300 L490 300 L520 340 L40 340 Z" fill={`url(#${gradId})`} opacity="0.92" />
        <path d="M70 300 L490 300 L520 340 L40 340 Z" fill="#000" opacity="0.08" />
        <rect x="240" y="295" width="80" height="6" rx="3" fill="#000" opacity="0.25" />

        {/* screen */}
        <g>
          <rect x="95" y="40" width="370" height="262" rx="14" fill={`url(#${gradId})`} />
          <rect x="109" y="54" width="342" height="234" rx="6" fill="#06070a" />
          <rect x="109" y="54" width="342" height="234" rx="6" fill={`url(#${glowId})`} />
          {/* faux UI inside screen */}
          <rect x="128" y="76" width="130" height="10" rx="5" fill="#ffffff" opacity="0.14" />
          <rect x="128" y="96" width="80" height="8" rx="4" fill="#ffffff" opacity="0.08" />
          <rect x="128" y="150" width="304" height="110" rx="8" fill="#ffffff" opacity="0.04" />
          <rect x="128" y="150" width="304" height="110" rx="8" fill="none" stroke="var(--teal)" strokeOpacity="0.25" />
          <circle cx="270" cy="205" r="34" fill="none" stroke="var(--teal)" strokeOpacity="0.55" strokeWidth="2" />
          <path d="M250 205 l14 14 l28 -30" fill="none" stroke="var(--teal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="109" y="54" width="342" height="234" rx="6" fill="url(#screen-sheen)" />
        </g>

        {/* webcam dot */}
        <circle cx="280" cy="48" r="2" fill="#000" opacity="0.4" />
      </svg>

      {scanning && (
        <motion.div
          className="scanline"
          style={{ top: "10%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </div>
  );
}
