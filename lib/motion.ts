/**
 * NovaLabs AI — Motion Utilities
 *
 * @deprecated Import from `@/design-system` instead.
 * This file re-exports from the design system for backward compatibility.
 */

export {
  // Spring
  spring,

  // Transitions
  transitions,

  // Stagger
  staggerContainer,

  // Card entry
  cardEntry,

  // Section presets
  sectionHeading,
  sectionBadge,
  sectionTitle,
  sectionSubtitle,
  sectionButtons,

  // Float
  float,

  // Timeline
  timelineNode,
  timelineLine,

  // Background
  breathe,

  // Utility
  revealProps,
} from "@/design-system";

// Re-export variants with their original names for backward compatibility
import {
  easing,
  reveal,
  hover,
  faq,
  staggerContainer as staggerContainerFn,
} from "@/design-system";

// Easing arrays
export const ease = easing.default;
export const easeOut = easing.out;
export const easeInOut = easing.inOut;

// Reveal variants
export const fadeIn = reveal.fadeIn;
export const fadeInUp = reveal.fadeInUp;
export const fadeInDown = reveal.fadeInDown;
export const blurFadeUp = reveal.blurFadeUp;
export const blurFadeIn = reveal.blurFadeIn;
export const scaleIn = reveal.scaleIn;
export const scaleInBlur = reveal.scaleInBlur;
export const slideInLeft = reveal.slideInLeft;
export const slideInRight = reveal.slideInRight;

// Hero presets
export const heroStagger = staggerContainerFn(0.1, 0.1);
export const heroChild = reveal.blurFadeUp;

// Hover presets
export const cardHover = hover.card;
export const cardHoverGlow = hover.cardGlow;
export const buttonHover = hover.button;

// FAQ presets
export const faqItem = faq.item;
export const faqContent = faq.content;
