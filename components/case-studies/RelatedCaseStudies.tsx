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

export function RelatedCaseStudies() {
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
                More Case Studies
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-4"
            >
              Explore{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                All Transformations
              </span>
            </motion.h2>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CASE_STUDIES.map((study, i) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 24 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease }}
                className="group relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm p-6 transition-all duration-500 hover:border-hairline-strong hover:bg-canvas-overlay"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{study.icon}</span>
                  <div>
                    <h3 className="text-base font-semibold text-text group-hover:text-accent-blue transition-colors">
                      {study.company}
                    </h3>
                    <span className="text-xs text-text-muted">{study.industry}</span>
                  </div>
                </div>

                {/* Challenge */}
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">{study.challenge}</p>

                {/* Key metric */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-accent-cyan">
                    {study.metrics[0].value}{study.metrics[0].suffix}
                  </span>
                  <span className="text-xs text-text-muted">{study.metrics[0].label}</span>
                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between pt-4 border-t border-hairline/50">
                  <span className="text-[11px] font-mono text-text-muted">
                    {study.implementationWeeks} weeks
                  </span>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                    study.status === "active"
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-accent-blue/10 text-accent-blue border border-accent-blue/20"
                  }`}>
                    {study.status === "active" ? "Active" : "Completed"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
