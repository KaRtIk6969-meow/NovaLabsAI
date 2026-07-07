"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { COMPARISON_FEATURES } from "@/data/pricing";
import { easing } from "@/design-system";

const ease = easing.default;

function renderValue(val: boolean | string) {
  if (val === true)
    return (
      <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4 mx-auto text-accent-cyan" aria-label="Included">
        <path d="M5.5 9.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (val === false)
    return (
      <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4 mx-auto text-text-muted/40" aria-label="Not included">
        <path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  return <span className="text-sm text-text-secondary text-center">{val}</span>;
}

function ComparisonRow({
  feature,
  index,
  isInView,
}: {
  feature: (typeof COMPARISON_FEATURES)[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease }}
      className={`border-b border-hairline transition-colors duration-300 ${
        index % 2 === 0 ? "bg-transparent" : "bg-glass/30"
      }`}
    >
      <td className="py-3.5 px-4 text-sm font-medium text-text">{feature.name}</td>
      <td className="py-3.5 px-4">{renderValue(feature.starter)}</td>
      <td className="py-3.5 px-4">{renderValue(feature.growth)}</td>
      <td className="py-3.5 px-4">{renderValue(feature.enterprise)}</td>
    </motion.tr>
  );
}

export function FeatureComparison() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden" aria-labelledby="comparison-heading">
      <Container>
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairline bg-glass text-[13px] font-medium text-body backdrop-blur-md mb-4">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M2 6h12M6 2v12" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            Full Comparison
          </span>
          <h2 id="comparison-heading" className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text">
            Feature{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">Comparison</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 py-3 mb-4 rounded-xl border border-hairline bg-glass text-sm font-medium text-text-secondary transition-all duration-300 hover:border-hairline-strong hover:bg-glass-hover hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Hide comparison" : "Show full comparison"}
            <motion.svg viewBox="0 0 16 16" fill="none" className="w-4 h-4"
              animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3, ease }} aria-hidden="true"
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden"
              >
                <div className="rounded-2xl border border-hairline bg-canvas-raised backdrop-blur-sm overflow-hidden">
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-hairline">
                          <th className="py-4 px-4 text-left text-xs font-semibold text-text-muted tracking-wider uppercase">Feature</th>
                          <th className="py-4 px-4 text-center text-xs font-semibold text-text-muted tracking-wider uppercase">Starter</th>
                          <th className="py-4 px-4 text-center text-xs font-semibold text-accent-violet tracking-wider uppercase">Growth</th>
                          <th className="py-4 px-4 text-center text-xs font-semibold text-text-muted tracking-wider uppercase">Enterprise</th>
                        </tr>
                      </thead>
                      <tbody>
                        {COMPARISON_FEATURES.map((feature, i) => (
                          <ComparisonRow key={feature.name} feature={feature} index={i} isInView={isInView} />
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="sm:hidden divide-y divide-hairline">
                    {COMPARISON_FEATURES.map((feature, i) => (
                      <motion.div key={feature.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, delay: i * 0.05, ease }}
                        className="p-4"
                      >
                        <p className="text-sm font-medium text-text mb-3">{feature.name}</p>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="text-center">
                            <p className="text-[10px] text-text-muted mb-1 uppercase tracking-wider">Starter</p>
                            {renderValue(feature.starter)}
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] text-accent-violet mb-1 uppercase tracking-wider">Growth</p>
                            {renderValue(feature.growth)}
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] text-text-muted mb-1 uppercase tracking-wider">Enterprise</p>
                            {renderValue(feature.enterprise)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
