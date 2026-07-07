"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { easing } from "@/design-system";

const ease = easing.default;

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

const STATS = [
  { value: "500+", label: "Enterprise Clients" },
  { value: "340%", label: "Average ROI" },
  { value: "98%", label: "Client Retention" },
  { value: "40+", label: "Countries" },
];

/* Neural network nodes for background */
const NODES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 10 + (i * 37) % 80,
  y: 8 + (i * 53) % 84,
  size: 2 + (i % 3),
  delay: i * 0.3,
}));

const EDGES: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [0, 6], [1, 7], [2, 8], [3, 9], [4, 10],
  [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
  [5, 11], [6, 12], [7, 13], [8, 14], [9, 15],
  [12, 13], [13, 14], [14, 15], [15, 16], [16, 17],
];

export function HeroCaseStudies() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Aurora breathing */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[200px]"
          animate={
            shouldReduceMotion
              ? { opacity: 0.03 }
              : { opacity: [0.02, 0.045, 0.02], scale: [1, 1.05, 1] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, var(--svg-link) 0%, var(--svg-violet) 40%, transparent 70%)",
          }}
        />

        {/* Gradient movement */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[180px]"
            style={{
              background: "radial-gradient(circle, rgba(0,112,243,0.04) 0%, rgba(121,40,202,0.02) 50%, transparent 70%)",
            }}
            animate={{
              x: ["-15%", "10%", "-5%", "15%", "-15%"],
              y: ["-10%", "15%", "-8%", "12%", "-10%"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Neural network */}
        {!shouldReduceMotion && (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Edges */}
            {EDGES.map(([a, b], i) => (
              <motion.line
                key={`edge-${i}`}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke="rgba(0,112,243,0.06)"
                strokeWidth="0.15"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.03, 0.08, 0.03] }}
                transition={{
                  pathLength: { duration: 2, delay: i * 0.1, ease },
                  opacity: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
                }}
              />
            ))}
            {/* Nodes */}
            {NODES.map((node) => (
              <motion.circle
                key={`node-${node.id}`}
                cx={node.x}
                cy={node.y}
                r={node.size * 0.3}
                fill="rgba(0,112,243,0.15)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0.8, 1],
                  opacity: [0, 0.4, 0.2, 0.4],
                }}
                transition={{
                  duration: 2,
                  delay: node.delay,
                  ease,
                  opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: node.delay },
                }}
              />
            ))}
            {/* Traveling pulse along edges */}
            <motion.circle
              r="0.5"
              fill="rgba(80,227,194,0.6)"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                cx: [NODES[0].x, NODES[1].x, NODES[2].x, NODES[3].x],
                cy: [NODES[0].y, NODES[1].y, NODES[2].y, NODES[3].y],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
            />
          </svg>
        )}

        {/* Floating particles */}
        {!shouldReduceMotion && (
          <>
            {Array.from({ length: 8 }, (_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-accent-blue/20"
                style={{
                  width: 2 + (i % 3),
                  height: 2 + (i % 3),
                  left: `${15 + (i * 11) % 70}%`,
                  top: `${10 + (i * 17) % 80}%`,
                }}
                animate={{
                  y: [0, -30 - i * 5, 0],
                  opacity: [0.15, 0.4, 0.15],
                }}
                transition={{
                  duration: 5 + i * 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.6,
                }}
              />
            ))}
          </>
        )}

        {/* Top divider */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-blue/25 to-transparent" />
      </div>

      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto relative z-10"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairline bg-glass text-[13px] font-medium text-body backdrop-blur-md transition-all duration-500 hover:border-link/30 hover:bg-link/[0.06] hover:shadow-[0_0_20px_var(--svg-link-dim)] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-blue shadow-[0_0_8px_var(--svg-link)]" />
              </span>
              Enterprise Case Studies
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-[68px] lg:leading-[1.06] font-bold tracking-tight text-text mb-5"
          >
            Real AI Transformations.{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Real Business Results.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-12"
          >
            See how enterprise organizations automate operations, reduce costs, and
            increase productivity using NovaLabs AI.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={!shouldReduceMotion ? { y: -2, scale: 1.02 } : undefined}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-text tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-text-muted mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
