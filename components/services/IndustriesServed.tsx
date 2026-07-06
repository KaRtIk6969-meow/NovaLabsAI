"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlowCard } from "@/components/ui/GlowCard";
import { Particles } from "@/components/ui/Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ease, staggerContainer, cardEntry } from "@/lib/motion";

const INDUSTRIES = [
  {
    title: "Financial Services",
    description: "Fraud detection, algorithmic trading, risk assessment, and regulatory compliance automation.",
    icon: "bank",
    glow: "var(--svg-link-dim)",
  },
  {
    title: "Healthcare",
    description: "Clinical decision support, medical imaging analysis, patient flow optimization, and drug discovery.",
    icon: "heart",
    glow: "var(--svg-cyan-dim)",
  },
  {
    title: "Manufacturing",
    description: "Predictive maintenance, quality control, supply chain optimization, and digital twin simulations.",
    icon: "factory",
    glow: "var(--svg-violet-dim)",
  },
  {
    title: "Retail & E-Commerce",
    description: "Personalization engines, demand forecasting, inventory optimization, and conversational AI.",
    icon: "shop",
    glow: "var(--svg-success-dim)",
  },
  {
    title: "Technology",
    description: "Code generation, automated testing, infrastructure optimization, and developer productivity tools.",
    icon: "laptop",
    glow: "var(--svg-link-dim)",
  },
  {
    title: "Energy & Utilities",
    description: "Grid optimization, predictive maintenance, demand forecasting, and carbon footprint tracking.",
    icon: "bolt",
    glow: "var(--svg-cyan-dim)",
  },
];

function IndustryIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.JSX.Element> = {
    bank: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    factory: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M2 20h20M5 20V8l5 4V8l5 4V4h3v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    shop: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M3 9l9-5 9 5M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    laptop: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 20h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    bolt: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  };
  return icons[icon] || icons.factory;
}

const stagger = staggerContainer(0.1);

const cardEntryVariant = cardEntry;

export function IndustriesServed() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="industries"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="industries-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-[10%] w-[500px] h-[500px] rounded-full blur-[180px] bg-gradient-to-br from-accent-blue/[0.03] to-transparent" />
        <div className="absolute bottom-1/4 right-[15%] w-[400px] h-[400px] rounded-full blur-[160px] bg-gradient-to-br from-accent-violet/[0.02] to-transparent" />
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
            Industry Expertise
          </span>
          <h2
            id="industries-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-5"
          >
            Industries{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              We Serve
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Domain-specific AI solutions built on deep industry knowledge and proven deployment patterns.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {INDUSTRIES.map((industry, i) => (
            <motion.div key={industry.title} custom={i} variants={cardEntryVariant}>
              <GlowCard glowColor={industry.glow} className="h-full">
                <div className="p-6 sm:p-7">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-violet/10 border border-hairline flex items-center justify-center text-accent-blue mb-5 transition-all duration-300 group-hover:from-accent-blue/20 group-hover:to-accent-violet/20 group-hover:scale-105">
                    <IndustryIcon icon={industry.icon} />
                  </div>
                  <h3 className="text-lg font-semibold text-text tracking-tight mb-2 group-hover:text-accent-blue transition-colors duration-300">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {industry.description}
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
