import type { Variants, Transition, Target } from "framer-motion";

// ── Easing ──────────────────────────────────────────────────────────
export const ease = [0.22, 1, 0.36, 1] as const;
export const easeOut = [0.25, 0.46, 0.45, 0.94] as const;
export const easeInOut = [0.42, 0, 0.58, 1] as const;

// ── Spring configs ──────────────────────────────────────────────────
export const spring = {
  default: { type: "spring" as const, stiffness: 300, damping: 30 },
  gentle: { type: "spring" as const, stiffness: 200, damping: 25, mass: 0.5 },
  bouncy: { type: "spring" as const, stiffness: 180, damping: 22, mass: 0.6 },
  magnetic: { type: "spring" as const, stiffness: 150, damping: 15, mass: 0.1 },
  snappy: { type: "spring" as const, stiffness: 400, damping: 17 },
};

// ── Transition presets ──────────────────────────────────────────────
export const transitions = {
  hero: { duration: 0.8, ease },
  section: { duration: 0.7, ease },
  card: { duration: 0.6, ease },
  fast: { duration: 0.3, ease },
  slow: { duration: 1.0, ease },
  stagger: (delayChildren = 0.1, staggerChildren = 0.1): Transition => ({
    transition: { delayChildren, staggerChildren },
  }),
};

// ── Fade variants ───────────────────────────────────────────────────
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease } },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

// ── Blur + Fade variants ────────────────────────────────────────────
export const blurFadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

export const blurFadeIn = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

// ── Scale variants ──────────────────────────────────────────────────
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
};

export const scaleInBlur = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

// ── Slide variants ──────────────────────────────────────────────────
export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

// ── Stagger container ──────────────────────────────────────────────
export const staggerContainer = (
  delayChildren = 0.1,
  staggerChildren = 0.1
): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

// ── Card entry (with custom index delay) ───────────────────────────
export const cardEntry = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease, delay: 0.2 + i * 0.1 },
  }),
};

// ── Hero stagger preset ────────────────────────────────────────────
export const heroStagger = staggerContainer(0.1, 0.1);

export const heroChild = blurFadeUp;

// ── Timeline node ──────────────────────────────────────────────────
export const timelineNode = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: spring.snappy },
  },
};

export const timelineLine = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease },
  },
};

// ── Background orb breathing ───────────────────────────────────────
export const breathe = (
  reduced: boolean,
  minOpacity = 0.015,
  maxOpacity = 0.04
): Target =>
  reduced
    ? { opacity: minOpacity }
    : { opacity: [minOpacity, maxOpacity, minOpacity], scale: [1, 1.05, 1] };

// ── Utility: get reduced-motion-aware initial/animate ──────────────
export const revealProps = (
  isInView: boolean,
  reduced: boolean,
  variant: "fade" | "blurUp" | "scale" | "slideLeft" | "slideRight" = "blurUp"
) => {
  const variants = {
    fade: fadeIn,
    blurUp: blurFadeUp,
    scale: scaleIn,
    slideLeft: slideInLeft,
    slideRight: slideInRight,
  };
  const v = variants[variant];
  return {
    initial: reduced ? v.visible : v.hidden,
    animate: isInView ? v.visible : undefined,
  };
};
