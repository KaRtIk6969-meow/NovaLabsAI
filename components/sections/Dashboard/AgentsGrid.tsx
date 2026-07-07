"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

const AGENTS = [
  {
    name: "Customer Support",
    status: "Online" as const,
    dotColor: "bg-emerald-500",
    pulseColor: "bg-emerald-400",
    textColor: "text-emerald-400",
  },
  {
    name: "Sales Assistant",
    status: "Running" as const,
    dotColor: "bg-accent-blue",
    pulseColor: "bg-accent-violet",
    textColor: "text-accent-violet",
  },
  {
    name: "Document AI",
    status: "Processing" as const,
    dotColor: "bg-accent-blue",
    pulseColor: "bg-accent-blue",
    textColor: "text-accent-blue",
  },
  {
    name: "Meeting Assistant",
    status: "Ready" as const,
    dotColor: "bg-accent-cyan",
    pulseColor: "bg-accent-cyan",
    textColor: "text-accent-cyan",
  },
];

function AgentIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
      <rect x="3" y="5" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="6.5" cy="9" r="1" fill="currentColor" />
      <circle cx="9.5" cy="9" r="1" fill="currentColor" />
      <path d="M8 2v3M5 5V3.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function PulsingDot({ dotColor, pulseColor }: { dotColor: string; pulseColor: string }) {
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span className={`absolute inline-flex h-full w-full animate-pulse-soft rounded-full ${pulseColor} opacity-50`} />
      <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dotColor}`} />
    </span>
  );
}

export function AgentsGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.6, ease }}
      className="relative rounded-xl border border-hairline bg-canvas-raised p-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/[0.02] to-transparent pointer-events-none" />

      <div className="relative flex items-center justify-between mb-3">
        <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider">AI Agents</p>
        <span className="text-[10px] text-text-secondary font-medium">4 Active</span>
      </div>

      <div className="relative grid grid-cols-2 gap-2">
        {AGENTS.map((agent, i) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 + i * 0.08, duration: 0.35, ease }}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-glass border border-hairline hover:bg-glass-hover transition-colors duration-200"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-glass text-text-secondary">
              <AgentIcon />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-text truncate">{agent.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <PulsingDot dotColor={agent.dotColor} pulseColor={agent.pulseColor} />
                <span className={`text-[9px] font-medium ${agent.textColor}`}>{agent.status}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
