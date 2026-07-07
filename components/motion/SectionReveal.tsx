"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { reveal, staggerContainer } from "@/design-system";

const blurFadeUp = reveal.blurFadeUp;

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  badge?: string;
  badgeColor?: string;
  title: ReactNode;
  titleGradient?: boolean;
  description?: string;
  threshold?: number;
};

export function SectionReveal({
  children,
  className,
  badge,
  badgeColor = "bg-accent-violet",
  title,
  titleGradient = true,
  description,
  threshold = 0.05,
}: SectionRevealProps) {
  const { ref, isInView } = useScrollAnimation({ threshold });
  const shouldReduceMotion = useReducedMotion();
  const container = staggerContainer(0.05, 0.1);

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {badge && (
        <motion.div variants={blurFadeUp} className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-glass/50 backdrop-blur-sm text-[13px] font-medium text-text-secondary">
            <span className={`w-1.5 h-1.5 rounded-full ${badgeColor}`} />
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h2
        variants={blurFadeUp}
        className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text text-center max-w-2xl mx-auto mb-5"
      >
        {titleGradient ? (
          <>
            {typeof title === "string" ? title.split(" ").slice(0, -1).join(" ") + " " : ""}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              {typeof title === "string" ? title.split(" ").slice(-1) : title}
            </span>
          </>
        ) : (
          title
        )}
      </motion.h2>

      {description && (
        <motion.p
          variants={blurFadeUp}
          className="text-base sm:text-lg text-text-secondary leading-relaxed text-center max-w-2xl mx-auto mb-16"
        >
          {description}
        </motion.p>
      )}

      <motion.div variants={blurFadeUp}>{children}</motion.div>
    </motion.div>
  );
}
