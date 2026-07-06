"use client";

import { useState, useRef, useCallback, memo } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { Particles } from "@/components/ui/Particles";

const ease = [0.22, 1, 0.36, 1] as const;

/* ═══════════════════════════════════════════
   TESTIMONIAL DATA
   ═══════════════════════════════════════════ */

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Sarah Chen",
    position: "VP of Engineering",
    company: "Meridian Health Systems",
    industry: "Healthcare",
    rating: 5,
    quote:
      "NovaLabs AI transformed our patient scheduling from a 16-hour bottleneck to a 23-second automated flow. Our staff satisfaction scores jumped 23 points in the first quarter.",
    avatar: "SC",
    accentColor: "var(--svg-link)",
  },
  {
    id: "t2",
    name: "Marcus Rodriguez",
    position: "Chief Operations Officer",
    company: "Precision Manufacturing Co.",
    industry: "Manufacturing",
    rating: 5,
    quote:
      "We went from catching 78% of defects to 99.4%. The AI vision system paid for itself in 6 weeks. Recall rates dropped 91% — that's real money saved.",
    avatar: "MR",
    accentColor: "var(--svg-cyan)",
  },
  {
    id: "t3",
    name: "Elena Volkov",
    position: "Head of Risk Analytics",
    company: "Vertex Capital Partners",
    industry: "Finance",
    rating: 5,
    quote:
      "Loan approvals went from 3 days to 3 minutes. Fraud detection accuracy improved 82%. Our board couldn't believe the ROI numbers.",
    avatar: "EV",
    accentColor: "var(--svg-violet)",
  },
  {
    id: "t4",
    name: "James Okafor",
    position: "Director of Supply Chain",
    company: "Lumina Retail Group",
    industry: "Retail",
    rating: 5,
    quote:
      "Forecast accuracy jumped from 62% to 94%. Stock waste dropped 71% and we saw a 34% revenue uplift. The demand prediction AI is a game changer.",
    avatar: "JO",
    accentColor: "var(--svg-pink)",
  },
  {
    id: "t5",
    name: "Aisha Patel",
    position: "Fleet Operations Manager",
    company: "SwiftRoute Logistics",
    industry: "Logistics",
    rating: 5,
    quote:
      "On-time delivery went from 71% to 97%. Fuel costs dropped 34%. The route optimization alone saved us $1.8M in the first year.",
    avatar: "AP",
    accentColor: "var(--svg-link)",
  },
  {
    id: "t6",
    name: "David Kim",
    position: "CTO",
    company: "Nexus Cloud Technologies",
    industry: "Technology",
    rating: 5,
    quote:
      "We integrated NovaLabs AI into our platform in 8 weeks. Our enterprise clients now automate 40+ hours of manual work per week. It's become our strongest selling point.",
    avatar: "DK",
    accentColor: "var(--svg-cyan)",
  },
] as const;

const COMPANIES = [
  "Meridian Health",
  "Precision Mfg",
  "Vertex Capital",
  "Lumina Retail",
  "SwiftRoute",
  "Nexus Cloud",
  "AeroDynamics",
  "Quantum Labs",
  "TerraFirm",
  "BluePeak Energy",
  "Orion Systems",
  "Vanguard AI",
] as const;

const TRUST_METRICS = [
  { label: "Client Retention", value: 98, suffix: "%", icon: "📊" },
  { label: "Enterprise Clients", value: 250, suffix: "+", icon: "🏢" },
  { label: "Countries", value: 40, suffix: "+", icon: "🌍" },
  { label: "Revenue Influenced", value: 120, suffix: "M+", prefix: "$", icon: "💰" },
] as { label: string; value: number; suffix: string; prefix?: string; icon: string }[];

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
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

const cardFloat = {
  hidden: { opacity: 0, y: 30, scale: 0.96, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: 0.15 + i * 0.1,
      ease,
    },
  }),
};

/* ═══════════════════════════════════════════
   TESTIMONIAL CARD
   ═══════════════════════════════════════════ */

const TestimonialCard = memo(function TestimonialCard({
  testimonial,
  index,
  isInView,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  index: number;
  isInView: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  /* 3D tilt — ±2° for subtlety */
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 120, damping: 18, mass: 0.6 });
  const springTiltY = useSpring(tiltY, { stiffness: 120, damping: 18, mass: 0.6 });
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], [2, -2]);
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], [-2, 2]);

  /* Spotlight */
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const springSpotX = useSpring(spotX, { stiffness: 120, damping: 18 });
  const springSpotY = useSpring(spotY, { stiffness: 120, damping: 18 });
  const spotBg = useMotionTemplate`radial-gradient(circle 220px at ${springSpotX}% ${springSpotY}%, rgba(255,255,255,0.06), transparent 70%)`;

  /* Border glow follows cursor */
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const springGlowX = useSpring(glowX, { stiffness: 100, damping: 15 });
  const springGlowY = useSpring(glowY, { stiffness: 100, damping: 15 });
  const borderGlowBg = useMotionTemplate`radial-gradient(circle 180px at ${springGlowX}% ${springGlowY}%, ${testimonial.accentColor}, transparent 70%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current || shouldReduceMotion) return;
      const r = cardRef.current.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      tiltX.set(nx - 0.5);
      tiltY.set(ny - 0.5);
      spotX.set(nx * 100);
      spotY.set(ny * 100);
      glowX.set(nx * 100);
      glowY.set(ny * 100);
    },
    [tiltX, tiltY, spotX, spotY, glowX, glowY, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
    spotX.set(50);
    spotY.set(50);
    glowX.set(50);
    glowY.set(50);
  }, [tiltX, tiltY, spotX, spotY, glowX, glowY]);

  /* Floating amplitude varies per card */
  const floatAmp = 2 + (index % 3);

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={cardFloat}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        transformPerspective: 800,
      }}
      className="relative rounded-2xl border border-hairline bg-canvas-raised/70 backdrop-blur-sm p-6 group"
    >
      {/* Animated gradient border */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none z-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 0.5 : 0,
          background: `linear-gradient(135deg, ${testimonial.accentColor}, var(--svg-link), var(--svg-cyan), ${testimonial.accentColor})`,
          backgroundSize: "300% 300%",
          animation: "border-rotate 5s ease infinite",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
        aria-hidden="true"
      />

      {/* Cursor-following border glow */}
      <motion.div
        className="absolute -inset-px rounded-2xl pointer-events-none z-0"
        style={{
          background: borderGlowBg,
          opacity: isHovered ? 0.2 : 0,
          filter: "blur(4px)",
        }}
        aria-hidden="true"
      />

      {/* Glass fill */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 40%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Glass reflection sweep — every ~9s */}
      {!shouldReduceMotion && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)",
              backgroundSize: "200% 100%",
              animation: `glass-sweep 9s ease-in-out infinite ${index * 1.2}s`,
            }}
          />
        </div>
      )}

      {/* Spotlight */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-0"
        style={{ background: spotBg, opacity: isHovered ? 1 : 0, transition: "opacity 0.4s ease" }}
        aria-hidden="true"
      />

      {/* Floating motion — 2–4px amplitude, slow */}
      <motion.div
        className="relative z-10"
        animate={
          !shouldReduceMotion && isInView
            ? { y: [0, -floatAmp, 0, floatAmp * 0.6, 0] }
            : { y: 0 }
        }
        transition={{
          duration: 7 + index * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Header: Avatar + Info + Rating */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Avatar — gentle pulse */}
            <motion.div
              className="relative w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-text"
              style={{
                background: `linear-gradient(135deg, ${testimonial.accentColor}33, ${testimonial.accentColor}11)`,
                border: `1px solid ${testimonial.accentColor}33`,
              }}
              animate={
                !shouldReduceMotion && isInView
                  ? { scale: [1, 1.06, 1], boxShadow: [
                      `0 0 0 0px ${testimonial.accentColor}00`,
                      `0 0 12px 2px ${testimonial.accentColor}18`,
                      `0 0 0 0px ${testimonial.accentColor}00`,
                    ] }
                  : { scale: 1 }
              }
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
            >
              {testimonial.avatar}
            </motion.div>
            <div>
              <div className="text-sm font-semibold text-text">{testimonial.name}</div>
              <div className="text-xs text-text-muted">{testimonial.position}</div>
              <div className="text-xs text-text-secondary">{testimonial.company}</div>
            </div>
          </div>
          {/* Rating stars — stagger in */}
          <div className="flex gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <motion.span
                key={i}
                className="text-accent-cyan text-xs"
                initial={{ opacity: 0, scale: 0, rotate: -30 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -30 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.6 + i * 0.1,
                }}
              >
                ★
              </motion.span>
            ))}
          </div>
        </div>

        {/* Quote — fade in with stagger */}
        <div className="relative mb-4">
          <motion.div
            className="absolute -top-1 -left-1 text-2xl font-serif opacity-15 select-none"
            style={{ color: testimonial.accentColor }}
            initial={{ opacity: 0, x: -6 }}
            animate={isInView ? { opacity: 0.15, x: 0 } : { opacity: 0, x: -6 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.08, ease }}
            aria-hidden="true"
          >
            &ldquo;
          </motion.div>
          <motion.p
            className="text-sm text-text-secondary leading-relaxed pl-4 italic"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.7, delay: 0.5 + index * 0.1, ease }}
          >
            {testimonial.quote}
          </motion.p>
        </div>

        {/* Industry tag */}
        <div className="flex items-center justify-between">
          <motion.span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide uppercase"
            style={{
              background: `${testimonial.accentColor}11`,
              color: testimonial.accentColor,
              border: `1px solid ${testimonial.accentColor}22`,
            }}
            initial={{ opacity: 0, x: -8 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.5, delay: 0.7 + index * 0.08, ease }}
          >
            {testimonial.industry}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
});

/* ═══════════════════════════════════════════
   TRUST METRIC CARD
   ═══════════════════════════════════════════ */

function TrustMetricCard({
  metric,
  index,
  isInView,
}: {
  metric: (typeof TRUST_METRICS)[number];
  index: number;
  isInView: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [countDone, setCountDone] = useState(false);

  const count = useCountUp({
    end: metric.value,
    duration: 2000,
    startOnMount: isInView,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease }}
      className="relative rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm p-5 text-center group"
      onAnimationComplete={() => {
        if (isInView) setCountDone(true);
      }}
    >
      {/* Glow pulse after count completes */}
      {countDone && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(80,227,194,0.06) 0%, transparent 70%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 2, ease: "easeInOut" }}
          aria-hidden="true"
        />
      )}

      {/* Icon — animate once */}
      <motion.div
        className="text-lg mb-1"
        initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -20 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.3 + index * 0.12 }}
      >
        {metric.icon}
      </motion.div>

      <div className="text-2xl sm:text-3xl font-bold text-text tracking-tight">
        {metric.prefix || ""}
        {count}
        <span className="text-accent-cyan">{metric.suffix}</span>
      </div>
      <div className="text-xs text-text-muted mt-1 font-medium">{metric.label}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   LOGO MARQUEE
   ═══════════════════════════════════════════ */

function LogoMarquee({ isInView }: { isInView: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden py-8" aria-label="Trusted company logos">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-canvas to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-canvas to-transparent z-10 pointer-events-none" />

      {/* Marquee */}
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={
          !shouldReduceMotion && isInView
            ? { x: ["0%", "-50%"] }
            : { x: "0%" }
        }
        transition={{
          x: { duration: 30, repeat: Infinity, ease: "linear" },
        }}
      >
        {[...COMPANIES, ...COMPANIES].map((company, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-hairline/30 bg-canvas-raised/30"
          >
            <div className="w-6 h-6 rounded bg-gradient-to-br from-accent-blue/20 to-accent-violet/20 flex items-center justify-center text-[8px] font-bold text-text-muted">
              {company.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-xs font-medium text-text-muted">{company}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CONNECTION LINES
   ═══════════════════════════════════════════ */

function ConnectionLines({ isInView }: { isInView: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
      {/* Horizontal connection line 1 */}
      <motion.div
        className="absolute top-1/3 left-[15%] right-[15%] h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, var(--svg-link), var(--svg-cyan), var(--svg-violet), transparent)",
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 0.15, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 1.5, delay: 0.8, ease }}
      />
      {/* Glowing pulse on connection */}
      {isInView && (
        <motion.div
          className="absolute top-1/3 left-[15%] right-[15%] h-[1px]"
          style={{
            background: "linear-gradient(90deg, transparent, var(--svg-link), var(--svg-cyan), var(--svg-violet), transparent)",
          }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      )}
      {/* Horizontal connection line 2 */}
      <motion.div
        className="absolute top-2/3 left-[10%] right-[10%] h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, var(--svg-cyan), var(--svg-violet), var(--svg-link), transparent)",
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 0.1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 1.5, delay: 1.2, ease }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAGNETIC CTA BUTTON
   ═══════════════════════════════════════════ */

function MagneticCTA({ isInView }: { isInView: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!btnRef.current || shouldReduceMotion) return;
      const r = btnRef.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      x.set((e.clientX - cx) * 0.15);
      y.set((e.clientY - cy) * 0.15);
    },
    [x, y, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, delay: 0.6, ease }}
    >
      <motion.button
        ref={btnRef}
        style={{ x: shouldReduceMotion ? 0 : springX, y: shouldReduceMotion ? 0 : springY }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet text-white text-sm font-medium overflow-hidden group"
      >
        {/* Button glow */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: isHovered
              ? "0 0 28px 4px rgba(0,112,243,0.3), 0 0 56px 8px rgba(121,40,202,0.15)"
              : "0 0 20px 2px rgba(0,112,243,0.15)",
            transition: "box-shadow 0.5s ease",
          }}
          aria-hidden="true"
        />

        <span className="relative z-10">Explore Success Stories</span>

        {/* Glowing arrow */}
        <motion.span
          className="relative z-10 inline-flex"
          animate={
            isHovered && !shouldReduceMotion
              ? { x: [0, 4, 0] }
              : { x: 0 }
          }
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            className="drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]"
            aria-hidden="true"
          >
            <path
              d="M3 8h10m0 0L9 4m4 4L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </motion.button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════ */

export function Testimonials() {
  const { ref: sectionRef, shouldAnimate } = useViewportAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden bg-canvas"
      aria-labelledby="testimonials-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <AnimatedGrid
          opacity={0.012}
          spacing={56}
          className={
            shouldAnimate && !shouldReduceMotion
              ? "animate-[grid-shimmer_10s_ease-in-out_infinite]"
              : ""
          }
        />

        {/* Aurora gradient — breathing */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[1200px] h-[800px] rounded-full blur-[280px]"
          animate={
            shouldReduceMotion
              ? { opacity: 0.03 }
              : { opacity: [0.02, 0.05, 0.02], scale: [1, 1.04, 1] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse, var(--svg-link) 0%, var(--svg-violet) 30%, var(--svg-cyan) 60%, transparent 80%)",
          }}
        />

        {/* Drifting particles */}
        {!shouldReduceMotion && (
          <>
            <motion.div
              className="absolute top-1/4 left-[10%] w-[300px] h-[300px] rounded-full blur-[140px]"
              style={{ background: "radial-gradient(circle, rgba(0,112,243,0.04) 0%, transparent 70%)" }}
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-[10%] w-[250px] h-[250px] rounded-full blur-[120px]"
              style={{ background: "radial-gradient(circle, rgba(80,227,194,0.035) 0%, transparent 70%)" }}
              animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[200px]"
              style={{ background: "radial-gradient(circle, rgba(121,40,202,0.025) 0%, transparent 70%)" }}
              animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Extra: subtle warm drift */}
            <motion.div
              className="absolute top-[60%] left-[25%] w-[350px] h-[350px] rounded-full blur-[160px]"
              style={{ background: "radial-gradient(circle, rgba(255,0,128,0.02) 0%, transparent 70%)" }}
              animate={{ x: [0, -20, 15, 0], y: [0, 10, -15, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            />
          </>
        )}

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />

        {/* Depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-canvas/50" />
      </div>

      {/* Particles */}
      {!shouldReduceMotion && shouldAnimate && (
        <Particles count={12} speed={0.03} maxSize={1} />
      )}

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16 items-start">
          {/* Left: Heading */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            className="lg:sticky lg:top-24"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairline bg-glass text-[13px] font-medium text-body backdrop-blur-md mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_8px_var(--svg-cyan)]" />
                </span>
                Testimonials
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              id="testimonials-heading"
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-4 leading-tight"
            >
              Trusted by Teams{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                Building the Future
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-text-secondary leading-relaxed mb-6"
            >
              See how enterprise organizations transform their operations
              with NovaLabs AI.
            </motion.p>

            {/* Animated Trust Badge */}
            <motion.div
              variants={fadeUp}
              className="relative mb-4"
            >
              <motion.div
                className="inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm"
                whileHover={!shouldReduceMotion ? { scale: 1.02 } : undefined}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-accent-cyan text-sm"
                      initial={{ opacity: 0, scale: 0, rotate: -30 }}
                      animate={shouldAnimate ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                        delay: 0.3 + i * 0.1,
                      }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <div className="h-4 w-px bg-hairline" />
                <span className="text-sm font-semibold text-text">4.9/5</span>
                <span className="text-xs text-text-muted">Rating</span>
                <div className="h-4 w-px bg-hairline" />
                <span className="text-sm font-semibold text-text">250+</span>
                <span className="text-xs text-text-muted">Enterprise Customers</span>
              </motion.div>
            </motion.div>

            {/* Floating Fortune 500 Badge */}
            <motion.div
              variants={fadeUp}
              className="mb-8"
            >
              <motion.div
                className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-accent-violet/20 bg-accent-violet/5"
                animate={
                  !shouldReduceMotion
                    ? { y: [0, -3, 0, 2, 0] }
                    : { y: 0 }
                }
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Subtle pulse ring */}
                {!shouldReduceMotion && (
                  <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      boxShadow: "0 0 12px 2px rgba(121,40,202,0.1)",
                    }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  />
                )}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-accent-violet" aria-hidden="true">
                  <path d="M8 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4l2-4z" fill="currentColor" opacity="0.8" />
                </svg>
                <span className="text-xs font-medium text-accent-violet">Trusted by Fortune 500 Teams</span>
              </motion.div>
            </motion.div>

            {/* CTA */}
            <MagneticCTA isInView={shouldAnimate} />
          </motion.div>

          {/* Right: Testimonial Cards Grid */}
          <div className="relative">
            <ConnectionLines isInView={shouldAnimate} />
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={shouldAnimate ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10"
            >
              {TESTIMONIALS.map((testimonial, i) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={i}
                  isInView={shouldAnimate}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Trust Metrics */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16"
        >
          {TRUST_METRICS.map((metric, i) => (
            <TrustMetricCard key={metric.label} metric={metric} index={i} isInView={shouldAnimate} />
          ))}
        </motion.div>

        {/* Logo Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12"
        >
          <LogoMarquee isInView={shouldAnimate} />
        </motion.div>
      </Container>
    </section>
  );
}
