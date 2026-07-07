"use client";

import { useState, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { staggerContainer, blurFadeUp } from "@/lib/motion";

const FAQ_ITEMS = [
  {
    question: "How quickly can we get started with an AI project?",
    answer: "Most projects begin within 1-2 weeks of initial consultation. Our Discovery phase typically takes 2 weeks, after which we provide a detailed roadmap, timeline, and cost estimate. For urgent needs, we can fast-track to a pilot in as little as 5 business days.",
  },
  {
    question: "What industries do you specialize in?",
    answer: "We work across financial services, healthcare, e-commerce, logistics, manufacturing, and SaaS. Our AI infrastructure is industry-agnostic, but we have deep domain expertise in regulated industries where compliance and reliability are non-negotiable.",
  },
  {
    question: "Do you offer ongoing support after deployment?",
    answer: "Yes. All enterprise plans include 24/7 monitoring, SLA-backed support, and dedicated account management. We also offer optional managed services for teams that want us to handle infrastructure, model updates, and performance optimization on an ongoing basis.",
  },
  {
    question: "What does your pricing model look like?",
    answer: "We offer flexible pricing: project-based for fixed scope, retainer for ongoing development, and usage-based for platform deployments. Every engagement starts with a free Discovery session to scope the work and align on budget before any commitment.",
  },
  {
    question: "How do you handle data privacy and security?",
    answer: "We are SOC 2 Type II certified, GDPR compliant, and HIPAA ready. All data is encrypted at rest and in transit. We support on-premise and private cloud deployments for clients with strict data residency requirements. We never use client data for model training without explicit consent.",
  },
  {
    question: "Can you work with our existing tech stack?",
    answer: "Absolutely. Our AI solutions integrate with any modern tech stack — AWS, GCP, Azure, custom infrastructure. We support all major programming languages and frameworks. Our first step is always a technical audit to understand your current architecture and identify the best integration approach.",
  },
];

const container = staggerContainer(0.1, 0.08);
const fadeUp = blurFadeUp;

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div variants={fadeUp}>
      <button
        onClick={onToggle}
        className="w-full text-left flex items-start gap-4 p-5 rounded-2xl border border-hairline/50 bg-glass/30 backdrop-blur-sm transition-all duration-300 hover:border-hairline hover:bg-glass/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        aria-expanded={isOpen}
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-text tracking-tight pr-4">
            {item.question}
          </h3>
        </div>
        <motion.div
          className="shrink-0 mt-0.5"
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="w-5 h-5 text-text-muted"
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
            exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <motion.div
              className="px-5 pb-5 pt-2"
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
            >
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQContact() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const handleToggle = useCallback(
    (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    },
    [openIndex]
  );

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <Container>
        <motion.div
          variants={container}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text"
            >
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
              Everything you need to know about working with us.
            </p>
          </motion.div>

          {/* FAQ items */}
          <motion.div variants={container} className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem
                key={item.question}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
