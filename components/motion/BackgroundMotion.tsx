"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { Particles } from "@/components/ui/Particles";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { breathe } from "@/design-system";

type BackgroundMotionProps = {
  showParticles?: boolean;
  showGrid?: boolean;
  showAurora?: boolean;
  particleCount?: number;
  className?: string;
};

export function BackgroundMotion({
  showParticles = true,
  showGrid = true,
  showAurora = true,
  particleCount = 40,
  className,
}: BackgroundMotionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      {showGrid && <AnimatedGrid opacity={0.025} />}

      {showAurora && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[180px]"
            animate={breathe(!!shouldReduceMotion)}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(ellipse, var(--svg-violet) 0%, var(--svg-link) 40%, transparent 70%)",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-[15%] w-[400px] h-[350px] rounded-full blur-[160px]"
            animate={breathe(!!shouldReduceMotion, 0.01, 0.03)}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            style={{
              background:
                "radial-gradient(circle, var(--svg-cyan) 0%, transparent 70%)",
            }}
          />
        </>
      )}

      {showParticles && !shouldReduceMotion && (
        <Particles count={particleCount} speed={0.15} maxSize={1.5} />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas" />
    </div>
  );
}
