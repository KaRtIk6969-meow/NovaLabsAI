"use client";

import { motion } from "framer-motion";
import { DashboardHeader } from "./DashboardHeader";
import { RevenueChart } from "./RevenueChart";
import { WorkflowCard } from "./WorkflowCard";
import { AgentsGrid } from "./AgentsGrid";
import { FloatingStats } from "./FloatingStats";
import { ActivityFeed } from "./ActivityFeed";

export function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative w-full rounded-2xl border border-white/[0.08] bg-bg-alt/90 backdrop-blur-2xl shadow-2xl shadow-black/30 overflow-hidden"
    >
      {/* Inner glow */}
      <div className="absolute -inset-px bg-gradient-to-br from-primary/[0.06] via-transparent to-accent-cyan/[0.04] rounded-2xl pointer-events-none" />

      <div className="relative">
        <DashboardHeader />

        <div className="p-3 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RevenueChart />
            <WorkflowCard />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AgentsGrid />
            <ActivityFeed />
          </div>

          <FloatingStats />
        </div>
      </div>
    </motion.div>
  );
}
