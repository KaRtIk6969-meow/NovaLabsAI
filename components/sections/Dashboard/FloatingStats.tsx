"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks";
import { easing } from "@/design-system";
const ease = easing.default;

const STATS = [
  {
    label: "Analytics",
    rawValue: 98,
    displaySuffix: "%",
    color: "from-accent-violet/20 to-accent-violet/5",
    borderColor: "border-accent-violet/20",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M2 12V8M6 12V5M10 12V7M14 12V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Automation",
    rawValue: 94,
    displaySuffix: "%",
    color: "from-accent-blue/20 to-accent-blue/5",
    borderColor: "border-accent-blue/20",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "AI Agents",
    rawValue: 12,
    displaySuffix: " Running",
    color: "from-accent-cyan/20 to-accent-cyan/5",
    borderColor: "border-accent-cyan/20",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
        <rect x="3" y="5" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="6.5" cy="9" r="1" fill="currentColor" />
        <circle cx="9.5" cy="9" r="1" fill="currentColor" />
        <path d="M8 2v3M5 5V3.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Response Time",
    rawValue: 8,
    displayPrefix: "0.",
    displaySuffix: " sec",
    color: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-500/20",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 4.5V8l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function StatValue({ rawValue, displayPrefix, displaySuffix, delay }: {
  rawValue: number;
  displayPrefix?: string;
  displaySuffix?: string;
  delay: number;
}) {
  const count = useCountUp(rawValue, 1200, delay);
  return (
    <span className="text-base font-bold text-text">
      {displayPrefix || ""}{count}{displaySuffix || ""}
    </span>
  );
}

export function FloatingStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 + i * 0.08, duration: 0.4, ease }}
          className={`relative rounded-xl border ${stat.borderColor} bg-gradient-to-b ${stat.color} backdrop-blur-md p-3 overflow-hidden group hover:scale-[1.02] transition-transform duration-200`}
          style={{ animation: `float-subtle ${4.5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite` }}
        >
          <div className="absolute inset-0 bg-glass pointer-events-none" />
          <div className="relative flex items-center gap-1.5 mb-1.5 text-text-secondary">
            {stat.icon}
            <span className="text-[10px] font-medium uppercase tracking-wider">{stat.label}</span>
          </div>
          <div className="relative">
            <StatValue
              rawValue={stat.rawValue}
              displayPrefix={stat.displayPrefix}
              displaySuffix={stat.displaySuffix}
              delay={1000 + i * 100}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
