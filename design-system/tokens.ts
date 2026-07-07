/**
 * NovaLabs AI — Design Tokens
 *
 * Centralized design values extracted from the codebase.
 * Import from `@/design-system` to use these tokens.
 *
 * These tokens mirror the CSS custom properties in globals.css
 * and provide TypeScript-accessible constants for programmatic use.
 */

// ── Colors ────────────────────────────────────────────────────────

export const colors = {
  // Brand
  primary: "#ffffff",
  onPrimary: "#171717",
  ink: "#171717",

  // Accent
  blue: "#0070f3",
  blueDeep: "#0761d1",
  blueSoft: "#d3e5ff",
  cyan: "#50e3c2",
  cyanDeep: "#29bc9b",
  violet: "#7928ca",
  violetDeep: "#4c2889",
  pink: "#ff0080",
  magenta: "#eb367f",

  // Semantic
  success: "#0070f3",
  error: "#ee0000",
  errorSoft: "#f7d4d6",
  errorDeep: "#c50000",
  warning: "#f5a623",
  warningSoft: "#ffefcf",
  warningDeep: "#ab570a",

  // Surface
  canvas: "#0a0a0a",
  canvasRaised: "#111111",
  canvasOverlay: "#1a1a1a",

  // Text
  text: "#f2f2f2",
  body: "#a1a1a1",
  muted: "#666666",

  // Border
  hairline: "#222222",
  hairlineStrong: "#333333",

  // Glass
  glass: "rgba(255, 255, 255, 0.05)",
  glassHover: "rgba(255, 255, 255, 0.08)",
  glassBorder: "rgba(255, 255, 255, 0.1)",

  // Gradients
  gradientStart: "#0070f3",
  gradientMid: "#7928ca",
  gradientEnd: "#50e3c2",
  gradientWarmStart: "#ff0080",
  gradientWarmEnd: "#7928ca",
} as const;

// ── SVG Tokens (for inline SVG fill/stroke) ───────────────────────

export const svgColors = {
  primary: "#ffffff",
  onPrimary: "#171717",
  violet: "#7928ca",
  violetLight: "#9b59d0",
  violetDim: "rgba(121, 40, 202, 0.15)",
  cyan: "#50e3c2",
  cyanDim: "rgba(80, 227, 194, 0.15)",
  link: "#0070f3",
  linkDim: "rgba(0, 112, 243, 0.15)",
  pink: "#ff0080",
  success: "#0070f3",
  successDim: "rgba(0, 112, 243, 0.15)",
  canvas: "#0a0a0a",
  canvasRaised: "#111111",
  text: "#f2f2f2",
  body: "#a1a1a1",
  hairline: "#222222",
} as const;

// ── Spacing ───────────────────────────────────────────────────────

export const spacing = {
  // Section vertical rhythm
  section: "py-24 sm:py-32",
  sectionHero: "py-20 sm:py-24 lg:py-32",

  // Container horizontal padding
  container: "px-4 sm:px-6 lg:px-8",

  // Heading to subtitle gap
  headingSubtitle: "mt-5",

  // Subtitle to content gap
  subtitleContent: "mb-16",

  // Card internal padding
  cardPadding: "p-6 sm:p-7",
  cardPaddingLarge: "p-6 sm:p-8",

  // Grid gap
  gridGap: "gap-5 sm:gap-6",
  gridGapSmall: "gap-4",

  // Stack gap
  stackGap: "space-y-5",
  stackGapSmall: "space-y-4",
  stackGapLarge: "space-y-6",
} as const;

// ── Border Radius ─────────────────────────────────────────────────

export const radius = {
  button: "rounded-xl",
  card: "rounded-2xl",
  input: "rounded-xl",
  badge: "rounded-full",
  pill: "rounded-full",
  small: "rounded-lg",
  none: "rounded-none",
} as const;

// ── Shadows ───────────────────────────────────────────────────────

export const shadows = {
  // Card
  card: "0 1px 2px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1)",
  cardHover:
    "0 4px 8px rgba(0,0,0,0.1), 0 12px 24px -6px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.03)",

  // Button
  button: "0 4px 14px 0 rgba(0,112,243,0.25)",

  // Glow
  glow: "0 0 20px rgba(0,112,243,0.15)",
  glowViolet: "0 0 24px rgba(121,40,202,0.15)",
  glowCyan: "0 0 24px rgba(80,227,194,0.15)",

  // Hero
  heroOrb: "0 0 80px rgba(0,112,243,0.12)",

  // Footer
  footerGlow: "0 0 40px rgba(121,40,202,0.08)",

  // Dialog / floating
  dialog: "0 16px 48px -8px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
} as const;

// ── Z-Index ───────────────────────────────────────────────────────

export const zIndex = {
  base: 0,
  raised: 10,
  dropdown: 50,
  sticky: 100,
  navigation: 200,
  modal: 300,
  tooltip: 400,
  floating: 500,
} as const;

// ── Blur ──────────────────────────────────────────────────────────

export const blur = {
  small: "blur(4px)",
  medium: "blur(8px)",
  large: "blur(20px)",
  xlarge: "blur(60px)",
  background: "blur(140px)",
  glass: "backdrop-blur-sm",
  glassMedium: "backdrop-blur-md",
  glassLarge: "backdrop-blur-xl",
} as const;

// ── Typography ────────────────────────────────────────────────────

export const typography = {
  // Headings
  h1: "text-4xl sm:text-5xl lg:text-[68px] lg:leading-[1.06] font-bold tracking-tight",
  h2: "text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight",
  h3: "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight",
  h3Card: "text-lg font-semibold text-text tracking-tight",

  // Body
  subtitle: "text-base sm:text-lg text-text-secondary leading-relaxed",
  subtitleLarge: "text-lg sm:text-xl text-text-secondary leading-relaxed",
  body: "text-sm text-text-secondary leading-relaxed",
  bodyMuted: "text-sm text-text-muted leading-relaxed",
  caption: "text-[11px] text-text-muted",

  // Badge
  badge: "text-[13px] font-medium",
  badgeSmall: "text-[12px] font-medium",
} as const;
