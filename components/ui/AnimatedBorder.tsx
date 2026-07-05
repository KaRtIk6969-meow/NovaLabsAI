"use client";

import { motion } from "framer-motion";

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
  gradient = "linear-gradient(90deg, #7C3AED, #3B82F6, #06B6D4, #7C3AED)",
  borderWidth = 1,
  duration = 4,
}: AnimatedBorderProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Animated gradient border */}
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
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
