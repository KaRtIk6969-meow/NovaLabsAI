"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/ui/Particles";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";
import { staggerContainer, reveal, breathe, easing } from "@/design-system";
import { ARTICLES } from "@/data/blog";

const fadeUp = reveal.blurFadeUp;
const stagger = staggerContainer(0.1, 0.1);
const ease = easing.default;

const FLOATING_CARDS = ARTICLES.slice(0, 3);

const NODES = [
  { cx: 50, cy: 50, r: 4, color: "var(--svg-link)", delay: 0 },
  { cx: 25, cy: 30, r: 2.5, color: "var(--svg-cyan)", delay: 0.5 },
  { cx: 75, cy: 30, r: 2.5, color: "var(--svg-violet)", delay: 1 },
  { cx: 20, cy: 65, r: 2, color: "var(--svg-link)", delay: 1.5 },
  { cx: 80, cy: 65, r: 2, color: "var(--svg-cyan)", delay: 2 },
  { cx: 35, cy: 80, r: 2, color: "var(--svg-violet)", delay: 2.5 },
  { cx: 65, cy: 80, r: 2, color: "var(--svg-link)", delay: 3 },
  { cx: 15, cy: 48, r: 1.5, color: "var(--svg-cyan)", delay: 3.5 },
  { cx: 85, cy: 48, r: 1.5, color: "var(--svg-violet)", delay: 4 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 7], [2, 8], [1, 5], [2, 6],
  [3, 5], [4, 6], [5, 6], [7, 3], [8, 4],
];

function NeuralBackground() {
  const shouldReduceMotion = useReducedMotion();

  const packets = useMemo(
    () =>
      CONNECTIONS.map((conn, i) => ({
        from: NODES[conn[0]],
        to: NODES[conn[1]],
        delay: i * 0.4,
        duration: 2 + (i % 3) * 0.5,
      })),
    []
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <svg
        viewBox="0 0 100 100"
        className="w-[600px] h-[600px] lg:w-[700px] lg:h-[700px] opacity-[0.1]"
      >
        <defs>
          <radialGradient id="blogCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--svg-link)" stopOpacity="0.3" />
            <stop offset="60%" stopColor="var(--svg-violet)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.circle
          cx="50"
          cy="50"
          r="20"
          fill="url(#blogCoreGlow)"
          animate={breathe(!!shouldReduceMotion, 0.15, 0.35)}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {!shouldReduceMotion && (
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="var(--svg-link)"
            strokeWidth="0.3"
            strokeDasharray="4 8"
            opacity={0.4}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" }}
          />
        )}

        {!shouldReduceMotion && (
          <motion.circle
            cx="50"
            cy="50"
            r="36"
            fill="none"
            stroke="var(--svg-cyan)"
            strokeWidth="0.2"
            strokeDasharray="2 6"
            opacity={0.3}
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" }}
          />
        )}

        {CONNECTIONS.map(([from, to], i) => (
          <motion.line
            key={`conn-${i}`}
            x1={NODES[from].cx}
            y1={NODES[from].cy}
            x2={NODES[to].cx}
            y2={NODES[to].cy}
            stroke="var(--svg-link)"
            strokeWidth="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
          />
        ))}

        {!shouldReduceMotion &&
          packets.map((packet, i) => (
            <motion.circle
              key={`packet-${i}`}
              r="0.8"
              fill="var(--svg-cyan)"
              opacity={0.7}
              initial={{ cx: packet.from.cx, cy: packet.from.cy }}
              animate={{
                cx: [packet.from.cx, packet.to.cx, packet.from.cx],
                cy: [packet.from.cy, packet.to.cy, packet.from.cy],
              }}
              transition={{
                duration: packet.duration,
                delay: packet.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

        {NODES.map((node, i) => (
          <g key={`node-${i}`}>
            {!shouldReduceMotion && (
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={node.r * 3}
                fill={node.color}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.15, 0] }}
                transition={{
                  duration: 3,
                  delay: node.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={node.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.08,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export function HeroBlog() {
  const { ref, shouldAnimate } = useViewportAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden"
      aria-labelledby="blog-hero-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <AnimatedGrid opacity={0.025} />
        {!shouldReduceMotion && (
          <Particles count={12} speed={0.02} maxSize={0.6} />
        )}

        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[200px]"
          animate={breathe(!!shouldReduceMotion, 0.015, 0.04)}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse, var(--svg-violet) 0%, var(--svg-link) 40%, transparent 70%)",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full blur-[160px]"
          animate={breathe(!!shouldReduceMotion, 0.01, 0.03)}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{
            background: "radial-gradient(circle, rgba(80,227,194,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas" />
      </div>

      <NeuralBackground />

      {/* Floating article cards — decorative */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden="true">
        {FLOATING_CARDS.map((article, i) => (
          <motion.div
            key={article.id}
            className="absolute w-48 rounded-xl border border-hairline/40 bg-canvas-raised/60 backdrop-blur-sm p-3 shadow-lg"
            style={{
              top: `${20 + i * 22}%`,
              left: i % 2 === 0 ? "5%" : "auto",
              right: i % 2 !== 0 ? "5%" : "auto",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.5, y: 0, scale: 1 }
                : {
                    opacity: [0, 0.6, 0.6],
                    y: [20, 0, -6, 0],
                    scale: [0.9, 1, 1.01, 1],
                  }
            }
            transition={{
              duration: 2,
              delay: 0.8 + i * 0.3,
              ease,
            }}
          >
            <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${article.coverGradient} mb-2 opacity-60`} />
            <div className="h-2 w-full rounded bg-hairline/50 mb-1.5" />
            <div className="h-2 w-3/4 rounded bg-hairline/30" />
          </motion.div>
        ))}
      </div>

      <Container className="relative z-10 py-20 sm:py-24 lg:py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairline bg-glass text-[13px] font-medium text-body backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-soft" />
              Enterprise AI Blog
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            id="blog-hero-heading"
            className="text-4xl sm:text-5xl lg:text-[68px] lg:leading-[1.06] font-bold tracking-tight text-text mb-6"
          >
            Intelligence,{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Engineered
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Deep technical insights, engineering breakthroughs, and practical guides
            from the team building enterprise AI systems at scale.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="#articles">
              Explore Articles
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
            <Button variant="secondary" size="lg" href="#newsletter">
              Subscribe
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-14 pt-8 border-t border-hairline/40"
          >
            {[
              { value: "200+", label: "Articles" },
              { value: "50K+", label: "Monthly Readers" },
              { value: "40+", label: "Contributors" },
              { value: "Weekly", label: "New Content" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg sm:text-xl font-semibold text-text">{stat.value}</div>
                <div className="text-xs text-text-muted mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
