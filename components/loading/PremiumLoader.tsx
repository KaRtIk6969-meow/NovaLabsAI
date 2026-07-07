"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, reveal, breathe } from "@/design-system";

const fadeUp = reveal.blurFadeUp;
const stagger = staggerContainer(0.08, 0.08);

const STATUS_MESSAGES = [
  "Loading AI Models",
  "Connecting Enterprise Network",
  "Preparing Knowledge Graph",
  "Deploying Intelligent Agents",
  "Almost Ready",
];

const NODES = [
  { cx: 50, cy: 50, r: 3, color: "var(--svg-link)", delay: 0 },
  { cx: 30, cy: 30, r: 2, color: "var(--svg-cyan)", delay: 0.3 },
  { cx: 70, cy: 30, r: 2, color: "var(--svg-violet)", delay: 0.6 },
  { cx: 25, cy: 60, r: 1.5, color: "var(--svg-link)", delay: 0.9 },
  { cx: 75, cy: 60, r: 1.5, color: "var(--svg-cyan)", delay: 1.2 },
  { cx: 40, cy: 75, r: 1.5, color: "var(--svg-violet)", delay: 1.5 },
  { cx: 60, cy: 75, r: 1.5, color: "var(--svg-link)", delay: 1.8 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 6], [1, 2],
];

function AICore() {
  const shouldReduceMotion = useReducedMotion();

  const packets = useMemo(
    () =>
      CONNECTIONS.map((conn, i) => ({
        from: NODES[conn[0]],
        to: NODES[conn[1]],
        delay: i * 0.3,
        duration: 1.8 + (i % 3) * 0.3,
      })),
    []
  );

  return (
    <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id="loaderGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--svg-link)" stopOpacity="0.4" />
            <stop offset="60%" stopColor="var(--svg-violet)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Breathing core */}
        <motion.circle cx="50" cy="50" r="15" fill="url(#loaderGlow)"
          animate={breathe(!!shouldReduceMotion, 0.2, 0.5)}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbiting ring */}
        {!shouldReduceMotion && (
          <motion.circle cx="50" cy="50" r="38" fill="none" stroke="var(--svg-link)" strokeWidth="0.4" strokeDasharray="3 6" opacity={0.3}
            animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" }}
          />
        )}

        {/* Second ring */}
        {!shouldReduceMotion && (
          <motion.circle cx="50" cy="50" r="32" fill="none" stroke="var(--svg-cyan)" strokeWidth="0.3" strokeDasharray="2 5" opacity={0.2}
            animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" }}
          />
        )}

        {/* Connections */}
        {CONNECTIONS.map(([from, to], i) => (
          <motion.line key={`c-${i}`} x1={NODES[from].cx} y1={NODES[from].cy} x2={NODES[to].cx} y2={NODES[to].cy}
            stroke="var(--svg-link)" strokeWidth="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.08, ease: "easeOut" }}
          />
        ))}

        {/* Data packets */}
        {!shouldReduceMotion && packets.map((p, i) => (
          <motion.circle key={`p-${i}`} r="0.6" fill="var(--svg-cyan)" opacity={0.5}
            initial={{ cx: p.from.cx, cy: p.from.cy }}
            animate={{ cx: [p.from.cx, p.to.cx, p.from.cx], cy: [p.from.cy, p.to.cy, p.from.cy] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Nodes */}
        {NODES.map((node, i) => (
          <g key={`n-${i}`}>
            {!shouldReduceMotion && (
              <motion.circle cx={node.cx} cy={node.cy} r={node.r * 2.5} fill={node.color}
                initial={{ opacity: 0 }} animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 2.5, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <motion.circle cx={node.cx} cy={node.cy} r={node.r} fill={node.color}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.06, type: "spring", stiffness: 300, damping: 20 }}
            />
          </g>
        ))}
      </svg>

      {/* Rotating outer glow */}
      {!shouldReduceMotion && (
        <motion.div className="absolute inset-[-20%] rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(0,112,243,0.08), transparent, rgba(121,40,202,0.08), transparent)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}

export function PremiumLoader() {
  const shouldReduceMotion = useReducedMotion();
  const [statusIndex, setStatusIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 2500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 15, 95));
    }, 400);

    return () => {
      clearInterval(statusInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-canvas overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Grid */}
        <div className="hero-grid absolute inset-0 opacity-[0.02]" />

        {/* Aurora */}
        <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[180px]"
          animate={breathe(!!shouldReduceMotion, 0.01, 0.035)}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(ellipse, var(--svg-violet) 0%, var(--svg-link) 40%, transparent 70%)" }}
        />
        <motion.div className="absolute bottom-[20%] right-[15%] w-[300px] h-[300px] rounded-full blur-[140px]"
          animate={breathe(!!shouldReduceMotion, 0.008, 0.025)}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ background: "radial-gradient(circle, rgba(80,227,194,0.03) 0%, transparent 70%)" }}
        />

        {/* Floating particles */}
        {!shouldReduceMotion && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div key={i}
                className="absolute w-0.5 h-0.5 rounded-full bg-white/15"
                style={{ left: `${12 + (i * 11) % 76}%`, top: `${18 + (i * 17) % 64}%` }}
                animate={{ y: [-6, 6, -6], opacity: [0.08, 0.25, 0.08] }}
                transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              />
            ))}
          </>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas" />
      </div>

      {/* Content */}
      <motion.div variants={stagger} initial="hidden" animate="visible"
        className="relative z-10 flex flex-col items-center gap-8 max-w-md mx-auto px-4"
      >
        {/* AI Core */}
        <motion.div variants={fadeUp}>
          <AICore />
        </motion.div>

        {/* Brand */}
        <motion.div variants={fadeUp} className="text-center">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-text mb-1">
            NovaLabs AI
          </h1>
          <p className="text-sm text-text-secondary">Initializing NovaLabs AI...</p>
        </motion.div>

        {/* Status message */}
        <motion.div variants={fadeUp} className="h-5 flex items-center">
          <motion.p key={statusIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="text-xs text-text-muted font-mono tracking-wider"
          >
            {STATUS_MESSAGES[statusIndex]}
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div variants={fadeUp} className="w-48 sm:w-56">
          <div className="relative h-0.5 overflow-hidden rounded-full bg-hairline">
            <motion.div className="absolute inset-y-0 left-0 rounded-full"
              style={{ background: "linear-gradient(90deg, var(--svg-link), var(--svg-violet), var(--svg-cyan))" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            {/* Shimmer */}
            {!shouldReduceMotion && (
              <motion.div className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            )}
          </div>
        </motion.div>

        {/* Loading dots */}
        <motion.div variants={fadeUp} className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span key={i} className="block h-1 w-1 rounded-full bg-accent-blue"
              animate={shouldReduceMotion ? { opacity: 0.5 } : { scale: [0.6, 1, 0.6], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.16 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
