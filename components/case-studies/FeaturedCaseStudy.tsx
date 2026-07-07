"use client";

import { useRef, useCallback, useState } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { easing } from "@/design-system";
import { CASE_STUDIES } from "@/data/case-studies";

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

const featured = CASE_STUDIES[0];

function MetricBadge({
  metric,
  index,
  isInView,
}: {
  metric: {
    label: string;
    value: number;
    suffix: string;
    icon: string;
    decimals?: number;
    secondaryLabel?: string;
  };
  index: number;
  isInView: boolean;
}) {
  const count = useCountUp({
    end: metric.value,
    duration: 2000,
    decimals: metric.decimals,
    startOnMount: isInView,
  });

  const [glowActive, setGlowActive] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease }}
      whileHover={!isInView ? undefined : { y: -3, scale: 1.01 }}
      onAnimationComplete={() => {
        if (isInView) setTimeout(() => setGlowActive(true), 2200);
      }}
      className="relative rounded-xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm p-5 group"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{metric.icon}</span>
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
          {metric.label}
        </span>
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-text tracking-tight">
        {count}
        <span className="text-accent-cyan">{metric.suffix}</span>
      </div>
      {metric.secondaryLabel && (
        <div className="text-[10px] text-text-muted mt-1 font-medium">
          {metric.secondaryLabel}
        </div>
      )}

      {/* Glow pulse after count completes */}
      {glowActive && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ boxShadow: "0 0 0px rgba(0,112,243,0)" }}
          animate={{ boxShadow: ["0 0 0px rgba(0,112,243,0)", "0 0 20px rgba(0,112,243,0.15)", "0 0 0px rgba(0,112,243,0)"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}

export function FeaturedCaseStudy() {
  const { ref: sectionRef, shouldAnimate } = useViewportAnimation({ threshold: 0.06 });
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 26, mass: 0.5 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 26, mass: 0.5 });
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], [-3, 3]);

  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const springSpotX = useSpring(spotX, { stiffness: 180, damping: 22 });
  const springSpotY = useSpring(spotY, { stiffness: 180, damping: 22 });
  const spotBg = useMotionTemplate`radial-gradient(circle 300px at ${springSpotX}% ${springSpotY}%, rgba(255,255,255,0.06), transparent 70%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current || shouldReduceMotion) return;
      const r = cardRef.current.getBoundingClientRect();
      tiltX.set((e.clientX - r.left) / r.width - 0.5);
      tiltY.set((e.clientY - r.top) / r.height - 0.5);
      spotX.set(((e.clientX - r.left) / r.width) * 100);
      spotY.set(((e.clientY - r.top) / r.height) * 100);
    },
    [tiltX, tiltY, spotX, spotY, shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
    spotX.set(50);
    spotY.set(50);
  }, [tiltX, tiltY, spotX, spotY]);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline bg-glass/50 text-[12px] font-medium text-text-secondary backdrop-blur-sm">
              {featured.icon} Featured Case Study
            </span>
          </motion.div>

          <motion.div
            ref={cardRef}
            variants={fadeUp}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {}}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: shouldReduceMotion ? 0 : rotateX,
              rotateY: shouldReduceMotion ? 0 : rotateY,
              transformPerspective: 800,
            }}
            className="relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none z-0"
              style={{ background: spotBg }}
              aria-hidden="true"
            />

            <div
              className="absolute -inset-px rounded-2xl pointer-events-none z-0 opacity-30"
              style={{
                background: "linear-gradient(135deg, var(--svg-violet), var(--svg-link), var(--svg-cyan), var(--svg-violet))",
                backgroundSize: "300% 300%",
                animation: "border-rotate 6s ease infinite",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "1px",
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{featured.icon}</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-text">{featured.company}</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                      {featured.industry}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm max-w-xl">{featured.solution}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <span className="font-mono text-accent-cyan">{featured.implementationWeeks} weeks</span>
                  <span>implementation</span>
                </div>
              </div>

              <div className="mb-8 p-4 rounded-xl border border-hairline/50 bg-glass/20">
                <div className="text-[11px] font-mono uppercase tracking-widest text-text-muted mb-2">Challenge</div>
                <p className="text-text-secondary text-sm">{featured.challenge}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-center mb-8">
                <div className="rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm p-4 text-center">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-1">Before</div>
                  <div className="text-xs text-text-secondary mb-1">{featured.before.label}</div>
                  <div className="text-xl sm:text-2xl font-bold text-text">{featured.before.value}</div>
                </div>
                <div className="hidden sm:flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-hairline bg-canvas-raised flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent-cyan">
                      <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="rounded-xl border border-accent-blue/20 bg-canvas-raised/60 backdrop-blur-sm p-4 text-center">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-accent-cyan mb-1">After</div>
                  <div className="text-xs text-text-secondary mb-1">{featured.after.label}</div>
                  <div className="text-xl sm:text-2xl font-bold text-text">{featured.after.value}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {featured.metrics.map((metric, i) => (
                  <MetricBadge key={metric.label} metric={metric} index={i} isInView={shouldAnimate} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
