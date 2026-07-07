"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Particles } from "@/components/ui/Particles";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { breathe, easing } from "@/design-system";

const ease = easing.default;

export function NewsletterSubscribe() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      <Container>
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm overflow-hidden p-8 sm:p-12 lg:p-16 text-center"
        >
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <AnimatedGrid opacity={0.02} />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[150px]"
              animate={breathe(!!shouldReduceMotion, 0.015, 0.04)}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(circle, var(--svg-violet) 0%, var(--svg-link) 50%, transparent 70%)",
              }}
            />
            <div className="absolute inset-0 rounded-2xl p-px bg-gradient-to-r from-accent-blue/20 via-accent-violet/15 to-accent-cyan/20 pointer-events-none">
              <div className="absolute inset-0 rounded-[15px] bg-canvas-raised/80" />
            </div>
            {isInView && !shouldReduceMotion && (
              <Particles count={6} speed={0.01} maxSize={0.5} />
            )}
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-lg mx-auto">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.6, ease, delay: 0.3 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center mx-auto mb-6"
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" aria-hidden="true">
                <path d="M3 8l9 6 9-6M3 8v10a2 2 0 002 2h14a2 2 0 002-2V8M3 8l9-4 9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>

            <motion.h3
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease, delay: 0.35 }}
              id="newsletter-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-text mb-3"
            >
              Stay Ahead of the Curve
            </motion.h3>

            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
              className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8"
            >
              Weekly insights on enterprise AI, engineering deep dives, and practical
              guides delivered to your inbox. Join 5,000+ AI engineers.
            </motion.p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 py-4"
                role="status"
                aria-live="polite"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <svg viewBox="0 0 16 16" fill="none" className="w-5 h-5 text-green-400" aria-hidden="true">
                    <path d="M3 8l4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-green-400">
                  Welcome aboard! Check your inbox.
                </span>
              </motion.div>
            ) : (
              <motion.form
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, ease, delay: 0.45 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  aria-label="Email address for newsletter"
                  className="flex-1 rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent-blue/30 focus:shadow-[0_0_20px_var(--svg-link-dim)] transition-all duration-300"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg bg-gradient-to-r from-accent-blue to-accent-violet text-white hover:opacity-90 shadow-lg shadow-accent-blue/25 h-12 px-6 text-base gap-2"
                >
                  Subscribe
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </motion.form>
            )}

            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
              className="text-[11px] text-text-muted mt-4"
            >
              No spam. Unsubscribe anytime. We respect your data.
            </motion.p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
