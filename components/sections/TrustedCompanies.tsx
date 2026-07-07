"use client";

import { memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { Particles } from "@/components/ui/Particles";
import { easing } from "@/design-system";
const ease = easing.default;

const ROW_LEFT = [
  {
    name: "Helix Systems",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M6 6l8 8-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 6l8 8-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "Nexora",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 14l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Lumina AI",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 4v4M14 20v4M4 14h4M20 14h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="14" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    name: "Vertex Cloud",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden="true">
        <polygon points="14,3 22,10 22,18 14,25 6,18 6,10" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 8v12M9 14h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Orion Tech",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="14" cy="14" r="3" fill="currentColor" />
        <path d="M14 4v3M14 21v3M4 14h3M21 14h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Apex Digital",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M4 22l10-16 10 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 16h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const ROW_RIGHT = [
  {
    name: "Quantum Labs",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.8" />
        <ellipse cx="14" cy="14" rx="12" ry="5" stroke="currentColor" strokeWidth="1.2" transform="rotate(0 14 14)" />
        <ellipse cx="14" cy="14" rx="12" ry="5" stroke="currentColor" strokeWidth="1.2" transform="rotate(60 14 14)" />
        <ellipse cx="14" cy="14" rx="12" ry="5" stroke="currentColor" strokeWidth="1.2" transform="rotate(120 14 14)" />
      </svg>
    ),
  },
  {
    name: "CloudPeak",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M7 20a5 5 0 0 1-.5-9.97A8 8 0 0 1 22 12a5 5 0 0 1-.5 9.95" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 16v6M10 19h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "NovaCore",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M14 3l11 6v10l-11 6-11-6V9l11-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 14l11-6M14 14v10M14 14L3 8" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "FutureStack",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden="true">
        <rect x="5" y="5" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5 11h18M11 5v18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="18" cy="18" r="2" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    name: "AI Dynamics",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden="true">
        <path d="M4 14h4l3-8 4 16 3-8h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="14" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="24" cy="14" r="1.5" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: "TechFusion",
    icon: (
      <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden="true">
        <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="18" cy="18" r="6" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14.5 13.5l-1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const LogoItem = memo(function LogoItem({ company }: { company: (typeof ROW_LEFT)[number] }) {
  return (
    <div
      className="group flex items-center justify-center px-6 sm:px-8 py-4 shrink-0 cursor-default"
      aria-label={company.name}
    >
      <div className="relative flex items-center gap-2.5 text-body/40 transition-all duration-400 ease-out group-hover:text-text group-hover:scale-[1.08]">
        {/* Hover glow */}
        <div className="absolute -inset-4 rounded-xl bg-primary/[0.12] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />
        <span className="relative">{company.icon}</span>
        <span className="relative text-sm font-semibold tracking-tight whitespace-nowrap">
          {company.name}
        </span>
      </div>
    </div>
  );
});

function MarqueeRow({
  companies,
  direction = "left",
  speed = 35,
  className = "",
}: {
  companies: (typeof ROW_LEFT)[number][];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const duplicated = [...companies, ...companies, ...companies, ...companies];

  const animName = direction === "left" ? "marquee-left" : "marquee-right";
  const duration = speed;

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      {/* Edge masks for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      <div
        className="flex will-change-transform"
        style={
          shouldReduceMotion
            ? {}
            : {
                animation: `${animName} ${duration}s linear infinite`,
              }
        }
      >
        {duplicated.map((company, i) => (
          <LogoItem key={`${company.name}-${i}`} company={company} />
        ))}
      </div>
    </div>
  );
}

export function TrustedCompanies() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const springBgY = useSpring(bgY, { stiffness: 50, damping: 30 });

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="trusted-heading"
    >
      {/* Top gradient — seamless Hero continuation */}
      <div
        className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-bg to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Animated gradient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: springBgY }}
        aria-hidden="true"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-primary/[0.025] rounded-full blur-[140px]"
          style={{ animation: "orb-breathing 10s ease-in-out infinite" }}
        />
        <div
          className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-accent-blue/[0.02] rounded-full blur-[120px]"
          style={{ animation: "orb-drift-2 14s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[20%] right-[15%] w-[350px] h-[350px] bg-accent-cyan/[0.02] rounded-full blur-[110px]"
          style={{ animation: "orb-drift-3 16s ease-in-out infinite" }}
        />
      </motion.div>

      {/* Subtle grid */}
      <AnimatedGrid opacity={0.015} spacing={48} />

      {/* Floating particles */}
      {!shouldReduceMotion && <Particles count={20} speed={0.1} maxSize={1} />}

      {/* Section content */}
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-14 sm:mb-16"
        >
          <h2 id="trusted-heading" className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text">
            Trusted by innovative{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              companies
            </span>{" "}
            worldwide
          </h2>
          <p className="mt-5 text-base sm:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            Helping businesses automate, scale and grow with enterprise AI.
          </p>
        </motion.div>
      </Container>

      {/* Marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
        className="space-y-2"
      >
        <MarqueeRow companies={ROW_LEFT} direction="left" speed={40} />
        <MarqueeRow companies={ROW_RIGHT} direction="right" speed={45} />
      </motion.div>
    </section>
  );
}
