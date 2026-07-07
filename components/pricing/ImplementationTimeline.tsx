"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { easing, reveal } from "@/design-system";

const ease = easing.default;
const fadeUp = reveal.blurFadeUp;

const PHASES = [
  { number: "01", title: "Discovery & Audit", duration: "1-2 weeks", description: "We audit your operations, identify AI opportunities, and deliver a roadmap with projected ROI.", color: "var(--svg-link)" },
  { number: "02", title: "Strategy & Architecture", duration: "1 week", description: "Our architects design your AI infrastructure, select models, and plan integration points.", color: "var(--svg-violet)" },
  { number: "03", title: "MVP Development", duration: "4-6 weeks", description: "Rapid prototyping with weekly demos. Build, test, and validate against your real data.", color: "var(--svg-cyan)" },
  { number: "04", title: "Production Deployment", duration: "2-3 weeks", description: "Production-grade rollout with monitoring, guardrails, and zero-downtime deployment.", color: "var(--svg-link)" },
  { number: "05", title: "Optimization & Scale", duration: "Ongoing", description: "Continuous monitoring, model retraining, and performance tuning for maximum ROI.", color: "var(--svg-violet)" },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export function ImplementationTimeline() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden" aria-labelledby="timeline-heading">
      <Container>
        <motion.div initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, ease }} className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-glass/50 backdrop-blur-sm text-[13px] font-medium text-text-secondary mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-soft" />
            Implementation
          </span>
          <h2 id="timeline-heading" className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text">
            From Sign-Up to{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">Production</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed">
            A proven five-phase methodology that de-risks AI adoption and accelerates time-to-value.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-hairline-strong to-transparent" aria-hidden="true" />

          <motion.div variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"} className="space-y-12">
            {PHASES.map((phase) => (
              <motion.div key={phase.number} variants={fadeUp} className="relative flex gap-6 sm:gap-8 group/step">
                <div className="relative z-10 flex-shrink-0 w-16 h-16 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-hairline-strong bg-canvas-raised flex items-center justify-center transition-all duration-300 group-hover/step:border-accent-blue/50 group-hover/step:shadow-[0_0_20px_var(--svg-link-dim)]">
                    <span className="text-sm font-bold text-text-muted group-hover/step:text-accent-blue transition-colors duration-300">{phase.number}</span>
                  </div>
                </div>

                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold text-text tracking-tight">{phase.title}</h3>
                    <span className="px-2 py-0.5 rounded-md bg-glass/50 border border-hairline/30 text-[10px] font-medium text-text-muted">{phase.duration}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-lg">{phase.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
