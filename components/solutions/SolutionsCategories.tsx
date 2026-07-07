"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlowCard } from "@/components/ui/GlowCard";
import { Particles } from "@/components/ui/Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { easing, staggerContainer, cardEntry } from "@/design-system";

const ease = easing.default;

const CATEGORIES = [
  {
    title: "AI Agents",
    description: "Autonomous agents that reason, plan, and execute multi-step tasks across your entire tech stack.",
    icon: "cpu",
    glow: "var(--svg-violet-dim)",
  },
  {
    title: "Workflow Automation",
    description: "Intelligent end-to-end workflows that eliminate manual bottlenecks and scale with demand.",
    icon: "zap",
    glow: "var(--svg-link-dim)",
  },
  {
    title: "Customer Support AI",
    description: "AI-powered support systems that resolve 80% of tickets instantly while escalating complex cases to humans.",
    icon: "headset",
    glow: "var(--svg-cyan-dim)",
  },
  {
    title: "Sales Automation",
    description: "AI that qualifies leads, personalizes outreach, and predicts deal outcomes with surgical precision.",
    icon: "trending",
    glow: "var(--svg-success-dim)",
  },
  {
    title: "Business Intelligence",
    description: "Real-time analytics, predictive modeling, and automated reporting that turns data into decisions.",
    icon: "chart",
    glow: "var(--svg-violet-dim)",
  },
  {
    title: "Enterprise Search",
    description: "Semantic search across all your data sources — documents, databases, APIs, and knowledge bases.",
    icon: "search",
    glow: "var(--svg-link-dim)",
  },
];

function CategoryIcon({ icon }: { icon: string }) {
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
    headset: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="1" y="15" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="19" y="15" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    trending: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="17 6 23 6 23 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M3 20V14l5-4 5 5 8-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="21" cy="5" r="2" fill="currentColor" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  };
  return icons[icon] || icons.cpu;
}

const stagger = staggerContainer(0.1);

const cardEntryVariant = cardEntry;

export function SolutionsCategories() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="categories"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="categories-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-[10%] w-[500px] h-[500px] rounded-full blur-[180px] bg-gradient-to-br from-accent-blue/[0.03] to-transparent" />
        <div className="absolute bottom-1/4 right-[15%] w-[400px] h-[400px] rounded-full blur-[160px] bg-gradient-to-br from-accent-cyan/[0.02] to-transparent" />
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
            Solutions
          </span>
          <h2
            id="categories-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-5"
          >
            Purpose-Built{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              AI Solutions
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Six production-ready solutions that address the highest-impact business challenges.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {CATEGORIES.map((cat, i) => (
            <motion.div key={cat.title} custom={i} variants={cardEntryVariant}>
              <GlowCard glowColor={cat.glow} className="h-full">
                <div className="p-6 sm:p-7">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-violet/10 border border-hairline flex items-center justify-center text-accent-blue mb-5 transition-all duration-300 group-hover:from-accent-blue/20 group-hover:to-accent-violet/20 group-hover:scale-105">
                    <CategoryIcon icon={cat.icon} />
                  </div>
                  <h3 className="text-lg font-semibold text-text tracking-tight mb-2 group-hover:text-accent-blue transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {cat.description}
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
