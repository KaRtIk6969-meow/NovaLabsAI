"use client";

import { motion, useReducedMotion } from "framer-motion";

type AnimatedBorderProps = {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  borderWidth?: number;
  duration?: number;
};

export function AnimatedBorder({
  children,
  className = "",
  gradient = "linear-gradient(90deg, var(--svg-violet), var(--svg-link), var(--svg-cyan), var(--svg-violet))",
  borderWidth = 1,
  duration = 4,
}: AnimatedBorderProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          padding: borderWidth,
          background: gradient,
          backgroundSize: "300% 100%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        animate={
          shouldReduceMotion
            ? { backgroundPosition: "0% 50%" }
            : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
        }
        transition={{
          duration,
          repeat: shouldReduceMotion ? 0 : Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
