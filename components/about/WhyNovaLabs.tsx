"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Particles } from "@/components/ui/Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ease = [0.22, 1, 0.36, 1] as const;

const DIFFERENTIATORS = [
  {
    title: "Sub-100ms Latency",
    description: "Our globally distributed inference network delivers responses in under 100ms, regardless of region.",
    icon: "zap",
  },
  {
    title: "Enterprise-Grade Security",
    description: "SOC 2 Type II, GDPR, ISO 27001. End-to-end encryption. Full audit trails for every AI decision.",
    icon: "shield",
  },
  {
    title: "99.99% Uptime SLA",
    description: "Multi-region failover, automatic scaling, and 24/7 SRE monitoring. We guarantee near-zero downtime.",
    icon: "clock",
  },
  {
    title: "Dedicated AI Architects",
    description: "Every enterprise customer gets a dedicated solutions architect to design and optimize their AI workflows.",
    icon: "user",
  },
  {
    title: "Custom Model Training",
    description: "Fine-tune models on your proprietary data. Our platform supports custom training pipelines with full data isolation.",
    icon: "cpu",
  },
  {
    title: "Explainable AI",
    description: "Full transparency into every decision. Audit logs, confidence scores, and reasoning traces for compliance and trust.",
    icon: "eye",
  },
];

const COMPARISON = [
  { feature: "Sub-100ms Response Time", novaLabs: true, competitor1: false, competitor2: false },
  { feature: "99.99% Uptime SLA", novaLabs: true, competitor1: false, competitor2: true },
  { feature: "SOC 2 + ISO 27001", novaLabs: true, competitor1: true, competitor2: false },
  { feature: "Custom Model Training", novaLabs: true, competitor1: false, competitor2: false },
  { feature: "Dedicated AI Architects", novaLabs: true, competitor1: false, competitor2: false },
  { feature: "Full Audit Trails", novaLabs: true, competitor1: true, competitor2: false },
  { feature: "Multi-Region Failover", novaLabs: true, competitor1: false, competitor2: true },
  { feature: "On-Premise Deployment", novaLabs: true, competitor1: false, competitor2: false },
];

function DiffIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.JSX.Element> = {
    zap: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 2l8 4v6c0 5.25-3.5 10-8 11-4.5-1-8-5.75-8-11V6l8-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 21v-1a6 6 0 0 1 12 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    cpu: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    eye: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  };
  return icons[icon] || icons.zap;
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
    transition: { duration: 0.7, ease, delay: 0.3 + i * 0.1 },
  }),
};

export function WhyNovaLabs() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="why"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="why-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-[15%] w-[500px] h-[500px] rounded-full blur-[180px] bg-gradient-to-br from-accent-blue/[0.03] to-transparent" />
        <div className="absolute bottom-0 right-[20%] w-[400px] h-[400px] rounded-full blur-[160px] bg-gradient-to-br from-accent-violet/[0.02] to-transparent" />
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
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            Why NovaLabs
          </span>
          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-5"
          >
            The{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              NovaLabs Advantage
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Enterprise AI that&apos;s faster, more secure, and more reliable than the alternatives.
          </p>
        </motion.div>

        {/* Differentiators Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-20"
        >
          {DIFFERENTIATORS.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={cardEntry}
              className="group relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm p-6 sm:p-7 transition-all duration-500 hover:border-hairline-strong hover:bg-canvas-overlay"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-violet/10 border border-hairline flex items-center justify-center text-accent-blue mb-5 transition-all duration-300 group-hover:from-accent-blue/20 group-hover:to-accent-violet/20 group-hover:scale-105">
                <DiffIcon icon={item.icon} />
              </div>
              <h3 className="text-lg font-semibold text-text tracking-tight mb-2 group-hover:text-accent-blue transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 32 }}
          animate={isInView ? (shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : undefined}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-text text-center mb-8">
            How We Compare
          </h3>
          <div className="max-w-3xl mx-auto rounded-2xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[1.5fr_auto_auto_auto] gap-4 px-5 sm:px-6 py-4 border-b border-hairline bg-canvas-overlay/50">
              <div className="text-sm font-medium text-text-muted">Feature</div>
              <div className="text-sm font-semibold text-accent-blue text-center w-20">NovaLabs</div>
              <div className="text-sm font-medium text-text-muted text-center w-20 hidden sm:block">Competitor A</div>
              <div className="text-sm font-medium text-text-muted text-center w-20 hidden sm:block">Competitor B</div>
            </div>
            {/* Rows */}
            {COMPARISON.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-[1fr_auto_auto_auto] sm:grid-cols-[1.5fr_auto_auto_auto] gap-4 px-5 sm:px-6 py-3.5 items-center transition-colors duration-200 hover:bg-glass/30 ${i < COMPARISON.length - 1 ? "border-b border-hairline/50" : ""}`}
              >
                <div className="text-sm text-text-secondary">{row.feature}</div>
                <CheckMark checked={row.novaLabs} highlight />
                <div className="hidden sm:block">
                  <CheckMark checked={row.competitor1} />
                </div>
                <div className="hidden sm:block">
                  <CheckMark checked={row.competitor2} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function CheckMark({ checked, highlight }: { checked: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-center w-20">
      {checked ? (
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${highlight ? "bg-accent-blue/20" : "bg-accent-cyan/15"}`}>
          <svg viewBox="0 0 16 16" fill="none" className={`w-3.5 h-3.5 ${highlight ? "text-accent-blue" : "text-accent-cyan"}`} aria-hidden="true">
            <path d="M4 8.5l2.5 2.5 5.5-5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-hairline/30">
          <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 text-text-muted/40" aria-hidden="true">
            <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </div>
  );
}
