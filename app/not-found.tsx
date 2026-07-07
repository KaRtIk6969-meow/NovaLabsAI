"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { staggerContainer, reveal, breathe } from "@/design-system";

const fadeUp = reveal.blurFadeUp;
const stagger = staggerContainer(0.1, 0.1);

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

function NeuralNetwork() {
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
      <svg viewBox="0 0 100 100" className="w-[500px] h-[500px] lg:w-[600px] lg:h-[600px] opacity-[0.1]">
        <defs>
          <radialGradient id="nfCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--svg-link)" stopOpacity="0.3" />
            <stop offset="60%" stopColor="var(--svg-violet)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Breathing core */}
        <motion.circle cx="50" cy="50" r="18" fill="url(#nfCoreGlow)"
          animate={breathe(!!shouldReduceMotion, 0.15, 0.35)}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Rotating ring */}
        {!shouldReduceMotion && (
          <motion.circle cx="50" cy="50" r="42" fill="none" stroke="var(--svg-link)" strokeWidth="0.3" strokeDasharray="4 8" opacity={0.3}
            animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" }}
          />
        )}

        {/* Connections */}
        {CONNECTIONS.map(([from, to], i) => (
          <motion.line key={`c-${i}`} x1={NODES[from].cx} y1={NODES[from].cy} x2={NODES[to].cx} y2={NODES[to].cy}
            stroke="var(--svg-link)" strokeWidth="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
          />
        ))}

        {/* Data packets */}
        {!shouldReduceMotion && packets.map((p, i) => (
          <motion.circle key={`p-${i}`} r="0.7" fill="var(--svg-cyan)" opacity={0.6}
            initial={{ cx: p.from.cx, cy: p.from.cy }}
            animate={{ cx: [p.from.cx, p.to.cx, p.from.cx], cy: [p.from.cy, p.to.cy, p.from.cy] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Nodes with pulse */}
        {NODES.map((node, i) => (
          <g key={`n-${i}`}>
            {!shouldReduceMotion && (
              <motion.circle cx={node.cx} cy={node.cy} r={node.r * 3} fill={node.color}
                initial={{ opacity: 0 }} animate={{ opacity: [0, 0.15, 0] }}
                transition={{ duration: 3, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <motion.circle cx={node.cx} cy={node.cy} r={node.r} fill={node.color}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08, type: "spring", stiffness: 300, damping: 20 }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

function AIScanner() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-8" aria-hidden="true">
      {/* Outer ring */}
      <motion.div className="absolute inset-0 rounded-full border border-hairline/50"
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Scanner beam */}
      {!shouldReduceMotion && (
        <motion.div className="absolute top-1/2 left-1/2 w-px h-1/2 origin-bottom"
          style={{ background: "linear-gradient(to top, transparent, var(--svg-cyan))" }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Pulsing scan circle */}
      {!shouldReduceMotion && (
        <>
          <motion.div className="absolute inset-4 rounded-full border border-accent-cyan/20"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div className="absolute inset-8 rounded-full border border-accent-blue/20"
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
        </>
      )}

      {/* Center icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-violet/20 border border-hairline/50 backdrop-blur-sm flex items-center justify-center"
          animate={shouldReduceMotion ? {} : { scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 sm:w-10 sm:h-10 text-accent-cyan" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            {!shouldReduceMotion && (
              <motion.circle cx="11" cy="11" r="3" fill="none" stroke="currentColor" strokeWidth="1" opacity={0.4}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </svg>
        </motion.div>
      </div>

      {/* Corner accents */}
      {[0, 90, 180, 270].map((deg) => (
        <motion.div key={deg} className="absolute w-2 h-2 rounded-full bg-accent-cyan/40"
          style={{ top: `${50 - 46 * Math.cos((deg * Math.PI) / 180)}%`, left: `${50 + 46 * Math.sin((deg * Math.PI) / 180)}%` }}
          animate={shouldReduceMotion ? {} : { opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: deg / 360 }}
        />
      ))}
    </div>
  );
}

export default function NotFound() {
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Grid */}
        <div className="hero-grid absolute inset-0 opacity-[0.025]" />

        {/* Particles */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div key={i}
                className="absolute w-1 h-1 rounded-full bg-white/20"
                style={{ left: `${10 + (i * 7) % 80}%`, top: `${15 + (i * 13) % 70}%` }}
                animate={{ y: [-8, 8, -8], opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              />
            ))}
          </div>
        )}

        {/* Aurora */}
        <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[200px]"
          animate={breathe(!!shouldReduceMotion, 0.015, 0.04)}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ background: "radial-gradient(ellipse, var(--svg-violet) 0%, var(--svg-link) 40%, transparent 70%)" }}
        />
        <motion.div className="absolute bottom-0 right-[15%] w-[350px] h-[350px] rounded-full blur-[160px]"
          animate={breathe(!!shouldReduceMotion, 0.01, 0.03)}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{ background: "radial-gradient(circle, rgba(80,227,194,0.04) 0%, transparent 70%)" }}
        />

        {/* Fade edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas" />
      </div>

      {/* Neural network */}
      <NeuralNetwork />

      {/* Content */}
      <motion.div variants={stagger} initial="hidden" animate="visible"
        className="relative z-10 flex flex-col items-center gap-6 text-center max-w-lg"
      >
        {/* AI Scanner illustration */}
        <motion.div variants={fadeUp}>
          <AIScanner />
        </motion.div>

        {/* 404 headline */}
        <motion.h1 variants={fadeUp}
          className="text-[100px] sm:text-[140px] lg:text-[180px] font-bold leading-none tracking-tighter bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent"
        >
          404
        </motion.h1>

        {/* AI message */}
        <motion.div variants={fadeUp} className="space-y-2">
          <p className="text-xl sm:text-2xl font-semibold text-text">
            Page Not Found
          </p>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-md">
            Our AI couldn&apos;t locate the page you&apos;re looking for. It may have been moved, renamed, or never existed.
          </p>
        </motion.div>

        {/* Search bar (optional) */}
        <motion.div variants={fadeUp} className="w-full max-w-sm">
          <form onSubmit={(e) => { e.preventDefault(); if (searchQuery) window.location.href = `/?q=${encodeURIComponent(searchQuery)}`; }}
            className="relative"
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 text-text-muted" aria-hidden="true">
                <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search the site..."
              aria-label="Search the site"
              className="w-full rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm pl-11 pr-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent-blue/30 focus:shadow-[0_0_20px_var(--svg-link-dim)] transition-all duration-300"
            />
          </form>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <MagneticButton strength={0.2} href="/">
            <span className="group/btn relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium text-[15px] bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-lg shadow-accent-blue/25 transition-all duration-300 hover:shadow-xl hover:shadow-accent-blue/30">
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                Return Home
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </MagneticButton>

          <Button variant="secondary" size="lg" href="/contact">
            Contact Support
          </Button>
        </motion.div>

        {/* Helpful links */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 pt-6 border-t border-hairline/40">
          {[
            { label: "Services", href: "/services" },
            { label: "Pricing", href: "/pricing" },
            { label: "Case Studies", href: "/case-studies" },
            { label: "Blog", href: "/blog" },
          ].map((link) => (
            <a key={link.href} href={link.href}
              className="text-sm text-text-muted hover:text-accent-blue transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
