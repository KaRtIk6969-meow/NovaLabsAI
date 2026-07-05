"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
};

const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  href,
  onClick,
  disabled,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const glowOpacity = useTransform(
    [springX, springY],
    ([latestX, latestY]: number[]) => {
      const dist = Math.sqrt(
        (latestX as number) ** 2 + (latestY as number) ** 2
      );
      return Math.min(dist / 20, 1);
    }
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    },
    [x, y, strength]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`relative inline-flex ${className}`}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      role={href ? undefined : "button"}
      tabIndex={0}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Glow layer */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-primary/20 to-accent-cyan/20 blur-xl pointer-events-none"
        style={{ opacity: glowOpacity }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-flex">
        {inner}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex"
      type="button"
    >
      {inner}
    </button>
  );
}
