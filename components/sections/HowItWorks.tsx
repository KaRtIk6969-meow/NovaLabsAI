"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";
import { easing } from "@/design-system";
const ease = easing.default;

/* ─── Data ─── */

const STEPS = [
  {
    id: 0,
    title: "Discovery",
    description:
      "We map your business processes, identify bottlenecks, and uncover automation opportunities with a comprehensive audit.",
    details: [
      "Process mapping & audit",
      "Bottleneck identification",
      "ROI opportunity analysis",
    ],
    timeframe: "1–2 weeks",
    techs: ["Research", "Analytics", "Strategy"],
  },
  {
    id: 1,
    title: "AI Analysis",
    description:
      "Our AI models analyze your data patterns to design the optimal automation strategy for maximum impact.",
    details: [
      "Pattern recognition",
      "Strategy design",
      "Predictive modeling",
    ],
    timeframe: "2–3 weeks",
    techs: ["ML Models", "Data Pipelines", "NLP"],
  },
  {
    id: 2,
    title: "Automation Development",
    description:
      "We build intelligent, production-grade automation workflows tailored to your exact requirements.",
    details: [
      "Custom workflow engineering",
      "AI model integration",
      "Rigorous QA testing",
    ],
    timeframe: "3–5 weeks",
    techs: ["TypeScript", "Python", "APIs"],
  },
  {
    id: 3,
    title: "Deployment",
    description:
      "Zero-downtime deployment with monitoring, rollback safety nets, and full observability from day one.",
    details: [
      "Zero-downtime rollout",
      "Real-time monitoring",
      "Safety rollback nets",
    ],
    timeframe: "1–2 weeks",
    techs: ["Docker", "Kubernetes", "CI/CD"],
  },
  {
    id: 4,
    title: "Continuous Optimization",
    description:
      "AI-driven monitoring continuously learns, adapts, and optimizes your automations for peak performance.",
    details: [
      "AI-driven performance tuning",
      "Anomaly detection",
      "Continuous improvement",
    ],
    timeframe: "Ongoing",
    techs: ["Monitoring", "ML Ops", "Alerting"],
  },
];

const NODE_POS = [
  { x: 50, y: 25 },
  { x: 25, y: 65 },
  { x: 75, y: 105 },
  { x: 35, y: 145 },
  { x: 65, y: 185 },
];

const CONNS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
];

function curvedPath(
  a: { x: number; y: number },
  b: { x: number; y: number }
) {
  const midY = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const c = Math.min(Math.abs(dx) * 0.4, 20);
  return `M${a.x},${a.y} C${a.x + (dx > 0 ? c : -c)},${midY} ${b.x + (dx > 0 ? -c : c)},${midY} ${b.x},${b.y}`;
}

/* ─── Stagger config ─── */

const ITEM_DELAYS = [0, 0.06, 0.12, 0.18, 0.24, 0.32] as const;

/* ─── Workflow Visualization (left panel) ─── */

function WorkflowVisualization({
  activeStep,
  hoveredNode,
  onNodeHover,
  onNodeClick,
  shouldAnimate,
  shouldReduceMotion,
}: {
  activeStep: number;
  hoveredNode: number | null;
  onNodeHover: (i: number | null) => void;
  onNodeClick: (i: number) => void;
  shouldAnimate: boolean;
  shouldReduceMotion: boolean | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Mouse tracking for spotlight + subtle parallax ── */
  const rawMouseX = useMotionValue(50);
  const rawMouseY = useMotionValue(50);
  const springMouseX = useSpring(rawMouseX, {
    stiffness: 120,
    damping: 18,
    mass: 0.6,
  });
  const springMouseY = useSpring(rawMouseY, {
    stiffness: 120,
    damping: 18,
    mass: 0.6,
  });
  const spotlightBg = useMotionTemplate`radial-gradient(circle 280px at ${springMouseX}% ${springMouseY}%, var(--svg-cyan-dim), transparent 70%)`;
  const [spotlightOn, setSpotlightOn] = useState(false);

  /* Timeline shifts ~4px toward cursor */
  const parallaxX = useTransform(springMouseX, [0, 100], [-4, 4]);
  const parallaxY = useTransform(springMouseY, [0, 100], [-3, 3]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current || shouldReduceMotion) return;
      const r = containerRef.current.getBoundingClientRect();
      rawMouseX.set(((e.clientX - r.left) / r.width) * 100);
      rawMouseY.set(((e.clientY - r.top) / r.height) * 100);
    },
    [rawMouseX, rawMouseY, shouldReduceMotion]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[320px] md:min-h-[400px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setSpotlightOn(true)}
      onMouseLeave={() => {
        setSpotlightOn(false);
        onNodeHover(null);
      }}
    >
      {/* Cursor spotlight */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 rounded-2xl"
          style={{
            background: spotlightBg,
            opacity: spotlightOn ? 0.45 : 0,
            transition: "opacity 0.4s ease",
          }}
          aria-hidden="true"
        />
      )}

      <motion.svg
        viewBox="0 0 100 210"
        className="w-full h-full"
        aria-hidden="true"
        style={{
          x: shouldReduceMotion ? 0 : parallaxX,
          y: shouldReduceMotion ? 0 : parallaxY,
        }}
      >
        <defs>
          <radialGradient id="hiw-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--svg-cyan)" stopOpacity="0.45" />
            <stop offset="55%" stopColor="var(--svg-cyan)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="hiw-glow-f">
            <feGaussianBlur stdDeviation="1.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Animated gradient for connection lines */}
          <linearGradient
            id="hiw-conn-anim"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--svg-cyan)" stopOpacity="0.6">
              {!shouldReduceMotion && shouldAnimate && (
                <animate
                  attributeName="stopOpacity"
                  values="0.3;0.7;0.3"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
            <stop offset="100%" stopColor="var(--svg-link)" stopOpacity="0.6">
              {!shouldReduceMotion && shouldAnimate && (
                <animate
                  attributeName="stopOpacity"
                  values="0.5;0.3;0.5"
                  dur="3s"
                  repeatCount="indefinite"
                />
              )}
            </stop>
          </linearGradient>
          <linearGradient id="hiw-conn-dim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--svg-cyan)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--svg-link)" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="hiw-conn-hot" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--svg-cyan)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--svg-link)" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* ── Connection paths ── */}
        {CONNS.map(([fi, ti], ci) => {
          const from = NODE_POS[fi];
          const to = NODE_POS[ti];
          const d = curvedPath(from, to);
          const segActive = activeStep === fi || activeStep === ti;
          const segHovered = hoveredNode === fi || hoveredNode === ti;
          const lit = segActive || segHovered;

          return (
            <g key={`c${ci}`}>
              {/* Base path — animated gradient stroke */}
              <motion.path
                d={d}
                fill="none"
                stroke={lit ? "url(#hiw-conn-hot)" : "url(#hiw-conn-anim)"}
                strokeWidth={lit ? 0.7 : 0.4}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={shouldAnimate ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.3 + ci * 0.15,
                  ease,
                }}
              />

              {/* Dim ghost path for inactive */}
              {!lit && (
                <path
                  d={d}
                  fill="none"
                  stroke="url(#hiw-conn-dim)"
                  strokeWidth="0.3"
                  strokeLinecap="round"
                />
              )}

              {/* Animated glow sweep */}
              {!shouldReduceMotion && shouldAnimate && (
                <motion.path
                  d={d}
                  fill="none"
                  stroke="var(--svg-cyan)"
                  strokeWidth="0.8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.4, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: ci * 0.7,
                    ease: "easeInOut",
                  }}
                />
              )}

              {/* Data packets — forward direction */}
              {!shouldReduceMotion &&
                shouldAnimate &&
                [0, 1, 2].map((pi) => (
                  <motion.circle
                    key={`f${ci}-${pi}`}
                    r={pi === 0 ? 0.9 : pi === 1 ? 0.6 : 0.4}
                    fill={pi === 1 ? "var(--svg-link)" : "var(--svg-cyan)"}
                    opacity={pi === 0 ? 0.85 : pi === 1 ? 0.45 : 0.3}
                    filter={pi === 0 ? "url(#hiw-glow-f)" : undefined}
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{
                      duration: [2.4, 3.4, 1.9][pi] + ci * 0.2,
                      repeat: Infinity,
                      delay: 0.8 + ci * 0.35 + pi * 1.2,
                      ease: "linear",
                    }}
                    style={{
                      offsetPath: `path("${d}")`,
                      offsetRotate: "0deg",
                    }}
                  />
                ))}

              {/* Data packets — reverse direction */}
              {!shouldReduceMotion &&
                shouldAnimate &&
                [0, 1].map((pi) => (
                  <motion.circle
                    key={`r${ci}-${pi}`}
                    r={pi === 0 ? 0.7 : 0.35}
                    fill="var(--svg-cyan)"
                    opacity={pi === 0 ? 0.5 : 0.25}
                    initial={{ offsetDistance: "100%" }}
                    animate={{ offsetDistance: "0%" }}
                    transition={{
                      duration: (pi === 0 ? 3.0 : 2.2) + ci * 0.25,
                      repeat: Infinity,
                      delay: 2.0 + ci * 0.5 + pi * 1.5,
                      ease: "linear",
                    }}
                    style={{
                      offsetPath: `path("${d}")`,
                      offsetRotate: "0deg",
                    }}
                  />
                ))}

              {/* Pulse wave — occasional bright streak */}
              {!shouldReduceMotion && shouldAnimate && (
                <motion.circle
                  r="1.8"
                  fill="none"
                  stroke="var(--svg-cyan)"
                  strokeWidth="0.35"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 5 + ci * 2.2,
                    ease,
                  }}
                  style={{
                    offsetPath: `path("${d}")`,
                    offsetRotate: "0deg",
                  }}
                />
              )}
            </g>
          );
        })}

        {/* ── Nodes ── */}
        {NODE_POS.map((node, i) => {
          const isActive = i === activeStep;
          const isHovered = i === hoveredNode;
          const baseR = isActive ? 6.5 : 4;
          const targetR = isHovered ? baseR + 1.5 : baseR;

          return (
            <g
              key={`n${i}`}
              className="cursor-pointer"
              onMouseEnter={() => onNodeHover(i)}
              onMouseLeave={() => onNodeHover(null)}
              onClick={() => onNodeClick(i)}
              role="button"
              tabIndex={0}
              aria-label={`Step ${i + 1}: ${STEPS[i].title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onNodeClick(i);
                }
              }}
            >
              {/* Tooltip on hover */}
              {isHovered && !shouldReduceMotion && (
                <motion.g
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <rect
                    x={node.x - 16}
                    y={node.y - 18}
                    width="32"
                    height="8"
                    rx="2"
                    fill="var(--svg-canvas)"
                    stroke="rgba(80,227,194,0.25)"
                    strokeWidth="0.4"
                  />
                  <text
                    x={node.x}
                    y={node.y - 12.5}
                    textAnchor="middle"
                    fill="var(--svg-text)"
                    fontSize="3.2"
                    fontWeight="500"
                    fontFamily="var(--font-sans)"
                  >
                    {STEPS[i].title}
                  </text>
                </motion.g>
              )}

              {/* Wide breathing glow (active) */}
              {isActive && !shouldReduceMotion && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill="url(#hiw-glow)"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />
              )}

              {/* Expanding ripple ring 1 (active) */}
              {!shouldReduceMotion && isActive && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={baseR}
                  fill="none"
                  stroke="var(--svg-cyan)"
                  strokeWidth="0.4"
                  animate={{
                    r: [baseR, baseR + 10],
                    opacity: [0.3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}

              {/* Expanding ripple ring 2 (active, offset) */}
              {!shouldReduceMotion && isActive && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={baseR}
                  fill="none"
                  stroke="var(--svg-cyan)"
                  strokeWidth="0.3"
                  animate={{
                    r: [baseR, baseR + 8],
                    opacity: [0.2, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 1.5,
                  }}
                />
              )}

              {/* Faint ambient glow (inactive) */}
              {!isActive && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="7"
                  fill="rgba(80,227,194,0.03)"
                />
              )}

              {/* Outer glow ring */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={isActive ? 9 : 6}
                fill={
                  isActive
                    ? "rgba(80,227,194,0.08)"
                    : isHovered
                      ? "rgba(80,227,194,0.07)"
                      : "rgba(80,227,194,0.03)"
                }
                animate={{ r: targetR + 2.5 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              />

              {/* Node body */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                fill="var(--svg-canvas)"
                stroke={
                  isActive
                    ? "var(--svg-cyan)"
                    : isHovered
                      ? "rgba(80,227,194,0.5)"
                      : "rgba(80,227,194,0.25)"
                }
                strokeWidth={isActive ? 1 : 0.7}
                animate={{ r: targetR }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              />

              {/* Inner dot */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                fill={isActive ? "var(--svg-cyan)" : "rgba(80,227,194,0.4)"}
                animate={{ r: isActive ? 2.4 : 1.5 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
              />

              {/* Step label */}
              <motion.text
                x={node.x}
                y={node.y - (isActive ? 12 : 9)}
                textAnchor="middle"
                fill={
                  isActive
                    ? "var(--svg-cyan)"
                    : isHovered
                      ? "rgba(80,227,194,0.65)"
                      : "var(--svg-body)"
                }
                fontSize="3.5"
                fontWeight="600"
                fontFamily="var(--font-sans)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              >
                {`0${i + 1}`}
              </motion.text>
            </g>
          );
        })}
      </motion.svg>
    </div>
  );
}

/* ─── Info Card (right panel) ─── */

function InfoCard({
  activeStep,
  shouldReduceMotion,
}: {
  activeStep: number;
  shouldReduceMotion: boolean | null;
}) {
  const step = STEPS[activeStep];
  const cardRef = useRef<HTMLDivElement>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  /* 3D tilt on hover */
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });
  const springTiltY = useSpring(tiltY, {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });

  /* Spotlight */
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const springSpotX = useSpring(spotX, { stiffness: 120, damping: 18 });
  const springSpotY = useSpring(spotY, { stiffness: 120, damping: 18 });
  const spotBg = useMotionTemplate`radial-gradient(circle 300px at ${springSpotX}% ${springSpotY}%, var(--svg-cyan-dim), transparent 70%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current || shouldReduceMotion) return;
      const r = cardRef.current.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      tiltX.set(nx * 3);
      tiltY.set(ny * -3);
      spotX.set(((e.clientX - r.left) / r.width) * 100);
      spotY.set(((e.clientY - r.top) / r.height) * 100);
    },
    [tiltX, tiltY, spotX, spotY, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setIsCardHovered(false);
    tiltX.set(0);
    tiltY.set(0);
    spotX.set(50);
    spotY.set(50);
  }, [tiltX, tiltY, spotX, spotY]);

  return (
    <div className="relative h-full flex flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          ref={cardRef}
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, x: 30, scale: 0.97, filter: "blur(8px)" }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, x: -20, scale: 0.97, filter: "blur(8px)" }
          }
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            mass: 0.8,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-2xl border border-hairline bg-canvas-raised backdrop-blur-sm overflow-hidden"
          style={{
            transformPerspective: 800,
            rotateX: shouldReduceMotion ? 0 : springTiltY,
            rotateY: shouldReduceMotion ? 0 : springTiltX,
            boxShadow: isCardHovered
              ? "0 12px 40px -12px rgba(0,0,0,0.35), 0 0 0 1px rgba(80,227,194,0.1)"
              : "0 1px 1px rgba(0,0,0,0.05), 0 2px 2px rgba(0,0,0,0.1)",
            borderColor: isCardHovered
              ? "rgba(80,227,194,0.15)"
              : undefined,
            transition: "box-shadow 0.4s ease, border-color 0.4s ease",
          }}
        >
          {/* Animated gradient border glow */}
          <div
            className="absolute -inset-px rounded-2xl pointer-events-none z-0 transition-opacity duration-700"
            style={{
              opacity: isCardHovered ? 0.6 : 0,
              background:
                "linear-gradient(135deg, var(--svg-cyan), var(--svg-link), var(--svg-cyan), var(--svg-link))",
              backgroundSize: "300% 300%",
              animation: "border-rotate 5s ease infinite",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
            }}
            aria-hidden="true"
          />

          {/* Shimmer top border accent */}
          <div
            className="relative h-[2px] w-full overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--svg-cyan), var(--svg-link), transparent)",
                backgroundSize: "200% 100%",
              }}
              animate={
                shouldReduceMotion
                  ? {}
                  : { backgroundPosition: ["200% 0%", "-200% 0%"] }
              }
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Glass layers */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 40%, transparent 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute top-0 inset-x-0 h-[1px] rounded-t-2xl pointer-events-none z-0 opacity-40"
            style={{
              background:
                "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.1) 75%, transparent 95%)",
            }}
            aria-hidden="true"
          />

          {/* Glass reflection sweep — 14s cycle */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.025) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.025) 55%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2,
              }}
              aria-hidden="true"
            />
          )}

          {/* Moving internal radial gradient — very subtle */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-0"
              animate={{
                background: [
                  "radial-gradient(ellipse at 20% 30%, rgba(80,227,194,0.02) 0%, transparent 60%)",
                  "radial-gradient(ellipse at 80% 70%, rgba(80,227,194,0.02) 0%, transparent 60%)",
                  "radial-gradient(ellipse at 20% 30%, rgba(80,227,194,0.02) 0%, transparent 60%)",
                ],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
          )}

          {/* Cursor spotlight on card */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                background: spotBg,
                opacity: isCardHovered ? 0.4 : 0,
                transition: "opacity 0.4s ease",
              }}
              aria-hidden="true"
            />
          )}

          {/* Content */}
          <div className="relative z-10 p-7 sm:p-9">
            {/* Badge row */}
            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }
              }
              animate={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
              }
              transition={{
                duration: 0.35,
                delay: ITEM_DELAYS[0],
                ease,
              }}
              className="flex items-center justify-between mb-5"
            >
              <div className="inline-flex items-center gap-2.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan/[0.08] border border-cyan/15 text-cyan text-xs font-mono font-semibold">
                  {`0${activeStep + 1}`}
                </span>
                <span className="text-[11px] font-mono text-text-muted tracking-wider uppercase">
                  Step {activeStep + 1} of {STEPS.length}
                </span>
              </div>
              <span className="text-[11px] font-mono text-text-muted tracking-wide">
                {step.timeframe}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }
              }
              animate={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
              }
              transition={{
                duration: 0.4,
                delay: ITEM_DELAYS[1],
                ease,
              }}
              className="text-2xl sm:text-[28px] font-semibold tracking-tight text-text mb-3 leading-tight"
            >
              {step.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }
              }
              animate={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
              }
              transition={{
                duration: 0.4,
                delay: ITEM_DELAYS[2],
                ease,
              }}
              className="text-sm sm:text-[15px] text-text-secondary leading-relaxed mb-6"
            >
              {step.description}
            </motion.p>

            {/* Tech chips */}
            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }
              }
              animate={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
              }
              transition={{
                duration: 0.35,
                delay: ITEM_DELAYS[3],
                ease,
              }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {step.techs.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide border"
                  style={{
                    background: "rgba(80,227,194,0.05)",
                    borderColor: "rgba(80,227,194,0.12)",
                    color: "var(--svg-cyan)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Detail list */}
            <ul className="space-y-3">
              {step.details.map((detail, di) => (
                <motion.li
                  key={detail}
                  initial={
                    shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 10 }
                  }
                  animate={
                    shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }
                  }
                  transition={{
                    duration: 0.35,
                    delay: ITEM_DELAYS[4] + di * 0.06,
                    ease,
                  }}
                  className="flex items-center gap-3 text-sm text-text-secondary"
                >
                  <span
                    className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--svg-cyan)" }}
                  />
                  {detail}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── Progress Bar ─── */

function ProgressBar({
  activeStep,
  isPaused,
  shouldReduceMotion,
}: {
  activeStep: number;
  isPaused: boolean;
  shouldReduceMotion: boolean | null;
}) {
  const progress = useMotionValue(0);

  useEffect(() => {
    if (shouldReduceMotion || isPaused) {
      progress.set(0);
      return;
    }
    progress.set(0);
    const controls = progress.on("change", () => {});
    const start = performance.now();
    const dur = 5800;

    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      progress.set(eased * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      controls();
    };
  }, [activeStep, isPaused, shouldReduceMotion, progress]);

  return (
    <div className="w-full max-w-[280px] h-[2px] mx-auto rounded-full overflow-hidden bg-hairline/40 mt-6">
      <motion.div
        className="h-full rounded-full"
        style={{
          background:
            "linear-gradient(90deg, var(--svg-cyan), var(--svg-link))",
          width: useTransform(progress, (v) => `${v}%`),
        }}
      />
    </div>
  );
}

/* ─── Main Section ─── */

export function HowItWorks() {
  const { ref: sectionRef, shouldAnimate } = useViewportAnimation({
    threshold: 0.08,
  });
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Auto-play — 5.8s, pause on hover */
  useEffect(() => {
    if (shouldReduceMotion || !shouldAnimate || isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 5800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [shouldReduceMotion, shouldAnimate, isPaused]);

  const handleNodeClick = useCallback((i: number) => {
    setActiveStep(i);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 12000);
  }, []);

  const handleSectionHover = useCallback((entering: boolean) => {
    setIsPaused(entering);
  }, []);

  /* Scroll-linked parallax for background radial */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const orbX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  const sectionBg = useMemo(
    () => (
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Animated grid */}
        <div
          className={`absolute inset-0 ${shouldAnimate && !shouldReduceMotion ? "animate-[grid-shimmer_8s_ease-in-out_infinite]" : ""}`}
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 55% 45% at 50% 50%, black 10%, transparent 65%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 55% 45% at 50% 50%, black 10%, transparent 65%)",
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        {/* Breathing radial glow — shifts position */}
        <motion.div
          className="absolute w-[650px] h-[480px] rounded-full blur-[180px]"
          style={{
            top: "50%",
            left: "50%",
            x: orbX,
            y: orbY,
            background:
              "radial-gradient(circle, var(--svg-cyan) 0%, var(--svg-link) 45%, transparent 70%)",
          }}
          animate={
            shouldReduceMotion
              ? { opacity: 0.03 }
              : { opacity: [0.02, 0.04, 0.02] }
          }
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Static depth anchors */}
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-primary/[0.012] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-accent-blue/[0.01] rounded-full blur-[100px]" />

        {/* Depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-canvas/50" />
      </div>
    ),
    [shouldAnimate, shouldReduceMotion, orbX, orbY]
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden bg-canvas"
      aria-labelledby="hiw-heading"
      onMouseEnter={() => handleSectionHover(true)}
      onMouseLeave={() => handleSectionHover(false)}
    >
      {sectionBg}

      <Container>
        {/* ── Header ── */}
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 20, filter: "blur(6px)" }
          }
          whileInView={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="text-center max-w-2xl mx-auto mb-5"
        >
          <h2
            id="hiw-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text"
          >
            How{" "}
            <span className="bg-gradient-to-r from-cyan via-accent-blue to-accent-violet bg-clip-text text-transparent">
              NovaLabs
            </span>{" "}
            Works
          </h2>
        </motion.div>

        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 16, filter: "blur(4px)" }
          }
          whileInView={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
            From discovery to continuous optimization — a streamlined AI
            transformation pipeline built for enterprise scale.
          </p>
        </motion.div>

        {/* ── Main layout ── */}
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 24, filter: "blur(6px)" }
          }
          whileInView={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="grid grid-cols-1 md:grid-cols-[45%_1fr] lg:grid-cols-[45%_1fr] gap-8 lg:gap-10 items-center"
        >
          {/* Left: Visualization */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl border border-hairline bg-canvas-raised backdrop-blur-sm overflow-hidden p-4 sm:p-5">
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none z-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 50%)",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <WorkflowVisualization
                  activeStep={activeStep}
                  hoveredNode={hoveredNode}
                  onNodeHover={setHoveredNode}
                  onNodeClick={handleNodeClick}
                  shouldAnimate={shouldAnimate}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </div>
            </div>
          </div>

          {/* Right: Info panel */}
          <div className="relative order-1 lg:order-2 min-h-[300px]">
            <InfoCard
              activeStep={activeStep}
              shouldReduceMotion={shouldReduceMotion}
            />
          </div>
        </motion.div>

        {/* ── Dots + Progress ── */}
        <motion.div
          initial={
            shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }
          }
          whileInView={
            shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
          }
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4, ease }}
          className="flex flex-col items-center mt-8"
        >
          <div className="flex justify-center gap-2">
            {STEPS.map((step, i) => (
              <button
                key={i}
                onClick={() => handleNodeClick(i)}
                aria-label={`Go to step ${i + 1}: ${step.title}`}
                className={`relative h-2 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
                  i === activeStep
                    ? "bg-cyan w-7"
                    : "bg-hairline-strong hover:bg-text-muted w-2"
                }`}
              />
            ))}
          </div>
          <ProgressBar
            activeStep={activeStep}
            isPaused={isPaused}
            shouldReduceMotion={shouldReduceMotion}
          />
        </motion.div>
      </Container>
    </section>
  );
}
