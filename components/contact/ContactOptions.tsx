"use client";

import { motion, useReducedMotion, useMotionTemplate } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useMouseSpotlight } from "@/hooks/useMouseSpotlight";
import { staggerContainer, reveal } from "@/design-system";
const blurFadeUp = reveal.blurFadeUp;

const CONTACT_OPTIONS = [
  {
    title: "AI Consultation",
    description: "Strategic guidance on AI adoption, architecture, and roadmap planning from our senior AI architects.",
    responseTime: "Within 24 hours",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 9h.01M15 9h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gradient: "from-accent-blue to-accent-violet",
    glowColor: "var(--svg-link-dim)",
  },
  {
    title: "Workflow Automation",
    description: "Design and implement intelligent workflows that reduce manual tasks and scale with your business.",
    responseTime: "Within 48 hours",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M4 12h2l3-9 4 18 3-9h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
        <circle cx="20" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    gradient: "from-accent-violet to-accent-cyan",
    glowColor: "var(--svg-violet-dim)",
  },
  {
    title: "Enterprise AI",
    description: "Full-scale AI deployment with dedicated infrastructure, custom models, and 24/7 monitoring and support.",
    responseTime: "Same business day",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M12 3l8 4v5c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V7l8-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: "from-accent-cyan to-accent-blue",
    glowColor: "var(--svg-cyan-dim)",
  },
  {
    title: "Technical Support",
    description: "Priority engineering support for existing clients. Incident response, debugging, and optimization.",
    responseTime: "< 4 hours critical",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: "from-accent-violet to-accent-blue",
    glowColor: "var(--svg-success-dim)",
  },
];

const container = staggerContainer(0.1, 0.12);
const fadeUp = blurFadeUp;

function ContactCard({
  option,
  index,
}: {
  option: (typeof CONTACT_OPTIONS)[number];
  index: number;
}) {
  const { x, y, isHovered, handlers } = useMouseSpotlight();
  const spotlightBg = useMotionTemplate`radial-gradient(circle 300px at ${x}% ${y}%, ${option.glowColor}, transparent 70%)`;

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      {...handlers}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="group relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm overflow-hidden"
    >
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          padding: 1,
          background: `linear-gradient(135deg, var(--svg-link), var(--svg-violet), var(--svg-cyan), var(--svg-link))`,
          backgroundSize: "300% 300%",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        animate={
          isHovered
            ? { backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"], opacity: 1 }
            : { opacity: 0 }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      {/* Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: spotlightBg, opacity: isHovered ? 1 : 0, transition: "opacity 0.5s ease" }}
        aria-hidden="true"
      />

      {/* Glass reflection sweep */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 55%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "glass-sweep 12s linear infinite",
        }}
        aria-hidden="true"
      />

      {/* Top gradient line */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`h-full bg-gradient-to-r ${option.gradient}`} />
      </div>

      <div className="relative z-10 p-6 sm:p-8">
        {/* Floating icon */}
        <motion.div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${option.gradient} mb-5 shadow-lg`}
          animate={isHovered ? { y: -3, scale: 1.05 } : { y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="text-white/90">{option.icon}</div>
        </motion.div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-text tracking-tight mb-2">
          {option.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          {option.description}
        </p>

        {/* Response time */}
        <div className="flex items-center gap-2 text-xs font-medium text-accent-cyan">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/60 animate-pulse" />
          {option.responseTime}
        </div>
      </div>
    </motion.div>
  );
}

export function ContactOptions() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="contact-options-heading"
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
              id="contact-options-heading"
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text"
            >
              How Can We{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                Help You?
              </span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
              Choose the engagement that fits your needs. Every conversation starts with understanding your business.
            </p>
          </motion.div>

          {/* Cards grid */}
          <motion.div variants={container} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {CONTACT_OPTIONS.map((option, i) => (
              <ContactCard key={option.title} option={option} index={i} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
