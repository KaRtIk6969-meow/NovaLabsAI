"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easing } from "@/design-system";
const ease = easing.default;

const barData = [40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100];

export function AnalyticsVisualization({ shouldAnimate }: { shouldAnimate: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const canAnimate = !shouldReduceMotion && shouldAnimate;

  return (
    <div className="relative w-full h-full min-h-[180px] flex items-end justify-center gap-[3px] px-4 pb-2">
      {barData.map((height, i) => (
        <motion.div
          key={i}
          className="relative flex-1 max-w-[14px] rounded-t-sm overflow-hidden"
          style={{ background: "var(--svg-violet-dim)" }}
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
              background: `linear-gradient(to top, var(--svg-violet), var(--svg-link))`,
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
          {canAnimate && (
            <motion.div
              className="absolute top-0 inset-x-0 h-1 rounded-t-sm"
              style={{ background: "var(--svg-violet)", filter: "blur(2px)" }}
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
          stroke="var(--svg-cyan)"
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
