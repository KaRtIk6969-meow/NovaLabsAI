"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Particles } from "@/components/ui/Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { easing } from "@/design-system";

const ease = easing.default;

const LAYERS = [
  {
    label: "Client Applications",
    items: ["Web App", "Mobile", "API", "Webhooks"],
    color: "from-accent-blue to-accent-violet",
  },
  {
    label: "AI Gateway",
    items: ["Rate Limiting", "Auth", "Routing", "Load Balancing"],
    color: "from-accent-violet to-highlight-pink",
  },
  {
    label: "AI Engine",
    items: ["LLM Orchestration", "RAG Pipeline", "Agent Runtime", "Tool Use"],
    color: "from-highlight-pink to-accent-cyan",
  },
  {
    label: "Data Layer",
    items: ["Vector DB", "Feature Store", "Cache", "Data Lake"],
    color: "from-accent-cyan to-accent-blue",
  },
  {
    label: "Infrastructure",
    items: ["Multi-Region", "Auto-Scaling", "Monitoring", "Security"],
    color: "from-accent-blue to-accent-violet",
  },
];

export function Architecture() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="architecture"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="architecture-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-[20%] w-[500px] h-[500px] rounded-full blur-[180px] bg-gradient-to-br from-accent-violet/[0.03] to-transparent" />
        <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] rounded-full blur-[160px] bg-gradient-to-br from-accent-cyan/[0.02] to-transparent" />
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
            Platform
          </span>
          <h2
            id="architecture-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-5"
          >
            Enterprise-Grade{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              AI Architecture
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            A purpose-built platform designed for reliability, scale, and security at enterprise level.
          </p>
        </motion.div>

        {/* Architecture stack */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="space-y-4"
          >
            {LAYERS.map((layer, i) => (
              <motion.div
                key={layer.label}
                variants={{
                  hidden: { opacity: 0, x: i % 2 === 0 ? -24 : 24, filter: "blur(6px)" },
                  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
                }}
                className="relative group"
              >
                <div className={`relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm p-5 sm:p-6 transition-all duration-500 hover:border-hairline-strong overflow-hidden`}>
                  {/* Gradient accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${layer.color} opacity-40 group-hover:opacity-70 transition-opacity duration-300`} aria-hidden="true" />

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-shrink-0">
                      <h3 className="text-sm font-bold text-text tracking-tight">
                        {layer.label}
                      </h3>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        {layer.items.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center px-3 py-1.5 rounded-lg border border-hairline bg-glass/30 text-xs font-medium text-text-secondary transition-colors duration-300 group-hover:border-hairline-strong group-hover:text-text"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector arrow */}
                {i < LAYERS.length - 1 && (
                  <div className="flex justify-center py-1" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-text-muted/30">
                      <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
