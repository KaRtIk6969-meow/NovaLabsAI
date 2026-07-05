"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const platforms = [
  { name: "API", x: 50, y: 20, color: "#7C3AED" },
  { name: "DB", x: 20, y: 50, color: "#3B82F6" },
  { name: "CRM", x: 80, y: 50, color: "#06B6D4" },
  { name: "HR", x: 35, y: 80, color: "#10B981" },
  { name: "ERP", x: 65, y: 80, color: "#8B5CF6" },
];

const edges = [
  [0, 1], [0, 2], [1, 3], [2, 4], [1, 2], [3, 4],
];

export function IntegrationVisualization() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full min-h-[180px] flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full max-w-[220px]" aria-hidden="true">
        {/* Connection lines */}
        {edges.map(([from, to], i) => {
          const f = platforms[from];
          const t = platforms[to];
          return (
            <g key={`edge-${i}`}>
              <motion.line
                x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
              />
              {/* Traveling dot */}
              {!shouldReduceMotion && (
                <motion.circle
                  r="1"
                  fill={f.color}
                  opacity="0.7"
                  animate={{
                    cx: [f.x, t.x, f.x],
                    cy: [f.y, t.y, f.y],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Platform nodes */}
        {platforms.map((p, i) => (
          <g key={`node-${i}`}>
            {/* Glow */}
            <motion.circle
              cx={p.x} cy={p.y} r="10"
              fill={`${p.color}15`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease }}
            />
            {/* Node */}
            <motion.circle
              cx={p.x} cy={p.y} r="6"
              fill="#0B0F1A"
              stroke={`${p.color}60`}
              strokeWidth="0.8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease, type: "spring", stiffness: 200 }}
            />
            {/* Label */}
            <motion.text
              x={p.x} y={p.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={p.color}
              fontSize="5"
              fontWeight="600"
              fontFamily="system-ui"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
            >
              {p.name}
            </motion.text>
            {/* Pulse */}
            {!shouldReduceMotion && (
              <motion.circle
                cx={p.x} cy={p.y} r="6"
                fill="none"
                stroke={`${p.color}30`}
                strokeWidth="0.4"
                animate={{ r: [6, 10, 6], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
