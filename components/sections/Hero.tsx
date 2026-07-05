"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useTransform as useScrollTransform,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CursorLight } from "@/components/ui/CursorLight";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { Particles } from "@/components/ui/Particles";
import { Parallax } from "@/components/ui/Parallax";
import { DashboardPreview } from "./Dashboard";

const TRUST_STARS = 5;

const ease = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

const headlineWord = {
  hidden: { opacity: 0, y: 40, rotateX: -30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease, delay: 0.2 },
  },
};

function Badge() {
  return (
    <motion.div variants={fadeUp}>
      <span className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-[13px] font-medium text-text-secondary backdrop-blur-md transition-all duration-500 hover:border-primary/30 hover:bg-primary/[0.06] hover:shadow-[0_0_20px_rgba(124,58,237,0.1)]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
        </span>
        Enterprise AI Platform
      </span>
    </motion.div>
  );
}

function Headline() {
  const words1 = ["Automate", "Smarter."];
  const words2 = ["Scale", "Faster."];

  return (
    <motion.div
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
      }}
      style={{ perspective: "1000px" }}
    >
      <h1
        id="hero-heading"
        className="text-4xl sm:text-5xl lg:text-[68px] lg:leading-[1.06] font-bold tracking-tight text-text"
      >
        <span className="block overflow-hidden">
          {words1.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              variants={headlineWord}
            >
              {word}
            </motion.span>
          ))}
        </span>
        <span className="block mt-1 overflow-hidden">
          {words2.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              variants={headlineWord}
            >
              {word === "Faster." ? (
                <span className="bg-gradient-to-r from-primary-light via-accent-blue to-accent-cyan bg-clip-text text-transparent">
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </span>
      </h1>
    </motion.div>
  );
}

function Description() {
  return (
    <motion.p
      variants={fadeUp}
      className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-[520px]"
    >
      NovaLabs AI helps businesses automate workflows, deploy intelligent AI
      agents, streamline operations and accelerate growth using enterprise-grade
      AI automation.
    </motion.p>
  );
}

function CTAs() {
  return (
    <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
      <MagneticButton strength={0.25}>
        <a
          href="/contact"
          className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent-blue text-white font-medium text-[15px] shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
        >
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-accent-blue to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 flex items-center gap-2">
            Book a Demo
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                d="M3.33 8h9.34M8.67 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </MagneticButton>

      <MagneticButton strength={0.2}>
        <a
          href="#demo"
          className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/[0.12] bg-white/[0.03] text-text font-medium text-[15px] backdrop-blur-sm transition-all duration-300 hover:border-white/[0.2] hover:bg-white/[0.06]"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6.5 5.5v5l4.5-2.5-4.5-2.5z" fill="currentColor" />
          </svg>
          Watch Demo
        </a>
      </MagneticButton>
    </motion.div>
  );
}

function Trust() {
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-3">
      <div className="flex items-center gap-0.5" aria-label={`${TRUST_STARS} out of 5 stars`}>
        {Array.from({ length: TRUST_STARS }).map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 text-amber-400"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: 1.2 + i * 0.1,
              duration: 0.5,
              ease,
              type: "spring",
              stiffness: 200,
            }}
            aria-hidden="true"
          >
            <path d="M8 1.5l1.85 3.75L14 5.9l-3 2.92.71 4.13L8 10.77l-3.71 2.18.71-4.13-3-2.92 4.15-.65L8 1.5z" />
          </motion.svg>
        ))}
      </div>
      <p className="text-sm text-text-secondary">
        Trusted by <span className="font-semibold text-text">250+</span> Businesses
      </p>
    </motion.div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8, ease }}
    >
      <a
        href="#trusted"
        className="flex flex-col items-center gap-2.5 group/scroll"
        aria-label="Scroll to trusted companies"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-text-muted/50 transition-colors duration-300 group-hover/scroll:text-text-secondary">
          Scroll
        </span>
        <div className="relative w-[22px] h-[34px] rounded-full border border-white/[0.12] flex justify-center pt-2 transition-colors duration-300 group-hover/scroll:border-white/[0.25]">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-white/40"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </a>
    </motion.div>
  );
}

function DashboardSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const dashX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const dashY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  return (
    <motion.div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative"
      variants={scaleIn}
    >
      {/* Multi-layer radial glow */}
      <div className="absolute -inset-16 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/[0.15] via-accent-blue/[0.08] to-accent-cyan/[0.10] rounded-[40px] blur-[60px]"
          style={{ animation: "orb-breathing 8s ease-in-out infinite" }}
        />
        <div
          className="absolute inset-8 bg-gradient-to-tl from-accent-cyan/[0.06] via-transparent to-primary/[0.08] rounded-3xl blur-3xl"
          style={{ animation: "orb-breathing 6s ease-in-out infinite 2s" }}
        />
      </div>

      {/* Animated border ring */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none z-10"
        style={{
          background: "linear-gradient(90deg, rgba(124,58,237,0.2), rgba(59,130,246,0.15), rgba(6,182,212,0.2), rgba(124,58,237,0.2))",
          backgroundSize: "300% 100%",
          animation: "gradient-shift 6s linear infinite",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
        aria-hidden="true"
      />

      <motion.div style={{ x: dashX, y: dashY }}>
        <DashboardPreview />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useScrollTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useScrollTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroBlur = useScrollTransform(scrollYProgress, [0, 0.3], [0, 8]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Cursor-reactive lighting */}
      <CursorLight
        color="rgba(124,58,237,0.05)"
        size={800}
        blur={150}
        opacity={0.6}
      />

      {/* Animated grid background */}
      <AnimatedGrid opacity={0.025} spacing={48} />

      {/* Floating particles */}
      {!shouldReduceMotion && <Particles count={30} speed={0.15} maxSize={1.5} />}

      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-[12%] left-[15%] w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-[130px]"
          style={{ animation: "orb-drift-1 14s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[15%] right-[12%] w-[450px] h-[450px] bg-accent-blue/[0.04] rounded-full blur-[120px]"
          style={{ animation: "orb-drift-2 16s ease-in-out infinite" }}
        />
        <div
          className="absolute top-[40%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/[0.025] rounded-full blur-[150px]"
          style={{ animation: "orb-drift-3 18s ease-in-out infinite" }}
        />
        <div
          className="absolute top-[70%] left-[8%] w-[350px] h-[350px] bg-primary/[0.03] rounded-full blur-[110px]"
          style={{ animation: "orb-breathing 10s ease-in-out infinite" }}
        />
      </div>

      {/* Subtle animated gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/[0.015] via-transparent to-accent-cyan/[0.015] pointer-events-none"
        aria-hidden="true"
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-bg pointer-events-none z-20"
        aria-hidden="true"
      />

      {/* Scroll-linked parallax wrapper */}
      <motion.div
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          filter: shouldReduceMotion ? undefined : `blur(${heroBlur}px)`,
        }}
        className="w-full"
      >
        <Container size="wide" className="relative z-10 py-20 sm:py-24 lg:py-0">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center"
          >
            <div className="flex flex-col gap-6 lg:gap-7">
              <Badge />
              <Headline />
              <Description />
              <CTAs />
              <Trust />
            </div>

            <DashboardSection />
          </motion.div>
        </Container>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
