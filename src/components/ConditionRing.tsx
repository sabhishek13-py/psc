"use client";

import { motion } from "framer-motion";

interface ConditionRingProps {
  score: number; // 0-100
  size?: number;
  label?: string;
}

export default function ConditionRing({ score, size = 64, label }: ConditionRingProps) {
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--teal)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[11px] font-medium text-bone">{score}</span>
        </div>
      </div>
      {label && (
        <div className="leading-tight">
          <div className="text-[11px] uppercase tracking-wider text-bone-faint font-mono">{label}</div>
          <div className="text-xs text-teal-soft">AI Verified</div>
        </div>
      )}
    </div>
  );
}
