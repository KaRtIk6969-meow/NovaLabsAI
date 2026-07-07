"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/ui/Particles";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { NoiseTexture } from "@/components/motion/NoiseTexture";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { breathe, ease } from "@/lib/motion";

export function CTAContact() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="contact-final-cta-heading"
    >
      <Container>
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 32, filter: "blur(6px)" }}
          animate={isInView ? (shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }) : undefined}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm overflow-hidden p-8 sm:p-12 lg:p-16 text-center"
        >
          {/* Background layers */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <AnimatedGrid opacity={0.02} />
            <NoiseTexture opacity={0.015} />

            {/* Breathing aurora */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[150px]"
              animate={breathe(!!shouldReduceMotion, 0.015, 0.04)}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(circle, var(--svg-cyan) 0%, var(--svg-link) 50%, transparent 70%)",
              }}
            />

            {/* AI network SVG */}
            {!shouldReduceMotion && (
              <svg className="absolute inset-0 w-full h-full opacity-[0.04]" aria-hidden="true">
                <line x1="15%" y1="25%" x2="35%" y2="45%" stroke="var(--svg-cyan)" strokeWidth="0.5" />
                <line x1="65%" y1="20%" x2="85%" y2="40%" stroke="var(--svg-violet)" strokeWidth="0.5" />
                <line x1="25%" y1="55%" x2="45%" y2="75%" stroke="var(--svg-link)" strokeWidth="0.5" />
                <line x1="75%" y1="50%" x2="95%" y2="70%" stroke="var(--svg-cyan)" strokeWidth="0.5" />
                <circle cx="15%" cy="25%" r="2" fill="var(--svg-cyan)" />
                <circle cx="35%" cy="45%" r="2" fill="var(--svg-link)" />
                <circle cx="65%" cy="20%" r="2" fill="var(--svg-violet)" />
                <circle cx="85%" cy="40%" r="2" fill="var(--svg-cyan)" />
                <circle cx="25%" cy="55%" r="2" fill="var(--svg-link)" />
                <circle cx="45%" cy="75%" r="2" fill="var(--svg-violet)" />
                <circle cx="75%" cy="50%" r="2" fill="var(--svg-cyan)" />
                <circle cx="95%" cy="70%" r="2" fill="var(--svg-link)" />
              </svg>
            )}

            <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-r from-accent-blue/20 via-accent-violet/15 to-accent-cyan/20 pointer-events-none">
              <div className="absolute inset-0 rounded-[15px] bg-canvas-raised/80" />
            </div>
            {!shouldReduceMotion && isInView && (
              <Particles count={8} speed={0.01} maxSize={0.5} />
            )}
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.h3
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text mb-4"
            >
              Ready to Transform{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                Your Business?
              </span>
            </motion.h3>

            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
              className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto mb-8"
            >
              Book your free AI Strategy Session. We&apos;ll design a custom roadmap
              for your organization&apos;s AI transformation.
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button variant="primary" size="lg" href="#strategy-call">
                Book Your Free AI Strategy Session
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
              <Button variant="secondary" size="lg" href="/pricing">
                View Pricing
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.7, ease, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 pt-8 border-t border-hairline/50"
            >
              {["No Commitment", "2-Week Roadmap", "ROI Projections", "Enterprise Security"].map((badge) => (
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
