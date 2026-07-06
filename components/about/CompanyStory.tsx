"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Particles } from "@/components/ui/Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ease } from "@/lib/motion";

const MILESTONES = [
  {
    year: "2019",
    title: "Founded in San Francisco",
    description:
      "NovaLabs AI was established with a vision to make enterprise-grade AI accessible to every organization.",
    icon: "rocket",
  },
  {
    year: "2020",
    title: "First Enterprise Deployment",
    description:
      "Delivered our first autonomous workflow system to a Fortune 500 financial services company.",
    icon: "building",
  },
  {
    year: "2021",
    title: "Series A & 100+ Customers",
    description:
      "Raised $42M in Series A funding and reached 100 enterprise customers across 15 countries.",
    icon: "chart",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description:
      "Opened offices in London and Singapore. Achieved SOC 2 Type II certification.",
    icon: "globe",
  },
  {
    year: "2023",
    title: "1,000+ Deployments",
    description:
      "Surpassed 1,000 production AI deployments. Launched ISO 27001 compliance program.",
    icon: "stack",
  },
  {
    year: "2024",
    title: "AI Agent Platform",
    description:
      "Released the NovaLabs Agent Platform — production-grade autonomous AI agents for enterprise workflows.",
    icon: "cpu",
  },
  {
    year: "2025",
    title: "Industry Leadership",
    description:
      "Recognized as a Leader in the Gartner Magic Quadrant for Enterprise AI Platforms.",
    icon: "trophy",
  },
];

function MilestoneIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.JSX.Element> = {
    rocket: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M10 2L13 7L18 10L13 13L10 18L7 13L2 10L7 7L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    building: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
        <rect x="4" y="3" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 7h4M8 10h4M8 13h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M3 17V11l4-3 4 4 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    globe: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 10h14M10 3c2.5 2.5 2.5 11.5 0 14M10 3c-2.5 2.5-2.5 11.5 0 14" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    stack: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M10 3L3 7.5L10 12L17 7.5L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3 10.5L10 15L17 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 13.5L10 18L17 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    cpu: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
        <rect x="5" y="5" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 2v3M12 2v3M8 15v3M12 15v3M2 8h3M2 12h3M15 8h3M15 12h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    trophy: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M6 3h8v6a4 4 0 0 1-8 0V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M6 5H4a1 1 0 0 0-1 1v1a3 3 0 0 0 3 3M14 5h2a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M10 13v2M7 17h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  };
  return icons[icon] || icons.rocket;
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

export function CompanyStory() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 40%"],
  });

  const lineHeight = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["100%", "100%"] : ["0%", "100%"]
  );

  return (
    <section
      ref={ref}
      id="story"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="story-heading"
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
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black 10%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black 10%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 left-[20%] w-[500px] h-[500px] rounded-full blur-[180px] bg-gradient-to-br from-accent-violet/[0.03] to-transparent" />
        <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] rounded-full blur-[160px] bg-gradient-to-br from-accent-cyan/[0.02] to-transparent" />
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
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-glass/50 backdrop-blur-sm text-[13px] font-medium text-text-secondary mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
            Our Journey
          </span>
          <h2
            id="story-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-5"
          >
            From Startup to{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Industry Leader
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Seven years of pushing the boundaries of what&apos;s possible with enterprise AI.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-3xl mx-auto">
          {/* Static base line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-hairline-strong to-transparent" aria-hidden="true" />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-6 sm:left-8 top-0 w-px origin-top"
            aria-hidden="true"
            style={{
              height: "100%",
              background: "linear-gradient(to bottom, var(--svg-link), var(--svg-violet), var(--svg-cyan))",
              scaleY: lineHeight,
            }}
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-12"
          >
            {MILESTONES.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                variants={fadeUp}
                className="relative flex gap-6 sm:gap-8 group/item"
              >
                {/* Dot */}
                <div className="relative z-10 flex-shrink-0 w-12 h-16 sm:w-16 sm:h-20 flex items-start justify-center pt-3">
                  <motion.div
                    className="relative"
                    whileHover={!shouldReduceMotion ? { scale: 1.2 } : undefined}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-accent-blue to-accent-violet shadow-lg shadow-accent-blue/30 transition-shadow duration-300 group-hover/item:shadow-accent-blue/50" />
                    {i === MILESTONES.length - 1 && !shouldReduceMotion && (
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent-blue animate-ping opacity-20" />
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-4 transition-colors duration-300 group-hover/item:bg-glass/20 rounded-xl -mx-2 px-2 py-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-semibold text-accent-blue">{milestone.year}</span>
                    <div className="flex items-center gap-2 text-text-muted">
                      <MilestoneIcon icon={milestone.icon} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-text tracking-tight mb-1.5">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-lg">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
