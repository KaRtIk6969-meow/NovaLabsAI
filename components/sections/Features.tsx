"use client";

import { useRef, useCallback, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { CursorLight } from "@/components/ui/CursorLight";
import { easing, reveal, staggerContainer } from "@/design-system";
const ease = easing.default;
const blurFadeUp = reveal.blurFadeUp;

const FEATURES = [
  {
    title: "AI Agents",
    description: "Deploy autonomous AI employees that work 24/7.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 20h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="7" r="1" fill="currentColor" />
        <circle cx="14" cy="7" r="1" fill="currentColor" />
      </svg>
    ),
    gradient: "from-accent-violet to-accent-blue",
    glowColor: "var(--svg-violet-dim)",
  },
  {
    title: "Workflow Automation",
    description: "Automate repetitive business operations.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M4 12h2l3-9 4 18 3-9h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="20" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    gradient: "from-accent-blue to-accent-cyan",
    glowColor: "var(--svg-link-dim)",
  },
  {
    title: "Analytics Dashboard",
    description: "Monitor AI performance in real time.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 14l3-4 3 2 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="14" r="1" fill="currentColor" />
        <circle cx="10" cy="10" r="1" fill="currentColor" />
        <circle cx="13" cy="12" r="1" fill="currentColor" />
        <circle cx="17" cy="7" r="1" fill="currentColor" />
      </svg>
    ),
    gradient: "from-accent-cyan to-accent-blue",
    glowColor: "var(--svg-cyan-dim)",
  },
  {
    title: "Enterprise Security",
    description: "SOC2-ready with encrypted infrastructure.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 3l8 4v5c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V7l8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: "from-accent-blue to-accent-cyan",
    glowColor: "var(--svg-success-dim)",
  },
  {
    title: "Cloud Infrastructure",
    description: "Scale instantly without operational overhead.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M6 19a4.5 4.5 0 0 1-.42-8.98A7 7 0 0 1 19.5 11a4.5 4.5 0 0 1-.5 8.97" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 13v6M9 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: "from-accent-violet to-accent-blue",
    glowColor: "var(--svg-violet-dim)",
  },
  {
    title: "Human Collaboration",
    description: "Keep humans involved where approvals are required.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="9" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17 14c2.21 0 4 1.34 4 3v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: "from-accent-cyan to-accent-violet",
    glowColor: "rgba(6,182,212,0.12)",
  },
];

const containerVariants = staggerContainer(0.1, 0.15);

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 10, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

const headingVariants = blurFadeUp;

function FeatureCard({ feature }: { feature: (typeof FEATURES)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className="group relative rounded-2xl border border-hairline bg-canvas-raised backdrop-blur-sm p-6 sm:p-7 transition-all duration-500 hover:border-hairline-strong hover:bg-canvas-overlay"
    >
      {/* Glare effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04), transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        aria-hidden="true"
      />

      {/* Cursor-following glow */}
      <motion.div
        className="absolute -inset-1 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          x: useTransform(springX, [-0.5, 0.5], [-12, 12]),
          y: useTransform(springY, [-0.5, 0.5], [-12, 12]),
          background: `radial-gradient(circle at 50% 50%, ${feature.glowColor}, transparent 70%)`,
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      {/* Hover glow on card */}
      <div
        className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none`}
        aria-hidden="true"
      />

      {/* Icon */}
      <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-5 shadow-lg`}>
        <div className="text-white/90">
          {feature.icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="relative text-lg font-semibold text-text tracking-tight mb-2">
        {feature.title}
      </h3>
      <p className="relative text-sm text-text-secondary leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

export function Features() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.08 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden contain-layout contain-paint"
      aria-labelledby="features-heading"
    >
      {/* Background effects */}
      <CursorLight
        color="var(--svg-violet-dim)"
        size={700}
        blur={140}
        opacity={0.4}
        followMouse={false}
      />
      <AnimatedGrid opacity={0.018} spacing={48} />

      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-accent-violet/[0.025] rounded-full blur-[140px]" />
      </div>

      <Container>
        {/* Section header */}
        <motion.div
          variants={headingVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text"
          >
            Why Businesses Choose{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              NovaLabs AI
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
            Enterprise-grade AI infrastructure designed for automation, scalability
            and intelligent workflows.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          style={{ perspective: "1200px" }}
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
