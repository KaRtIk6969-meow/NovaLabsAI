"use client";

import { useReducedMotion } from "framer-motion";

type NoiseTextureProps = {
  opacity?: number;
  className?: string;
};

export function NoiseTexture({ opacity = 0.03, className }: NoiseTextureProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${shouldReduceMotion ? "" : "animate-[noise-drift_8s_ease-in-out_infinite]"} ${className ?? ""}`}
      aria-hidden="true"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}
