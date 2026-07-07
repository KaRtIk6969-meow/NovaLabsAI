"use client";

import { motion, useReducedMotion } from "framer-motion";

export function RouteLoader() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        {/* Mini AI core */}
        <div className="relative w-12 h-12" aria-hidden="true">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <radialGradient id="routeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--svg-link)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            <motion.circle cx="50" cy="50" r="20" fill="url(#routeGlow)"
              animate={shouldReduceMotion ? { opacity: 0.3 } : { opacity: [0.2, 0.5, 0.2], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {!shouldReduceMotion && (
              <motion.circle cx="50" cy="50" r="35" fill="none" stroke="var(--svg-link)" strokeWidth="0.5" strokeDasharray="3 5" opacity={0.3}
                animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "50px 50px" }}
              />
            )}
            <motion.circle cx="50" cy="50" r="4" fill="var(--svg-link)"
              animate={shouldReduceMotion ? { opacity: 0.6 } : { opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Loading dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span key={i} className="block h-1.5 w-1.5 rounded-full bg-accent-blue"
              animate={shouldReduceMotion ? { opacity: 0.5 } : { scale: [0.6, 1, 0.6], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.16 }}
            />
          ))}
        </div>

        <p className="text-sm text-text-muted">Loading...</p>
      </div>
    </div>
  );
}
