"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
  useScroll,
  useInView,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";
import { useFloatingMotion } from "@/hooks/useFloatingMotion";
import { Particles } from "@/components/ui/Particles";
import { Button } from "@/components/ui/Button";
import { ease, blurFadeUp, staggerContainer, cardEntry } from "@/lib/motion";

/* ─── Card Data ─── */

const CARDS = [
  {
    id: "ai-agents",
    title: "AI Agents",
    description:
      "Deploy autonomous agents that reason, plan and execute complex multi-step tasks across your entire stack.",
    featured: true,
    glowColor: "var(--svg-violet-dim)",
  },
  {
    id: "workflow",
    title: "Workflow Automation",
    description:
      "Design self-healing workflows that adapt to real-time signals and business logic.",
    featured: false,
    glowColor: "var(--svg-violet-dim)",
  },
  {
    id: "analytics",
    title: "Advanced Analytics",
    description:
      "AI-powered dashboards that surface insights before you know to look for them.",
    featured: false,
    glowColor: "var(--svg-link-dim)",
  },
  {
    id: "security",
    title: "Enterprise Security",
    description:
      "Zero-trust architecture with end-to-end encryption, audit trails and compliance automation.",
    featured: false,
    glowColor: "var(--svg-cyan-dim)",
  },
  {
    id: "cloud",
    title: "Cloud Deployment",
    description:
      "One-click deployment to any cloud with auto-scaling, rollback safety and full observability.",
    featured: false,
    glowColor: "var(--svg-link-dim)",
  },
  {
    id: "integrations",
    title: "Integrations",
    description:
      "Connect 200+ enterprise tools with pre-built connectors and custom API bridges.",
    featured: false,
    glowColor: "var(--svg-cyan-dim)",
  },
] as const;

/* ─── Section Reveal Variants ─── */

const sectionReveal = staggerContainer(0.12, 0.1);

const fadeUp = blurFadeUp;

/* ═══════════════════════════════════════════
   ENHANCED BENTO CARD WRAPPER
   ═══════════════════════════════════════════ */

function PremiumCard({
  children,
  glowColor,
  className = "",
}: {
  children: React.ReactNode;
  glowColor: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const rawMouseX = useMotionValue(50);
  const rawMouseY = useMotionValue(50);
  const springMouseX = useSpring(rawMouseX, { stiffness: 200, damping: 25, mass: 0.5 });
  const springMouseY = useSpring(rawMouseY, { stiffness: 200, damping: 25, mass: 0.5 });

  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const springTiltX = useSpring(rawTiltX, { stiffness: 180, damping: 22, mass: 0.6 });
  const springTiltY = useSpring(rawTiltY, { stiffness: 180, damping: 22, mass: 0.6 });

  const rotateX = useTransform(springTiltY, [-0.5, 0.5], [1.5, -1.5]);
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], [-1.5, 1.5]);

  const hoverY = useMotionValue(0);
  const springHoverY = useSpring(hoverY, { stiffness: 200, damping: 20 });
  const liftY = useTransform(springHoverY, [0, 1], [0, -8]);

  const spotlightBg = useMotionTemplate`radial-gradient(circle 350px at ${springMouseX}% ${springMouseY}%, ${glowColor}, transparent 70%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || shouldReduceMotion) return;
      const rect = ref.current.getBoundingClientRect();
      rawMouseX.set(((e.clientX - rect.left) / rect.width) * 100);
      rawMouseY.set(((e.clientY - rect.top) / rect.height) * 100);
      rawTiltX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawTiltY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawMouseX, rawMouseY, rawTiltX, rawTiltY, shouldReduceMotion]
  );

  const handleMouseEnter = useCallback(() => { setIsHovered(true); hoverY.set(1); }, [hoverY]);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rawMouseX.set(50); rawMouseY.set(50);
    rawTiltX.set(0); rawTiltY.set(0);
    hoverY.set(0);
  }, [rawMouseX, rawMouseY, rawTiltX, rawTiltY, hoverY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformPerspective: 1200,
        y: liftY,
      }}
      className={`group relative rounded-2xl border border-hairline bg-canvas-raised backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-hairline-strong shadow-[0_1px_1px_rgba(0,0,0,0.05),0_2px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.03)] hover:shadow-[0_4px_4px_rgba(0,0,0,0.1),0_12px_24px_-6px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.03),inset_0_1px_0_rgba(255,255,255,0.06)] ${className}`}
    >
      {/* Glass fill */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-0" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 40%, transparent 100%)" }} aria-hidden="true" />
      {/* Top edge highlight */}
      <div className="absolute top-0 inset-x-0 h-[1px] rounded-t-2xl pointer-events-none z-0 opacity-40" style={{ background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 75%, transparent 95%)" }} aria-hidden="true" />
      {/* Left edge */}
      <div className="absolute top-0 left-0 bottom-0 w-[1px] pointer-events-none z-0 opacity-20" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)" }} aria-hidden="true" />
      {/* Bottom shadow */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none z-0 opacity-60" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 100%)" }} aria-hidden="true" />
      {/* Animated gradient border */}
      <div className="absolute -inset-px rounded-2xl pointer-events-none z-0 transition-opacity duration-700" style={{ opacity: isHovered ? 1 : 0.15, background: "linear-gradient(135deg, var(--svg-violet), var(--svg-link), var(--svg-cyan), var(--svg-pink), var(--svg-violet))", backgroundSize: "300% 300%", animation: "border-rotate 6s ease infinite", mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px" }} aria-hidden="true" />
      {/* Spotlight */}
      <motion.div className="absolute inset-0 pointer-events-none z-0" style={{ background: spotlightBg, opacity: isHovered ? 1 : 0, transition: "opacity 0.5s ease", willChange: "background" }} aria-hidden="true" />
      {/* Top reflection on hover */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 70%, transparent 90%)" }} aria-hidden="true" />
      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: glowColor }} aria-hidden="true" />
      {/* Glass reflection sweep */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 55%, transparent 60%)", backgroundSize: "200% 100%", animation: "glass-sweep 12s linear infinite" }} aria-hidden="true" />
      {/* Moving radial highlight */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-[0.12] transition-opacity duration-700" style={{ background: `radial-gradient(ellipse at 30% 20%, ${glowColor} 0%, transparent 50%)` }} aria-hidden="true" />
      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   VISUALIZATION 1 — AI Agents (Neural Network)
   ═══════════════════════════════════════════ */

const AGENT_NODES = [
  { x: 50, y: 28, r: 5, label: "LLM" },
  { x: 22, y: 52, r: 4, label: "Vision" },
  { x: 78, y: 52, r: 4, label: "Tools" },
  { x: 35, y: 78, r: 3.5, label: "Memory" },
  { x: 65, y: 78, r: 3.5, label: "Reason" },
];

const AGENT_EDGES = [
  [0, 1], [0, 2], [1, 3], [2, 4], [1, 2], [3, 4], [0, 3], [0, 4],
];

function AIAgentsViz() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full min-h-[270px] flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full max-w-[320px]" aria-hidden="true">
        <defs>
          <radialGradient id="ef-agent-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--svg-violet)" stopOpacity="0.4" />
            <stop offset="60%" stopColor="var(--svg-violet)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="ef-agent-glow">
            <feGaussianBlur stdDeviation="1.2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Orbiting ring around core */}
        {!shouldReduceMotion && (
          <motion.circle
            cx="50" cy="28" r="18"
            fill="none" stroke="rgba(124,58,237,0.08)" strokeWidth="0.3"
            strokeDasharray="1.5 3"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 28px" }}
          />
        )}

        {/* Connection edges */}
        {AGENT_EDGES.map(([fi, ti], i) => {
          const f = AGENT_NODES[fi];
          const t = AGENT_NODES[ti];
          return (
            <g key={`ae-${i}`}>
              <motion.line
                x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke="var(--svg-violet)" strokeWidth="0.35" strokeDasharray="2 2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.08, ease }}
              />
              {/* Pulsing glow line */}
              {!shouldReduceMotion && (
                <motion.line
                  x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                  stroke="var(--svg-violet)" strokeWidth="0.6" filter="url(#ef-agent-glow)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                />
              )}
              {/* Traveling packets */}
              {!shouldReduceMotion && [0, 1].map((pi) => (
                <motion.circle
                  key={`p-${i}-${pi}`}
                  r={pi === 0 ? "0.8" : "0.5"}
                  fill={pi === 0 ? "var(--svg-violet-light)" : "var(--svg-violet)"}
                  opacity={pi === 0 ? "0.9" : "0.5"}
                  filter={pi === 0 ? "url(#ef-agent-glow)" : undefined}
                  initial={{ cx: f.x, cy: f.y }}
                  animate={{ cx: [f.x, t.x], cy: [f.y, t.y] }}
                  transition={{
                    duration: (pi === 0 ? 2.5 : 3.5) + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.4 + pi * 1.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </g>
          );
        })}

        {/* Nodes */}
        {AGENT_NODES.map((node, i) => {
          const isCore = i === 0;
          return (
            <g key={`an-${i}`}>
              {/* Breathing glow */}
              <motion.circle
                cx={node.x} cy={node.y} r={node.r + 6}
                fill={isCore ? "url(#ef-agent-core)" : "rgba(124,58,237,0.06)"}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: isCore ? [1, 1.2, 1] : [1, 1.1, 1], opacity: 1 }}
                transition={{
                  scale: { duration: isCore ? 3 : 4, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.5, delay: i * 0.1 },
                }}
              />
              {/* Rotating dashed ring */}
              {!shouldReduceMotion && (
                <motion.circle
                  cx={node.x} cy={node.y} r={node.r + 3}
                  fill="none" stroke="rgba(124,58,237,0.25)" strokeWidth="0.4"
                  strokeDasharray="2.5 3.5" strokeLinecap="round"
                  animate={{ rotate: isCore ? 360 : -360 }}
                  transition={{ duration: isCore ? 12 : 18, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              )}
              {/* Node body */}
              <motion.circle
                cx={node.x} cy={node.y} r={node.r}
                fill="var(--svg-canvas)"
                stroke={isCore ? "rgba(124,58,237,0.7)" : "rgba(124,58,237,0.4)"}
                strokeWidth={isCore ? 0.9 : 0.6}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 200 }}
              />
              {/* Inner dot */}
              <motion.circle
                cx={node.x} cy={node.y} r={isCore ? 2 : 1.3}
                fill={isCore ? "var(--svg-violet-light)" : "var(--svg-violet)"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1, type: "spring", stiffness: 300 }}
              />
              {/* Pulse ring */}
              {!shouldReduceMotion && (
                <motion.circle
                  cx={node.x} cy={node.y} r={node.r}
                  fill="none"
                  stroke={isCore ? "rgba(124,58,237,0.4)" : "rgba(124,58,237,0.2)"}
                  strokeWidth="0.4"
                  animate={{ r: [node.r, node.r + 6], opacity: [0.4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
                />
              )}
              {/* Label */}
              <motion.text
                x={node.x} y={node.y + node.r + 5}
                textAnchor="middle" fill="var(--svg-violet-light)"
                fontSize="3.5" fontWeight="500" fontFamily="var(--font-sans)"
                initial={{ opacity: 0 }} animate={{ opacity: 0.8 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                {node.label}
              </motion.text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   VISUALIZATION 2 — Workflow Automation
   ═══════════════════════════════════════════ */

const WF_NODES = [
  { x: 15, y: 30, type: "trigger" as const },
  { x: 40, y: 18, type: "condition" as const },
  { x: 40, y: 50, type: "process" as const },
  { x: 65, y: 18, type: "action" as const },
  { x: 65, y: 50, type: "action" as const },
  { x: 85, y: 34, type: "output" as const },
];

const WF_EDGES: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [1, 2],
];

function WorkflowViz() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full min-h-[270px] flex items-center justify-center">
      <svg viewBox="0 0 100 70" className="w-full h-full max-w-[340px]" aria-hidden="true">
        <defs>
          <linearGradient id="ef-wf-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--svg-violet)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--svg-link)" stopOpacity="0.6" />
          </linearGradient>
          <filter id="ef-wf-glow">
            <feGaussianBlur stdDeviation="1" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {WF_EDGES.map(([fi, ti], i) => {
          const f = WF_NODES[fi];
          const t = WF_NODES[ti];
          const midX = (f.x + t.x) / 2;
          const midY = (f.y + t.y) / 2;
          return (
            <g key={`we-${i}`}>
              <motion.path
                d={`M${f.x},${f.y} ${midX},${midY} ${t.x},${t.y}`}
                fill="none" stroke="var(--svg-violet)" strokeWidth="0.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
              />
              {/* Signal traveling */}
              {!shouldReduceMotion && (
                <motion.path
                  d={`M${f.x},${f.y} ${midX},${midY} ${t.x},${t.y}`}
                  fill="none" stroke="var(--svg-violet)" strokeWidth="0.7"
                  filter="url(#ef-wf-glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
                />
              )}
              {/* Traveling packet */}
              {!shouldReduceMotion && (
                <motion.circle
                  r="1" fill="var(--svg-violet-light)"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
                  style={{ offsetPath: `path("M${f.x},${f.y} ${midX},${midY} ${t.x},${t.y}")`, offsetRotate: "0deg" }}
                />
              )}
            </g>
          );
        })}

        {/* Nodes with activation sequence */}
        {WF_NODES.map((node, i) => {
          const isTrigger = node.type === "trigger";
          const isOutput = node.type === "output";
          const isCondition = node.type === "condition";
          const color = isTrigger ? "var(--svg-cyan)" : isOutput ? "var(--svg-success)" : isCondition ? "var(--svg-violet-light)" : "var(--svg-violet)";
          return (
            <g key={`wn-${i}`}>
              {/* Glow */}
              <motion.circle cx={node.x} cy={node.y} r="8" fill={`${color}12`}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              />
              {/* Node shape */}
              {isCondition ? (
                <motion.rect x={node.x - 5} y={node.y - 5} width="10" height="10" rx="2"
                  fill="var(--svg-canvas)" stroke={`${color}60`} strokeWidth="0.7"
                  initial={{ scale: 0, rotate: 45 }}
                  animate={{ scale: 1, rotate: 45 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease, type: "spring", stiffness: 200 }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              ) : (
                <motion.circle cx={node.x} cy={node.y} r={isTrigger || isOutput ? 5 : 4}
                  fill="var(--svg-canvas)" stroke={`${color}60`} strokeWidth="0.7"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease, type: "spring", stiffness: 200 }}
                />
              )}
              {/* Activation pulse — cascading */}
              {!shouldReduceMotion && (
                <motion.circle
                  cx={node.x} cy={node.y} r="4"
                  fill="none" stroke={`${color}30`} strokeWidth="0.35"
                  animate={{ r: [4, 9], opacity: [0.4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
                />
              )}
              {/* Completion pulse on output node */}
              {!shouldReduceMotion && isOutput && (
                <motion.circle
                  cx={node.x} cy={node.y} r="5"
                  fill="none" stroke="var(--svg-success)" strokeWidth="0.6"
                  animate={{ r: [5, 12], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 3, ease: "easeOut" }}
                />
              )}
            </g>
          );
        })}

        <motion.text x="50" y="66" textAnchor="middle" fill="var(--svg-violet-light)" fontSize="3.5" fontWeight="500" fontFamily="var(--font-sans)"
          initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1.2, duration: 0.5 }}
        >
          3 active workflows
        </motion.text>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   VISUALIZATION 3 — Advanced Analytics
   ═══════════════════════════════════════════ */

const BAR_DATA = [35, 55, 40, 70, 50, 80, 60, 90, 45, 75, 65, 95];

function AnalyticsViz() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full min-h-[270px] flex items-end justify-center gap-[3px] px-4 pb-3">
      {BAR_DATA.map((h, i) => (
        <motion.div
          key={i}
          className="relative flex-1 max-w-[18px] rounded-t-sm overflow-hidden"
          style={{ background: "var(--svg-link-dim)" }}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.6, delay: i * 0.05, ease }}
        >
          <motion.div
            className="absolute inset-x-0 bottom-0 rounded-t-sm"
            style={{ background: "linear-gradient(to top, var(--svg-link), var(--svg-violet))" }}
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease }}
          />
          {/* Glow on top */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute top-0 inset-x-0 h-1.5 rounded-t-sm"
              style={{ background: "var(--svg-link)", filter: "blur(3px)" }}
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
            />
          )}
        </motion.div>
      ))}
      {/* Trend line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 12 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id="ef-trend-glow">
            <feGaussianBlur stdDeviation="1" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <motion.polyline
          points={BAR_DATA.map((h, i) => `${(i / (BAR_DATA.length - 1)) * 100},${100 - h}`).join(" ")}
          fill="none" stroke="var(--svg-cyan)" strokeWidth="0.8"
          strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease }}
        />
        {/* Moving dot on trend line */}
        {!shouldReduceMotion && (
          <motion.circle
            r="1.5" fill="var(--svg-cyan)" filter="url(#ef-trend-glow)"
            animate={{
              cx: BAR_DATA.map((_, i) => (i / (BAR_DATA.length - 1)) * 100),
              cy: BAR_DATA.map((h) => 100 - h),
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {/* Graph pulse */}
        {!shouldReduceMotion && (
          <motion.polyline
            points={BAR_DATA.map((h, i) => `${(i / (BAR_DATA.length - 1)) * 100},${100 - h}`).join(" ")}
            fill="none" stroke="var(--svg-cyan)" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
            filter="url(#ef-trend-glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          />
        )}
      </svg>
      {/* KPI badges */}
      <motion.div className="absolute top-3 right-4 px-2 py-1 rounded-md bg-glass border border-hairline text-[9px] font-mono text-accent-blue/80"
        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.4 }}
      >
        +42% MRR
      </motion.div>
      <motion.div className="absolute top-3 left-4 px-2 py-1 rounded-md bg-glass border border-hairline text-[9px] font-mono text-accent-cyan/80"
        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        99.9% Uptime
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   VISUALIZATION 4 — Enterprise Security
   ═══════════════════════════════════════════ */

function SecurityViz() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full min-h-[270px] flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full max-w-[280px]" aria-hidden="true">
        <defs>
          <radialGradient id="ef-sec-glow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="var(--svg-cyan)" stopOpacity="0.2" />
            <stop offset="70%" stopColor="var(--svg-cyan)" stopOpacity="0.03" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="ef-sec-filter">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Shield */}
        <motion.path
          d="M50 12 L78 28 L78 52 C78 70 64 82 50 88 C36 82 22 70 22 52 L22 28 Z"
          fill="var(--svg-canvas)" stroke="rgba(80,227,194,0.4)" strokeWidth="1"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{ duration: 1.2, ease }}
        />
        <motion.path
          d="M50 12 L78 28 L78 52 C78 70 64 82 50 88 C36 82 22 70 22 52 L22 28 Z"
          fill="url(#ef-sec-glow)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        />

        {/* Radar sweep */}
        {!shouldReduceMotion && (
          <motion.circle
            cx="50" cy="50" r="26"
            fill="none" stroke="var(--svg-cyan)" strokeWidth="0.3"
            strokeDasharray="20 140" strokeLinecap="round"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" }}
          />
        )}

        {/* Rotating encryption rings */}
        {!shouldReduceMotion && (
          <>
            <motion.circle cx="50" cy="50" r="28" fill="none" stroke="rgba(80,227,194,0.15)" strokeWidth="0.5" strokeDasharray="4 6" strokeLinecap="round"
              animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50px 50px" }}
            />
            <motion.circle cx="50" cy="50" r="32" fill="none" stroke="rgba(80,227,194,0.1)" strokeWidth="0.4" strokeDasharray="3 8" strokeLinecap="round"
              animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50px 50px" }}
            />
            <motion.circle cx="50" cy="50" r="36" fill="none" stroke="rgba(80,227,194,0.07)" strokeWidth="0.3" strokeDasharray="2 10" strokeLinecap="round"
              animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50px 50px" }}
            />
          </>
        )}

        {/* Lock icon */}
        <motion.rect x="42" y="44" width="16" height="14" rx="3" fill="none" stroke="var(--svg-cyan)" strokeWidth="1.2"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 200 }}
          style={{ transformOrigin: "50px 50px" }}
        />
        <motion.path d="M45 44 L45 38 C45 34 55 34 55 38 L55 44" fill="none" stroke="var(--svg-cyan)" strokeWidth="1.2" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 1, duration: 0.6, ease }}
        />
        <motion.circle cx="50" cy="50" r="1.5" fill="var(--svg-cyan)"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 1.2, duration: 0.3, type: "spring", stiffness: 300 }}
        />

        {/* Lock pulse */}
        {!shouldReduceMotion && (
          <motion.rect x="42" y="44" width="16" height="14" rx="3" fill="none" stroke="var(--svg-cyan)" strokeWidth="0.8"
            animate={{ opacity: [0, 0.4, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            style={{ transformOrigin: "50px 50px" }}
          />
        )}

        {/* Encryption pulses */}
        {!shouldReduceMotion && (
          <>
            <motion.circle cx="50" cy="50" r="15" fill="none" stroke="var(--svg-cyan)" strokeWidth="0.6" filter="url(#ef-sec-filter)"
              animate={{ r: [15, 28], opacity: [0.4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.circle cx="50" cy="50" r="15" fill="none" stroke="var(--svg-cyan)" strokeWidth="0.4"
              animate={{ r: [15, 24], opacity: [0.3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
            />
          </>
        )}

        {/* Encrypted particles */}
        {!shouldReduceMotion && [0, 1, 2].map((pi) => (
          <motion.circle
            key={`ep-${pi}`}
            r="0.6" fill="var(--svg-cyan)" opacity="0.6"
            animate={{
              cx: [50 + Math.cos(pi * 2.1) * 15, 50 + Math.cos(pi * 2.1 + 3) * 25, 50 + Math.cos(pi * 2.1) * 15],
              cy: [50 + Math.sin(pi * 2.1) * 15, 50 + Math.sin(pi * 2.1 + 3) * 25, 50 + Math.sin(pi * 2.1) * 15],
            }}
            transition={{ duration: 4 + pi, repeat: Infinity, ease: "easeInOut", delay: pi * 0.8 }}
          />
        ))}

        {/* Status badge */}
        <motion.g initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.4 }}>
          <rect x="35" y="80" width="30" height="8" rx="4" fill="rgba(80,227,194,0.15)" stroke="rgba(80,227,194,0.3)" strokeWidth="0.5" />
          <text x="50" y="85.5" textAnchor="middle" fill="var(--svg-cyan)" fontSize="3.5" fontWeight="600" fontFamily="var(--font-sans)">SECURED</text>
        </motion.g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   VISUALIZATION 5 — Cloud Deployment
   ═══════════════════════════════════════════ */

const CLOUD_NODES = [
  { x: 50, y: 20, label: "CI/CD", color: "var(--svg-violet)" },
  { x: 20, y: 50, label: "US-East", color: "var(--svg-link)" },
  { x: 50, y: 50, label: "EU-West", color: "var(--svg-cyan)" },
  { x: 80, y: 50, label: "AP-South", color: "var(--svg-success)" },
  { x: 35, y: 80, label: "Storage", color: "var(--svg-violet-light)" },
  { x: 65, y: 80, label: "CDN", color: "var(--svg-link)" },
];

const CLOUD_EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [1, 4], [2, 4], [3, 5], [2, 5],
];

function CloudViz() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full min-h-[270px] flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full max-w-[300px]" aria-hidden="true">
        <defs>
          <filter id="ef-cloud-glow">
            <feGaussianBlur stdDeviation="1" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Cloud outline */}
        {!shouldReduceMotion && (
          <motion.path
            d="M30 35 C25 35 20 40 20 45 C15 45 12 50 15 55 C12 58 15 63 20 63 L80 63 C85 63 88 58 85 55 C88 50 85 45 80 45 C80 40 75 35 70 35 C65 28 55 25 50 28 C45 25 35 28 30 35 Z"
            fill="none" stroke="rgba(0,112,243,0.08)" strokeWidth="0.5" strokeDasharray="3 4"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Edges with upload packets */}
        {CLOUD_EDGES.map(([fi, ti], i) => {
          const f = CLOUD_NODES[fi];
          const t = CLOUD_NODES[ti];
          return (
            <g key={`ce-${i}`}>
              <motion.line x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke="var(--svg-hairline)" strokeWidth="0.35" strokeDasharray="2 2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease }}
              />
              {/* Upload packets */}
              {!shouldReduceMotion && [0, 1].map((pi) => (
                <motion.circle
                  key={`up-${i}-${pi}`}
                  r={pi === 0 ? "0.8" : "0.5"}
                  fill={f.color} opacity={pi === 0 ? "0.8" : "0.4"}
                  filter={pi === 0 ? "url(#ef-cloud-glow)" : undefined}
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ duration: 2 + i * 0.2 + pi * 0.8, repeat: Infinity, delay: i * 0.35 + pi * 1.2, ease: "linear" }}
                  style={{ offsetPath: `path("M${f.x},${f.y} ${t.x},${t.y}")`, offsetRotate: "0deg" }}
                />
              ))}
            </g>
          );
        })}

        {/* Nodes with activity pulse */}
        {CLOUD_NODES.map((node, i) => {
          const isCI = i === 0;
          return (
            <g key={`cn-${i}`}>
              <motion.circle cx={node.x} cy={node.y} r="10" fill={`${node.color}10`}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              />
              <motion.circle cx={node.x} cy={node.y} r={isCI ? 6 : 4.5}
                fill="var(--svg-canvas)" stroke={`${node.color}50`}
                strokeWidth={isCI ? 0.9 : 0.6}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.08, type: "spring", stiffness: 200 }}
              />
              {/* Activity pulse */}
              {!shouldReduceMotion && (
                <motion.circle cx={node.x} cy={node.y} r={isCI ? 6 : 4.5}
                  fill="none" stroke={`${node.color}30`} strokeWidth="0.4"
                  animate={{ r: [isCI ? 6 : 4.5, isCI ? 10 : 8], opacity: [0.4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
                />
              )}
              {/* Status dot */}
              <motion.circle cx={node.x + (isCI ? 5 : 3.5)} cy={node.y - (isCI ? 5 : 3.5)} r="1.5" fill="var(--svg-success)"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.3, type: "spring", stiffness: 300 }}
              />
              <motion.text x={node.x} y={node.y + (isCI ? 10 : 8)} textAnchor="middle" fill={node.color}
                fontSize="3.2" fontWeight="500" fontFamily="var(--font-sans)"
                initial={{ opacity: 0 }} animate={{ opacity: 0.8 }}
                transition={{ delay: 0.5 + i * 0.08 }}
              >
                {node.label}
              </motion.text>
            </g>
          );
        })}

        {/* Deploy status */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.4 }}>
          <rect x="30" y="92" width="40" height="7" rx="3.5" fill="rgba(0,112,243,0.1)" stroke="rgba(0,112,243,0.25)" strokeWidth="0.4" />
          <text x="50" y="97" textAnchor="middle" fill="var(--svg-link)" fontSize="3" fontWeight="500" fontFamily="var(--font-sans)">3 regions online</text>
        </motion.g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   VISUALIZATION 6 — Integrations
   ═══════════════════════════════════════════ */

const INTEGRATIONS = [
  { x: 50, y: 22, label: "API", color: "var(--svg-violet)" },
  { x: 18, y: 45, label: "CRM", color: "var(--svg-link)" },
  { x: 82, y: 45, label: "ERP", color: "var(--svg-cyan)" },
  { x: 30, y: 72, label: "HR", color: "var(--svg-success)" },
  { x: 70, y: 72, label: "Data", color: "var(--svg-violet-light)" },
];

const INT_EDGES: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 4], [1, 2], [3, 4], [0, 3], [0, 4],
];

function IntegrationsViz() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full min-h-[270px] flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full max-w-[300px]" aria-hidden="true">
        {/* Rotating hub ring */}
        {!shouldReduceMotion && (
          <motion.circle
            cx="50" cy="48" r="30"
            fill="none" stroke="rgba(80,227,194,0.06)" strokeWidth="0.4"
            strokeDasharray="2 5" strokeLinecap="round"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 48px" }}
          />
        )}

        {/* Edges with API requests */}
        {INT_EDGES.map(([fi, ti], i) => {
          const f = INTEGRATIONS[fi];
          const t = INTEGRATIONS[ti];
          return (
            <g key={`ie-${i}`}>
              <motion.line x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                stroke="var(--svg-hairline)" strokeWidth="0.4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
              />
              {/* Glowing connection line */}
              {!shouldReduceMotion && (
                <motion.line x1={f.x} y1={f.y} x2={t.x} y2={t.y}
                  stroke={f.color} strokeWidth="0.5" opacity="0.15"
                  animate={{ opacity: [0.05, 0.2, 0.05] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                />
              )}
              {/* API request particles */}
              {!shouldReduceMotion && [0, 1].map((pi) => (
                <motion.circle
                  key={`rp-${i}-${pi}`}
                  r={pi === 0 ? "1" : "0.6"}
                  fill={f.color} opacity={pi === 0 ? "0.7" : "0.35"}
                  animate={{ cx: [f.x, t.x, f.x], cy: [f.y, t.y, f.y] }}
                  transition={{
                    duration: (pi === 0 ? 3 : 4) + i * 0.4,
                    repeat: Infinity,
                    delay: i * 0.3 + pi * 1.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </g>
          );
        })}

        {/* Nodes with connection pulse */}
        {INTEGRATIONS.map((p, i) => (
          <g key={`in-${i}`}>
            <motion.circle cx={p.x} cy={p.y} r="10" fill={`${p.color}10`}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
            />
            <motion.circle cx={p.x} cy={p.y} r="6"
              fill="var(--svg-canvas)" stroke={`${p.color}50`} strokeWidth="0.7"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08, type: "spring", stiffness: 200 }}
            />
            <motion.text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle"
              fill={p.color} fontSize="4.5" fontWeight="600" fontFamily="var(--font-sans)"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              {p.label}
            </motion.text>
            {/* Connection completion pulse */}
            {!shouldReduceMotion && (
              <motion.circle cx={p.x} cy={p.y} r="6" fill="none" stroke={`${p.color}25`} strokeWidth="0.35"
                animate={{ r: [6, 11], opacity: [0.3, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════
   VISUALIZATION MAP
   ═══════════════════════════════════════════ */

const VISUALIZATIONS: Record<string, React.FC> = {
  "ai-agents": AIAgentsViz,
  "workflow": WorkflowViz,
  "analytics": AnalyticsViz,
  "security": SecurityViz,
  "cloud": CloudViz,
  "integrations": IntegrationsViz,
};

/* ═══════════════════════════════════════════
   FLOATING CARD WRAPPER
   ═══════════════════════════════════════════ */

function FloatingCard({
  card,
  index,
  shouldAnimate,
}: {
  card: (typeof CARDS)[number];
  index: number;
  shouldAnimate: boolean;
}) {
  const Visualization = VISUALIZATIONS[card.id];
  const floating = useFloatingMotion(index, {
    amplitude: card.featured ? 2 : 3,
    frequency: 0.3 + index * 0.04,
    enabled: shouldAnimate,
  });

  return (
    <motion.div
      custom={index}
      variants={cardEntry}
      style={{ y: floating.y }}
      className={card.featured ? "md:col-span-2 md:row-span-2" : ""}
    >
      <PremiumCard glowColor={card.glowColor} className="h-full">
        <div className={`flex flex-col h-full ${card.featured ? "p-6 sm:p-8" : "p-5 sm:p-6"}`}>
          {/* Visualization area — 35% larger */}
          <div className={`relative flex-1 ${card.featured ? "min-h-[320px]" : "min-h-[220px]"} mb-3`}>
            {Visualization && <Visualization />}
          </div>
          {/* Text content */}
          <div>
            <h3 className={`font-semibold text-text tracking-tight ${card.featured ? "text-lg sm:text-xl mb-2" : "text-base mb-1.5"}`}>
              {card.title}
            </h3>
            <p className={`text-text-secondary leading-relaxed ${card.featured ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}>
              {card.description}
            </p>
          </div>
        </div>
      </PremiumCard>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════ */

export function EnterpriseFeatures() {
  const { ref: sectionRef, shouldAnimate } = useViewportAnimation({ threshold: 0.06 });
  const shouldReduceMotion = useReducedMotion();
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orb1X = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const orb2X = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  const sectionBg = useMemo(
    () => (
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Animated grid */}
        <div
          className={`absolute inset-0 ${shouldAnimate && !shouldReduceMotion ? "animate-[grid-shimmer_8s_ease-in-out_infinite]" : ""}`}
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 15%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 15%, transparent 70%)",
          }}
        />

        {/* Slow breathing radial glow — 30s cycle */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[200px]"
          animate={shouldReduceMotion ? { opacity: 0.025 } : { opacity: [0.02, 0.045, 0.02] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(circle, var(--svg-violet) 0%, var(--svg-link) 40%, transparent 70%)" }}
        />

        {/* Ambient glow blob 1 — 25s drift */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full blur-[140px]"
          style={{ x: orb1X, y: orb1Y, background: "radial-gradient(circle, var(--svg-violet) 0%, transparent 70%)", top: "15%", left: "10%" }}
          animate={shouldReduceMotion ? { opacity: 0.03 } : { opacity: [0.02, 0.05, 0.02], scale: [1, 1.04, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ambient glow blob 2 — 30s drift */}
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full blur-[120px]"
          style={{ x: orb2X, y: orb2Y, background: "radial-gradient(circle, var(--svg-cyan) 0%, transparent 70%)", bottom: "10%", right: "15%" }}
          animate={shouldReduceMotion ? { opacity: 0.025 } : { opacity: [0.015, 0.04, 0.015], scale: [1, 1.05, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Ambient glow blob 3 — center cyan */}
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, var(--svg-link) 0%, transparent 70%)", top: "50%", left: "55%" }}
          animate={shouldReduceMotion ? { opacity: 0.02 } : { opacity: [0.01, 0.035, 0.01] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />

        {/* Static depth anchors */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-accent-blue/[0.015] rounded-full blur-[120px]" />

        {/* Depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-canvas/50" />

        {/* Animated noise texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
            animation: !shouldReduceMotion ? "noise-drift 30s ease-in-out infinite" : undefined,
          }}
        />
      </div>
    ),
    [shouldAnimate, shouldReduceMotion, orb1X, orb1Y, orb2X, orb2Y]
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden bg-canvas"
      aria-labelledby="enterprise-heading"
    >
      {sectionBg}

      {/* Floating particles */}
      {!shouldReduceMotion && shouldAnimate && (
        <Particles count={16} speed={0.05} maxSize={1.2} />
      )}

      <Container>
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
        >
          {/* Background glow reveal */}
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-6" ref={titleRef}>
            <h2 id="enterprise-heading" className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text">
              Enterprise AI{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
              Everything required to deploy, scale and manage enterprise-grade AI systems.
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 auto-rows-auto">
            {CARDS.map((card, i) => (
              <FloatingCard key={card.id} card={card} index={i} shouldAnimate={shouldAnimate} />
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 32, filter: "blur(6px)" }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="relative mt-16 sm:mt-24"
        >
          <div className="relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm overflow-hidden p-8 sm:p-12 lg:p-16 text-center">
            {/* CTA background */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[150px]"
                animate={shouldReduceMotion ? { opacity: 0.04 } : { opacity: [0.03, 0.06, 0.03] }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "radial-gradient(circle, var(--svg-violet) 0%, var(--svg-link) 50%, transparent 70%)" }}
              />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "32px 32px", maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 20%, transparent 70%)" }} />
              <div className="absolute -inset-px rounded-2xl pointer-events-none opacity-20" style={{ background: "linear-gradient(135deg, var(--svg-violet), var(--svg-link), var(--svg-cyan), var(--svg-violet))", backgroundSize: "300% 300%", animation: "border-rotate 6s ease infinite", mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px" }} />
            </div>

            <div className="relative z-10">
              <motion.h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text mb-4"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: 0.4 }}
              >
                Ready to Transform Your{" "}
                <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">Enterprise?</span>
              </motion.h3>

              <motion.p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto mb-8"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: 0.5 }}
              >
                Book a strategy call with our AI architects. We&apos;ll map your transformation roadmap
                and identify the highest-impact automation opportunities.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: 0.6 }}
              >
                <Button variant="primary" size="lg" href="#contact">Schedule Strategy Call</Button>
                <Button variant="secondary" size="lg" href="#solutions">Explore Solutions</Button>
              </motion.div>

              <motion.div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 pt-8 border-t border-hairline/50"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {["SOC 2 Certified", "GDPR Compliant", "99.99% SLA", "24/7 Support"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-xs sm:text-sm text-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/60" />
                    {badge}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
