"use client";

import { memo, useState } from "react";
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

// Aggregate metrics across all case studies
const AGGREGATE_METRICS = [
  { label: "Average Cost Reduction", value: 65, suffix: "%", icon: "↓" },
  { label: "Average ROI", value: 340, suffix: "%", icon: "↑" },
  { label: "Client Retention", value: 98, suffix: "%", icon: "↑" },
  { label: "Uptime SLA", value: 99.99, suffix: "%", icon: "↑", decimals: 2 },
];

const MiniLineGraph = memo(function MiniLineGraph({
  data,
  color = "var(--svg-link)",
  height = 48,
  isInView,
}: {
  data: readonly number[];
  color?: string;
  height?: number;
  isInView: boolean;
}) {
  const max = Math.max(...data);
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 80}`)
    .join(" ");

  return (
    <div className="relative">
      <svg viewBox="0 0 100 100" className="w-full" style={{ height }} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="dash-line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.polygon
          points={`0,100 ${points} 100,100`}
          fill="url(#dash-line-grad)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, ease, delay: 0.2 }}
        />
      </svg>
    </div>
  );
});

function AggregateMetricCard({
  metric,
  index,
  isInView,
}: {
  metric: { label: string; value: number; suffix: string; icon: string; decimals?: number };
  index: number;
  isInView: boolean;
}) {
  const count = useCountUp({
    end: metric.value,
    duration: 2000,
    decimals: metric.decimals,
    startOnMount: isInView,
  });

  const [glowActive, setGlowActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease }}
      whileHover={isInView ? { y: -3, scale: 1.01 } : undefined}
      onAnimationComplete={() => {
        if (isInView) setTimeout(() => setGlowActive(true), 2200);
      }}
      className="relative rounded-xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm p-5 text-center group"
    >
      <div className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
        {metric.label}
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-text tracking-tight">
        {count}
        <span className="text-accent-cyan">{metric.suffix}</span>
      </div>

      {/* Glow pulse after count completes */}
      {glowActive && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ boxShadow: "0 0 0px rgba(0,112,243,0)" }}
          animate={{ boxShadow: ["0 0 0px rgba(0,112,243,0)", "0 0 16px rgba(0,112,243,0.12)", "0 0 0px rgba(0,112,243,0)"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}

export function ResultsDashboard() {
  const { ref: sectionRef, shouldAnimate } = useViewportAnimation({ threshold: 0.06 });
  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
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
                Results Dashboard
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-4"
            >
              Aggregated{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                Performance
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-text-secondary">
              Combined results across all enterprise deployments.
            </motion.p>
          </div>

          {/* Aggregate metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {AGGREGATE_METRICS.map((metric, i) => (
              <AggregateMetricCard key={metric.label} metric={metric} index={i} isInView={shouldAnimate} />
            ))}
          </div>

          {/* Per-study sparklines */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CASE_STUDIES.map((study) => (
              <div
                key={study.id}
                className="p-5 rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{study.icon}</span>
                  <span className="text-sm font-semibold text-text">{study.company}</span>
                </div>
                <MiniLineGraph
                  data={study.sparkline}
                  height={40}
                  isInView={shouldAnimate}
                />
                <div className="flex justify-between mt-2 text-[10px] text-text-muted font-mono">
                  <span>Month 1</span>
                  <span>Month 12</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
