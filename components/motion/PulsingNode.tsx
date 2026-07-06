"use client";

import { motion, useReducedMotion } from "framer-motion";

type PulsingNodeProps = {
  color?: string;
  size?: number;
  className?: string;
};

export function PulsingNode({
  color = "bg-accent-blue",
  size = 3,
  className,
}: PulsingNodeProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative ${className ?? ""}`}>
      <div
        className={`rounded-full ${color}`}
        style={{ width: size, height: size }}
      />
      {!shouldReduceMotion && (
        <motion.div
          className={`absolute inset-0 rounded-full ${color}`}
          animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
