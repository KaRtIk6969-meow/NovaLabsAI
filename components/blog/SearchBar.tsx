"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { easing } from "@/design-system";

const ease = easing.default;

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div ref={ref} className="mb-8">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
        className="relative max-w-xl mx-auto"
      >
        {/* Glow ring on focus */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent-blue/10 via-accent-violet/10 to-accent-cyan/10 opacity-0 peer-focus:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

        <div className="relative flex items-center">
          {/* Search icon */}
          <div className="absolute left-4 pointer-events-none">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="w-5 h-5 text-text-muted"
              aria-hidden="true"
            >
              <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          <input
            ref={inputRef}
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search articles, topics, technologies..."
            aria-label="Search blog articles"
            className="peer w-full rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm pl-12 pr-4 py-3.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent-blue/30 focus:shadow-[0_0_20px_var(--svg-link-dim)] transition-all duration-300"
          />

          {/* Clear button */}
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => {
                onChange("");
                inputRef.current?.focus();
              }}
              className="absolute right-3 w-11 h-11 rounded-full bg-hairline/50 flex items-center justify-center text-text-muted hover:text-text hover:bg-hairline transition-colors duration-200"
              aria-label="Clear search"
            >
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
