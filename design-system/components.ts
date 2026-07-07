/**
 * NovaLabs AI — Component Styles
 *
 * Reusable Tailwind class strings for common UI patterns.
 * Import from `@/design-system` to use these styles.
 *
 * These are NOT React components — they are className strings
 * to be applied via `cn()` or directly in JSX.
 */

// ── Cards ─────────────────────────────────────────────────────────

export const cardStyles = {
  /** Standard card */
  base: "rounded-2xl border border-hairline bg-canvas-raised p-6 sm:p-7",
  /** Card with glass effect */
  glass: "rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm p-6 sm:p-7",
  /** Card hover state */
  hover: "transition-all duration-500 hover:border-hairline-strong hover:bg-canvas-overlay",
  /** Featured card (larger) */
  featured: "rounded-2xl border border-hairline bg-canvas-raised p-6 sm:p-8",
  /** FAQ item */
  faq: "rounded-2xl border border-hairline/50 bg-glass/30 backdrop-blur-sm",
  /** Bento card */
  bento: "rounded-2xl border border-hairline bg-canvas-raised backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-hairline-strong",
} as const;

// ── Buttons ───────────────────────────────────────────────────────

export const buttonStyles = {
  /** Base button classes */
  base: "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg",

  /** Variant: primary (gradient) */
  primary:
    "bg-gradient-to-r from-accent-blue to-accent-violet text-white hover:opacity-90 shadow-lg shadow-accent-blue/25",

  /** Variant: secondary (outlined) */
  secondary: "border border-border bg-transparent text-text hover:bg-glass-hover",

  /** Variant: ghost (transparent) */
  ghost: "text-text-secondary hover:text-text hover:bg-glass-hover",

  /** Size: small */
  sm: "h-11 px-3 text-sm gap-1.5",

  /** Size: medium (default) */
  md: "h-11 px-5 text-sm gap-2",

  /** Size: large */
  lg: "h-12 px-6 text-base gap-2",
} as const;

// ── Inputs ────────────────────────────────────────────────────────

export const inputStyles = {
  /** Standard input */
  base: "w-full rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent-blue/30 focus:shadow-[0_0_20px_var(--svg-link-dim)] transition-all duration-300",
  /** Input with floating label */
  floating: "w-full rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm px-4 pt-6 pb-2 text-sm text-text focus:outline-none focus:border-accent-blue/30 focus:shadow-[0_0_20px_var(--svg-link-dim)] transition-all duration-300",
  /** Textarea */
  textarea: "w-full rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm px-4 pt-6 pb-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent-blue/30 focus:shadow-[0_0_20px_var(--svg-link-dim)] transition-all duration-300 resize-none",
  /** Select */
  select: "w-full rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm px-4 pt-6 pb-2 text-sm text-text focus:outline-none focus:border-accent-blue/30 focus:shadow-[0_0_20px_var(--svg-link-dim)] transition-all duration-300 appearance-none",
} as const;

// ── Badges ────────────────────────────────────────────────────────

export const badgeStyles = {
  /** Standard badge (used in heroes and section headers) */
  base: "inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairline bg-glass text-[13px] font-medium text-body backdrop-blur-md",
  /** Badge with hover effect */
  interactive:
    "inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-hairline bg-glass text-[13px] font-medium text-body backdrop-blur-md transition-all duration-500 hover:border-link/30 hover:bg-link/[0.06] hover:shadow-[0_0_20px_var(--svg-link-dim)]",
  /** Small badge */
  small: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-glass/50 backdrop-blur-sm text-[13px] font-medium text-text-secondary",
  /** Badge dot */
  dot: "w-1.5 h-1.5 rounded-full",
  /** Badge dot with pulse */
  dotPulse: "w-2 h-2 rounded-full animate-pulse-soft",
} as const;

// ── Section Containers ────────────────────────────────────────────

export const sectionStyles = {
  /** Standard section padding */
  base: "relative py-24 sm:py-32 overflow-hidden",
  /** Section with background canvas */
  withBg: "relative py-24 sm:py-32 overflow-hidden bg-canvas",
  /** Hero section padding */
  hero: "relative overflow-hidden",
  /** Section header (centered, max-width constrained) */
  header: "text-center max-w-2xl mx-auto mb-16",
  /** Section header with extra bottom space */
  headerLarge: "text-center max-w-2xl mx-auto mb-16 sm:mb-20",
} as const;

// ── Glass Surfaces ────────────────────────────────────────────────

export const glassStyles = {
  /** Light glass */
  light: "bg-glass/50 backdrop-blur-sm",
  /** Medium glass */
  medium: "bg-glass backdrop-blur-md",
  /** Heavy glass */
  heavy: "bg-canvas-raised/80 backdrop-blur-xl",
  /** Navbar glass */
  navbar: "bg-canvas/80 backdrop-blur-xl border-b border-hairline/40",
  /** Footer glass */
  footer: "bg-canvas-raised/30 backdrop-blur-xl border-t border-hairline/40",
} as const;

// ── Hero Wrappers ─────────────────────────────────────────────────

export const heroStyles = {
  /** Hero section wrapper */
  section: "relative min-h-[calc(100vh-72px)] overflow-hidden",
  /** Hero content grid */
  grid: "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
  /** Hero heading */
  heading: "text-4xl sm:text-5xl lg:text-[68px] lg:leading-[1.06] font-bold tracking-tight text-text",
  /** Hero subtitle */
  subtitle: "text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto mb-10",
  /** Hero CTA row */
  cta: "flex flex-col sm:flex-row items-center gap-4",
} as const;

// ── Dividers ──────────────────────────────────────────────────────

export const dividerStyles = {
  /** Subtle gradient divider */
  gradient:
    "absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-blue/25 to-transparent",
  /** Glowing divider */
  glow: "absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-violet/15 to-transparent",
  /** Section separator (spacing-based) */
  spacer: "h-20 sm:h-24 lg:h-[120px]",
} as const;
