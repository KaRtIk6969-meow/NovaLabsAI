"use client";

import { motion } from "framer-motion";

const ACTIVITIES = [
  { text: "Email classified", icon: "check" as const },
  { text: "Meeting scheduled", icon: "check" as const },
  { text: "Lead qualified", icon: "check" as const },
  { text: "Invoice processed", icon: "check" as const },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
      <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5.5 8l2 2 3.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.65, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-xl border border-hairline bg-canvas-raised p-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-emerald/[0.02] to-transparent pointer-events-none" />

      <div className="relative flex items-center justify-between mb-3">
        <p className="text-[11px] text-text-muted font-medium uppercase tracking-wider">Recent Activity</p>
        <span className="text-[10px] text-text-secondary font-medium">Live</span>
      </div>

      <div className="relative space-y-1.5">
        {ACTIVITIES.map((activity, i) => (
          <motion.div
            key={activity.text}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.08, duration: 0.3 }}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-glass transition-colors duration-150"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400">
              <CheckIcon />
            </div>
            <span className="text-[11px] text-text-secondary font-medium">{activity.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
