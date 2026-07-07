"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { AnimatedBorder } from "@/components/ui/AnimatedBorder";
import { easing } from "@/design-system";
const ease = easing.default;

const METRICS = [
  {
    value: 250,
    suffix: "+",
    label: "Enterprise Clients",
    description: "Fortune 500 companies trust NovaLabs AI",
  },
  {
    value: 99.9,
    suffix: "%",
    label: "Uptime SLA",
    description: "Enterprise-grade reliability and performance",
    decimals: 1,
  },
  {
    value: 47,
    suffix: "M",
    label: "Tasks Automated",
    description: "AI agents handling millions of operations daily",
  },
  {
    value: 10,
    suffix: "x",
    label: "Faster Deployment",
    description: "Go from concept to production in minutes",
  },
];

function MetricCard({
  metric,
  index,
  isInView,
}: {
  metric: (typeof METRICS)[number];
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 40, scale: 0.95 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease,
      }}
      className="group relative"
    >
      <div className="relative rounded-2xl border border-hairline bg-canvas-raised backdrop-blur-sm p-6 sm:p-7 text-center transition-all duration-500 hover:border-hairline-strong hover:bg-canvas-overlay">
        {/* Hover glow */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-accent-blue/[0.06] to-accent-violet/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />

        {/* Animated number */}
        <div className="relative mb-2">
          <span className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-br from-text via-text to-text-secondary bg-clip-text text-transparent">
            <AnimatedCounter
              end={metric.value}
              duration={2000}
              decimals={metric.decimals}
              suffix={metric.suffix}
            />
          </span>
        </div>

        {/* Label */}
        <h3 className="relative text-sm sm:text-base font-semibold text-text tracking-tight mb-1">
          {metric.label}
        </h3>
        <p className="relative text-xs sm:text-sm text-text-muted leading-relaxed">
          {metric.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Metrics() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.12 });
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const springBgY = useSpring(bgY, { stiffness: 50, damping: 30 });

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="metrics-heading"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: springBgY }} aria-hidden="true">
        <AnimatedGrid opacity={0.015} spacing={48} />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] bg-accent-violet/[0.02] rounded-full blur-[150px]" />
      </motion.div>

      {/* Floating decorative orbs */}
      {!shouldReduceMotion && (
        <>
           <div
             className="absolute top-16 right-[15%] w-[200px] h-[200px] bg-accent-blue/[0.04] rounded-full blur-[80px]"
            style={{ animation: "orb-drift-1 12s ease-in-out infinite" }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-20 left-[10%] w-[250px] h-[250px] bg-accent-cyan/[0.03] rounded-full blur-[90px]"
            style={{ animation: "orb-drift-2 14s ease-in-out infinite" }}
            aria-hidden="true"
          />
        </>
      )}

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-center">
          {/* Left: heading + description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease }}
          >
            <AnimatedBorder className="inline-block rounded-full" borderWidth={1} duration={5}>
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairline bg-glass text-[13px] font-medium text-body backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
                Enterprise Scale
              </span>
            </AnimatedBorder>

            <h2
              id="metrics-heading"
              className="mt-6 text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text leading-[1.1]"
            >
              Built for{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                serious
              </span>{" "}
              operations
            </h2>

            <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-lg">
              NovaLabs AI handles mission-critical workflows for the world&apos;s
              most demanding enterprises. Reliability, speed, and security are
              not features — they&apos;re foundations.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet text-white font-medium text-sm shadow-lg shadow-accent-blue/25 transition-all duration-300 hover:shadow-xl hover:shadow-accent-blue/30"
              >
                Start Building
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path d="M3.33 8h9.34M8.67 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-hairline bg-glass text-text font-medium text-sm backdrop-blur-sm transition-all duration-300 hover:border-hairline-strong hover:bg-glass-hover"
              >
                View Case Studies
              </Link>
            </div>
          </motion.div>

          {/* Right: metric cards */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {METRICS.map((metric, i) => (
              <MetricCard key={metric.label} metric={metric} index={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
