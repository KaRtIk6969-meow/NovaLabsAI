"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/ui/Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ease = [0.22, 1, 0.36, 1] as const;

export function CTASolutions() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="solutions-cta-heading"
    >
      <Container>
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 32, filter: "blur(6px)" }}
          animate={isInView ? (shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }) : undefined}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm overflow-hidden p-8 sm:p-12 lg:p-16 text-center"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[150px]"
              animate={
                shouldReduceMotion
                  ? { opacity: 0.03 }
                  : { opacity: [0.015, 0.04, 0.015], scale: [1, 1.05, 1] }
              }
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(circle, var(--svg-violet) 0%, var(--svg-link) 50%, transparent 70%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                `,
                backgroundSize: "32px 32px",
                maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)",
              }}
            />
            <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-r from-accent-blue/20 via-accent-violet/15 to-accent-cyan/20 pointer-events-none">
              <div className="absolute inset-0 rounded-[15px] bg-canvas-raised/80" />
            </div>
            {!shouldReduceMotion && isInView && (
              <Particles count={6} speed={0.01} maxSize={0.5} />
            )}
          </div>

          <div className="relative z-10">
            <motion.h3
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text mb-4"
            >
              Ready to Deploy{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                Your AI Solution?
              </span>
            </motion.h3>

            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
              className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto mb-8"
            >
              Start with a free Discovery session. We&apos;ll match the right solution to your business challenge and deliver a deployment roadmap in 2 weeks.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button variant="primary" size="lg" href="/contact">
                Start Free Discovery
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
              <Button variant="secondary" size="lg" href="/services">
                Explore Services
              </Button>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.7, ease, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 pt-8 border-t border-hairline/50"
            >
              {["2-Week Roadmap", "No Commitment", "ROI Projections", "Enterprise Security"].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-xs sm:text-sm text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/60" />
                  {badge}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
