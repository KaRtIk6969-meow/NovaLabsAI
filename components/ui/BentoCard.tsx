"use client";

import { useRef, useCallback, useState } from "react";
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

const defaultSpring = { stiffness: 200, damping: 25, mass: 0.5 };

export function BentoCard({
  children,
  className = "",
  glowColor = "var(--svg-violet-dim)",
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const rawMouseX = useMotionValue(50);
  const rawMouseY = useMotionValue(50);
  const springMouseX = useSpring(rawMouseX, defaultSpring);
  const springMouseY = useSpring(rawMouseY, defaultSpring);

  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const springTiltX = useSpring(rawTiltX, { stiffness: 180, damping: 22, mass: 0.6 });
  const springTiltY = useSpring(rawTiltY, { stiffness: 180, damping: 22, mass: 0.6 });

  const rotateX = useTransform(springTiltY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], [-6, 6]);

  const hoverY = useMotionValue(0);
  const springHoverY = useSpring(hoverY, { stiffness: 200, damping: 20 });
  const liftY = useTransform(springHoverY, [0, 1], [0, -4]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || shouldReduceMotion) return;
      const rect = ref.current.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;

      rawMouseX.set(((e.clientX - rect.left) / rect.width) * 100);
      rawMouseY.set(((e.clientY - rect.top) / rect.height) * 100);

      rawTiltX.set(normX);
      rawTiltY.set(normY);
    },
    [rawMouseX, rawMouseY, rawTiltX, rawTiltY, shouldReduceMotion]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    hoverY.set(1);
  }, [hoverY]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rawMouseX.set(50);
    rawMouseY.set(50);
    rawTiltX.set(0);
    rawTiltY.set(0);
    hoverY.set(0);
  }, [rawMouseX, rawMouseY, rawTiltX, rawTiltY, hoverY]);

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
        y: liftY,
      }}
      className={`group relative rounded-2xl border border-hairline bg-canvas-raised backdrop-blur-sm overflow-hidden transition-colors duration-500 hover:border-hairline-strong shadow-[0_1px_1px_rgba(0,0,0,0.05),0_2px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_2px_rgba(0,0,0,0.1),0_8px_16px_-4px_rgba(0,0,0,0.1)] ${className}`}
    >
      {/* Layered glass base */}
      <div className="absolute inset-0 rounded-2xl bg-glass pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none z-0" aria-hidden="true" />

      {/* Animated gradient border on hover */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
        style={{
          background: "linear-gradient(135deg, var(--svg-violet), var(--svg-link), var(--svg-cyan), var(--svg-violet))",
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
          background: `radial-gradient(circle 350px at ${springMouseX}% ${springMouseY}%, ${glowColor}, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
        aria-hidden="true"
      />

      {/* Inner highlight stripe (top edge reflection) */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 70%, transparent 90%)",
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
