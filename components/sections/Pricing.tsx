"use client";

import { useState, useCallback, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionTemplate,
  type Variants,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedBorder } from "@/components/ui/AnimatedBorder";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { CursorLight } from "@/components/ui/CursorLight";
import { useScrollAnimation } from "@/hooks";
import { useMouseSpotlight } from "@/hooks/useMouseSpotlight";
import { useCountUp } from "@/hooks";
import {
  pricingTiers,
  COMPARISON_FEATURES,
  ROI_COMPANY_SIZES,
  ROI_AUTOMATION_LEVELS,
} from "@/data/pricing";
import { easing, reveal, float } from "@/design-system";
const ease = easing.default;
const blurFadeUp = reveal.blurFadeUp;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

const fadeUp: Variants = blurFadeUp;

const floatVariants: Variants = float;

/* ═══════════════════════════════════════════
   PRICING HEADER
   ═══════════════════════════════════════════ */

function PricingHeader({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="text-center max-w-2xl mx-auto mb-12"
    >
      <AnimatedBorder className="inline-block rounded-full mb-6" borderWidth={1} duration={5}>
        <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairline bg-glass text-[13px] font-medium text-body backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" aria-hidden="true" />
          Simple Pricing
        </span>
      </AnimatedBorder>
      <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text">
        Choose your{" "}
        <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
          AI plan
        </span>
      </h2>
      <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
        Start small, scale fast. Every plan includes a 14-day free trial with no
        credit card required.
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   BILLING TOGGLE
   ═══════════════════════════════════════════ */

function BillingToggle({
  isYearly,
  onToggle,
}: {
  isYearly: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-center justify-center gap-4 mb-14"
    >
      <span
        className={`text-sm font-medium transition-colors duration-300 ${
          !isYearly ? "text-text" : "text-text-muted"
        }`}
      >
        Monthly
      </span>

      <button
        onClick={onToggle}
        className="relative w-14 h-7 rounded-full border border-hairline bg-canvas-raised transition-colors duration-300 hover:border-hairline-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        role="switch"
        aria-checked={isYearly}
        aria-label="Toggle between monthly and yearly billing"
      >
        <motion.div
          className="absolute top-[3px] left-[3px] w-5 h-5 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet shadow-lg shadow-accent-blue/25"
          animate={{ x: isYearly ? 28 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>

      <span
        className={`text-sm font-medium transition-colors duration-300 ${
          isYearly ? "text-text" : "text-text-muted"
        }`}
      >
        Yearly
      </span>

      <AnimatedBorder className="inline-block rounded-full" borderWidth={1} duration={4}>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-cyan/10 text-[11px] font-semibold text-accent-cyan tracking-wide uppercase">
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
            <path d="M6 1v10M3 4l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Save 20%
        </span>
      </AnimatedBorder>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   ANIMATED CHECKMARK
   ═══════════════════════════════════════════ */

function AnimatedCheck({ isInView, delay }: { isInView: boolean; delay: number }) {
  return (
    <motion.svg
      viewBox="0 0 18 18"
      fill="none"
      className="w-4 h-4 shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <motion.circle
        cx="9"
        cy="9"
        r="8"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-accent-cyan/30"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: delay * 0.08 + 0.3, ease }}
      />
      <motion.path
        d="M5.5 9.5l2.5 2.5 4.5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-accent-cyan"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.4, delay: delay * 0.08 + 0.6, ease }}
      />
    </motion.svg>
  );
}

function AnimatedCross({ delay }: { delay: number }) {
  return (
    <motion.svg
      viewBox="0 0 18 18"
      fill="none"
      className="w-4 h-4 shrink-0 mt-0.5"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: delay * 0.08 + 0.3 }}
    >
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.2" className="text-text-muted/20" />
      <path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="text-text-muted/40" />
    </motion.svg>
  );
}

/* ═══════════════════════════════════════════
   PRICING CARD
   ═══════════════════════════════════════════ */

function PricingCard({
  tier,
  isYearly,
  isInView,
}: {
  tier: (typeof pricingTiers)[number];
  isYearly: boolean;
  isInView: boolean;
}) {
  const { x, y, isHovered, handlers } = useMouseSpotlight();
  const spotlightBg = useMotionTemplate`radial-gradient(circle 350px at ${x}% ${y}%, ${tier.glowColor}, transparent 70%)`;

  const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;

  return (
    <motion.div
      variants={cardVariants}
      className="relative"
    >
      {/* Most Popular ribbon */}
      {tier.badge && (
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet text-[11px] font-bold text-white tracking-wider uppercase shadow-lg shadow-accent-blue/30">
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
              <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 4.5 4.5 4 6 1z" fill="currentColor" />
            </svg>
            {tier.badge}
          </span>
        </motion.div>
      )}

      <motion.div
        {...handlers}
        whileHover={{ y: -8, transition: { duration: 0.3, ease } }}
        className={`relative rounded-2xl border backdrop-blur-sm overflow-hidden transition-colors duration-500 ${
          tier.highlighted
            ? "border-accent-violet/30 bg-canvas-raised"
            : "border-hairline bg-canvas-raised hover:border-hairline-strong"
        } ${tier.highlighted ? "shadow-[0_0_40px_rgba(121,40,202,0.12)]" : ""}`}
      >
        {/* Cursor spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ background: spotlightBg, opacity: isHovered ? 1 : 0, transition: "opacity 0.5s ease" }}
          aria-hidden="true"
        />

        {/* Top gradient line */}
        {tier.highlighted && (
          <div
            className="absolute top-0 inset-x-0 h-[2px] pointer-events-none z-10"
            style={{
              background: "linear-gradient(90deg, var(--svg-link), var(--svg-violet), var(--svg-cyan))",
              backgroundSize: "200% 100%",
              animation: "border-rotate 4s linear infinite",
            }}
            aria-hidden="true"
          />
        )}

        {/* Glass sweep on hover */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 55%, transparent 60%)",
            backgroundSize: "200% 100%",
            animation: "glass-sweep 12s linear infinite",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 p-6 sm:p-8">
          {/* Plan name */}
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-text tracking-tight">
              {tier.name}
            </h3>
            <p className="mt-1 text-sm text-text-secondary leading-relaxed">
              {tier.description}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1 mb-6">
            <AnimatePresence mode="wait">
              <motion.span
                key={price}
                initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease }}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-text"
              >
                {price}
              </motion.span>
            </AnimatePresence>
            {tier.period && (
              <span className="text-sm text-text-muted font-medium">
                {tier.period}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="mb-8">
            <MagneticButton strength={0.2} href={tier.href}>
              <span
                className={`group/btn relative inline-flex items-center justify-center w-full px-6 py-3 rounded-xl font-medium text-[15px] transition-all duration-300 ${
                  tier.highlighted
                    ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-lg shadow-accent-blue/25 hover:shadow-xl hover:shadow-accent-blue/30"
                    : "border border-hairline bg-glass text-text hover:border-hairline-strong hover:bg-glass-hover"
                }`}
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  {tier.cta}
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    aria-hidden="true"
                  >
                    <path d="M3.33 8h9.34M8.67 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </MagneticButton>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {tier.features.map((feature, i) => (
              <div key={feature.text} className="flex items-start gap-3">
                {feature.included ? (
                  <AnimatedCheck isInView={isInView} delay={i} />
                ) : (
                  <AnimatedCross delay={i} />
                )}
                <span
                  className={`text-sm leading-relaxed ${
                    feature.included ? "text-text-secondary" : "text-text-muted/50"
                  }`}
                >
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ambient corner glow for highlighted */}
        {tier.highlighted && (
          <div
            className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-30 pointer-events-none"
            style={{ background: tier.glowColor }}
            aria-hidden="true"
          />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   ROI CALCULATOR
   ═══════════════════════════════════════════ */

function ROICalculator({ isInView }: { isInView: boolean }) {
  const [companySize, setCompanySize] = useState(2);
  const [employees, setEmployees] = useState(3);
  const [automationLevel, setAutomationLevel] = useState(1);

  const sizeData = ROI_COMPANY_SIZES[companySize];
  const levelData = ROI_AUTOMATION_LEVELS[automationLevel];
  const employeeCount = [5, 10, 25, 50, 100, 500, 1000][employees];

  const annualSavings = useMemo(() => {
    const base = employeeCount * 1200;
    return Math.round(base * sizeData.multiplier * levelData.multiplier);
  }, [employeeCount, sizeData.multiplier, levelData.multiplier]);

  const savingsDisplay = useCountUp({
    end: annualSavings,
    duration: 800,
    startOnMount: isInView,
  });

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mt-20 sm:mt-24"
    >
      <div className="text-center mb-10">
        <AnimatedBorder className="inline-block rounded-full mb-5" borderWidth={1} duration={6}>
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairline bg-glass text-[13px] font-medium text-body backdrop-blur-md">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M2 12l3-8 3 4 3-6 3 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            ROI Calculator
          </span>
        </AnimatedBorder>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
          Calculate your{" "}
          <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
            savings
          </span>
        </h3>
        <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-md mx-auto">
          See how much your business could save with AI automation.
        </p>
      </div>

      <div className="max-w-4xl mx-auto rounded-2xl border border-hairline bg-canvas-raised backdrop-blur-sm p-6 sm:p-8 lg:p-10">
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {/* Company Size */}
          <div>
            <label className="block text-sm font-medium text-text mb-3">
              Company Size
            </label>
            <div className="flex flex-wrap gap-2">
              {ROI_COMPANY_SIZES.map((size, i) => (
                <button
                  key={size.label}
                  onClick={() => setCompanySize(i)}
                  aria-pressed={companySize === i}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link ${
                    companySize === i
                      ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-md shadow-accent-blue/20"
                      : "border border-hairline bg-glass text-text-secondary hover:border-hairline-strong hover:bg-glass-hover"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Employees */}
          <div>
            <label className="block text-sm font-medium text-text mb-3">
              Employees Using AI
            </label>
            <input
              type="range"
              min={0}
              max={6}
              step={1}
              value={employees}
              onChange={(e) => setEmployees(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none bg-hairline cursor-pointer accent-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-raised"
              aria-label="Number of employees"
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-text-muted">5</span>
              <span className="text-sm font-semibold text-accent-blue">
                {employeeCount.toLocaleString()}
              </span>
              <span className="text-xs text-text-muted">1,000</span>
            </div>
          </div>

          {/* Automation Level */}
          <div>
            <label className="block text-sm font-medium text-text mb-3">
              Automation Level
            </label>
            <div className="flex flex-wrap gap-2">
              {ROI_AUTOMATION_LEVELS.map((level, i) => (
                <button
                  key={level.label}
                  onClick={() => setAutomationLevel(i)}
                  aria-pressed={automationLevel === i}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link ${
                    automationLevel === i
                      ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-md shadow-accent-blue/20"
                      : "border border-hairline bg-glass text-text-secondary hover:border-hairline-strong hover:bg-glass-hover"
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Savings Display */}
        <div className="text-center pt-8 border-t border-hairline">
          <p className="text-sm text-text-muted mb-3 uppercase tracking-wider font-medium">
            Estimated Annual Savings
          </p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-violet bg-clip-text text-transparent">
              ${savingsDisplay.toLocaleString()}
            </span>
          </div>
          <p className="mt-4 text-sm text-text-secondary max-w-md mx-auto">
            Based on {employeeCount.toLocaleString()} employees, {sizeData.label} company, with{" "}
            {levelData.label.toLowerCase()} automation ({levelData.description.toLowerCase()}).
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   COMPARISON TABLE
   ═══════════════════════════════════════════ */

function ComparisonRow({
  feature,
  index,
  isInView,
}: {
  feature: (typeof COMPARISON_FEATURES)[number];
  index: number;
  isInView: boolean;
}) {
  const renderValue = (val: boolean | string) => {
    if (val === true) {
      return (
        <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4 mx-auto text-accent-cyan" aria-label="Included">
          <path d="M5.5 9.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (val === false) {
      return (
        <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4 mx-auto text-text-muted/40" aria-label="Not included">
          <path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    }
    return <span className="text-sm text-text-secondary text-center">{val}</span>;
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease }}
      className={`border-b border-hairline transition-colors duration-300 ${
        index % 2 === 0 ? "bg-transparent" : "bg-glass/30"
      }`}
    >
      <td className="py-3.5 px-4 text-sm font-medium text-text">{feature.name}</td>
      <td className="py-3.5 px-4">{renderValue(feature.starter)}</td>
      <td className="py-3.5 px-4">{renderValue(feature.growth)}</td>
      <td className="py-3.5 px-4">{renderValue(feature.enterprise)}</td>
    </motion.tr>
  );
}

function ComparisonTable({ isInView }: { isInView: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mt-20 sm:mt-24"
    >
      <div className="text-center mb-10">
        <AnimatedBorder className="inline-block rounded-full mb-5" borderWidth={1} duration={6}>
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairline bg-glass text-[13px] font-medium text-body backdrop-blur-md">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M2 6h12M6 2v12" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            Full Comparison
          </span>
        </AnimatedBorder>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
          Feature{" "}
          <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
            comparison
          </span>
        </h3>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 py-3 mb-4 rounded-xl border border-hairline bg-glass text-sm font-medium text-text-secondary transition-all duration-300 hover:border-hairline-strong hover:bg-glass-hover hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Hide comparison" : "Show full comparison"}
          <motion.svg
            viewBox="0 0 16 16"
            fill="none"
            className="w-4 h-4"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease }}
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl border border-hairline bg-canvas-raised backdrop-blur-sm overflow-hidden">
                {/* Desktop table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-hairline">
                        <th className="py-4 px-4 text-left text-xs font-semibold text-text-muted tracking-wider uppercase">
                          Feature
                        </th>
                        <th className="py-4 px-4 text-center text-xs font-semibold text-text-muted tracking-wider uppercase">
                          Starter AI
                        </th>
                        <th className="py-4 px-4 text-center text-xs font-semibold text-accent-violet tracking-wider uppercase">
                          Growth AI
                        </th>
                        <th className="py-4 px-4 text-center text-xs font-semibold text-text-muted tracking-wider uppercase">
                          Enterprise AI
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON_FEATURES.map((feature, i) => (
                        <ComparisonRow
                          key={feature.name}
                          feature={feature}
                          index={i}
                          isInView={isInView}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="sm:hidden divide-y divide-hairline">
                  {COMPARISON_FEATURES.map((feature, i) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, delay: i * 0.05, ease }}
                      className="p-4"
                    >
                      <p className="text-sm font-medium text-text mb-3">{feature.name}</p>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                          <p className="text-[10px] text-text-muted mb-1 uppercase tracking-wider">Starter</p>
                          {renderMobileValue(feature.starter)}
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-accent-violet mb-1 uppercase tracking-wider">Growth</p>
                          {renderMobileValue(feature.growth)}
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-text-muted mb-1 uppercase tracking-wider">Enterprise</p>
                          {renderMobileValue(feature.enterprise)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function renderMobileValue(val: boolean | string) {
  if (val === true) {
    return (
      <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4 mx-auto text-accent-cyan" aria-label="Included">
        <path d="M5.5 9.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (val === false) {
    return (
      <svg viewBox="0 0 18 18" fill="none" className="w-4 h-4 mx-auto text-text-muted/40" aria-label="Not included">
        <path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }
  return <span className="text-xs text-text-secondary">{val}</span>;
}

/* ═══════════════════════════════════════════
   MAIN PRICING SECTION
   ═══════════════════════════════════════════ */

export function Pricing() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.08 });
  const shouldReduceMotion = useReducedMotion();
  const [isYearly, setIsYearly] = useState(false);

  const { ref: calcInViewRef, isInView: calcInView } = useScrollAnimation({ threshold: 0.15 });
  const { ref: tableInViewRef, isInView: tableInView } = useScrollAnimation({ threshold: 0.15 });

  const handleToggle = useCallback(() => setIsYearly((prev) => !prev), []);

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      {/* Background effects */}
      <CursorLight
        color="var(--svg-violet-dim)"
        size={700}
        blur={140}
        opacity={0.35}
        followMouse={false}
      />
      <AnimatedGrid opacity={0.015} spacing={48} />

      {!shouldReduceMotion && (
        <>
          <div
            className="absolute top-[15%] left-[10%] w-[400px] h-[400px] bg-accent-violet/[0.03] rounded-full blur-[120px]"
            style={{ animation: "orb-drift-1 14s ease-in-out infinite" }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-[20%] right-[8%] w-[350px] h-[350px] bg-accent-blue/[0.025] rounded-full blur-[110px]"
            style={{ animation: "orb-drift-2 16s ease-in-out infinite" }}
            aria-hidden="true"
          />
          <div
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-cyan/[0.02] rounded-full blur-[140px]"
            style={{ animation: "orb-breathing 10s ease-in-out infinite" }}
            aria-hidden="true"
          />
        </>
      )}

      <Container>
        {/* Header */}
        <PricingHeader isInView={isInView} />

        {/* Billing Toggle */}
        <BillingToggle isYearly={isYearly} onToggle={handleToggle} />

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {pricingTiers.map((tier) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              isYearly={isYearly}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {/* Trust note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center text-sm text-text-muted mt-10"
        >
          All plans include SSL, 99.9% uptime SLA, and GDPR compliance.
        </motion.p>
      </Container>

      {/* ROI Calculator */}
      <div ref={calcInViewRef}>
        <Container>
          <ROICalculator isInView={calcInView} />
        </Container>
      </div>

      {/* Comparison Table */}
      <div ref={tableInViewRef}>
        <Container>
          <ComparisonTable isInView={tableInView} />
        </Container>
      </div>
    </section>
  );
}
