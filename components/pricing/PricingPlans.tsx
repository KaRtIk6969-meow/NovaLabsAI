"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useMouseSpotlight } from "@/hooks/useMouseSpotlight";
import { pricingTiers } from "@/data/pricing";
import { easing, reveal } from "@/design-system";

const ease = easing.default;
const fadeUp = reveal.blurFadeUp;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

function AnimatedCheck({ isInView, delay }: { isInView: boolean; delay: number }) {
  return (
    <motion.svg viewBox="0 0 18 18" fill="none" className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true">
      <motion.circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" className="text-accent-cyan/30"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: delay * 0.08 + 0.3, ease }}
      />
      <motion.path d="M5.5 9.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-cyan"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: delay * 0.08 + 0.6, ease }}
      />
    </motion.svg>
  );
}

function AnimatedCross({ delay }: { delay: number }) {
  return (
    <motion.svg viewBox="0 0 18 18" fill="none" className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true"
      initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: delay * 0.08 + 0.3 }}
    >
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" className="text-text-muted/20" />
      <path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-text-muted/40" />
    </motion.svg>
  );
}

function PricingCard({
  tier, isYearly, isInView,
}: {
  tier: (typeof pricingTiers)[number];
  isYearly: boolean;
  isInView: boolean;
}) {
  const { x, y, isHovered, handlers } = useMouseSpotlight();
  const spotlightBg = `radial-gradient(circle 350px at ${x}% ${y}%, ${tier.glowColor}, transparent 70%)`;
  const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;

  return (
    <motion.div variants={cardVariants} className="relative">
      {tier.badge && (
        <motion.div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 20 }}
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet text-[11px] font-bold text-white tracking-wider uppercase shadow-lg shadow-accent-blue/30">
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
              <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 4.5 4.5 4 6 1z" fill="currentColor" />
            </svg>
            {tier.badge}
          </span>
        </motion.div>
      )}

      <motion.div {...handlers} whileHover={{ y: -8, transition: { duration: 0.3, ease } }}
        className={`relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-colors duration-500 ${
          tier.highlighted
            ? "border-accent-violet/30 bg-canvas-raised shadow-[0_0_40px_rgba(121,40,202,0.12)]"
            : "border-hairline bg-canvas-raised hover:border-hairline-strong"
        }`}
      >
        <motion.div className="absolute inset-0 pointer-events-none z-0"
          style={{ background: spotlightBg, opacity: isHovered ? 1 : 0, transition: "opacity 0.5s ease" }}
          aria-hidden="true"
        />

        {tier.highlighted && (
          <div className="absolute top-0 inset-x-0 h-[2px] pointer-events-none z-10"
            style={{ background: "linear-gradient(90deg, var(--svg-link), var(--svg-violet), var(--svg-cyan))", backgroundSize: "200% 100%", animation: "border-rotate 4s linear infinite" }}
            aria-hidden="true"
          />
        )}

        <div className="relative z-10 p-6 sm:p-8">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-text tracking-tight">{tier.name}</h3>
            <p className="mt-1 text-sm text-text-secondary leading-relaxed">{tier.description}</p>
          </div>

          <div className="flex items-baseline gap-1 mb-6">
            <AnimatePresence mode="wait">
              <motion.span key={price}
                initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease }}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-text"
              >{price}</motion.span>
            </AnimatePresence>
            {tier.period && <span className="text-sm text-text-muted font-medium">{tier.period}</span>}
          </div>

          <div className="mb-8">
            <MagneticButton strength={0.2} href={tier.href}>
              <span className={`group/btn relative inline-flex items-center justify-center w-full px-6 py-3 rounded-xl font-medium text-[15px] transition-all duration-300 ${
                tier.highlighted
                  ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-lg shadow-accent-blue/25 hover:shadow-xl hover:shadow-accent-blue/30"
                  : "border border-hairline bg-glass text-text hover:border-hairline-strong hover:bg-glass-hover"
              }`}>
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  {tier.cta}
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">
                    <path d="M3.33 8h9.34M8.67 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </MagneticButton>
          </div>

          <div className="space-y-3">
            {tier.features.map((feature, i) => (
              <div key={feature.text} className="flex items-start gap-3">
                {feature.included ? <AnimatedCheck isInView={isInView} delay={i} /> : <AnimatedCross delay={i} />}
                <span className={`text-sm leading-relaxed ${feature.included ? "text-text-secondary" : "text-text-muted/50"}`}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {tier.highlighted && (
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-30 pointer-events-none"
            style={{ background: tier.glowColor }} aria-hidden="true"
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export function PricingPlans() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.08 });
  const [isYearly, setIsYearly] = useState(false);
  const handleToggle = useCallback(() => setIsYearly((p) => !p), []);

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden" id="plans" aria-labelledby="plans-heading">
      <Container>
        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairline bg-glass text-[13px] font-medium text-body backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-soft" />
            Simple Pricing
          </span>
          <h2 id="plans-heading" className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">AI Plan</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
            Start small, scale fast. Every plan includes a 14-day free trial with no credit card required.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}
          className="flex items-center justify-center gap-4 mb-14"
        >
          <span className={`text-sm font-medium transition-colors duration-300 ${!isYearly ? "text-text" : "text-text-muted"}`}>Monthly</span>
          <button onClick={handleToggle} role="switch" aria-checked={isYearly} aria-label="Toggle monthly and yearly billing"
            className="relative w-14 h-11 rounded-full border border-hairline bg-canvas-raised transition-colors duration-300 hover:border-hairline-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            <motion.div className="absolute top-1/2 -translate-y-1/2 left-[3px] w-5 h-5 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet shadow-lg shadow-accent-blue/25"
              animate={{ x: isYearly ? 28 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm font-medium transition-colors duration-300 ${isYearly ? "text-text" : "text-text-muted"}`}>Yearly</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-cyan/10 text-[11px] font-semibold text-accent-cyan tracking-wide uppercase">
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
              <path d="M6 1v10M3 4l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Save 20%
          </span>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {pricingTiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} isYearly={isYearly} isInView={isInView} />
          ))}
        </motion.div>

        <motion.p variants={fadeUp} initial="hidden" animate={isInView ? "visible" : "hidden"}
          className="text-center text-sm text-text-muted mt-10"
        >
          All plans include SSL, 99.9% uptime SLA, and GDPR compliance.
        </motion.p>
      </Container>
    </section>
  );
}
