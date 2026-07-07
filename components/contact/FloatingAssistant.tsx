"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

export function FloatingAssistant() {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed bottom-6 right-6 z-50" aria-label="AI Assistant">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-72 sm:w-80 rounded-2xl border border-hairline bg-canvas-raised/90 backdrop-blur-xl shadow-2xl shadow-black/20 overflow-hidden mb-3"
          >
            {/* Header */}
            <div className="p-4 border-b border-hairline/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center">
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-white" aria-hidden="true">
                      <path d="M8 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M5 9h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M6 12h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M7 14h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <motion.div
                    className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent-cyan"
                    animate={shouldReduceMotion ? {} : { scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">NovaLabs AI</p>
                  <p className="text-[11px] text-text-muted">Always here to help</p>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="p-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 text-white" aria-hidden="true">
                    <path d="M8 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>
                <div className="bg-glass/50 rounded-xl rounded-tl-sm px-3.5 py-2.5">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    Need help choosing an AI solution? I can guide you to the right fit for your business.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="px-4 pb-4 flex flex-wrap gap-2">
              <a
                href="#strategy-call"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-blue/10 text-accent-blue text-xs font-medium hover:bg-accent-blue/20 transition-colors"
                onClick={() => setIsExpanded(false)}
              >
                <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M6 3.5v5l3 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Book a Call
              </a>
              <a
                href="/solutions"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-glass text-text-secondary text-xs font-medium hover:bg-glass-hover transition-colors"
                onClick={() => setIsExpanded(false)}
              >
                Explore Solutions
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-glass text-text-secondary text-xs font-medium hover:bg-glass-hover transition-colors"
                onClick={() => setIsExpanded(false)}
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-accent-blue to-accent-violet text-white shadow-lg shadow-accent-blue/30 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-canvas overflow-hidden"
        aria-label={isExpanded ? "Close assistant" : "Open assistant"}
        aria-expanded={isExpanded}
      >
        {/* Breathing glow */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(circle, var(--svg-cyan) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
        )}
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-6 h-6 relative z-10"
          animate={isExpanded ? { rotate: 45 } : { rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          aria-hidden="true"
        >
          {isExpanded ? (
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <>
              <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M11 20h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}
        </motion.svg>
      </motion.button>
    </div>
  );
}
