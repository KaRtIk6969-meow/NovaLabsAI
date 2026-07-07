"use client";

import { useState, useCallback } from "react";
import { motion, useReducedMotion, useMotionTemplate, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useMouseSpotlight } from "@/hooks/useMouseSpotlight";
import { staggerContainer, blurFadeUp } from "@/lib/motion";

const OFFICES = [
  {
    region: "North America",
    city: "San Francisco",
    address: "100 Market Street, Suite 400",
    timezone: "PST (UTC-8)",
    phone: "+1 (415) 555-0192",
    accent: "var(--svg-link)",
    accentDim: "var(--svg-link-dim)",
  },
  {
    region: "Europe",
    city: "London",
    address: "1 Canada Square, Canary Wharf",
    timezone: "GMT (UTC+0)",
    phone: "+44 20 7946 0958",
    accent: "var(--svg-violet)",
    accentDim: "var(--svg-violet-dim)",
  },
  {
    region: "Asia Pacific",
    city: "Singapore",
    address: "1 Raffles Place, Tower 2",
    timezone: "SGT (UTC+8)",
    phone: "+65 6123 4567",
    accent: "var(--svg-cyan)",
    accentDim: "var(--svg-cyan-dim)",
  },
  {
    region: "Middle East",
    city: "Dubai",
    address: "DIFC, Gate Building, Level 14",
    timezone: "GST (UTC+4)",
    phone: "+971 4 555 0123",
    accent: "var(--svg-success)",
    accentDim: "var(--svg-success-dim)",
  },
];

const container = staggerContainer(0.1, 0.12);
const fadeUp = blurFadeUp;

function OfficeCard({
  office,
  isExpanded,
  onToggle,
}: {
  office: (typeof OFFICES)[number];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { x, y, isHovered, handlers } = useMouseSpotlight();
  const spotlightBg = useMotionTemplate`radial-gradient(circle 250px at ${x}% ${y}%, ${office.accentDim}, transparent 70%)`;

  return (
    <motion.div
      variants={fadeUp}
      className="group relative"
    >
      <motion.button
        {...handlers}
        onClick={onToggle}
        whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
        className="w-full text-left relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        aria-expanded={isExpanded}
      >
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            padding: 1,
            background: `linear-gradient(135deg, ${office.accent}, transparent, ${office.accent})`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
          animate={isHovered || isExpanded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />

        {/* Spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          style={{ background: spotlightBg, opacity: isHovered ? 1 : 0, transition: "opacity 0.5s ease" }}
          aria-hidden="true"
        />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 inset-x-0 h-px pointer-events-none z-10"
          style={{ background: office.accent }}
          animate={isHovered || isExpanded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />

        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Glowing map pin */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full blur-md"
                  style={{ background: office.accent }}
                  animate={isExpanded ? { opacity: 0.3, scale: 1.5 } : { opacity: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div
                  className="relative flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ background: `${office.accent}15` }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" style={{ color: office.accent }} aria-hidden="true">
                    <path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5C3.5 9.87 8 14.5 8 14.5s4.5-4.63 4.5-8.5A4.5 4.5 0 0 0 8 1.5z" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-0.5">
                  {office.region}
                </p>
                <h3 className="text-base font-semibold text-text tracking-tight">
                  {office.city}
                </h3>
              </div>
            </div>
            <motion.svg
              viewBox="0 0 16 16"
              fill="none"
              className="w-5 h-5 text-text-muted"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              aria-hidden="true"
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="overflow-hidden"
            >
              <div className="relative z-10 px-6 pb-6 pt-0 border-t border-hairline/50">
                {/* Connection line */}
                <motion.div
                  className="absolute top-0 left-6 w-px h-full"
                  style={{ background: `linear-gradient(to bottom, ${office.accent}, transparent)` }}
                  initial={{ scaleY: 0, transformOrigin: "top" }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />
                <div className="space-y-3 pt-4 pl-2">
                  <motion.div
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-text-muted mt-0.5 shrink-0" aria-hidden="true">
                      <path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5C3.5 9.87 8 14.5 8 14.5s4.5-4.63 4.5-8.5A4.5 4.5 0 0 0 8 1.5z" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    <span className="text-sm text-text-secondary">{office.address}</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-text-muted shrink-0" aria-hidden="true">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M8 4.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <span className="text-sm text-text-secondary">{office.timezone}</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-text-muted shrink-0" aria-hidden="true">
                      <path d="M14.05 11.13l-2.54-1.1a1 1 0 0 0-1.1.26l-1.1 1.1a10.07 10.07 0 0 1-4.5-4.5l1.1-1.1a1 1 0 0 0 .26-1.1L5.04 2.95a1 1 0 0 0-1.02-.57H2a1 1 0 0 0-1 1.05A13.04 13.04 0 0 0 12.52 15a1 1 0 0 0 1.05-1.02v-1.93a1 1 0 0 0-.57-1.02z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <a href={`tel:${office.phone}`} className="text-sm text-accent-blue hover:text-accent-blue/80 transition-colors">
                      {office.phone}
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

export function GlobalPresence() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const handleToggle = useCallback(
    (index: number) => {
      setExpandedIndex(expandedIndex === index ? null : index);
    },
    [expandedIndex]
  );

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="offices-heading"
    >
      <Container>
        <motion.div
          variants={container}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2
              id="offices-heading"
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text"
            >
              Our{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                Global Presence
              </span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
              Offices across four continents. Local teams with global expertise.
            </p>
          </motion.div>

          {/* Office cards */}
          <motion.div variants={container} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {OFFICES.map((office, i) => (
              <OfficeCard
                key={office.region}
                office={office}
                isExpanded={expandedIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
