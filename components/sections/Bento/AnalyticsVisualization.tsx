"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const barData = [40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100];

export function AnalyticsVisualization() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full min-h-[180px] flex items-end justify-center gap-[3px] px-4 pb-2">
      {barData.map((height, i) => (
        <motion.div
          key={i}
          className="relative flex-1 max-w-[14px] rounded-t-sm overflow-hidden"
          style={{ background: "rgba(124,58,237,0.08)" }}
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{
            duration: 0.6,
            delay: i * 0.06,
            ease,
          }}
        >
          {/* Bar fill */}
          <motion.div
            className="absolute inset-x-0 bottom-0 rounded-t-sm"
            style={{
              background: `linear-gradient(to top, rgba(124,58,237,0.6), rgba(59,130,246,0.4))`,
            }}
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{
              duration: 0.8,
              delay: 0.3 + i * 0.06,
              ease,
            }}
          />
          {/* Glow on top */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute top-0 inset-x-0 h-1 rounded-t-sm"
              style={{ background: "rgba(124,58,237,0.5)", filter: "blur(2px)" }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          )}
        </motion.div>
      ))}

      {/* Trend line overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 12 100" preserveAspectRatio="none" aria-hidden="true">
        <motion.polyline
          points={barData.map((h, i) => `${(i / (barData.length - 1)) * 100},${100 - h}`).join(" ")}
          fill="none"
          stroke="rgba(6,182,212,0.4)"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease }}
        />
      </svg>
    </div>
  );
}
