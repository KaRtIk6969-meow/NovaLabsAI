"use client";

import { useReducedMotion, motion } from "framer-motion";

type FlowingPacketProps = {
  color?: string;
  duration?: number;
  className?: string;
  direction?: "right" | "left" | "down" | "up";
  delay?: number;
};

export function FlowingPacket({
  color = "var(--svg-cyan)",
  duration = 3,
  className,
  direction = "right",
  delay = 0,
}: FlowingPacketProps) {
  const shouldReduceMotion = useReducedMotion();

  const isHorizontal = direction === "right" || direction === "left";
  const from = direction === "right" || direction === "down" ? "0%" : "100%";
  const to = direction === "right" || direction === "down" ? "100%" : "0%";

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      {!shouldReduceMotion && (
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 8px ${color}`,
            ...(isHorizontal ? { top: "50%", left: from } : { left: "50%", top: from }),
          }}
          animate={isHorizontal ? { left: [from, to] } : { top: [from, to] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
            delay,
          }}
        />
      )}
    </div>
  );
}
