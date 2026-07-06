"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { GlowCard } from "@/components/ui/GlowCard";
import { Particles } from "@/components/ui/Particles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ease = [0.22, 1, 0.36, 1] as const;

const TEAM = [
  {
    name: "Sarah Chen",
    role: "Chief Executive Officer",
    bio: "Former VP of AI at Google. 15 years building enterprise-scale machine learning systems. Stanford CS PhD.",
    avatar: "SC",
    gradient: "from-accent-blue to-accent-violet",
    linkedin: "#",
  },
  {
    name: "Marcus Rivera",
    role: "Chief Technology Officer",
    bio: "Ex-Principal Engineer at AWS. Built the infrastructure powering 3 of the top 10 AI platforms globally.",
    avatar: "MR",
    gradient: "from-accent-violet to-highlight-pink",
    linkedin: "#",
  },
  {
    name: "Dr. Aisha Patel",
    role: "VP of Engineering",
    bio: "Former Director of ML Infrastructure at Meta. Led teams of 200+ engineers building production AI systems.",
    avatar: "AP",
    gradient: "from-accent-cyan to-accent-blue",
    linkedin: "#",
  },
  {
    name: "James Okonkwo",
    role: "VP of Sales",
    bio: "15 years in enterprise SaaS sales. Previously VP at Palantir, where he grew revenue from $50M to $200M ARR.",
    avatar: "JO",
    gradient: "from-accent-blue to-accent-cyan",
    linkedin: "#",
  },
  {
    name: "Dr. Elena Volkov",
    role: "Head of AI Research",
    bio: "Published 40+ papers in NeurIPS, ICML, and ICLR. Former Research Scientist at DeepMind.",
    avatar: "EV",
    gradient: "from-highlight-pink to-accent-violet",
    linkedin: "#",
  },
  {
    name: "David Kim",
    role: "Head of Design",
    bio: "Former Design Lead at Figma. Specializes in designing complex AI interfaces that feel simple and intuitive.",
    avatar: "DK",
    gradient: "from-accent-violet to-accent-cyan",
    linkedin: "#",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardEntry = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease, delay: 0.2 + i * 0.1 },
  }),
};

export function Leadership() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.05 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="team"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="team-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-[20%] w-[500px] h-[500px] rounded-full blur-[180px] bg-gradient-to-br from-accent-violet/[0.03] to-transparent" />
        <div className="absolute bottom-1/3 left-[10%] w-[400px] h-[400px] rounded-full blur-[160px] bg-gradient-to-br from-accent-blue/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas" />
        {!shouldReduceMotion && isInView && (
          <Particles count={5} speed={0.01} maxSize={0.4} />
        )}
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={isInView ? (shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : undefined}
          transition={{ duration: 0.8, ease }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-glass/50 backdrop-blur-sm text-[13px] font-medium text-text-secondary mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-violet" />
            Leadership
          </span>
          <h2
            id="team-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-5"
          >
            Meet the{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Team
            </span>
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            World-class engineers, researchers, and operators building the future of enterprise AI.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {TEAM.map((member, i) => (
            <motion.div key={member.name} custom={i} variants={cardEntry}>
              <GlowCard glowColor="var(--svg-violet-dim)" className="h-full">
                <div className="p-6 sm:p-7">
                  {/* Avatar with hover scale */}
                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-lg font-bold mb-5 shadow-lg`}
                    whileHover={!shouldReduceMotion ? { scale: 1.08, rotate: 2 } : undefined}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {member.avatar}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-text tracking-tight mb-1 group-hover:text-accent-blue transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-accent-blue mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  {/* LinkedIn link */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-accent-blue transition-colors duration-300 group/link"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                      <path
                        d="M4 4h2.5v8H4V4zM5.25 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM9 4h2.2v1.1h.03c.31-.58 1.06-1.19 2.18-1.19 2.33 0 2.77 1.54 2.77 3.54V12h-2.5V8.3c0-.87-.01-1.98-1.21-1.98-1.21 0-1.39.94-1.39 1.92V12H9V4z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="group-hover/link:underline underline-offset-2">Connect</span>
                  </a>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
