/**
 * @deprecated Import from `@/design-system` instead.
 * This file re-exports from the design system for backward compatibility.
 */

import { reveal, staggerContainer, float } from "@/design-system";

export const fadeIn = reveal.fadeIn;
export const fadeInUp = reveal.blurFadeUp;
export const scaleIn = reveal.scaleIn;
export const slideInLeft = reveal.slideInLeft;
export const slideInRight = reveal.slideInRight;
export const blurFadeUp = reveal.blurFadeUp;
export const hoverLift = {
  rest: { y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  hover: { y: -4, transition: { duration: 0.2, ease: "easeOut" } },
};

export { staggerContainer, float };
