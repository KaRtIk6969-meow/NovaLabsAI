"use client";

import { memo, useRef, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
};

const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };

export const GlowCard = memo(function GlowCard({
  children,
  className = "",
  glowColor = "var(--svg-violet-dim)",
  intensity = 15,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const glowX = useTransform(springX, [-0.5, 0.5], [-intensity, intensity]);
  const glowY = useTransform(springY, [-0.5, 0.5], [-intensity, intensity]);

  const gradientBg = useMemo(
    () => `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 70%)`,
    [glowColor]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || shouldReduceMotion) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group ${className}`}
    >
      {!shouldReduceMotion && (
        <motion.div
          className="absolute -inset-1 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            x: glowX,
            y: glowY,
            background: gradientBg,
            filter: "blur(20px)",
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
});
