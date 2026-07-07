"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Particles } from "@/components/ui/Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { easing } from "@/design-system";

const ease = easing.default;

const FAQ_ITEMS = [
  {
    question: "How long does a typical enterprise AI engagement take?",
    answer: "Most engagements follow a 3-phase model: Discovery (2-4 weeks), MVP Development (6-10 weeks), and Production Deployment (4-6 weeks). Total timeline is typically 3-5 months depending on complexity. We also offer accelerated timelines for urgent use cases.",
  },
  {
    question: "Do we need to have our data ready before starting?",
    answer: "No. We include a data readiness assessment as part of our Discovery phase. Our team will help you identify, clean, and structure the data needed for your AI systems. We work with messy, siloed, and incomplete data — that's our specialty.",
  },
  {
    question: "What does the ROI typically look like?",
    answer: "Our enterprise customers see an average 340% ROI within the first year. Common value drivers include: 60-80% reduction in manual processing time, 40-60% fewer errors, and 2-3x faster decision-making. We provide detailed ROI modeling during the Discovery phase.",
  },
  {
    question: "How do you handle data security and compliance?",
    answer: "We're SOC 2 Type II, GDPR, and ISO 27001 compliant. All data processing can be done within your infrastructure (on-premise or private cloud). We never use customer data for model training, and all systems include full audit trails and encryption at rest and in transit.",
  },
  {
    question: "Can you integrate with our existing tech stack?",
    answer: "Yes. We have pre-built connectors for 200+ enterprise tools including SAP, Salesforce, ServiceNow, Snowflake, Databricks, and custom APIs. Our Integration team ensures AI systems work seamlessly within your current technology ecosystem.",
  },
  {
    question: "What happens after deployment?",
    answer: "We provide ongoing optimization, monitoring, and support. This includes model retraining, performance tuning, and feature development. Every customer gets a dedicated Solutions Architect and access to 24/7 support. Our SLA guarantees 99.99% uptime.",
  },
];

export function FAQ() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section
      ref={ref}
      id="faq"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-[20%] w-[500px] h-[500px] rounded-full blur-[180px] bg-gradient-to-br from-accent-violet/[0.03] to-transparent" />
        <div className="absolute bottom-1/3 left-[10%] w-[400px] h-[400px] rounded-full blur-[160px] bg-gradient-to-br from-accent-blue/[0.02] to-transparent" />
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
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-5"
          >
            Frequently{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Asked Questions
            </span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.question}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={isInView ? (shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : undefined}
              transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.06 }}
              className="rounded-2xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-hairline-strong"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-raised rounded-2xl"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="text-sm sm:text-base font-semibold text-text tracking-tight">
                  {item.question}
                </span>
                <motion.svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="w-5 h-5 text-text-muted flex-shrink-0"
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease }}
                  aria-hidden="true"
                >
                  <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <div className="border-t border-hairline/50 pt-4">
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
