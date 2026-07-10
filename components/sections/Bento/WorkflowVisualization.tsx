"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easing } from "@/design-system";
const ease = easing.default;

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

const tinyParticles = [
  { from: 0, to: 2, delay: 0, dur: 2.5 },
  { from: 1, to: 2, delay: 0.8, dur: 2.2 },
  { from: 2, to: 3, delay: 0.4, dur: 2.8 },
  { from: 2, to: 4, delay: 1.2, dur: 2.4 },
  { from: 0, to: 1, delay: 1.6, dur: 2.0 },
  { from: 3, to: 4, delay: 0.6, dur: 2.6 },
];

export function WorkflowVisualization({ shouldAnimate }: { shouldAnimate: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const canAnimate = !shouldReduceMotion && shouldAnimate;
  const aiNode = nodes[2];

  return (
    <div className="relative w-full h-full min-h-[220px] flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full max-w-[280px]" aria-hidden="true">
        <defs>
          <radialGradient id="ai-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--svg-violet)" stopOpacity="0.35" />
            <stop offset="60%" stopColor="var(--svg-violet)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="node-glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines */}
        {connections.map((conn, i) => {
          const from = nodes[conn.from];
          const to = nodes[conn.to];
          return (
            <g key={`conn-${i}`}>
              {/* Base line */}
              <motion.line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="var(--svg-violet)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.15,
                  ease,
                }}
              />
              {/* Animated lighting line overlay */}
              {canAnimate && (
                <motion.line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="var(--svg-violet)"
                  strokeWidth="0.8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              )}
              {/* Primary data particle */}
              {canAnimate && (
                <motion.circle
                  r="1.2"
                  fill="var(--svg-violet-light)"
                  opacity="0.9"
                  filter="url(#node-glow)"
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

        {/* Tiny flowing particles */}
        {canAnimate && tinyParticles.map((p, i) => {
          const from = nodes[p.from];
          const to = nodes[p.to];
          return (
            <motion.circle
              key={`tp-${i}`}
              r="0.6"
              fill="rgba(139,92,246,0.6)"
              initial={{ cx: from.x, cy: from.y }}
              animate={{
                cx: [from.x, to.x],
                cy: [from.y, to.y],
              }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear",
              }}
            />
          );
        })}

        {/* Rotating glow around AI core */}
        {canAnimate && (
          <motion.circle
            cx={aiNode.x}
            cy={aiNode.y}
            r="12"
            fill="none"
            stroke="rgba(124,58,237,0.2)"
            strokeWidth="1.5"
            strokeDasharray="6 14"
            strokeLinecap="round"
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: `${aiNode.x}px ${aiNode.y}px` }}
          />
        )}

        {/* AI core breathing glow */}
        {canAnimate && (
          <motion.circle
            cx={aiNode.x}
            cy={aiNode.y}
            r="10"
            fill="url(#ai-core-glow)"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: `${aiNode.x}px ${aiNode.y}px` }}
          />
        )}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const isAI = i === 2;
          return (
            <g key={`node-${i}`}>
              {/* Node glow */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="6"
                fill={isAI ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.12)"}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isAI && canAnimate ? [1, 1.2, 1] : 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.12,
                  ease,
                  ...(isAI && canAnimate && {
                    scale: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }),
                }}
              />
              {/* Node circle */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={isAI ? 5 : 4}
                fill="var(--svg-canvas)"
                stroke={isAI ? "rgba(124,58,237,0.7)" : "rgba(124,58,237,0.5)"}
                strokeWidth={isAI ? 1 : 0.8}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.12,
                  ease,
                  type: "spring",
                  stiffness: 200,
                }}
              />
              {/* Inner dot */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={isAI ? 2 : 1.5}
                fill={isAI ? "var(--svg-violet-light)" : "var(--svg-violet)"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + i * 0.12,
                  ease,
                  type: "spring",
                  stiffness: 300,
                }}
              />
              {/* Pulse ring */}
              {canAnimate && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={isAI ? 5 : 4}
                  fill="none"
                  stroke={isAI ? "rgba(124,58,237,0.4)" : "rgba(124,58,237,0.25)"}
                  strokeWidth="0.5"
                  animate={{
                    r: isAI ? [5, 9, 5] : [4, 7, 4],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: isAI ? 2.5 : 3,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeInOut",
                  }}
                />
              )}
              {/* AI engine label */}
              {isAI && (
                <motion.text
                  x={node.x}
                  y={node.y + 12}
                  textAnchor="middle"
              fill="var(--svg-violet-light)"
                  fontSize="4"
                  fontWeight="600"
                  fontFamily="var(--font-sans)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  AI
                </motion.text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
