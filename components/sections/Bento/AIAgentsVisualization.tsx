"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

const agents = [
  { x: 50, y: 35, delay: 0 },
  { x: 30, y: 65, delay: 0.15 },
  { x: 70, y: 65, delay: 0.3 },
];

export function AIAgentsVisualization() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full min-h-[180px] flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full max-w-[220px]" aria-hidden="true">
        {agents.map((agent, i) => (
          <g key={i}>
            {/* Outer glow */}
            <motion.circle
              cx={agent.x}
              cy={agent.y}
              r="14"
              fill="rgba(124,58,237,0.08)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: agent.delay, ease }}
            />
            {/* Status ring */}
            <motion.circle
              cx={agent.x}
              cy={agent.y}
              r="10"
              fill="none"
              stroke="rgba(124,58,237,0.3)"
              strokeWidth="0.6"
              strokeDasharray="3 2"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{
                scale: { duration: 0.5, delay: agent.delay, ease },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              }}
            />
            {/* Agent body */}
            <motion.circle
              cx={agent.x}
              cy={agent.y}
              r="7"
              fill="var(--svg-canvas)"
              stroke="rgba(124,58,237,0.5)"
              strokeWidth="0.8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: agent.delay, ease, type: "spring", stiffness: 200 }}
            />
            {/* Face - eyes */}
            <motion.circle cx={agent.x - 2} cy={agent.y - 1} r="1"               fill="var(--svg-violet)"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: agent.delay + 0.3, duration: 0.3, type: "spring" }}
            />
            <motion.circle cx={agent.x + 2} cy={agent.y - 1} r="1"               fill="var(--svg-violet)"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: agent.delay + 0.35, duration: 0.3, type: "spring" }}
            />
            {/* Smile */}
            <motion.path
              d={`M${agent.x - 2} ${agent.y + 2} Q${agent.x} ${agent.y + 4} ${agent.x + 2} ${agent.y + 2}`}
              stroke="var(--svg-violet)"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: agent.delay + 0.4, duration: 0.4, ease }}
            />
            {/* Online status dot */}
            <motion.circle
              cx={agent.x + 7}
              cy={agent.y - 7}
              r="2.5"
              fill="var(--svg-success)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: agent.delay + 0.5, duration: 0.3, type: "spring", stiffness: 300 }}
            />
            {!shouldReduceMotion && (
              <motion.circle
                cx={agent.x + 7}
                cy={agent.y - 7}
                r="2.5"
                fill="none"
                stroke="var(--svg-success)"
                strokeWidth="0.5"
                animate={{ r: [2.5, 5, 2.5], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.7 }}
              />
            )}
            {/* Floating indicator */}
            {!shouldReduceMotion && (
              <motion.g
                animate={{ y: [-1, 1, -1] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              >
                <motion.rect
                  x={agent.x - 5}
                  y={agent.y - 18}
                  width="10"
                  height="5"
                  rx="2.5"
                  fill="var(--svg-violet-dim)"
                  stroke="var(--svg-violet)"
                  strokeWidth="0.4"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: agent.delay + 0.6, duration: 0.4 }}
                />
              </motion.g>
            )}
          </g>
        ))}

        {/* Connection lines between agents */}
        {!shouldReduceMotion && (
          <>
            <motion.line
              x1={agents[0].x} y1={agents[0].y}
              x2={agents[1].x} y2={agents[1].y}
              stroke="var(--svg-violet)"
              strokeWidth="0.4"
              strokeDasharray="2 2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
            <motion.line
              x1={agents[0].x} y1={agents[0].y}
              x2={agents[2].x} y2={agents[2].y}
              stroke="var(--svg-violet)"
              strokeWidth="0.4"
              strokeDasharray="2 2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            />
          </>
        )}
      </svg>
    </div>
  );
}
