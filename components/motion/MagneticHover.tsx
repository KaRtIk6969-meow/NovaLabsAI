"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMagneticHover } from "@/hooks/useMagneticHover";

type MagneticHoverProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
  glowColor?: string;
  glowSize?: number;
};

export function MagneticHover({
  children,
  strength = 0.3,
  className,
  glowColor,
  glowSize = 200,
}: MagneticHoverProps) {
  const shouldReduceMotion = useReducedMotion();
  const { ref, x, y, isHovered, handlers } = useMagneticHover({
    strength: shouldReduceMotion ? 0 : strength,
  });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      {...handlers}
      className={className}
    >
      {glowColor && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 70%)`,
            width: glowSize,
            height: glowSize,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(40px)",
            opacity: isHovered ? 0.15 : 0,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.div>
  );
}
