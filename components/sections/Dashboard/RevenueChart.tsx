"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks";
import { easing } from "@/design-system";
const ease = easing.default;

const CHART_POINTS = [
  { x: 0, y: 65 },
  { x: 14, y: 58 },
  { x: 28, y: 62 },
  { x: 42, y: 45 },
  { x: 56, y: 50 },
  { x: 70, y: 35 },
  { x: 84, y: 28 },
  { x: 100, y: 18 },
];

function buildPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return { line: "", area: "" };
  let line = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
    const cpx2 = prev.x + (curr.x - prev.x) * 0.6;
    line += ` C ${cpx1} ${prev.y}, ${cpx2} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  const area = `${line} L 100 100 L 0 100 Z`;
  return { line, area };
}

export function RevenueChart() {
  const { line, area } = buildPath(CHART_POINTS);
  const count = useCountUp(48290, 1400, 600);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.45, duration: 0.6, ease }}
      className="relative rounded-xl border border-hairline bg-canvas-raised p-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/[0.03] to-transparent pointer-events-none" />

      <div className="relative flex items-start justify-between mb-3">
        <div>
          <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider">Revenue Growth</p>
          <p className="text-xl font-bold text-text mt-0.5">${count.toLocaleString()}</p>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold">
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
            <path d="M6 9V3M6 3L3 6M6 3l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          +38%
        </span>
      </div>

      <div className="relative h-28 w-full" aria-label="Revenue growth chart showing upward trend">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
          <defs>
            <linearGradient id="heroChartGrad" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--svg-violet)" />
              <stop offset="50%" stopColor="var(--svg-link)" />
              <stop offset="100%" stopColor="var(--svg-cyan)" />
            </linearGradient>
            <linearGradient id="heroAreaGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--svg-violet)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--svg-violet)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={area}
            fill="url(#heroAreaGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          />
          <motion.path
            d={line}
            fill="none"
            stroke="url(#heroChartGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 1.4, ease }}
          />
          <motion.circle
            cx={CHART_POINTS[CHART_POINTS.length - 1].x}
            cy={CHART_POINTS[CHART_POINTS.length - 1].y}
            r="2"
            fill="var(--svg-cyan)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.9, duration: 0.3 }}
          />
        </svg>
      </div>

      <div className="relative flex items-center gap-4 mt-2 text-[10px] text-text-muted">
        <span>Jan</span>
        <span>Mar</span>
        <span>May</span>
        <span>Jul</span>
        <span>Sep</span>
        <span>Nov</span>
      </div>
    </motion.div>
  );
}
