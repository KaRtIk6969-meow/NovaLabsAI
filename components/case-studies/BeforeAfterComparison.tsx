"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { easing } from "@/design-system";
import { CASE_STUDIES } from "@/data/case-studies";

const ease = easing.default;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
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

function parseNumeric(val: string) {
  const m = val.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : NaN;
}

function suffixOf(val: string) {
  return val.replace(/[\d.]+/, "");
}

const BeforeAfterCard = memo(function BeforeAfterCard({
  study,
  isInView,
  index,
}: {
  study: (typeof CASE_STUDIES)[number];
  isInView: boolean;
  index: number;
}) {
  const beforeNum = parseNumeric(study.before.value);
  const afterNum = parseNumeric(study.after.value);
  const hasBeforeNum = !Number.isNaN(beforeNum);
  const hasAfterNum = !Number.isNaN(afterNum);
  const beforeDecimals = study.before.value.includes(".") ? 1 : 0;
  const afterDecimals = study.after.value.includes(".") ? 1 : 0;

  const beforeCount = useCountUp({
    end: hasBeforeNum ? beforeNum : 0,
    duration: 1200,
    decimals: beforeDecimals,
    startOnMount: isInView,
  });
  const afterCount = useCountUp({
    end: hasAfterNum ? afterNum : 0,
    duration: 1800,
    decimals: afterDecimals,
    startOnMount: isInView,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm overflow-hidden group"
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background: "linear-gradient(135deg, var(--svg-violet), var(--svg-link), var(--svg-cyan))",
          filter: "blur(8px)",
        }}
        aria-hidden="true"
      />
      {/* Header */}
      <div className="p-5 border-b border-hairline/50">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{study.icon}</span>
          <div>
            <h3 className="text-base font-semibold text-text">{study.company}</h3>
            <span className="text-xs text-text-muted">{study.industry}</span>
          </div>
        </div>
      </div>

      {/* Before / After */}
      <div className="p-5 grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
        {/* Before */}
        <div className="relative rounded-xl border border-hairline bg-canvas-raised/60 p-3 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{ background: "linear-gradient(135deg, var(--svg-pink) 0%, transparent 60%)" }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="text-[9px] font-mono uppercase tracking-widest text-text-muted mb-1">Before</div>
            <div className="text-[11px] text-text-secondary mb-0.5">{study.before.label}</div>
            <div className="text-lg font-bold text-text">
              {hasBeforeNum ? beforeCount : study.before.value}
              {hasBeforeNum && suffixOf(study.before.value)}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center px-1">
          <div className="w-8 h-8 rounded-full border border-hairline bg-canvas-raised flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-accent-cyan">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* After */}
        <div className="relative rounded-xl border border-accent-blue/20 bg-canvas-raised/60 p-3 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{ background: "linear-gradient(135deg, var(--svg-link) 0%, var(--svg-cyan) 60%)" }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="text-[9px] font-mono uppercase tracking-widest text-accent-cyan mb-1">After</div>
            <div className="text-[11px] text-text-secondary mb-0.5">{study.after.label}</div>
            <div className="text-lg font-bold text-text">
              {hasAfterNum ? afterCount : study.after.value}
              {hasAfterNum && suffixOf(study.after.value)}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export function BeforeAfterComparison() {
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
                Before vs After
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-4"
            >
              Measurable{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                Impact
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-text-secondary">
              Every engagement delivers quantifiable improvements across key business metrics.
            </motion.p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CASE_STUDIES.map((study, i) => (
              <BeforeAfterCard key={study.id} study={study} isInView={shouldAnimate} index={i} />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
