"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/ui/Particles";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";

const ease = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
};

export function HeroServices() {
  const { ref, shouldAnimate } = useViewportAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden"
      aria-labelledby="services-hero-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="hero-grid absolute inset-0 opacity-[0.025]" />
        {!shouldReduceMotion && (
          <Particles count={10} speed={0.02} maxSize={0.6} />
        )}
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[200px]"
          animate={
            shouldReduceMotion
              ? { opacity: 0.03 }
              : { opacity: [0.015, 0.04, 0.015], scale: [1, 1.05, 1] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse, var(--svg-violet) 0%, var(--svg-link) 40%, transparent 70%)",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full blur-[160px]"
          animate={
            shouldReduceMotion
              ? { opacity: 0.02 }
              : { opacity: [0.01, 0.03, 0.01] }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{
            background: "radial-gradient(circle, rgba(80,227,194,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas" />
      </div>

      <Container className="relative z-10 py-20 sm:py-24 lg:py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-glass/50 backdrop-blur-sm text-[13px] font-medium text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-soft" />
              Enterprise AI Services
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            id="services-hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text mb-6"
          >
            AI Infrastructure That{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Scales With You
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10"
          >
            From autonomous agents to production workflows, we design, build, and deploy
            enterprise AI systems that deliver measurable ROI from day one.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="#services">
              Explore Services
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
            <Button variant="secondary" size="lg" href="#process">
              Our Process
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-14 pt-8 border-t border-hairline/40"
          >
            {[
              { value: "500+", label: "Deployments" },
              { value: "<100ms", label: "Avg Latency" },
              { value: "99.99%", label: "Uptime SLA" },
              { value: "24/7", label: "Support" },
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
