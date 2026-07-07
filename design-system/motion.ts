/**
 * NovaLabs AI — Motion Design System
 *
 * Centralized animation values extracted from lib/motion.ts.
 * Import from `@/design-system` to use these presets.
 *
 * Re-exports everything from lib/motion.ts for backward compatibility.
 */

import type { Variants, Target } from "framer-motion";

// ── Durations ─────────────────────────────────────────────────────

export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  hero: 0.8,
  section: 0.7,
  card: 0.6,
  page: 0.15,
} as const;

// ── Easing Curves ─────────────────────────────────────────────────

export const easing = {
  /** Primary easing — used for most animations */
  default: [0.22, 1, 0.36, 1] as const,
  /** Ease out — for exits and subtle transitions */
  out: [0.25, 0.46, 0.45, 0.94] as const,
  /** Ease in-out — for looping animations */
  inOut: [0.42, 0, 0.58, 1] as const,
} as const;

// ── Spring Presets ────────────────────────────────────────────────

export const spring = {
  /** Default spring — balanced response */
  default: { type: "spring" as const, stiffness: 300, damping: 30 },
  /** Gentle spring — smooth, slightly dampened */
  gentle: { type: "spring" as const, stiffness: 200, damping: 25, mass: 0.5 },
  /** Bouncy spring — playful, energetic */
  bouncy: { type: "spring" as const, stiffness: 180, damping: 22, mass: 0.6 },
  /** Magnetic spring — follows cursor closely */
  magnetic: { type: "spring" as const, stiffness: 150, damping: 15, mass: 0.1 },
  /** Snappy spring — fast, responsive */
  snappy: { type: "spring" as const, stiffness: 400, damping: 17 },
} as const;

// ── Stagger Timing ────────────────────────────────────────────────

export const stagger = {
  /** Hero section stagger */
  hero: { delayChildren: 0.1, staggerChildren: 0.1 },
  /** Section heading stagger (badge → title → subtitle → buttons) */
  section: { delayChildren: 0.05, staggerChildren: 0.1 },
  /** Card grid stagger */
  cardGrid: { delayChildren: 0.15, staggerChildren: 0.12 },
  /** Fast stagger for small lists */
  fast: { delayChildren: 0.08, staggerChildren: 0.06 },
} as const;

// ── Transition Presets ────────────────────────────────────────────

export const transitions = {
  hero: { duration: durations.hero, ease: easing.default },
  section: { duration: durations.section, ease: easing.default },
  card: { duration: durations.card, ease: easing.default },
  fast: { duration: durations.fast, ease: easing.default },
  slow: { duration: durations.slow, ease: easing.default },
  page: { duration: durations.page, ease: "easeInOut" },
  stagger: (delayChildren = 0.1, staggerChildren = 0.1) => ({
    delayChildren,
    staggerChildren,
  }),
} as const;

// ── Scroll Reveal Presets ─────────────────────────────────────────

export const reveal = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: easing.default },
    },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easing.default },
    },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easing.default },
    },
  },
  blurFadeUp: {
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: easing.default },
    },
  },
  blurFadeIn: {
    hidden: { opacity: 0, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: easing.default },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: easing.default },
    },
  },
  scaleInBlur: {
    hidden: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: easing.default },
    },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: easing.default },
    },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 32 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: easing.default },
    },
  },
} as const;

// ── Hover Presets ─────────────────────────────────────────────────

export const hover = {
  /** Card hover — lift + subtle scale */
  card: {
    rest: { y: 0, scale: 1, transition: { duration: 0.3, ease: easing.default } },
    hover: {
      y: -6,
      scale: 1.01,
      transition: { duration: 0.3, ease: easing.default, type: "spring" as const, stiffness: 300, damping: 25 },
    },
  },
  /** Card hover with glow shadow */
  cardGlow: {
    rest: {
      y: 0,
      scale: 1,
      boxShadow: "0 0 0 0 rgba(0,0,0,0)",
      transition: { duration: 0.3, ease: easing.default },
    },
    hover: {
      y: -6,
      scale: 1.01,
      boxShadow: "0 8px 40px -8px rgba(99,102,241,0.15)",
      transition: { duration: 0.3, ease: easing.default, type: "spring" as const, stiffness: 300, damping: 25 },
    },
  },
  /** Button hover — subtle scale */
  button: {
    rest: { scale: 1 },
    hover: {
      scale: 1.03,
      transition: { duration: 0.2, type: "spring" as const, stiffness: 400, damping: 17 },
    },
    tap: { scale: 0.97 },
  },
} as const;

// ── FAQ Accordion ─────────────────────────────────────────────────

export const faq = {
  item: {
    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: easing.default },
    },
  },
  content: {
    collapsed: { height: 0, opacity: 0, transition: { duration: 0.3, ease: easing.default } },
    expanded: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.4, ease: easing.default, opacity: { delay: 0.1 } },
    },
  },
} as const;

// ── Specialized Presets ───────────────────────────────────────────

/** Float animation for decorative elements */
export const float = {
  animate: {
    y: [-6, 6, -6],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
  },
};

/** Timeline node pop-in */
export const timelineNode = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring" as const, stiffness: 400, damping: 17 },
  },
};

/** Timeline line grow */
export const timelineLine = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.2, ease: easing.default } },
};

/** Background orb breathing */
export const breathe = (
  reduced: boolean,
  minOpacity = 0.015,
  maxOpacity = 0.04
): Target =>
  reduced
    ? { opacity: minOpacity }
    : { opacity: [minOpacity, maxOpacity, minOpacity], scale: [1, 1.05, 1] };

/** Section heading container (badge → title → subtitle → buttons) */
export const sectionHeading = {
  hidden: {},
  visible: { transition: { delayChildren: 0.05, staggerChildren: 0.1 } },
};

/** Section badge pop-in */
export const sectionBadge = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: easing.default },
  },
};

/** Section title (alias for blurFadeUp) */
export const sectionTitle = reveal.blurFadeUp;

/** Section subtitle */
export const sectionSubtitle = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easing.default, delay: 0.05 },
  },
};

/** Section CTA buttons */
export const sectionButtons = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easing.default, delay: 0.1 },
  },
};

/** Card entry with custom index delay */
export const cardEntry = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easing.default, delay: 0.2 + i * 0.1 },
  }),
};

/** Stagger container factory */
export const staggerContainer = (
  delayChildren = 0.1,
  staggerChildren = 0.1
): Variants => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

// ── Utility ───────────────────────────────────────────────────────

/** Get reduced-motion-aware initial/animate props */
export const revealProps = (
  isInView: boolean,
  reduced: boolean,
  variant: "fade" | "blurUp" | "scale" | "slideLeft" | "slideRight" = "blurUp"
) => {
  const variants = {
    fade: reveal.fadeIn,
    blurUp: reveal.blurFadeUp,
    scale: reveal.scaleIn,
    slideLeft: reveal.slideInLeft,
    slideRight: reveal.slideInRight,
  };
  const v = variants[variant];
  return {
    initial: reduced ? v.visible : v.hidden,
    animate: isInView ? v.visible : undefined,
  };
};
