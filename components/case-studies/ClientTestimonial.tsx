"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";
import { easing } from "@/design-system";
import { CASE_STUDIES } from "@/data/case-studies";

const ease = easing.default;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

const testimonials = CASE_STUDIES.filter((s) => s.testimonial).map((s) => ({
  ...s.testimonial!,
  company: s.company,
  industry: s.industry,
  icon: s.icon,
}));

export function ClientTestimonial() {
  const { ref: sectionRef, shouldAnimate } = useViewportAnimation({ threshold: 0.06 });
  const [active, setActive] = useState(0);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden bg-canvas">
      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
        >
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline bg-glass/50 text-[12px] font-medium text-text-secondary backdrop-blur-sm mb-4">
                Client Voices
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-4"
            >
              What Our{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                Clients Say
              </span>
            </motion.h2>
          </div>

          {/* Testimonial cards */}
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.5, ease }}
                whileHover={{ y: -2, scale: 1.005 }}
                className="relative p-8 sm:p-10 rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm text-center group"
              >
                {/* Quote mark with animation */}
                <motion.div
                  className="absolute top-6 left-8 text-6xl font-serif leading-none text-accent-blue"
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease }}
                >
                  &ldquo;
                </motion.div>

                <p className="relative z-10 text-lg sm:text-xl text-text leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[active].quote}&rdquo;
                </p>

                <footer className="relative z-10 flex items-center justify-center gap-3">
                  <motion.span
                    className="text-2xl"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {testimonials[active].icon}
                  </motion.span>
                  <div className="text-left">
                    <cite className="text-sm font-semibold text-text not-italic">
                      {testimonials[active].author}
                    </cite>
                    <div className="text-xs text-text-muted">
                      {testimonials[active].role}
                    </div>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((t, i) => (
                <motion.button
                  key={t.company}
                  onClick={() => setActive(i)}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show testimonial from ${t.company}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "bg-accent-blue w-8 shadow-[0_0_8px_var(--svg-link)]"
                      : "bg-hairline hover:bg-hairline-strong"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
