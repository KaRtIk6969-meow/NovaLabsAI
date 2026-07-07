"use client";

import { useState, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { reveal } from "@/design-system";

const fadeUp = reveal.blurFadeUp;

const FAQ_ITEMS = [
  {
    question: "What's included in the 14-day free trial?",
    answer: "Full access to your chosen plan's features, including all AI agents, workflows, and analytics. No credit card required. At the end of the trial, you can choose to subscribe or downgrade to a free tier.",
  },
  {
    question: "Can I change plans after signing up?",
    answer: "Absolutely. You can upgrade or downgrade at any time. When upgrading, you'll be prorated for the remaining billing period. When downgrading, the change takes effect at the next billing cycle.",
  },
  {
    question: "How does the Enterprise plan pricing work?",
    answer: "Enterprise pricing is customized based on your specific needs — team size, number of AI agents, workflow volume, support level, and deployment requirements. Contact our sales team for a tailored quote. Most Enterprise customers see 340% ROI within the first year.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), ACH bank transfers, and wire transfers for Enterprise plans. Annual plans also support purchase orders.",
  },
  {
    question: "Is there a discount for annual billing?",
    answer: "Yes! Annual billing saves you 20% compared to monthly billing. That's effectively 2.4 months free per year. Enterprise plans offer additional discounts for multi-year commitments.",
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer: "We'll notify you when you're approaching your limits. You can either upgrade your plan or pay for overage at transparent per-unit rates. We never interrupt your service without warning.",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function FAQItem({ item, isOpen, onToggle }: { item: (typeof FAQ_ITEMS)[number]; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div variants={fadeUp}>
      <button
        id={`pricing-faq-trigger-${item.question}`}
        onClick={onToggle}
        className="w-full text-left flex items-start gap-4 p-5 rounded-2xl border border-hairline/50 bg-glass/30 backdrop-blur-sm transition-all duration-300 hover:border-hairline hover:bg-glass/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        aria-expanded={isOpen}
        aria-controls={`pricing-faq-answer-${item.question}`}
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-text tracking-tight pr-4">{item.question}</h3>
        </div>
        <motion.div className="shrink-0 mt-0.5"
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-5 h-5 text-text-muted" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div id={`pricing-faq-answer-${item.question}`} role="region"
            aria-labelledby={`pricing-faq-trigger-${item.question}`}
            initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
            exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <motion.div className="px-5 pb-5 pt-2"
              initial={{ y: -8 }} animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
            >
              <p className="text-sm text-text-secondary leading-relaxed">{item.answer}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function PricingFAQ() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  }, [openIndex]);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden" aria-labelledby="pricing-faq-heading">
      <Container>
        <motion.div variants={stagger} initial={shouldReduceMotion ? "visible" : "hidden"}
          animate={isInView ? "visible" : "hidden"} className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 id="pricing-faq-heading" className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text">
              Pricing{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">FAQ</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
              Everything you need to know about our pricing.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem key={item.question} item={item} isOpen={openIndex === i} onToggle={() => handleToggle(i)} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
