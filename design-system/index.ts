/**
 * NovaLabs AI — Design System
 *
 * Centralized design values, animation presets, component styles,
 * and helper utilities for the NovaLabs AI website.
 *
 * @example
 * ```tsx
 * import { colors, radius, shadows, buttonStyles } from "@/design-system";
 * import { blurFadeUp, staggerContainer } from "@/design-system";
 * import { glassBg, textGradientClass } from "@/design-system";
 * ```
 */

// ── Tokens ────────────────────────────────────────────────────────
export {
  colors,
  svgColors,
  spacing,
  radius,
  shadows,
  zIndex,
  blur,
  typography,
} from "./tokens";

// ── Motion ────────────────────────────────────────────────────────
export {
  durations,
  easing,
  spring,
  stagger,
  transitions,
  reveal,
  hover,
  faq,
  float,
  timelineNode,
  timelineLine,
  breathe,
  sectionHeading,
  sectionBadge,
  sectionTitle,
  sectionSubtitle,
  sectionButtons,
  cardEntry,
  staggerContainer,
  revealProps,
} from "./motion";

// ── Component Styles ──────────────────────────────────────────────
export {
  cardStyles,
  buttonStyles,
  inputStyles,
  badgeStyles,
  sectionStyles,
  glassStyles,
  heroStyles,
  dividerStyles,
} from "./components";

// ── Helpers ───────────────────────────────────────────────────────
export {
  glassBg,
  glassBorder,
  glowBg,
  cursorGlow,
  spotlightBg,
  transitions as cssTransitions,
  blurFadeUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer as staggerContainerHelper,
  cardEntryVariant,
  linearGradient,
  radialGradient,
  novaGradient,
  textGradientClass,
} from "./helpers";
