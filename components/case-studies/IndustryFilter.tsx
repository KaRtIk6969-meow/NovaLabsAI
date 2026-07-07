"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { INDUSTRIES, type IndustryFilter as FilterType } from "@/data/case-studies";

interface IndustryFilterProps {
  active: FilterType;
  onChange: (filter: FilterType) => void;
}

export function IndustryFilter({ active, onChange }: IndustryFilterProps) {
  return (
    <section className="relative py-8 overflow-hidden">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {INDUSTRIES.map((industry) => {
            const isActive = active === industry;
            return (
              <motion.button
                key={industry}
                onClick={() => onChange(industry)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-lg shadow-accent-blue/25"
                    : "border border-hairline bg-glass/50 text-text-secondary hover:border-hairline-strong hover:text-text hover:bg-glass-hover"
                }`}
                aria-pressed={isActive}
              >
                {industry}
                {isActive && (
                  <motion.div
                    layoutId="industry-filter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
