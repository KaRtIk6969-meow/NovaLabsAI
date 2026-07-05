"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeInUp } from "@/animations";
import { DashboardPreview } from "./Dashboard";

const TRUST_STARS = 5;

function Badge() {
  return (
    <motion.div variants={fadeInUp}>
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
    <motion.div variants={fadeInUp}>
      <h1 className="text-4xl sm:text-5xl lg:text-[64px] lg:leading-[1.08] font-bold tracking-tight text-text">
        <span className="block">Automate Smarter.</span>
        <span className="block mt-1">
          Scale{" "}
          <span className="bg-gradient-to-r from-primary-light via-accent-blue to-accent-cyan bg-clip-text text-transparent">
            Faster.
          </span>
        </span>
      </h1>
    </motion.div>
  );
}

function Description() {
  return (
    <motion.p
      variants={fadeInUp}
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
    <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3">
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
  );
}

function Trust() {
  return (
    <motion.div variants={fadeInUp} className="flex items-center gap-3">
      <div className="flex items-center gap-0.5" aria-label={`${TRUST_STARS} out of 5 stars`}>
        {Array.from({ length: TRUST_STARS }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 text-amber-400"
            aria-hidden="true"
          >
            <path d="M8 1.5l1.85 3.75L14 5.9l-3 2.92.71 4.13L8 10.77l-3.71 2.18.71-4.13-3-2.92 4.15-.65L8 1.5z" />
          </svg>
        ))}
      </div>
      <p className="text-sm text-text-secondary">
        Trusted by <span className="font-semibold text-text">250+</span> Businesses
      </p>
    </motion.div>
  );
}

function DashboardPlaceholder() {
  return (
    <div className="relative">
      <DashboardPreview />
    </div>
  );
}

export function Hero() {
  return (
    <section
      className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-blue/[0.05] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/[0.03] rounded-full blur-[140px]" />
      </div>

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
            <DashboardPlaceholder />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
