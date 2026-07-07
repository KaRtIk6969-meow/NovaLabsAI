/**
 * NovaLabs AI — Design System Helpers
 *
 * Utility functions for common visual effects.
 * Import from `@/design-system` to use these helpers.
 */

import { svgColors } from "./tokens";

// ── Glass Effects ─────────────────────────────────────────────────

/**
 * Generate a glass background style.
 * @param opacity - Glass opacity (0-1), default 0.05
 * @param blur - Blur amount in pixels, default 8
 */
export function glassBg(opacity = 0.05, blur = 8): React.CSSProperties {
  return {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
  };
}

/**
 * Generate a glass border style.
 * @param opacity - Border opacity (0-1), default 0.1
 */
export function glassBorder(opacity = 0.1): React.CSSProperties {
  return {
    border: `1px solid rgba(255, 255, 255, ${opacity})`,
  };
}

// ── Glow Effects ──────────────────────────────────────────────────

/**
 * Generate a radial glow background.
 * @param color - CSS color value
 * @param spread - Glow spread radius in pixels, default 20
 */
export function glowBg(color: string, spread = 20): React.CSSProperties {
  return {
    background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
    filter: `blur(${spread}px)`,
  };
}

/**
 * Generate a cursor-following glow position.
 * @param mouseX - Normalized mouse X (-0.5 to 0.5)
 * @param mouseY - Normalized mouse Y (-0.5 to 0.5)
 * @param intensity - Glow movement intensity, default 15
 */
export function cursorGlow(
  mouseX: number,
  mouseY: number,
  intensity = 15
): React.CSSProperties {
  return {
    transform: `translate(${mouseX * intensity * 2}px, ${mouseY * intensity * 2}px)`,
  };
}

/**
 * Generate a spotlight gradient that follows cursor position.
 * @param x - X percentage (0-100)
 * @param y - Y percentage (0-100)
 * @param color - CSS color value
 * @param radius - Spotlight radius in pixels, default 350
 */
export function spotlightBg(
  x: number,
  y: number,
  color: string = svgColors.violetDim,
  radius = 350
): string {
  return `radial-gradient(circle ${radius}px at ${x}% ${y}%, ${color}, transparent 70%)`;
}

// ── Common Transitions ────────────────────────────────────────────

/**
 * Common CSS transition strings.
 */
export const transitions = {
  /** Fast transition (200ms) */
  fast: "all 0.2s ease",
  /** Normal transition (300ms) */
  normal: "all 0.3s ease",
  /** Slow transition (500ms) */
  slow: "all 0.5s ease",
  /** Color-only transition */
  color: "color 0.3s ease",
  /** Opacity-only transition */
  opacity: "opacity 0.3s ease",
  /** Transform transition */
  transform: "transform 0.3s ease",
  /** Border color transition */
  border: "border-color 0.3s ease",
  /** Background transition */
  bg: "background-color 0.3s ease, opacity 0.3s ease",
  /** Shadow transition */
  shadow: "box-shadow 0.3s ease",
} as const;

// ── Animation Variants (Framer Motion) ────────────────────────────

/**
 * Common Framer Motion animation variant factories.
 * These return variant objects for use with motion components.
 */

/** Fade in from below with blur */
export const blurFadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Simple fade in */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Scale in */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Slide in from left */
export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Slide in from right */
export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Create a stagger container variant.
 * @param delayChildren - Initial delay before children start animating
 * @param staggerChildren - Delay between each child
 */
export function staggerContainer(
  delayChildren = 0.1,
  staggerChildren = 0.1
) {
  return {
    hidden: {},
    visible: { transition: { delayChildren, staggerChildren } },
  };
}

/**
 * Create a card entry variant with custom index delay.
 * @param baseDelay - Base delay before cards start animating
 * @param perCardDelay - Additional delay per card index
 */
export function cardEntryVariant(baseDelay = 0.2, perCardDelay = 0.1) {
  return {
    hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: baseDelay + i * perCardDelay,
      },
    }),
  };
}

// ── Gradient Generators ───────────────────────────────────────────

/**
 * Generate a linear gradient string.
 * @param colors - Array of CSS color values
 * @param angle - Gradient angle in degrees, default 135
 */
export function linearGradient(colors: string[], angle = 135): string {
  return `linear-gradient(${angle}deg, ${colors.join(", ")})`;
}

/**
 * Generate a radial gradient string.
 * @param colors - Array of CSS color values
 * @param shape - Gradient shape, default "ellipse"
 */
export function radialGradient(
  colors: string[],
  shape: "circle" | "ellipse" = "ellipse"
): string {
  return `radial-gradient(${shape}, ${colors.join(", ")})`;
}

/**
 * Generate the standard NovaLabs gradient (blue → violet → cyan).
 */
export function novaGradient(): string {
  return `linear-gradient(135deg, ${svgColors.link}, ${svgColors.violet}, ${svgColors.cyan})`;
}

/**
 * Generate a text gradient class string for Tailwind.
 * Uses the standard NovaLabs blue → violet → cyan gradient.
 */
export function textGradientClass(): string {
  return "bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent";
}
