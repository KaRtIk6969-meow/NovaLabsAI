"use client";

import { motion } from "framer-motion";
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

const PHASES = [
  { name: "Discovery", description: "Requirements, data audit, architecture design", duration: "2-4 weeks", icon: "🔍" },
  { name: "Development", description: "AI model training, integration, testing", duration: "4-8 weeks", icon: "⚡" },
  { name: "Deployment", description: "Production rollout, monitoring, optimization", duration: "1-2 weeks", icon: "🚀" },
];

export function DeliveryTimeline() {
  const { ref: sectionRef, shouldAnimate } = useViewportAnimation({ threshold: 0.06 });
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
                Delivery Process
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-4"
            >
              From Strategy to{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                Production
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-text-secondary">
              Our proven 3-phase delivery methodology ensures rapid, reliable deployment.
            </motion.p>
          </div>

          {/* Timeline phases */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-12 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan opacity-30 hidden sm:block" aria-hidden="true" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {PHASES.map((phase, i) => (
                  <motion.div
                    key={phase.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.2, ease }}
                    className="relative text-center"
                  >
                    {/* Phase dot */}
                    <div className="relative z-10 mx-auto mb-4">
                      <div className="w-12 h-12 rounded-full border-2 border-accent-blue bg-canvas-raised flex items-center justify-center mx-auto shadow-[0_0_16px_var(--svg-link-dim)]">
                        <span className="text-xl">{phase.icon}</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent-blue text-white text-[10px] font-bold flex items-center justify-center">
                        {i + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-text mb-2">{phase.name}</h3>
                    <p className="text-sm text-text-secondary mb-2">{phase.description}</p>
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono text-accent-cyan border border-accent-cyan/20 bg-accent-cyan/5">
                      {phase.duration}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Implementation times */}
          <motion.div variants={fadeUp} className="mt-16 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {CASE_STUDIES.map((study) => (
                <div
                  key={study.id}
                  className="text-center p-4 rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm"
                >
                  <span className="text-xl mb-1 block">{study.icon}</span>
                  <div className="text-lg font-bold text-text">{study.implementationWeeks}w</div>
                  <div className="text-[10px] text-text-muted">{study.company}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
