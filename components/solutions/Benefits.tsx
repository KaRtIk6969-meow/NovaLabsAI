"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Particles } from "@/components/ui/Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { easing, staggerContainer, cardEntry } from "@/design-system";

const ease = easing.default;

const BENEFITS = [
  {
    value: "80%",
    label: "Time Saved",
    description: "Automate repetitive tasks and free your team for strategic work.",
    icon: "clock",
  },
  {
    value: "340%",
    label: "Average ROI",
    description: "Measurable return on investment within the first year of deployment.",
    icon: "chart",
  },
  {
    value: "95%",
    label: "Automation Rate",
    description: "End-to-end automation of complex business processes.",
    icon: "zap",
  },
  {
    value: "SOC 2",
    label: "Enterprise Security",
    description: "SOC 2 Type II, GDPR, ISO 27001 certified infrastructure.",
    icon: "shield",
  },
  {
    value: "100%",
    label: "Compliance",
    description: "Full audit trails, explainable AI, and regulatory compliance built-in.",
    icon: "check",
  },
];

function BenefitIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.JSX.Element> = {
    clock: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v5l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M3 20V14l5-4 5 5 8-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="21" cy="5" r="2" fill="currentColor" />
      </svg>
    ),
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
    check: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  };
  return icons[icon] || icons.check;
}

const stagger = staggerContainer(0.1);

const cardEntryVariant = cardEntry;

export function Benefits() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="benefits"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="benefits-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-[10%] w-[500px] h-[500px] rounded-full blur-[180px] bg-gradient-to-br from-accent-blue/[0.03] to-transparent" />
        <div className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] rounded-full blur-[160px] bg-gradient-to-br from-accent-cyan/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas" />
        {!shouldReduceMotion && isInView && (
          <Particles count={5} speed={0.01} maxSize={0.4} />
        )}
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={isInView ? (shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : undefined}
          transition={{ duration: 0.8, ease }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-glass/50 backdrop-blur-sm text-[13px] font-medium text-text-secondary mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
            Results
          </span>
          <h2
            id="benefits-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-5"
          >
            Measurable{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Business Impact
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Every solution is designed to deliver quantifiable outcomes from day one.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.label}
              custom={i}
              variants={cardEntryVariant}
              className="group relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm p-6 sm:p-7 transition-all duration-500 hover:border-hairline-strong hover:bg-canvas-overlay text-center"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-violet/10 border border-hairline flex items-center justify-center text-accent-blue mx-auto mb-5 transition-all duration-300 group-hover:from-accent-blue/20 group-hover:to-accent-violet/20 group-hover:scale-105">
                <BenefitIcon icon={b.icon} />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-text mb-1 tracking-tight">
                {b.value}
              </div>
              <div className="text-sm font-semibold text-text-secondary mb-2">
                {b.label}
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {b.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
