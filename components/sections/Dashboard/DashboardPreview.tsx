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
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full rounded-2xl border border-white/[0.08] bg-bg-alt/90 backdrop-blur-2xl shadow-2xl shadow-black/30 overflow-hidden"
    >
      {/* Ambient glow behind the dashboard */}
      <div className="absolute -inset-1 bg-gradient-to-br from-primary/[0.08] via-accent-blue/[0.04] to-accent-cyan/[0.06] rounded-2xl blur-xl opacity-60 pointer-events-none" />

      <div className="relative">
        <DashboardHeader />

        <div className="p-3 space-y-3">
          {/* Top row: Revenue + Workflow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <RevenueChart />
            <WorkflowCard />
          </div>

          {/* Middle row: Agents + Activity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <AgentsGrid />
            <ActivityFeed />
          </div>

          {/* Bottom row: Floating Stats */}
          <FloatingStats />
        </div>
      </div>
    </motion.div>
  );
}
