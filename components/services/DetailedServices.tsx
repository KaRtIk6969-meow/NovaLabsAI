"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Particles } from "@/components/ui/Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { easing } from "@/design-system";

const ease = easing.default;

const DETAILED_SERVICES = [
  {
    title: "AI Agents",
    problem: "Manual processes consume 60% of operational bandwidth. Human agents can't scale to handle variable demand across time zones.",
    solution: "Autonomous AI agents that reason, plan, and execute multi-step workflows with human-level judgment at machine speed.",
    benefits: ["24/7 operation", "Sub-second decisions", "Infinite scale", "Full audit trails"],
    technologies: ["LLM Orchestration", "Tool Use", "Memory Systems", "Guardrails"],
    icon: "cpu",
  },
  {
    title: "Workflow Automation",
    problem: "Complex business processes span multiple systems with handoff delays, error rates, and visibility gaps.",
    solution: "Intelligent end-to-end workflows that orchestrate across your entire tech stack with real-time monitoring.",
    benefits: ["85% time reduction", "Zero handoff errors", "Real-time visibility", "Auto-scaling"],
    technologies: ["Event-Driven", "Process Mining", "Rule Engines", "Observability"],
    icon: "zap",
  },
  {
    title: "AI Consulting",
    problem: "Organizations know AI is critical but lack the expertise to identify high-impact use cases and build implementation roadmaps.",
    solution: "Senior AI architects assess your operations, identify automation opportunities, and design a phased implementation strategy.",
    benefits: ["3x faster time-to-value", "Risk mitigation", "ROI modeling", "Team enablement"],
    technologies: ["Assessment Frameworks", "TCO Analysis", "Phased Roadmaps", "Training"],
    icon: "lightbulb",
  },
  {
    title: "Custom AI Development",
    problem: "Off-the-shelf AI tools don't understand your domain, your data, or your compliance requirements.",
    solution: "Purpose-built AI systems trained on your data, fine-tuned for your domain, and deployed in your infrastructure.",
    benefits: ["Domain-specific accuracy", "Full data ownership", "Custom integrations", "IP creation"],
    technologies: ["Fine-Tuning", "RAG Pipelines", "Custom Models", "MLOps"],
    icon: "code",
  },
  {
    title: "Data Intelligence",
    problem: "Data is siloed, inconsistent, and impossible to act on in real-time. Decisions are based on gut instinct, not evidence.",
    solution: "Unified data intelligence platform with real-time analytics, predictive modeling, and automated anomaly detection.",
    benefits: ["Real-time insights", "Predictive accuracy", "Anomaly detection", "Data governance"],
    technologies: ["Stream Processing", "Feature Stores", "ML Pipelines", "BI Integration"],
    icon: "chart",
  },
  {
    title: "Enterprise Integrations",
    problem: "AI systems that don't connect to your existing tools create more work instead of less.",
    solution: "Pre-built connectors and custom API integrations that make AI work within your current technology ecosystem.",
    benefits: ["Zero disruption", "200+ connectors", "Bidirectional sync", "Enterprise security"],
    technologies: ["REST/GraphQL", "Webhooks", "ETL Pipelines", "SSO/SAML"],
    icon: "layers",
  },
];

function DetailIcon({ icon }: { icon: string }) {
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

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardEntry = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease, delay: 0.2 + i * 0.12 },
  }),
};

export function DetailedServices() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      id="detailed"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="detailed-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-[20%] w-[500px] h-[500px] rounded-full blur-[180px] bg-gradient-to-br from-accent-violet/[0.03] to-transparent" />
        <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] rounded-full blur-[160px] bg-gradient-to-br from-accent-cyan/[0.02] to-transparent" />
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
            Deep Dive
          </span>
          <h2
            id="detailed-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-5"
          >
            How We{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Solve Problems
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Every engagement follows a structured approach: understand the problem, design the solution, deliver measurable outcomes.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto space-y-4"
        >
          {DETAILED_SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardEntry}
              className="rounded-2xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-hairline-strong"
            >
              {/* Header — always visible */}
              <div className="group">
              <button
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                className="w-full flex items-center gap-4 p-6 sm:p-7 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-raised rounded-2xl"
                aria-expanded={expandedIndex === i}
                aria-controls={`service-${i}`}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-blue/10 to-accent-violet/10 border border-hairline flex items-center justify-center text-accent-blue flex-shrink-0 transition-colors duration-300 group-hover:from-accent-blue/20 group-hover:to-accent-violet/20">
                  <DetailIcon icon={service.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 id={`service-title-${i}`} className="text-lg font-semibold text-text tracking-tight group-hover:text-accent-blue transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
                <motion.svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="w-5 h-5 text-text-muted flex-shrink-0"
                  animate={{ rotate: expandedIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease }}
                  aria-hidden="true"
                >
                  <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </button>
              </div>

              {/* Expanded content */}
              <AnimatePresence initial={false}>
                {expandedIndex === i && (
                  <motion.div
                    id={`service-${i}`}
                    role="region"
                    aria-labelledby={`service-title-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-0">
                      <div className="border-t border-hairline/50 pt-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          {/* Problem */}
                          <div>
                            <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">Problem</h4>
                            <p className="text-sm text-text-secondary leading-relaxed">{service.problem}</p>
                          </div>
                          {/* Solution */}
                          <div>
                            <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-2">Solution</h4>
                            <p className="text-sm text-text-secondary leading-relaxed">{service.solution}</p>
                          </div>
                        </div>

                        {/* Benefits */}
                        <div className="mt-6">
                          <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Benefits</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.benefits.map((b) => (
                              <span
                                key={b}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-glass/30 text-xs font-medium text-text-secondary"
                              >
                                <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-accent-cyan" aria-hidden="true">
                                  <path d="M3.5 7.5l2 2 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div className="mt-6">
                          <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-3">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((t) => (
                              <span
                                key={t}
                                className="inline-flex items-center px-3 py-1.5 rounded-lg border border-hairline-strong bg-canvas-overlay text-xs font-medium text-text-muted"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
