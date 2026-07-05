"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DashboardPreview } from "./Dashboard";

const TRUST_STARS = 5;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Badge() {
  return (
    <motion.div variants={fadeUp}>
      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-[13px] font-medium text-text-secondary backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
        </span>
        Enterprise AI Platform
      </span>
    </motion.div>
  );
}

function Headline() {
  return (
    <motion.div variants={fadeUp}>
      <h1 className="text-4xl sm:text-5xl lg:text-[64px] lg:leading-[1.08] font-bold tracking-tight text-text">
        <motion.span
          className="block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          Automate Smarter.
        </motion.span>
        <motion.span
          className="block mt-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          Scale{" "}
          <span className="bg-gradient-to-r from-primary-light via-accent-blue to-accent-cyan bg-clip-text text-transparent">
            Faster.
          </span>
        </motion.span>
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
    <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
      <motion.div
        whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(124,58,237,0.35)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <Button href="/contact" variant="primary" size="lg">
          Book a Demo
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="w-4 h-4 ml-0.5"
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
        </Button>
      </motion.div>
      <motion.div
        whileHover={{ y: -1, backgroundColor: "rgba(255,255,255,0.06)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
      >
        <Button href="#demo" variant="secondary" size="lg">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6.5 5.5v5l4.5-2.5-4.5-2.5z" fill="currentColor" />
          </svg>
          Watch Demo
        </Button>
      </motion.div>
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
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.9 + i * 0.08,
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1] as const,
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

export function Hero() {
  return (
    <section
      className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Grid texture */}
      <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/[0.07] rounded-full blur-[120px] animate-gradient-shift" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-blue/[0.05] rounded-full blur-[100px] animate-gradient-shift" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/[0.03] rounded-full blur-[140px] animate-gradient-shift" style={{ animationDelay: "4s" }} />
      </div>

      {/* Subtle animated gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent-cyan/[0.02] animate-gradient-shift pointer-events-none"
        aria-hidden="true"
      />

      {/* Bottom fade — smooth blend into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-bg pointer-events-none z-20"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10 py-20 sm:py-24 lg:py-0">
        <motion.div
          variants={staggerContainer}
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

          <div className="relative">
            {/* Radial glow behind dashboard */}
            <div
              className="absolute -inset-8 bg-gradient-to-br from-primary/[0.12] via-accent-blue/[0.06] to-accent-cyan/[0.08] rounded-3xl blur-2xl opacity-70 pointer-events-none animate-gradient-shift"
              aria-hidden="true"
              style={{ animationDelay: "1s" }}
            />
            <DashboardPreview />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
