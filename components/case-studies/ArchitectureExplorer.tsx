"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";
import { easing } from "@/design-system";
import { CASE_STUDIES } from "@/data/case-studies";

const ease = easing.default;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

export function ArchitectureExplorer() {
  const { ref: sectionRef, shouldAnimate } = useViewportAnimation({ threshold: 0.06 });
  const [selected, setSelected] = useState(0);
  const study = CASE_STUDIES[selected];
  const arch = study.architecture!;

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
        >
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline bg-glass/50 text-[12px] font-medium text-text-secondary backdrop-blur-sm mb-4">
                AI Architecture
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-4"
            >
              How It{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                Works
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-text-secondary">
              Explore the AI architecture behind each enterprise deployment.
            </motion.p>
          </div>

          {/* Selector tabs */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-10">
            {CASE_STUDIES.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => setSelected(i)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  i === selected
                    ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-lg shadow-accent-blue/25"
                    : "border border-hairline bg-glass/50 text-text-secondary hover:border-hairline-strong hover:text-text hover:shadow-[0_0_12px_var(--svg-link-dim)]"
                }`}
                aria-pressed={i === selected}
              >
                <span>{s.icon}</span>
                <span className="hidden sm:inline">{s.company}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Architecture visualization */}
          <AnimatePresence mode="wait">
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease }}
              className="max-w-4xl mx-auto"
            >
              {/* Company label */}
              <div className="text-center mb-8">
                <span className="text-sm text-text-muted">{study.company} — {study.industry}</span>
              </div>

              {/* Architecture layers */}
              <div className="relative">
                {/* Connecting line with animated draw */}
                <motion.div
                  className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 sm:-translate-x-1/2"
                  aria-hidden="true"
                >
                  <motion.div
                    className="w-full bg-gradient-to-b from-accent-blue via-accent-violet to-accent-cyan"
                    initial={{ scaleY: 0 }}
                    animate={shouldAnimate ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ duration: 1.5, ease, delay: 0.3 }}
                    style={{ transformOrigin: "top", height: "100%", opacity: 0.3 }}
                  />
                </motion.div>

                <div className="space-y-4">
                  {arch.layers.map((layer, i) => (
                    <motion.div
                      key={layer.name}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.15, ease }}
                      className={`relative flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm ml-8 sm:ml-0 ${
                        i % 2 === 0 ? "sm:mr-auto" : "sm:ml-auto"
                      } w-full sm:w-[calc(50%-1rem)]`}
                    >
                      {/* Node dot */}
                      <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-blue border-2 border-canvas-raised shadow-[0_0_8px_var(--svg-link)] hidden sm:block" aria-hidden="true" />
                      {/* Mobile left dot */}
                      <div className="absolute -left-[22px] sm:hidden w-3 h-3 rounded-full bg-accent-blue border-2 border-canvas-raised shadow-[0_0_8px_var(--svg-link)]" aria-hidden="true" />

                      <span className="text-xl sm:text-2xl flex-shrink-0">{layer.icon}</span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-text">{layer.name}</h3>
                        <p className="text-xs text-text-secondary mt-0.5">{layer.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tech stack row */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {study.techStack?.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05, y: -1 }}
                    className="px-3 py-1.5 rounded-lg border border-hairline bg-glass/50 text-[12px] font-mono text-text-secondary hover:text-text hover:border-accent-blue/30 hover:shadow-[0_0_8px_var(--svg-link-dim)] transition-colors duration-300 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
