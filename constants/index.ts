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
    DEFAULT: "#7C3AED",
    light: "#8B5CF6",
    dark: "#6D28D9",
  },
  accent: {
    blue: "#3B82F6",
    cyan: "#06B6D4",
    emerald: "#10B981",
  },
  bg: {
    DEFAULT: "#0B0F1A",
    alt: "#111827",
  },
  surface: {
    DEFAULT: "#1E293B",
    light: "#334155",
  },
  text: {
    DEFAULT: "#F9FAFB",
    secondary: "#94A3B8",
    muted: "#64748B",
  },
  border: "rgba(255, 255, 255, 0.1)",
} as const;
