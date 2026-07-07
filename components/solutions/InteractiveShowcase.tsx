"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Particles } from "@/components/ui/Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { easing } from "@/design-system";

const ease = easing.default;

const SHOWCASES = [
  {
    id: "dashboard",
    title: "AI Analytics Dashboard",
    description: "Real-time AI insights with predictive forecasting, anomaly detection, and automated reporting — all in one view.",
    features: ["Real-time metrics", "Predictive charts", "Anomaly alerts", "Custom reports"],
    color: "from-accent-blue to-accent-violet",
  },
  {
    id: "workflow",
    title: "Workflow Orchestration",
    description: "Visual workflow builder with AI-powered decision nodes, parallel execution, and automatic error recovery.",
    features: ["Drag-and-drop builder", "AI decision nodes", "Parallel execution", "Auto-recovery"],
    color: "from-accent-violet to-highlight-pink",
  },
  {
    id: "agent",
    title: "Agent Control Center",
    description: "Monitor, configure, and deploy AI agents across your organization with full visibility and guardrails.",
    features: ["Live monitoring", "Config panels", "Deploy controls", "Audit trails"],
    color: "from-accent-cyan to-accent-blue",
  },
];

export function InteractiveShowcase() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SHOWCASES[activeIndex];

  return (
    <section
      ref={ref}
      id="showcase"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="showcase-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-[20%] w-[500px] h-[500px] rounded-full blur-[180px] bg-gradient-to-br from-accent-violet/[0.03] to-transparent" />
        <div className="absolute bottom-1/3 left-[10%] w-[400px] h-[400px] rounded-full blur-[160px] bg-gradient-to-br from-accent-blue/[0.02] to-transparent" />
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
            Interactive Preview
          </span>
          <h2
            id="showcase-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-5"
          >
            See It{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              In Action
            </span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Tab selector */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10" role="tablist" aria-label="Showcase options">
            {SHOWCASES.map((item, i) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={activeIndex === i}
                aria-controls={`panel-${item.id}`}
                onClick={() => setActiveIndex(i)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                  activeIndex === i
                    ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-lg shadow-accent-blue/25"
                    : "border border-hairline bg-glass/30 text-text-secondary hover:text-text hover:border-hairline-strong"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Showcase panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              id={`panel-${active.id}`}
              role="tabpanel"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease }}
              className="rounded-2xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm overflow-hidden"
            >
              {/* Mock dashboard header */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-hairline bg-canvas-overlay/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-text-muted font-mono">novolabs.ai/{active.id}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 sm:p-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Left: description */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-text tracking-tight mb-3">
                      {active.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6">
                      {active.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {active.features.map((f) => (
                        <span
                          key={f}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-glass/30 text-xs font-medium text-text-secondary"
                        >
                          <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-accent-cyan" aria-hidden="true">
                            <path d="M3.5 7.5l2 2 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: mock UI */}
                  <div className={`relative rounded-xl bg-gradient-to-br ${active.color} p-px`}>
                    <div className="rounded-[11px] bg-canvas-raised p-6">
                      {/* Mini chart mockup */}
                      <div className="flex items-end gap-1 h-32 mb-4">
                        {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 rounded-t bg-gradient-to-t from-accent-blue/40 to-accent-violet/60"
                            initial={shouldReduceMotion ? { height: `${h}%` } : { height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                          />
                        ))}
                      </div>
                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-hairline/50">
                        {[
                          { label: "Active", value: "1,247" },
                          { label: "Resolved", value: "8,932" },
                          { label: "Accuracy", value: "99.2%" },
                        ].map((s) => (
                          <div key={s.label} className="text-center">
                            <div className="text-sm font-bold text-text">{s.value}</div>
                            <div className="text-[10px] text-text-muted">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
