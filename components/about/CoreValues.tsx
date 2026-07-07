"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlowCard } from "@/components/ui/GlowCard";
import { Particles } from "@/components/ui/Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { easing, cardEntry as cardEntryVariant } from "@/design-system";

const ease = easing.default;

const VALUES = [
  {
    title: "Innovation First",
    description:
      "We push the boundaries of what AI can do. Our R&D team ships production-grade breakthroughs, not just research papers.",
    icon: "lightbulb",
    glow: "var(--svg-violet-dim)",
  },
  {
    title: "Enterprise Reliability",
    description:
      "99.99% uptime SLA. Sub-100ms latency. We build AI infrastructure that mission-critical operations can depend on, every second.",
    icon: "shield",
    glow: "var(--svg-link-dim)",
  },
  {
    title: "Human-Centered AI",
    description:
      "AI should amplify human capability, not replace it. We design systems that empower teams to do their best work.",
    icon: "users",
    glow: "var(--svg-cyan-dim)",
  },
  {
    title: "Security & Compliance",
    description:
      "SOC 2 Type II, GDPR, ISO 27001. We don't treat compliance as an afterthought — it's foundational to everything we build.",
    icon: "lock",
    glow: "var(--svg-success-dim)",
  },
  {
    title: "Transparent Operations",
    description:
      "Full audit trails, explainable AI decisions, and real-time monitoring. Our customers always know what their AI is doing and why.",
    icon: "eye",
    glow: "var(--svg-violet-dim)",
  },
  {
    title: "Scalable Architecture",
    description:
      "From 10 to 10,000 concurrent workflows. Our platform scales elastically without compromising latency or reliability.",
    icon: "layers",
    glow: "var(--svg-link-dim)",
  },
];

function ValueIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.JSX.Element> = {
    lightbulb: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M9 21h6M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 2l8 4v6c0 5.25-3.5 10-8 11-4.5-1-8-5.75-8-11V6l8-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17 10a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    lock: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
      </svg>
    ),
    eye: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
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
  return icons[icon] || icons.lightbulb;
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function CoreValues() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="values"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="values-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-[10%] w-[500px] h-[500px] rounded-full blur-[180px] bg-gradient-to-br from-accent-blue/[0.03] to-transparent" />
        <div className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] rounded-full blur-[160px] bg-gradient-to-br from-accent-cyan/[0.02] to-transparent" />
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
            Our Values
          </span>
          <h2
            id="values-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-5"
          >
            What{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Drives Us
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Six principles that guide every decision we make, every product we build, and every customer relationship we nurture.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {VALUES.map((value, i) => (
            <motion.div key={value.title} custom={i} variants={cardEntryVariant}>
              <GlowCard glowColor={value.glow} className="h-full">
                <div className="p-6 sm:p-7">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-violet/10 border border-hairline flex items-center justify-center text-accent-blue mb-5 transition-all duration-300 group-hover:from-accent-blue/20 group-hover:to-accent-violet/20 group-hover:scale-105">
                    <ValueIcon icon={value.icon} />
                  </div>
                  <h3 className="text-lg font-semibold text-text tracking-tight mb-2 group-hover:text-accent-blue transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {value.description}
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
