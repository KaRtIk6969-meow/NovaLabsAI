"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlowCard } from "@/components/ui/GlowCard";
import { Particles } from "@/components/ui/Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { easing, staggerContainer, cardEntry } from "@/design-system";

const ease = easing.default;

const SERVICES = [
  {
    title: "AI Agents",
    description: "Production-grade autonomous agents that handle complex workflows, make decisions, and scale with your operations.",
    icon: "cpu",
    glow: "var(--svg-violet-dim)",
  },
  {
    title: "Workflow Automation",
    description: "End-to-end intelligent workflows that eliminate manual bottlenecks and accelerate operational throughput.",
    icon: "zap",
    glow: "var(--svg-link-dim)",
  },
  {
    title: "AI Consulting",
    description: "Strategic AI roadmaps from seasoned architects who've deployed AI at Fortune 500 scale.",
    icon: "lightbulb",
    glow: "var(--svg-cyan-dim)",
  },
  {
    title: "Custom AI Development",
    description: "Purpose-built AI systems tailored to your domain, your data, and your exact business requirements.",
    icon: "code",
    glow: "var(--svg-success-dim)",
  },
  {
    title: "Data Intelligence",
    description: "Transform raw data into actionable intelligence with real-time analytics, forecasting, and anomaly detection.",
    icon: "chart",
    glow: "var(--svg-violet-dim)",
  },
  {
    title: "Enterprise Integrations",
    description: "Seamless AI integration with your existing stack — ERP, CRM, data warehouses, and custom APIs.",
    icon: "layers",
    glow: "var(--svg-link-dim)",
  },
];

function ServiceIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.JSX.Element> = {
    cpu: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    zap: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    lightbulb: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M9 21h6M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M3 20V14l5-4 5 5 8-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="21" cy="5" r="2" fill="currentColor" />
      </svg>
    ),
    layers: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };
  return icons[icon] || icons.cpu;
}

const stagger = staggerContainer(0.1);

const cardEntryVariant = cardEntry;

export function ServicesGrid() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="services"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="services-grid-heading"
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
            <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
            What We Build
          </span>
          <h2
            id="services-grid-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-5"
          >
            Enterprise AI{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Six core capabilities that cover the full AI lifecycle — from strategy to production.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {SERVICES.map((service, i) => (
            <motion.div key={service.title} custom={i} variants={cardEntryVariant}>
              <GlowCard glowColor={service.glow} className="h-full">
                <div className="p-6 sm:p-7">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-violet/10 border border-hairline flex items-center justify-center text-accent-blue mb-5 transition-all duration-300 group-hover:from-accent-blue/20 group-hover:to-accent-violet/20 group-hover:scale-105">
                    <ServiceIcon icon={service.icon} />
                  </div>
                  <h3 className="text-lg font-semibold text-text tracking-tight mb-2 group-hover:text-accent-blue transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
