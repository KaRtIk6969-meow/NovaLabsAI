"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type ProgressBarProps = {
  value?: number;
  color?: string;
  height?: number;
  className?: string;
  animated?: boolean;
};

export function ProgressBar({
  value = 100,
  color = "from-accent-blue to-accent-violet",
  height = 3,
  className,
  animated = true,
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: animated ? ref : undefined,
    offset: ["start 0.9", "end 0.7"],
  });

  const width = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion || !animated ? [`${value}%`, `${value}%`] : ["0%", `${value}%`]
  );

  return (
    <div
      ref={ref}
      className={`w-full rounded-full bg-hairline overflow-hidden ${className ?? ""}`}
      style={{ height }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
        style={{ width }}
      />
    </div>
  );
}
