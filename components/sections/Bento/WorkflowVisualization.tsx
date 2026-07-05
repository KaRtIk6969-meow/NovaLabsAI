"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { x: 30, y: 25, label: "Input" },
  { x: 70, y: 25, label: "Process" },
  { x: 50, y: 55, label: "AI Engine" },
  { x: 30, y: 85, label: "Validate" },
  { x: 70, y: 85, label: "Output" },
];

const connections = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
  { from: 3, to: 4 },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function WorkflowVisualization() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full min-h-[220px] flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full max-w-[280px]" aria-hidden="true">
        {/* Connection lines */}
        {connections.map((conn, i) => {
          const from = nodes[conn.from];
          const to = nodes[conn.to];
          return (
            <g key={`conn-${i}`}>
              <motion.line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="rgba(124,58,237,0.2)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.15,
                  ease,
                }}
              />
              {/* Animated data particle */}
              {!shouldReduceMotion && (
                <motion.circle
                  r="1"
                  fill="#7C3AED"
                  opacity="0.8"
                  initial={{ cx: from.x, cy: from.y }}
                  animate={{
                    cx: [from.x, to.x],
                    cy: [from.y, to.y],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`}>
            {/* Node glow */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="6"
              fill="rgba(124,58,237,0.15)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease }}
            />
            {/* Node circle */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="4"
              fill="#0B0F1A"
              stroke="rgba(124,58,237,0.5)"
              strokeWidth="0.8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease, type: "spring", stiffness: 200 }}
            />
            {/* Inner dot */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="1.5"
              fill="#7C3AED"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.12, ease, type: "spring", stiffness: 300 }}
            />
            {/* Pulse ring */}
            {!shouldReduceMotion && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="4"
                fill="none"
                stroke="rgba(124,58,237,0.3)"
                strokeWidth="0.5"
                animate={{
                  r: [4, 7, 4],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeInOut",
                }}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
