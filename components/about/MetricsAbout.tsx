"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Particles } from "@/components/ui/Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ease = [0.22, 1, 0.36, 1] as const;

const METRICS = [
  {
    numericValue: 500,
    suffix: "+",
    label: "Enterprise Customers",
    description: "Fortune 500 and high-growth companies trust NovaLabs",
    icon: "building",
  },
  {
    numericValue: 40,
    suffix: "+",
    label: "Countries",
    description: "Global presence with multi-region deployment infrastructure",
    icon: "globe",
  },
  {
    numericValue: 10000,
    suffix: "+",
    label: "AI Deployments",
    description: "Production AI systems running at scale across industries",
    icon: "stack",
  },
  {
    numericValue: 340,
    suffix: "%",
    label: "Average ROI",
    description: "Measurable return on investment within the first year",
    icon: "chart",
  },
  {
    numericValue: 99.99,
    suffix: "%",
    label: "Uptime SLA",
    description: "Enterprise-grade reliability with multi-region failover",
    icon: "clock",
    decimals: 2,
  },
  {
    numericValue: 100,
    prefix: "<",
    suffix: "ms",
    label: "Response Time",
    description: "Globally distributed inference for real-time AI responses",
    icon: "zap",
  },
];

function useCountUp(
  target: number,
  isInView: boolean,
  shouldReduceMotion: boolean | null,
  duration = 2000,
  decimals = 0
) {
  const [value, setValue] = useState(() => (shouldReduceMotion ? target : 0));
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((eased * target).toFixed(decimals)));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, shouldReduceMotion, target, duration, decimals]);

  return value;
}

function formatNumber(value: number, decimals = 0): string {
  if (decimals > 0) return value.toFixed(decimals);
  return value.toLocaleString("en-US");
}

function MetricIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.JSX.Element> = {
    building: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 7h6M9 11h6M9 15h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    globe: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    stack: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 3L3 8l9 5 9-5-9-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3 12l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M3 20V14l5-4 5 5 8-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="21" cy="5" r="2" fill="currentColor" />
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    zap: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  };
  return icons[icon] || icons.chart;
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardEntry = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease, delay: 0.2 + i * 0.1 },
  }),
};

function AnimatedMetric({
  metric,
  index,
  isInView,
  shouldReduceMotion,
}: {
  metric: (typeof METRICS)[number];
  index: number;
  isInView: boolean;
  shouldReduceMotion: boolean | null;
}) {
  const animatedValue = useCountUp(
    metric.numericValue,
    isInView,
    shouldReduceMotion,
    2000,
    metric.decimals ?? 0
  );

  return (
    <motion.div
      custom={index}
      variants={cardEntry}
      className="group relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm p-6 sm:p-7 transition-all duration-500 hover:border-hairline-strong hover:bg-canvas-overlay text-center"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-violet/10 border border-hairline flex items-center justify-center text-accent-blue mx-auto mb-5 transition-colors duration-300 group-hover:from-accent-blue/20 group-hover:to-accent-violet/20">
        <MetricIcon icon={metric.icon} />
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-text mb-1 tracking-tight font-mono tabular-nums">
        {metric.prefix ?? ""}
        {formatNumber(animatedValue, metric.decimals ?? 0)}
        {metric.suffix}
      </div>
      <div className="text-sm font-semibold text-text-secondary mb-2">
        {metric.label}
      </div>
      <p className="text-xs text-text-muted leading-relaxed">
        {metric.description}
      </p>
    </motion.div>
  );
}

export function MetricsAbout() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="metrics"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="metrics-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 10%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 10%, transparent 70%)",
          }}
        />
        <div className="absolute top-1/3 left-[10%] w-[500px] h-[500px] rounded-full blur-[180px] bg-gradient-to-br from-accent-blue/[0.03] to-transparent" />
        <div className="absolute bottom-1/4 right-[15%] w-[400px] h-[400px] rounded-full blur-[160px] bg-gradient-to-br from-accent-cyan/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas" />
        {!shouldReduceMotion && isInView && (
          <Particles count={5} speed={0.01} maxSize={0.4} />
        )}
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={isInView ? (shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : undefined}
          transition={{ duration: 0.8, ease }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-glass/50 backdrop-blur-sm text-[13px] font-medium text-text-secondary mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
            By the Numbers
          </span>
          <h2
            id="metrics-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-5"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Impact
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            The numbers speak for themselves. Enterprise AI at global scale.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {METRICS.map((metric, i) => (
            <AnimatedMetric
              key={metric.label}
              metric={metric}
              index={i}
              isInView={isInView}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
