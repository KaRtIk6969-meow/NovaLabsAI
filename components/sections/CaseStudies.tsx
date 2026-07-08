"use client";

import { useState, useRef, useCallback, memo, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { Particles } from "@/components/ui/Particles";
import { easing } from "@/design-system";
const ease = easing.default;

/* ═══════════════════════════════════════════
   CASE STUDY DATA
   ═══════════════════════════════════════════ */

const CASE_STUDIES = [
  {
    id: "healthcare",
    company: "MediCore Health",
    industry: "Healthcare",
    icon: "🏥",
    status: "active",
    challenge: "Manual patient scheduling caused long wait times and staff burnout.",
    solution:
      "NovaLabs AI Scheduling Agent — autonomous booking, triage routing, and calendar optimization.",
    before: { label: "Response Time", value: "16 Hours" },
    after: { label: "Response Time", value: "23 Seconds" },
    metrics: [
      { label: "Cost Reduction", value: 67, suffix: "%", icon: "↓", secondaryLabel: "+12% this quarter" },
      { label: "ROI", value: 412, suffix: "%", icon: "↑", secondaryLabel: "vs. industry avg 180%" },
      { label: "Staff Satisfaction", value: 89, suffix: "%", icon: "↑", secondaryLabel: "+23pts since deploy" },
    ],
    implementationWeeks: 4,
    sparkline: [20, 35, 28, 45, 42, 60, 58, 75, 72, 85, 88, 92],
    weeklyOutput: [35, 48, 42, 60, 55, 72, 68, 82],
  },
  {
    id: "manufacturing",
    company: "PrecisionWorks",
    industry: "Manufacturing",
    icon: "🏭",
    status: "completed",
    challenge: "Manual quality inspection missed defects, causing costly recalls.",
    solution:
      "AI Vision System — real-time defect detection with automated rejection and reporting.",
    before: { label: "Inspection Accuracy", value: "78%" },
    after: { label: "Inspection Accuracy", value: "99.4%" },
    metrics: [
      { label: "Accuracy Gain", value: 99.4, suffix: "%", icon: "↑", decimals: 1, secondaryLabel: "+21.4% from baseline" },
      { label: "Downtime", value: 54, suffix: "%", icon: "↓", secondaryLabel: "4.2hrs saved daily" },
      { label: "Recall Rate", value: 91, suffix: "%", icon: "↓", secondaryLabel: "Prevented 12 recalls" },
    ],
    implementationWeeks: 6,
    sparkline: [15, 22, 30, 28, 45, 52, 60, 58, 72, 80, 88, 95],
    weeklyOutput: [28, 38, 35, 50, 45, 65, 58, 75],
  },
  {
    id: "finance",
    company: "Vertex Capital",
    industry: "Finance",
    icon: "📊",
    status: "active",
    challenge: "Loan approvals took 3 days. Fraud detection was reactive.",
    solution:
      "AI Decision Engine — instant risk scoring, automated approvals, and real-time fraud monitoring.",
    before: { label: "Approval Time", value: "3 Days" },
    after: { label: "Approval Time", value: "3 Minutes" },
    metrics: [
      { label: "Speed Improvement", value: 1440, suffix: "x", icon: "↑", secondaryLabel: "3 days → 3 minutes" },
      { label: "Fraud Detection", value: 82, suffix: "%", icon: "↑", secondaryLabel: "+34% accuracy gain" },
      { label: "False Positives", value: 63, suffix: "%", icon: "↓", secondaryLabel: "67% fewer flags" },
    ],
    implementationWeeks: 8,
    sparkline: [10, 18, 25, 35, 42, 55, 60, 68, 75, 82, 90, 96],
    weeklyOutput: [22, 32, 28, 45, 40, 58, 52, 68],
  },
  {
    id: "retail",
    company: "Lumina Retail",
    industry: "Retail",
    icon: "🛒",
    status: "completed",
    challenge: "Inventory forecasting was inaccurate, leading to stock waste and shortages.",
    solution:
      "Demand Prediction AI — predictive analytics with automated reorder and waste reduction.",
    before: { label: "Forecast Accuracy", value: "62%" },
    after: { label: "Forecast Accuracy", value: "94%" },
    metrics: [
      { label: "Stock Waste", value: 71, suffix: "%", icon: "↓", secondaryLabel: "$2.1M saved annually" },
      { label: "Revenue Uplift", value: 34, suffix: "%", icon: "↑", secondaryLabel: "+$8.4M quarterly" },
      { label: "Stockout Rate", value: 58, suffix: "%", icon: "↓", secondaryLabel: "58% fewer shortages" },
    ],
    implementationWeeks: 5,
    sparkline: [18, 25, 32, 40, 48, 55, 62, 70, 78, 85, 90, 94],
    weeklyOutput: [30, 42, 38, 55, 48, 68, 62, 78],
  },
  {
    id: "logistics",
    company: "SwiftRoute",
    industry: "Logistics",
    icon: "🚚",
    status: "active",
    challenge: "Fleet optimization was manual, leading to high fuel costs and late deliveries.",
    solution:
      "Fleet Intelligence AI — route optimization, predictive maintenance, and real-time tracking.",
    before: { label: "On-Time Delivery", value: "71%" },
    after: { label: "On-Time Delivery", value: "97%" },
    metrics: [
      { label: "Fuel Cost", value: 34, suffix: "%", icon: "↓", secondaryLabel: "$1.8M saved per year" },
      { label: "Delivery Time", value: 41, suffix: "%", icon: "↓", secondaryLabel: "2.3hrs faster avg" },
      { label: "Fleet Utilization", value: 28, suffix: "%", icon: "↑", secondaryLabel: "+28% capacity used" },
    ],
    implementationWeeks: 3,
    sparkline: [22, 30, 38, 45, 52, 60, 65, 72, 78, 85, 92, 97],
    weeklyOutput: [40, 52, 48, 65, 58, 78, 72, 88],
  },
] as const;

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

/* ═══════════════════════════════════════════
   MINI GRAPH COMPONENTS
   ═══════════════════════════════════════════ */

const MiniLineGraph = memo(function MiniLineGraph({
  data,
  color = "var(--svg-link)",
  height = 48,
  isInView,
}: {
  data: readonly number[];
  color?: string;
  height?: number;
  isInView: boolean;
}) {
  const max = Math.max(...data);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const points = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * 100},${100 - (v / max) * 80}`
    )
    .join(" ");

  /* Compute point coordinates for the moving dot */
  const dotPoints = data.map((v, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (v / max) * 80,
  }));
  const dotPathD = dotPoints
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");

  return (
    <div className="relative">
      {/* Tooltip */}
      {hoveredIdx !== null && (
        <div
          className="absolute -top-7 z-10 px-2 py-1 rounded bg-canvas-raised border border-hairline text-[9px] text-text font-medium whitespace-nowrap shadow-lg pointer-events-none"
          style={{
            left: `${dotPoints[hoveredIdx].x}%`,
            transform: "translateX(-50%)",
          }}
        >
          {data[hoveredIdx]}
        </div>
      )}
      <svg
        viewBox="0 0 100 100"
        className="w-full"
        style={{ height }}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cs-line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <filter id="dot-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Breathing fill area */}
        <motion.polygon
          points={`0,100 ${points} 100,100`}
          fill="url(#cs-line-grad)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: [0.6, 1, 0.6] } : { opacity: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        {/* Line */}
        <motion.polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, ease, delay: 0.2 }}
        />
        {/* Data point dots */}
        {isInView && dotPoints.map((p, i) => (
          <g
            key={i}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Invisible hover target */}
            <circle cx={p.x} cy={p.y} r="6" fill="transparent" className="cursor-pointer" />
            {/* Visible dot */}
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={hoveredIdx === i ? 3 : 1.5}
              fill={color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: hoveredIdx === i ? 1 : 0.5, scale: 1 }}
              transition={{ duration: 0.2 }}
            />
            {/* Hover pulse ring */}
            {hoveredIdx === i && (
              <motion.circle
                cx={p.x}
                cy={p.y}
                r="5"
                fill="none"
                stroke={color}
                strokeWidth="0.5"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.5, scale: 1.2 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </g>
        ))}
        {/* Moving dot */}
        {isInView && (
          <motion.circle
            r="2.5"
            fill={color}
            filter="url(#dot-glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0], offsetDistance: ["0%", "0%", "100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.8 }}
            style={{
              offsetPath: `path("${dotPathD}")`,
            }}
          />
        )}
        {/* Glowing endpoint */}
        {isInView && (
          <motion.circle
            cx={dotPoints[dotPoints.length - 1].x}
            cy={dotPoints[dotPoints.length - 1].y}
            r="3"
            fill={color}
            filter="url(#dot-glow)"
            initial={{ opacity: 0, r: 0 }}
            animate={{ opacity: [0, 0.8, 0.4, 0.8], r: [0, 3, 2.5, 3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        )}
      </svg>
    </div>
  );
});

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Peak"] as const;

const MiniBarGraph = memo(function MiniBarGraph({
  data,
  color = "var(--svg-cyan)",
  height = 52,
  isInView,
}: {
  data: readonly number[];
  color?: string;
  height?: number;
  isInView: boolean;
}) {
  const max = Math.max(...data);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative" style={{ height: height + 16 }}>
      {/* Bars */}
      <div className="flex items-end gap-[3px]" style={{ height }}>
        {data.map((v, i) => (
          <div
            key={i}
            className="relative flex-1"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip */}
            {hoveredIndex === i && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-canvas-raised border border-hairline text-[9px] text-text font-medium whitespace-nowrap z-10 shadow-lg pointer-events-none">
                {v} automations
              </div>
            )}
            <motion.div
              className="w-full rounded-t-sm"
              style={{
                background: `linear-gradient(to top, ${color}, ${color}aa)`,
                boxShadow: hoveredIndex === i ? `0 0 8px ${color}44` : "none",
              }}
              initial={{ height: 0 }}
              animate={isInView ? { height: `${(v / max) * 100}%` } : { height: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease }}
            />
          </div>
        ))}
      </div>
      {/* Day labels */}
      <div className="flex gap-[3px] mt-1">
        {data.map((_, i) => (
          <div key={i} className="flex-1 text-center text-[7px] text-text-muted font-mono">
            {DAYS[i] || ""}
          </div>
        ))}
      </div>
    </div>
  );
});

function CircularKPI({
  value,
  max = 100,
  color = "var(--svg-link)",
  size = 48,
  isInView,
}: {
  value: number;
  max?: number;
  color?: string;
  size?: number;
  isInView: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;

  return (
    <div className="relative">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="3"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            isInView
              ? { strokeDashoffset: circumference - progress }
              : { strokeDashoffset: circumference }
          }
          transition={{ duration: 1.5, ease, delay: 0.4 }}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      {/* Completion pulse */}
      {isInView && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
          style={{
            boxShadow: `0 0 12px ${color}`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   METRIC CARD
   ═══════════════════════════════════════════ */

const MetricCard = memo(function MetricCard({
  metric,
  index,
  isInView,
}: {
  metric: { label: string; value: number; suffix: string; icon: string; decimals?: number; secondaryLabel?: string };
  index: number;
  isInView: boolean;
}) {
  const count = useCountUp({
    end: metric.value,
    duration: 2000,
    decimals: metric.decimals,
    startOnMount: isInView,
  });
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 26, mass: 0.5 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 26, mass: 0.5 });
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], [-4, 4]);

  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const springSpotX = useSpring(spotX, { stiffness: 180, damping: 22 });
  const springSpotY = useSpring(spotY, { stiffness: 180, damping: 22 });
  const spotBg = useMotionTemplate`radial-gradient(circle 180px at ${springSpotX}% ${springSpotY}%, rgba(255,255,255,0.08), transparent 70%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current || shouldReduceMotion) return;
      const r = cardRef.current.getBoundingClientRect();
      tiltX.set((e.clientX - r.left) / r.width - 0.5);
      tiltY.set((e.clientY - r.top) / r.height - 0.5);
      spotX.set(((e.clientX - r.left) / r.width) * 100);
      spotY.set(((e.clientY - r.top) / r.height) * 100);
    },
    [tiltX, tiltY, spotX, spotY, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
    spotX.set(50);
    spotY.set(50);
  }, [tiltX, tiltY, spotX, spotY]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformPerspective: 600,
      }}
      className="relative rounded-xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm p-4 group"
    >
      {/* Animated gradient border */}
      <div
        className="absolute -inset-px rounded-xl pointer-events-none z-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 0.6 : 0,
          background:
            "linear-gradient(135deg, var(--svg-violet), var(--svg-link), var(--svg-cyan), var(--svg-violet))",
          backgroundSize: "300% 300%",
          animation: "border-rotate 4s ease infinite",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
        aria-hidden="true"
      />

      {/* Glass reflection sweep */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 + index * 0.8 }}
          />
        </motion.div>
      )}

      {/* Cursor spotlight */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none z-0"
        style={{ background: spotBg, opacity: isHovered ? 1 : 0, transition: "opacity 0.4s ease" }}
        aria-hidden="true"
      />

      {/* Soft glow */}
      <div
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "var(--svg-link-dim)" }}
        aria-hidden="true"
      />

      {/* Floating motion container */}
      <motion.div
        className="relative z-10"
        animate={
          !shouldReduceMotion && isInView
            ? { y: [0, -2, 0, 1, 0] }
            : { y: 0 }
        }
        transition={{ duration: 5 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <motion.span
            className="text-lg"
            animate={
              !shouldReduceMotion && isInView
                ? { scale: [1, 1.08, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
          >
            {metric.icon}
          </motion.span>
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
            {metric.label}
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-text tracking-tight">
          {count}
          <span className="text-accent-cyan">{metric.suffix}</span>
        </div>
        {metric.secondaryLabel && (
          <div className="text-[10px] text-text-muted mt-1 font-medium">
            {metric.secondaryLabel}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
});

/* ═══════════════════════════════════════════
   BEFORE / AFTER COMPARISON
   ═══════════════════════════════════════════ */

function parseNumeric(val: string) {
  const m = val.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : NaN;
}

function suffixOf(val: string) {
  return val.replace(/[\d.]+/, "");
}

const BeforeAfter = memo(function BeforeAfter({
  before,
  after,
  isInView,
}: {
  before: { label: string; value: string };
  after: { label: string; value: string };
  isInView: boolean;
}) {
  const beforeNum = parseNumeric(before.value);
  const afterNum = parseNumeric(after.value);
  const hasBeforeNum = !Number.isNaN(beforeNum);
  const hasAfterNum = !Number.isNaN(afterNum);
  const beforeDecimals = before.value.includes(".") ? 1 : 0;
  const afterDecimals = after.value.includes(".") ? 1 : 0;

  const beforeCount = useCountUp({
    end: hasBeforeNum ? beforeNum : 0,
    duration: 1200,
    decimals: beforeDecimals,
    startOnMount: isInView,
  });
  const afterCount = useCountUp({
    end: hasAfterNum ? afterNum : 0,
    duration: 1800,
    decimals: afterDecimals,
    startOnMount: isInView,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setShowSuccess(true), 2000);
    return () => {
      clearTimeout(t);
      setShowSuccess(false);
    };
  }, [isInView, after.value]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-center">
      {/* Before */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
        className="relative rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm p-4 text-center overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ background: "linear-gradient(135deg, var(--svg-pink) 0%, transparent 60%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10">
          <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1.5">
            Before
          </div>
          <div className="text-xs text-text-secondary mb-1">{before.label}</div>
          <div className="text-xl sm:text-2xl font-bold text-text">
            {hasBeforeNum ? beforeCount : before.value}
            {hasBeforeNum && suffixOf(before.value)}
          </div>
        </div>
      </motion.div>

      {/* Arrow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 0.5, delay: 0.6, ease }}
        className="hidden sm:flex items-center justify-center"
      >
        <div className="relative w-10 h-10 rounded-full border border-hairline bg-canvas-raised flex items-center justify-center">
          {/* Ambient glow */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={
              isInView
                ? { boxShadow: ["0 0 0px var(--svg-cyan)", "0 0 14px var(--svg-cyan)", "0 0 0px var(--svg-cyan)"] }
                : { boxShadow: "0 0 0px var(--svg-cyan)" }
            }
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            aria-hidden="true"
          />
          {/* Success pulse */}
          {showSuccess && !shouldReduceMotion && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              initial={{ boxShadow: "0 0 0px var(--svg-cyan)" }}
              animate={{ boxShadow: ["0 0 0px var(--svg-cyan)", "0 0 24px var(--svg-cyan)", "0 0 0px var(--svg-cyan)"] }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              aria-hidden="true"
            />
          )}
          {/* Moving light dot along arrow path */}
          {!shouldReduceMotion && isInView && (
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_var(--svg-cyan)] pointer-events-none"
              style={{
                offsetPath: 'path("M3 8 L9 8 M9 4 L13 8 L9 12")',
                offsetRotate: "0deg",
              }}
              animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          )}
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-accent-cyan"
            aria-hidden="true"
            animate={
              isInView
                ? { x: [0, 2, 0], opacity: [0.7, 1, 0.7] }
                : { x: 0, opacity: 0.7 }
            }
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <path
              d="M3 8h10m0 0L9 4m4 4L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>
      </motion.div>

      {/* After */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.6, delay: 0.7, ease }}
        className="relative rounded-xl border border-accent-blue/20 bg-canvas-raised/60 backdrop-blur-sm p-4 text-center overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ background: "linear-gradient(135deg, var(--svg-link) 0%, var(--svg-cyan) 60%)" }}
          aria-hidden="true"
        />
        {/* Success flash */}
        {showSuccess && !shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.12, 0] }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ background: "radial-gradient(circle at center, var(--svg-cyan), transparent 70%)" }}
            aria-hidden="true"
          />
        )}
        {/* Cyan light sweep */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(80,227,194,0.06) 48%, rgba(80,227,194,0.1) 50%, rgba(80,227,194,0.06) 52%, transparent 60%)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }}
            />
          </motion.div>
        )}
        <div className="relative z-10">
          <div className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan mb-1.5">
            After
          </div>
          <div className="text-xs text-text-secondary mb-1">{after.label}</div>
          <div className="text-xl sm:text-2xl font-bold text-text">
            {hasAfterNum ? afterCount : after.value}
            {hasAfterNum && suffixOf(after.value)}
          </div>
        </div>
      </motion.div>
    </div>
  );
});

/* ═══════════════════════════════════════════
   TIMELINE COMPONENT
   ═══════════════════════════════════════════ */

function Timeline({
  studies,
  activeIndex,
  onSelect,
  isInView,
}: {
  studies: typeof CASE_STUDIES;
  activeIndex: number;
  onSelect: (index: number) => void;
  isInView: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative flex flex-col"
    >
      {/* Timeline line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-hairline/50" aria-hidden="true">
        {/* Base gradient fill */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-accent-blue via-accent-violet to-accent-cyan"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          style={{ transformOrigin: "top" }}
        />
        {/* Soft pulse overlay */}
        {!shouldReduceMotion && isInView && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-accent-blue via-accent-violet to-accent-cyan"
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        )}
        {/* Traveling gradient highlight */}
        {!shouldReduceMotion && isInView && (
          <motion.div
            className="absolute inset-x-[-6px] h-16 rounded-full blur-[10px]"
            style={{
              background: "linear-gradient(180deg, transparent, var(--svg-link), transparent)",
            }}
            animate={{ top: ["-10%", "110%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2,
            }}
          />
        )}
        {/* Traveling particle */}
        {!shouldReduceMotion && isInView && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_var(--svg-cyan)]"
            animate={{ top: ["-2%", "102%"] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1,
            }}
          />
        )}
        {/* Active segment glow - positioned at active node */}
        {!shouldReduceMotion && isInView && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-3 h-20 rounded-full blur-[8px]"
            style={{
              background: "linear-gradient(180deg, transparent, var(--svg-link), transparent)",
            }}
            animate={{
              top: `${(activeIndex / (5 - 1)) * 85 + 5}%`,
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              top: { type: "spring", stiffness: 120, damping: 20 },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        )}
      </div>

      {studies.map((study, i) => {
        const isActive = i === activeIndex;
        const isCompleted = i < activeIndex;
        return (
          <motion.button
            key={study.id}
            variants={slideRight}
            onClick={() => onSelect(i)}
            className={`group relative flex items-center gap-4 py-4 px-2 text-left transition-all duration-500 rounded-xl ${
              isActive
                ? "bg-glass/50"
                : "hover:bg-glass/30"
            }`}
            aria-label={`View ${study.company} case study`}
            aria-pressed={isActive}
          >
            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0">
              {/* Completed node pulse */}
              {isCompleted && !shouldReduceMotion && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "var(--svg-cyan)",
                    width: 40,
                    height: 40,
                    top: -4,
                    left: -4,
                  }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0, 0.15] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                />
              )}
              {/* Hover spotlight ring */}
              {!isActive && !shouldReduceMotion && (
                <motion.div
                  className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(0,112,243,0.12) 0%, transparent 70%)",
                  }}
                  aria-hidden="true"
                />
              )}
              {/* Rotating outer ring (hover on inactive) */}
              {!isActive && !shouldReduceMotion && (
                <motion.div
                  className="absolute -inset-1.5 rounded-full border border-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    borderImage: "linear-gradient(135deg, var(--svg-link), var(--svg-cyan), var(--svg-violet)) 1",
                    borderRadius: "9999px",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    padding: "1px",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                />
              )}
              {/* Active pulse */}
              {isActive && !shouldReduceMotion && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "var(--svg-link)",
                    width: 40,
                    height: 40,
                    top: -4,
                    left: -4,
                  }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              {/* Animated cyan ring (selected) */}
              {isActive && !shouldReduceMotion && (
                <motion.div
                  className="absolute -inset-1.5 rounded-full pointer-events-none"
                  style={{
                    border: "1px solid transparent",
                    background: "linear-gradient(var(--svg-canvas), var(--svg-canvas)) padding-box, linear-gradient(135deg, var(--svg-link), var(--svg-cyan), var(--svg-violet)) border-box",
                    borderRadius: "9999px",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  aria-hidden="true"
                />
              )}
              {/* Orbiting particle (selected) */}
              {isActive && !shouldReduceMotion && (
                <motion.div
                  className="absolute -inset-3 pointer-events-none"
                  aria-hidden="true"
                >
                  <motion.div
                    className="absolute left-1/2 top-0 w-1 h-1 -translate-x-1/2 rounded-full bg-accent-cyan shadow-[0_0_6px_var(--svg-cyan)]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "0 24px" }}
                  />
                </motion.div>
              )}
              <motion.div
                className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-br from-accent-blue to-accent-violet shadow-[0_0_20px_var(--svg-link-dim)]"
                    : "bg-canvas-raised border border-hairline group-hover:border-hairline-strong group-hover:shadow-[0_0_12px_rgba(0,112,243,0.1)]"
                }`}
                animate={
                  isActive && !shouldReduceMotion
                    ? { rotate: [0, 2, 0, -2, 0], scale: [1, 1.02, 1] }
                    : { rotate: 0, scale: 1 }
                }
                transition={
                  isActive && !shouldReduceMotion
                    ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    : { type: "spring", stiffness: 300, damping: 20 }
                }
                whileHover={!isActive && !shouldReduceMotion ? { scale: 1.08 } : undefined}
              >
                <span className="text-lg">{study.icon}</span>
              </motion.div>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${
                    isActive ? "text-text" : "text-text-secondary group-hover:text-text"
                  }`}
                >
                  {study.company}
                </span>
                {isActive && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_6px_var(--svg-cyan)]"
                  />
                )}
              </div>
              <span className="text-xs text-text-muted">{study.industry}</span>
            </div>

            {/* Active indicator */}
            {isActive && (
              <motion.div
                layoutId="timeline-active"
                className="absolute right-2 w-1.5 h-8 rounded-full bg-gradient-to-b from-accent-blue to-accent-cyan"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   CASE STUDY PANEL
   ═══════════════════════════════════════════ */

function CaseStudyPanel({
  study,
  isInView,
}: {
  study: (typeof CASE_STUDIES)[number];
  isInView: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  /* 3D tilt on hover */
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 180, damping: 22, mass: 0.6 });
  const springTiltY = useSpring(tiltY, { stiffness: 180, damping: 22, mass: 0.6 });
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], [1.5, -1.5]);
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], [-1.5, 1.5]);

  /* Spotlight */
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const springSpotX = useSpring(spotX, { stiffness: 200, damping: 25 });
  const springSpotY = useSpring(spotY, { stiffness: 200, damping: 25 });
  const spotBg = useMotionTemplate`radial-gradient(circle 400px at ${springSpotX}% ${springSpotY}%, var(--svg-link-dim), transparent 70%)`;
  const [spotOn, setSpotOn] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!panelRef.current || shouldReduceMotion) return;
      const r = panelRef.current.getBoundingClientRect();
      tiltX.set((e.clientX - r.left) / r.width - 0.5);
      tiltY.set((e.clientY - r.top) / r.height - 0.5);
      spotX.set(((e.clientX - r.left) / r.width) * 100);
      spotY.set(((e.clientY - r.top) / r.height) * 100);
    },
    [tiltX, tiltY, spotX, spotY, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setSpotOn(false);
    tiltX.set(0);
    tiltY.set(0);
    spotX.set(50);
    spotY.set(50);
  }, [tiltX, tiltY, spotX, spotY]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={study.id}
        ref={panelRef}
        initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(8px)" }}
        transition={{ duration: 0.45, ease }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setSpotOn(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformPerspective: 1200,
        }}
        className="relative rounded-2xl border border-hairline bg-canvas-raised backdrop-blur-sm overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.08),0_4px_12px_-2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.04)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15),0_16px_32px_-8px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,112,243,0.06),inset_0_1px_0_rgba(255,255,255,0.06)] transition-shadow duration-700"
      >
        {/* Animated gradient border */}
        <div
          className="absolute -inset-px rounded-2xl pointer-events-none z-0 transition-opacity duration-700"
          style={{
            opacity: spotOn ? 0.8 : 0.15,
            background:
              "linear-gradient(135deg, var(--svg-violet), var(--svg-link), var(--svg-cyan), var(--svg-pink), var(--svg-violet))",
            backgroundSize: "300% 300%",
            animation: "border-rotate 6s ease infinite",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
          aria-hidden="true"
        />

        {/* Glass fill */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 40%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Inner glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          style={{
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.04), inset 0 -1px 1px rgba(0,0,0,0.1)",
          }}
          aria-hidden="true"
        />

        {/* Ambient cyan edge lighting */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none z-0"
            animate={{
              boxShadow: [
                "inset 0 0 0 1px rgba(80,227,194,0), inset 0 0 0 0 rgba(80,227,194,0)",
                "inset 0 0 0 1px rgba(80,227,194,0.04), inset 0 0 30px -10px rgba(80,227,194,0.06)",
                "inset 0 0 0 1px rgba(80,227,194,0), inset 0 0 0 0 rgba(80,227,194,0)",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
        )}

        {/* Diagonal glass reflection sweep */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none z-0 overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.025) 42%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.025) 58%, transparent 70%)",
              }}
              animate={{ x: ["-120%", "220%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatDelay: 6 }}
            />
          </motion.div>
        )}

        {/* Top edge highlight */}
        <div
          className="absolute top-0 inset-x-0 h-[1px] rounded-t-2xl pointer-events-none z-0 opacity-40"
          style={{
            background:
              "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 75%, transparent 95%)",
          }}
          aria-hidden="true"
        />

        {/* Spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: spotBg,
            opacity: spotOn ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8">
          {/* Company header */}
          <motion.div
            key={`${study.id}-header`}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4, delay: 0.05, ease }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-violet/20 border border-hairline flex items-center justify-center text-2xl">
              {study.icon}
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-text tracking-tight">
                {study.company}
              </h3>
              <span className="text-sm text-accent-cyan font-medium">{study.industry}</span>
            </div>
          </motion.div>

          {/* Challenge & Solution */}
          <motion.div
            key={`${study.id}-challenge`}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4, delay: 0.12, ease }}
            className="space-y-4 mb-6"
          >
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1.5">
                Challenge
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{study.challenge}</p>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan mb-1.5">
                Solution
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{study.solution}</p>
            </div>
          </motion.div>

          {/* Before / After */}
          <motion.div
            key={`${study.id}-beforeafter`}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4, delay: 0.18, ease }}
            className="mb-6"
          >
            <BeforeAfter before={study.before} after={study.after} isInView={isInView} />
          </motion.div>

          {/* Metrics Grid */}
          <motion.div
            key={`${study.id}-metrics`}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4, delay: 0.24, ease }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6"
          >
            {study.metrics.map((metric, i) => (
              <MetricCard key={`${study.id}-${metric.label}`} metric={metric} index={i} isInView={isInView} />
            ))}
          </motion.div>

          {/* Graphs */}
          <motion.div
            key={`${study.id}-graphs`}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4, delay: 0.3, ease }}
            className="grid grid-cols-2 gap-3 mb-6"
          >
            {/* Line graph */}
            <div className="rounded-xl border border-hairline bg-canvas/50 p-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-2">
                Performance Trend
              </div>
              <MiniLineGraph
                data={study.sparkline}
                color="var(--svg-link)"
                height={48}
                isInView={isInView}
              />
            </div>
            {/* Bar graph */}
            <div className="rounded-xl border border-hairline bg-canvas/50 p-3">
              <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-2">
                Weekly Output
              </div>
              <MiniBarGraph
                data={study.weeklyOutput}
                color="var(--svg-cyan)"
                height={48}
                isInView={isInView}
              />
            </div>
          </motion.div>

          {/* Implementation info */}
          <motion.div
            key={`${study.id}-impl`}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.4, delay: 0.36, ease }}
            className="flex items-center justify-between pt-4 border-t border-hairline/50"
          >
            <div className="flex items-center gap-3">
              <CircularKPI
                value={parseInt(study.after.value) || 95}
                color="var(--svg-link)"
                size={40}
                isInView={isInView}
              />
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                  Success Rate
                </div>
                <div className="text-sm font-semibold text-text">98.7%</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                Implementation
              </div>
              <div className="text-sm font-semibold text-text">
                {study.implementationWeeks} weeks
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════ */

export function CaseStudies() {
  const { ref: sectionRef, shouldAnimate } = useViewportAnimation({ threshold: 0.06 });
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden bg-canvas contain-layout contain-paint"
      aria-labelledby="casestudies-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <AnimatedGrid
          opacity={0.015}
          spacing={48}
          className={
            shouldAnimate && !shouldReduceMotion
              ? "animate-[grid-shimmer_8s_ease-in-out_infinite]"
              : ""
          }
        />

        {/* Breathing radial glow */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full blur-[220px]"
          animate={
            shouldReduceMotion
              ? { opacity: 0.025 }
              : { opacity: [0.02, 0.045, 0.02] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, var(--svg-link) 0%, var(--svg-violet) 40%, transparent 70%)",
          }}
        />

        {/* Static depth anchors */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-cyan/[0.015] rounded-full blur-[120px]" />

        {/* Floating light blob */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-[180px]"
            style={{
              background: "radial-gradient(circle, rgba(0,112,243,0.04) 0%, rgba(121,40,202,0.02) 50%, transparent 70%)",
            }}
            animate={{
              x: ["-20%", "15%", "-10%", "20%", "-20%"],
              y: ["-10%", "20%", "-15%", "10%", "-10%"],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Subtle light beams */}
        {!shouldReduceMotion && (
          <>
            <motion.div
              className="absolute top-0 left-1/3 w-[1px] h-full"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(0,112,243,0.06) 30%, rgba(0,112,243,0.06) 70%, transparent 100%)",
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-0 right-1/3 w-[1px] h-full"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(80,227,194,0.04) 30%, rgba(80,227,194,0.04) 70%, transparent 100%)",
              }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </>
        )}

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        {/* Depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-canvas/50" />
      </div>

      {/* Particles */}
      {!shouldReduceMotion && shouldAnimate && (
        <Particles count={14} speed={0.04} maxSize={1} />
      )}

      <Container>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairline bg-glass text-[13px] font-medium text-body backdrop-blur-md transition-all duration-500 hover:border-link/30 hover:bg-link/[0.06] hover:shadow-[0_0_20px_var(--svg-link-dim)] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-blue shadow-[0_0_8px_var(--svg-link)]" />
              </span>
              Real Business Impact
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            id="casestudies-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-5"
          >
            Real AI Transformations.{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Real Business Results.
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto"
          >
            See how enterprise organizations automate operations, reduce costs and increase
            productivity using NovaLabs AI.
          </motion.p>
        </motion.div>

        {/* Main layout */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10"
        >
          {/* Left: Timeline */}
          <motion.div variants={fadeUp} className="order-2 lg:order-1">
            <div className="lg:sticky lg:top-24">
              {/* Left-side ambient atmosphere */}
              <div className="absolute -inset-x-8 -inset-y-12 pointer-events-none" aria-hidden="true">
                {/* Faint radial glow behind timeline */}
                <motion.div
                  className="absolute left-0 top-1/4 w-[350px] h-[500px] rounded-full blur-[160px]"
                  style={{ background: "radial-gradient(circle, rgba(0,112,243,0.03) 0%, transparent 70%)" }}
                  animate={
                    shouldReduceMotion
                      ? { opacity: 0.5 }
                      : { opacity: [0.3, 0.6, 0.3] }
                  }
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Secondary depth blob */}
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute left-4 top-2/3 w-[200px] h-[300px] rounded-full blur-[120px]"
                    style={{ background: "radial-gradient(circle, rgba(121,40,202,0.025) 0%, transparent 70%)" }}
                    animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                {/* Subtle vertical light beam */}
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute left-[19px] top-0 bottom-0 w-[1px]"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(0,112,243,0.04) 20%, rgba(0,112,243,0.04) 80%, transparent 100%)",
                    }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                {/* Floating dust particles */}
                {!shouldReduceMotion && (
                  <>
                    <motion.div
                      className="absolute left-8 top-[15%] w-[2px] h-[2px] rounded-full bg-accent-blue/30"
                      animate={{ y: [0, 40, 0], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute left-12 top-[45%] w-[1.5px] h-[1.5px] rounded-full bg-accent-cyan/25"
                      animate={{ y: [0, -30, 0], opacity: [0.15, 0.4, 0.15] }}
                      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                    <motion.div
                      className="absolute left-6 top-[70%] w-[2px] h-[2px] rounded-full bg-accent-violet/20"
                      animate={{ y: [0, 25, 0], opacity: [0.1, 0.35, 0.1] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    />
                    <motion.div
                      className="absolute left-10 top-[30%] w-[1px] h-[1px] rounded-full bg-white/20"
                      animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    />
                  </>
                )}
              </div>

              <Timeline
                studies={CASE_STUDIES}
                activeIndex={activeIndex}
                onSelect={setActiveIndex}
                isInView={shouldAnimate}
              />
            </div>
          </motion.div>

          {/* Right: Panel */}
          <motion.div variants={fadeUp} className="order-1 lg:order-2">
            <CaseStudyPanel
              study={CASE_STUDIES[activeIndex]}
              isInView={shouldAnimate}
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
