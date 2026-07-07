"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

const lineWidths = ["60%", "45%", "72%", "58%", "65%", "50%"];

export function DocumentVisualization() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full min-h-[180px] flex items-center justify-center">
      <div className="relative w-[140px] h-[170px]">
        {/* Document shadow */}
        <div className="absolute inset-0 translate-y-2 bg-primary/[0.05] rounded-lg blur-xl" aria-hidden="true" />

        {/* Document body */}
        <motion.div
          className="absolute inset-0 rounded-lg border border-hairline bg-canvas-raised backdrop-blur-sm overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease }}
        >
          {/* Document lines */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute left-3 right-3 h-[2px] rounded-full"
              style={{
                top: `${20 + i * 18}px`,
                background: i < 2 ? "var(--svg-violet)" : "var(--svg-hairline)",
                width: lineWidths[i],
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease }}
            />
          ))}

          {/* Scanning line */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, transparent, var(--svg-cyan), transparent)",
                boxShadow: "0 0 12px var(--svg-cyan)",
              }}
              animate={{ top: ["15px", "155px", "15px"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* OCR highlight boxes */}
          {!shouldReduceMotion && (
            <>
              <motion.div
                className="absolute left-2 top-[18px] w-[50px] h-[6px] rounded-sm border border-accent-cyan/30 bg-accent-cyan/[0.05]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute left-2 top-[36px] w-[35px] h-[6px] rounded-sm border border-accent-cyan/30 bg-accent-cyan/[0.05]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
              />
            </>
          )}
        </motion.div>

        {/* Floating extracted text */}
        <motion.div
          className="absolute -right-6 top-8 px-2 py-1 rounded bg-glass border border-hairline text-[8px] text-accent-cyan/70 font-mono whitespace-nowrap"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5, ease }}
        >
          OCR: 99.2%
        </motion.div>
      </div>
    </div>
  );
}
