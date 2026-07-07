"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { staggerContainer, blurFadeUp } from "@/lib/motion";

const stagger = staggerContainer(0.1, 0.12);
const fadeUp = blurFadeUp;

const SCHEDULE_ITEMS = [
  {
    label: "Average Response",
    value: "< 4 hours",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Meeting Duration",
    value: "30 minutes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Available Slots",
    value: "This week",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Business Hours",
    value: "Mon-Fri 9am-6pm EST",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function StrategyCall() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="strategy-call"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="strategy-heading"
    >
      <Container>
        <motion.div
          variants={stagger}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={fadeUp}
            className="relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div
                className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-[150px] opacity-[0.02]"
                style={{ background: "var(--svg-violet)" }}
              />
              <div
                className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full blur-[120px] opacity-[0.015]"
                style={{ background: "var(--svg-cyan)" }}
              />
              <div className="absolute inset-0 p-px bg-gradient-to-r from-accent-blue/20 via-accent-violet/15 to-accent-cyan/20 pointer-events-none rounded-2xl">
                <div className="absolute inset-0 rounded-[15px] bg-canvas-raised/80" />
              </div>
            </div>

            <div className="relative z-10 p-8 sm:p-10 lg:p-14 grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 items-center">
              {/* Left: Info */}
              <div>
                <motion.div variants={fadeUp} className="mb-6">
                  <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairline bg-glass text-[13px] font-medium text-body backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-soft" />
                    Book a Call
                  </span>
                </motion.div>

                <motion.h3
                  variants={fadeUp}
                  id="strategy-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text mb-4"
                >
                  Schedule Your Free{" "}
                  <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                    AI Strategy Session
                  </span>
                </motion.h3>

                <motion.p variants={fadeUp} className="text-base text-text-secondary leading-relaxed mb-8">
                  Talk directly with our senior AI architects. We&apos;ll assess your
                  current infrastructure, identify automation opportunities, and
                  outline a custom roadmap — all in 30 minutes.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                  <Button variant="primary" size="lg" href="/contact">
                    Book Strategy Call
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Button>
                  <Button variant="secondary" size="lg" href="mailto:hello@novolabs.ai">
                    Email Us
                  </Button>
                </motion.div>
              </div>

              {/* Right: Schedule details */}
              <motion.div variants={fadeUp} className="space-y-4">
                {SCHEDULE_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-xl border border-hairline/50 bg-glass/30 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-blue/10 text-accent-blue shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-muted">{item.label}</p>
                      <p className="text-sm font-medium text-text">{item.value}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
