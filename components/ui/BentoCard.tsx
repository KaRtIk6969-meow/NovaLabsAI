"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

type BentoCardProps = {
  children: React.ReactNode;
  className?: string;
  span?: "featured" | "standard";
  glowColor?: string;
};

const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };

export function BentoCard({
  children,
  className = "",
  span = "standard",
  glowColor = "rgba(124,58,237,0.12)",
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const spotlightX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const spotlightY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || shouldReduceMotion) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY, shouldReduceMotion]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformPerspective: 1200,
      }}
      className={`group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-colors duration-500 hover:border-white/[0.12] ${className}`}
    >
      {/* Animated gradient border on hover */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
        style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.1), rgba(6,182,212,0.12), rgba(124,58,237,0.15))",
          backgroundSize: "300% 300%",
          animation: "gradient-shift 4s ease infinite",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
        aria-hidden="true"
      />

      {/* Mouse-follow spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle 400px at ${spotlightX}% ${spotlightY}%, ${glowColor}, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
        aria-hidden="true"
      />

      {/* Soft ambient glow */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: glowColor }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
