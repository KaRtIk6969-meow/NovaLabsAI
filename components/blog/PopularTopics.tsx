"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { easing } from "@/design-system";
import { POPULAR_TOPICS } from "@/data/blog";

const ease = easing.default;

export function PopularTopics() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="topics-heading"
    >
      <Container>
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-glass/50 backdrop-blur-sm text-[13px] font-medium text-text-secondary mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse-soft" />
            Topics
          </span>
          <h2
            id="topics-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-text"
          >
            Explore by Technology
          </h2>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
        >
          {POPULAR_TOPICS.map((topic, i) => (
            <motion.button
              key={topic}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.03 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group px-4 py-2 rounded-xl border border-hairline bg-glass/50 backdrop-blur-sm text-sm font-medium text-text-secondary transition-all duration-300 hover:border-accent-blue/30 hover:bg-accent-blue/[0.06] hover:text-text hover:shadow-[0_0_16px_var(--svg-link-dim)]"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-hairline group-hover:bg-accent-blue transition-colors duration-300" />
                {topic}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
