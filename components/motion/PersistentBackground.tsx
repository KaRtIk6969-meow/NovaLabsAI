"use client";

import { useReducedMotion } from "framer-motion";

const AURORA_CLASSES = {
  primary:
    "absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[200px] animate-aurora-breathe-primary",
  secondary:
    "absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full blur-[160px] animate-aurora-breathe-secondary",
  tertiary:
    "absolute top-[60%] left-[15%] w-[350px] h-[350px] rounded-full blur-[150px] animate-aurora-breathe-tertiary",
} as const;

export function PersistentBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 contain-layout contain-paint contain-style" aria-hidden="true">
      {/* Grid */}
      <div className="hero-grid absolute inset-0 opacity-[0.02]" />

      {/* Primary aurora — violet/blue */}
      {!shouldReduceMotion && (
        <div
          className={AURORA_CLASSES.primary}
          style={{
            background:
              "radial-gradient(ellipse, var(--svg-violet) 0%, var(--svg-link) 40%, transparent 70%)",
            willChange: "transform, opacity",
          }}
        />
      )}

      {/* Secondary aurora — cyan */}
      {!shouldReduceMotion && (
        <div
          className={AURORA_CLASSES.secondary}
          style={{
            background:
              "radial-gradient(circle, rgba(80,227,194,0.03) 0%, transparent 70%)",
            willChange: "transform, opacity",
          }}
        />
      )}

      {/* Tertiary glow — subtle violet drift */}
      {!shouldReduceMotion && (
        <div
          className={AURORA_CLASSES.tertiary}
          style={{
            background:
              "radial-gradient(circle, rgba(121,40,202,0.025) 0%, transparent 70%)",
            willChange: "transform, opacity",
          }}
        />
      )}

      {/* Fade edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas" />
    </div>
  );
}
