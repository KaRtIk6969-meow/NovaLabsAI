"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { ROI_COMPANY_SIZES, ROI_AUTOMATION_LEVELS } from "@/data/pricing";
import { easing } from "@/design-system";

const ease = easing.default;

export function ROICalculator() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();
  const [companySize, setCompanySize] = useState(2);
  const [employees, setEmployees] = useState(3);
  const [automationLevel, setAutomationLevel] = useState(1);

  const sizeData = ROI_COMPANY_SIZES[companySize];
  const levelData = ROI_AUTOMATION_LEVELS[automationLevel];
  const employeeCount = [5, 10, 25, 50, 100, 500, 1000][employees];

  const metrics = useMemo(() => {
    const base = employeeCount * 1200;
    const annualSavings = Math.round(base * sizeData.multiplier * levelData.multiplier);
    const hoursSaved = Math.round(employeeCount * 8 * 12 * levelData.multiplier);
    const productivityGain = Math.round(levelData.multiplier * 25);
    const roi = Math.round((annualSavings / (annualSavings * 0.15 + 5000)) * 100);
    const paybackMonths = Math.max(1, Math.round(12 / (roi / 100)));
    return { annualSavings, hoursSaved, productivityGain, roi, paybackMonths };
  }, [employeeCount, sizeData.multiplier, levelData.multiplier]);

  const savingsDisplay = useCountUp({ end: metrics.annualSavings, duration: 800, startOnMount: isInView });
  const hoursDisplay = useCountUp({ end: metrics.hoursSaved, duration: 800, startOnMount: isInView });
  const productivityDisplay = useCountUp({ end: metrics.productivityGain, duration: 600, startOnMount: isInView });
  const roiDisplay = useCountUp({ end: metrics.roi, duration: 600, startOnMount: isInView });

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden" id="roi-calculator" aria-labelledby="roi-heading">
      <Container>
        <motion.div initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease }} className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-glass/50 backdrop-blur-sm text-[13px] font-medium text-text-secondary mb-4">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M2 12l3-8 3 4 3-6 3 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            ROI Calculator
          </span>
          <h2 id="roi-heading" className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text">
            Calculate Your{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">Savings</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-secondary max-w-md mx-auto">
            See how much your business could save with AI automation.
          </p>
        </motion.div>

        <motion.div initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="max-w-4xl mx-auto rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10"
        >
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {/* Company Size */}
            <div>
              <label className="block text-sm font-medium text-text mb-3">Company Size</label>
              <div className="flex flex-wrap gap-2">
                {ROI_COMPANY_SIZES.map((size, i) => (
                  <button key={size.label} onClick={() => setCompanySize(i)} aria-pressed={companySize === i}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link ${
                      companySize === i
                        ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-md shadow-accent-blue/20"
                        : "border border-hairline bg-glass text-text-secondary hover:border-hairline-strong hover:bg-glass-hover"
                    }`}
                  >{size.label}</button>
                ))}
              </div>
            </div>

            {/* Employees */}
            <div>
              <label className="block text-sm font-medium text-text mb-3">Employees Using AI</label>
              <input type="range" min={0} max={6} step={1} value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-hairline cursor-pointer accent-accent-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-raised"
                aria-label="Number of employees"
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-text-muted">5</span>
                <span className="text-sm font-semibold text-accent-blue">{employeeCount.toLocaleString()}</span>
                <span className="text-xs text-text-muted">1,000</span>
              </div>
            </div>

            {/* Automation Level */}
            <div>
              <label className="block text-sm font-medium text-text mb-3">Automation Level</label>
              <div className="flex flex-wrap gap-2">
                {ROI_AUTOMATION_LEVELS.map((level, i) => (
                  <button key={level.label} onClick={() => setAutomationLevel(i)} aria-pressed={automationLevel === i}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link ${
                      automationLevel === i
                        ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-md shadow-accent-blue/20"
                        : "border border-hairline bg-glass text-text-secondary hover:border-hairline-strong hover:bg-glass-hover"
                    }`}
                  >{level.label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-hairline">
            <div className="text-center p-4 rounded-xl bg-glass/30">
              <p className="text-[10px] text-text-muted mb-2 uppercase tracking-wider font-medium">Hours Saved / Year</p>
              <p className="text-2xl sm:text-3xl font-bold text-accent-cyan">{hoursDisplay.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-glass/30">
              <p className="text-[10px] text-text-muted mb-2 uppercase tracking-wider font-medium">Productivity Gain</p>
              <p className="text-2xl sm:text-3xl font-bold text-accent-blue">{productivityDisplay}%</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-glass/30">
              <p className="text-[10px] text-text-muted mb-2 uppercase tracking-wider font-medium">Annual Savings</p>
              <p className="text-2xl sm:text-3xl font-bold text-accent-violet">${savingsDisplay.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-glass/30">
              <p className="text-[10px] text-text-muted mb-2 uppercase tracking-wider font-medium">ROI</p>
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-violet bg-clip-text text-transparent">{roiDisplay}%</p>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-text-secondary">
              Payback period: <span className="font-semibold text-text">{metrics.paybackMonths} months</span>
              {" "}based on {employeeCount.toLocaleString()} employees with {levelData.label.toLowerCase()} automation.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
