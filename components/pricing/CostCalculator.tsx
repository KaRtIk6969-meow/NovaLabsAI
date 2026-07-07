"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { easing } from "@/design-system";

const ease = easing.default;

const TEAM_SIZES = [
  { label: "1-5", value: 3 },
  { label: "6-20", value: 12 },
  { label: "21-50", value: 35 },
  { label: "51-200", value: 100 },
  { label: "201+", value: 300 },
];

const AI_AGENTS = [
  { label: "1-2", value: 1.5 },
  { label: "3-5", value: 4 },
  { label: "6-10", value: 8 },
  { label: "11-25", value: 18 },
  { label: "25+", value: 40 },
];

const WORKFLOWS = [
  { label: "1K", value: 1000 },
  { label: "5K", value: 5000 },
  { label: "10K", value: 10000 },
  { label: "50K", value: 50000 },
  { label: "100K+", value: 100000 },
];

const SUPPORT_LEVELS = [
  { label: "Email", multiplier: 1, description: "Business hours" },
  { label: "Priority", multiplier: 1.4, description: "< 4h response" },
  { label: "Dedicated", multiplier: 2, description: "24/7 + Slack" },
  { label: "Enterprise", multiplier: 2.8, description: "On-site + SLA" },
];

export function CostCalculator() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();
  const [teamSize, setTeamSize] = useState(1);
  const [agents, setAgents] = useState(1);
  const [workflows, setWorkflows] = useState(1);
  const [support, setSupport] = useState(0);

  const monthlyCost = useMemo(() => {
    const team = TEAM_SIZES[teamSize].value;
    const agentCount = AI_AGENTS[agents].value;
    const workflowCount = WORKFLOWS[workflows].value;
    const supportMult = SUPPORT_LEVELS[support].multiplier;
    const base = team * 8 + agentCount * 150 + workflowCount * 0.02;
    return Math.round(base * supportMult);
  }, [teamSize, agents, workflows, support]);

  const costDisplay = useCountUp({ end: monthlyCost, duration: 600, startOnMount: isInView });

  return (
    <section ref={ref} className="relative py-24 sm:py-32 overflow-hidden" aria-labelledby="calculator-heading">
      <Container>
        <motion.div initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease }} className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-glass/50 backdrop-blur-sm text-[13px] font-medium text-text-secondary mb-4">
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path d="M8 1v14M4 5l4-4 4 4M4 11l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Cost Calculator
          </span>
          <h2 id="calculator-heading" className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text">
            Estimate Your{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">Investment</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-xl mx-auto">
            Configure your requirements and see estimated monthly pricing instantly.
          </p>
        </motion.div>

        <motion.div initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="max-w-4xl mx-auto rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm p-6 sm:p-8 lg:p-10"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            {/* Team Size */}
            <div>
              <label className="block text-sm font-medium text-text mb-3">Team Size</label>
              <div className="flex flex-wrap gap-2">
                {TEAM_SIZES.map((s, i) => (
                  <button key={s.label} onClick={() => setTeamSize(i)} aria-pressed={teamSize === i}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link ${
                      teamSize === i
                        ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-md shadow-accent-blue/20"
                        : "border border-hairline bg-glass text-text-secondary hover:border-hairline-strong hover:bg-glass-hover"
                    }`}
                  >{s.label}</button>
                ))}
              </div>
            </div>

            {/* AI Agents */}
            <div>
              <label className="block text-sm font-medium text-text mb-3">AI Agents</label>
              <div className="flex flex-wrap gap-2">
                {AI_AGENTS.map((a, i) => (
                  <button key={a.label} onClick={() => setAgents(i)} aria-pressed={agents === i}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link ${
                      agents === i
                        ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-md shadow-accent-blue/20"
                        : "border border-hairline bg-glass text-text-secondary hover:border-hairline-strong hover:bg-glass-hover"
                    }`}
                  >{a.label}</button>
                ))}
              </div>
            </div>

            {/* Monthly Workflows */}
            <div>
              <label className="block text-sm font-medium text-text mb-3">Monthly Workflows</label>
              <div className="flex flex-wrap gap-2">
                {WORKFLOWS.map((w, i) => (
                  <button key={w.label} onClick={() => setWorkflows(i)} aria-pressed={workflows === i}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link ${
                      workflows === i
                        ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-md shadow-accent-blue/20"
                        : "border border-hairline bg-glass text-text-secondary hover:border-hairline-strong hover:bg-glass-hover"
                    }`}
                  >{w.label}</button>
                ))}
              </div>
            </div>

            {/* Support Level */}
            <div>
              <label className="block text-sm font-medium text-text mb-3">Support Level</label>
              <div className="space-y-2">
                {SUPPORT_LEVELS.map((s, i) => (
                  <button key={s.label} onClick={() => setSupport(i)} aria-pressed={support === i}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link ${
                      support === i
                        ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-md shadow-accent-blue/20"
                        : "border border-hairline bg-glass text-text-secondary hover:border-hairline-strong hover:bg-glass-hover"
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className="text-[10px] opacity-70">{s.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Estimated cost */}
          <div className="text-center pt-8 border-t border-hairline">
            <p className="text-sm text-text-muted mb-3 uppercase tracking-wider font-medium">Estimated Monthly Cost</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-sm text-text-muted self-start mt-4">$</span>
              <span className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-violet bg-clip-text text-transparent">
                {costDisplay.toLocaleString()}
              </span>
            </div>
            <p className="mt-4 text-sm text-text-secondary max-w-md mx-auto">
              {TEAM_SIZES[teamSize].value} team members, {AI_AGENTS[agents].value} AI agents, {WORKFLOWS[workflows].value.toLocaleString()} workflows/mo, {SUPPORT_LEVELS[support].label} support.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
