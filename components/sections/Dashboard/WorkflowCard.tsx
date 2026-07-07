"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

const WORKFLOW_STEPS = [
  { label: "Lead", icon: "user" as const },
  { label: "CRM", icon: "database" as const },
  { label: "AI Agent", icon: "bot" as const },
  { label: "Sales", icon: "trending" as const },
  { label: "Success", icon: "check" as const },
];

function StepIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    user: (
      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
        <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    database: (
      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
        <ellipse cx="8" cy="4" rx="5" ry="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3 4v8c0 1.1 2.2 2 5 2s5-.9 5-2V4" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    bot: (
      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
        <rect x="3" y="5" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="6.5" cy="9" r="1" fill="currentColor" />
        <circle cx="9.5" cy="9" r="1" fill="currentColor" />
        <path d="M8 2v3M5 5V3.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    trending: (
      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
        <path d="M2 12l4-4 3 2 5-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 4h4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
        <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5.5 8l2 2 3.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };
  return icons[icon] || null;
}

export function WorkflowCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.55, duration: 0.6, ease }}
      className="relative rounded-xl border border-hairline bg-canvas-raised p-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/[0.02] to-transparent pointer-events-none" />

      <div className="relative flex items-center justify-between mb-4">
        <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider">Automation Workflow</p>
        <span className="text-[10px] text-emerald-400 font-semibold">Active</span>
      </div>

      <div className="relative flex items-center justify-between">
        {WORKFLOW_STEPS.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.7 + i * 0.12,
                duration: 0.4,
                ease,
              }}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="w-8 h-8 rounded-lg bg-glass border border-hairline flex items-center justify-center text-body">
                <StepIcon icon={step.icon} />
              </div>
              <span className="text-[9px] text-text-muted font-medium">{step.label}</span>
            </motion.div>

            {i < WORKFLOW_STEPS.length - 1 && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  delay: 0.85 + i * 0.12,
                  duration: 0.45,
                  ease,
                }}
                className="flex items-center mx-1 origin-left"
              >
                <div className="w-4 sm:w-6 h-[1px] bg-gradient-to-r from-body/20 to-body/5" />
                <svg viewBox="0 0 6 8" fill="none" className="w-1 h-2 text-body/20 -ml-px" aria-hidden="true">
                  <path d="M0 0l4 4-4 4" stroke="currentColor" strokeWidth="1" />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
