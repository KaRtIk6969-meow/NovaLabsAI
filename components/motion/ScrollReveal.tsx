"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  blurFadeUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  ease,
} from "@/lib/motion";

type Variant = "fade" | "blurUp" | "scale" | "slideLeft" | "slideRight";

const variantMap: Record<Variant, Variants> = {
  fade: fadeIn,
  blurUp: blurFadeUp,
  scale: scaleIn,
  slideLeft: slideInLeft,
  slideRight: slideInRight,
};

type ScrollRevealProps = {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  stagger?: boolean;
  staggerDelay?: number;
  staggerInterval?: number;
  threshold?: number;
  as?: keyof React.JSX.IntrinsicElements;
};

export function ScrollReveal({
  children,
  variant = "blurUp",
  delay = 0,
  duration,
  className,
  stagger = false,
  staggerDelay = 0.1,
  staggerInterval = 0.1,
  threshold = 0.05,
  as = "div",
}: ScrollRevealProps) {
  const { ref, isInView } = useScrollAnimation({ threshold });
  const shouldReduceMotion = useReducedMotion();

  const baseVariant = variantMap[variant];
  const variants: Variants = stagger
    ? {
        hidden: {},
        visible: {
          transition: {
            delayChildren: staggerDelay,
            staggerChildren: staggerInterval,
          },
        },
      }
    : {
        hidden: baseVariant.hidden,
        visible: {
          ...baseVariant.visible,
          transition: {
            ...(typeof baseVariant.visible === "object"
              ? (baseVariant.visible as { transition?: Record<string, unknown> })
                  .transition
              : {}),
            delay,
            ...(duration ? { duration } : {}),
          },
        },
      };

  const motionEl = motion[as as "div"];

  return (
    // @ts-expect-error -- motion[as] dynamic element typing
    <motionEl
      ref={ref}
      variants={variants}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motionEl>
  );
}
