"use client";

import { type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

type PageTransitionProps = {
  children: ReactNode;
};

const EASE = [0.22, 0.61, 0.36, 1] as const;

const pageVariants = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.99,
    filter: "blur(4px)",
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: EASE,
      delay: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.995,
    filter: "blur(2px)",
    transition: {
      duration: 0.3,
      ease: EASE,
    },
  },
};

const reducedVariants = {
  initial: { opacity: 1 },
  enter: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 1, transition: { duration: 0.1 } },
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const variants = shouldReduceMotion ? reducedVariants : pageVariants;

  return (
    <div className="relative flex-1">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={pathname}
          layout
          variants={variants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="flex-1"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
