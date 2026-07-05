"use client";

import { motion } from "framer-motion";

function StatusDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-emerald-400 opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
  );
}

export function DashboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-primary to-accent-cyan">
          <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
            <path d="M4 4h4v16H4V4zM16 4h4v16h-4V4zM4 4l16 16V4h4v16L4 4" fill="white" fillOpacity="0.9" />
            <circle cx="18" cy="6" r="2.5" fill="#06B6D4" />
          </svg>
        </div>
        <span className="text-xs font-semibold text-text tracking-tight">NovaLabs AI Console</span>
      </div>

      <div className="hidden sm:flex items-center gap-4 text-[11px]">
        <div className="flex items-center gap-1.5">
          <StatusDot />
          <span className="text-emerald-400 font-medium">Online</span>
        </div>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="text-text-muted">Model</span>
          <span className="font-medium text-text">GPT-4o</span>
        </div>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="text-text-muted">Productivity</span>
          <span className="font-medium text-accent-cyan">+24%</span>
        </div>
        <div className="relative">
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-text-secondary" aria-hidden="true">
            <path d="M8 1.5a4.5 4.5 0 00-4.5 4.5c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5A4.5 4.5 0 008 1.5z" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="8" cy="6" r="1.5" fill="currentColor" />
          </svg>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary text-[7px] font-bold text-white flex items-center justify-center animate-pulse-soft">
            3
          </span>
        </div>
      </div>
    </motion.div>
  );
}
