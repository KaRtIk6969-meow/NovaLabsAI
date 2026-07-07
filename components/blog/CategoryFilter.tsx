"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { easing } from "@/design-system";
import { CATEGORIES, type BlogCategory } from "@/data/blog";

const ease = easing.default;

type CategoryFilterProps = {
  active: BlogCategory;
  onChange: (category: BlogCategory) => void;
};

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="mb-10">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease }}
        className="flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Filter articles by category"
      >
        {CATEGORIES.map((category) => (
          <motion.button
            key={category}
            onClick={() => onChange(category)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            role="tab"
            aria-selected={active === category}
            className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              active === category
                ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-lg shadow-accent-blue/25"
                : "border border-hairline bg-glass/50 text-text-secondary hover:border-hairline-strong hover:text-text hover:shadow-[0_0_12px_var(--svg-link-dim)]"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
