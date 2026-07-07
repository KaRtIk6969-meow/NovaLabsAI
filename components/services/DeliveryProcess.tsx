"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Particles } from "@/components/ui/Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ease, blurFadeUp } from "@/lib/motion";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "We audit your operations, map pain points, and identify high-impact AI opportunities with clear ROI projections.",
    icon: "search",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Our architects design a phased implementation roadmap — technology stack, data requirements, team structure, and success metrics.",
    icon: "compass",
  },
  {
    number: "03",
    title: "Development",
    description: "Agile sprints with weekly demos. We build in your environment, integrate with your systems, and validate against your data.",
    icon: "code",
  },
  {
    number: "04",
    title: "Deployment",
    description: "Production-grade rollout with monitoring, guardrails, and rollback procedures. Zero-downtime deployment across regions.",
    icon: "rocket",
  },
  {
    number: "05",
    title: "Optimization",
    description: "Continuous monitoring, model retraining, and performance tuning. We measure ROI and iterate for maximum business impact.",
    icon: "settings",
  },
];

function StepIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.JSX.Element> = {
    search: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    compass: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="currentColor" opacity="0.6" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    rocket: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 2L8 10h8l-4-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 10v4a4 4 0 0 0 8 0v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 18v4M8 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    settings: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  };
  return icons[icon] || icons.compass;
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = blurFadeUp;

export function DeliveryProcess() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="process"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-[15%] w-[500px] h-[500px] rounded-full blur-[180px] bg-gradient-to-br from-accent-blue/[0.03] to-transparent" />
        <div className="absolute bottom-0 right-[20%] w-[400px] h-[400px] rounded-full blur-[160px] bg-gradient-to-br from-accent-violet/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas" />
        {!shouldReduceMotion && isInView && (
          <Particles count={5} speed={0.01} maxSize={0.4} />
        )}
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={isInView ? (shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : undefined}
          transition={{ duration: 0.8, ease }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-glass/50 backdrop-blur-sm text-[13px] font-medium text-text-secondary mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
            How We Work
          </span>
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-5"
          >
            Delivery{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            A proven five-phase methodology that de-risks AI adoption and accelerates time-to-value.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical connector line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-hairline-strong to-transparent" aria-hidden="true" />

          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-12"
          >
            {STEPS.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="relative flex gap-6 sm:gap-8 group/step"
              >
                {/* Number circle */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-hairline-strong bg-canvas-raised flex items-center justify-center transition-all duration-300 group-hover/step:border-accent-blue/50 group-hover/step:shadow-[0_0_20px_var(--svg-link-dim)]">
                    <span className="text-sm font-bold text-text-muted group-hover/step:text-accent-blue transition-colors duration-300">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-text tracking-tight mb-2">
                      {step.title}
                    </h3>
                    <div className="text-text-muted opacity-0 group-hover/step:opacity-100 transition-opacity duration-300">
                      <StepIcon icon={step.icon} />
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
