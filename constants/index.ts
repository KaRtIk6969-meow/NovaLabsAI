export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const;

export const ANIMATION_EASE = {
  easeOut: [0.25, 0.46, 0.45, 0.94],
  easeInOut: [0.42, 0, 0.58, 1],
  spring: { type: "spring", stiffness: 300, damping: 30 },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const SPACING = {
  section: "py-24 lg:py-32",
  container: "px-4 sm:px-6 lg:px-8",
  card: "p-6 lg:p-8",
} as const;

export const COLORS = {
  primary: {
    DEFAULT: "#ffffff",
    light: "#ffffff",
    dark: "#cccccc",
  },
  onPrimary: "#171717",
  ink: "#171717",
  accent: {
    link: "#0070f3",
    cyan: "#50e3c2",
    violet: "#7928ca",
    pink: "#ff0080",
  },
  bg: {
    DEFAULT: "#0a0a0a",
    alt: "#111111",
    raised: "#1a1a1a",
  },
  surface: {
    DEFAULT: "#1a1a1a",
    light: "#222222",
  },
  text: {
    DEFAULT: "#f2f2f2",
    secondary: "#a1a1a1",
    muted: "#666666",
  },
  border: {
    hairline: "#222222",
    strong: "#333333",
  },
  semantic: {
    success: "#0070f3",
    error: "#ee0000",
    warning: "#f5a623",
  },
} as const;
