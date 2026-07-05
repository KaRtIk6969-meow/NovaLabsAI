"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";
import { useFloatingMotion } from "@/hooks/useFloatingMotion";
import { BentoCard } from "@/components/ui/BentoCard";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { Particles } from "@/components/ui/Particles";
import {
  WorkflowVisualization,
  AIAgentsVisualization,
  AnalyticsVisualization,
  DocumentVisualization,
  CustomerSupportVisualization,
  IntegrationVisualization,
} from "./Bento";

const ease = [0.22, 1, 0.36, 1] as const;

const cardData = [
  {
    title: "Workflow Automation",
    description: "Design and deploy intelligent workflows that adapt to your business logic in real time.",
    visualization: WorkflowVisualization,
    featured: true,
    glowColor: "rgba(124,58,237,0.12)",
  },
  {
    title: "AI Agents",
    description: "Deploy autonomous agents that handle complex tasks across your organization.",
    visualization: AIAgentsVisualization,
    featured: false,
    glowColor: "rgba(139,92,246,0.12)",
  },
  {
    title: "Business Analytics",
    description: "Real-time insights powered by AI to drive smarter decisions.",
    visualization: AnalyticsVisualization,
    featured: false,
    glowColor: "rgba(59,130,246,0.12)",
  },
  {
    title: "Document Intelligence",
    description: "Extract, classify and understand documents automatically with OCR and NLP.",
    visualization: DocumentVisualization,
    featured: false,
    glowColor: "rgba(6,182,212,0.12)",
  },
  {
    title: "Customer Support AI",
    description: "Resolve customer queries instantly with AI-powered conversations.",
    visualization: CustomerSupportVisualization,
    featured: false,
    glowColor: "rgba(16,185,129,0.12)",
  },
  {
    title: "Enterprise Integration",
    description: "Connect all your platforms with secure, automated data flows.",
    visualization: IntegrationVisualization,
    featured: false,
    glowColor: "rgba(124,58,237,0.1)",
  },
];

const headingVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease, delay: 0.15 },
  },
};

const cardEntry = {
  hidden: { opacity: 0, y: 24, scale: 0.97, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease,
      delay: 0.45 + i * 0.08,
    },
  }),
};

function FloatingCard({
  data,
  index,
  shouldAnimate,
}: {
  data: (typeof cardData)[number];
  index: number;
  shouldAnimate: boolean;
}) {
  const Visualization = data.visualization;
  const floating = useFloatingMotion(index, {
    amplitude: data.featured ? 2 : 3,
    frequency: 0.3 + index * 0.05,
    enabled: shouldAnimate,
  });

  return (
    <motion.div
      custom={index}
      variants={cardEntry}
      style={{ y: floating.y }}
      className={data.featured ? "sm:col-span-2 sm:row-span-2" : ""}
    >
      <BentoCard
        span={data.featured ? "featured" : "standard"}
        glowColor={data.glowColor}
        className="h-full"
      >
        <div className={`flex flex-col h-full ${data.featured ? "p-6 sm:p-8" : "p-5 sm:p-6"}`}>
          {/* Visualization area */}
          <div className={`relative flex-1 ${data.featured ? "min-h-[240px]" : "min-h-[140px]"} mb-4`}>
            <Visualization />
          </div>

          {/* Text content */}
          <div>
            <h3 className={`font-semibold text-text tracking-tight ${data.featured ? "text-lg sm:text-xl mb-2" : "text-base mb-1.5"}`}>
              {data.title}
            </h3>
            <p className={`text-text-secondary leading-relaxed ${data.featured ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}>
              {data.description}
            </p>
          </div>
        </div>
      </BentoCard>
    </motion.div>
  );
}

export function AISolutions() {
  const { ref: sectionRef, shouldAnimate } = useViewportAnimation({ threshold: 0.08 });
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orb1X = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const orb2X = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden bg-[#060A14]"
      aria-labelledby="solutions-heading"
    >
      {/* Premium background layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Animated grid */}
        <AnimatedGrid opacity={0.018} spacing={48} />

        {/* Static radial glow */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/[0.025] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-blue/[0.02] rounded-full blur-[140px]" />

        {/* Slow-orbiting gradient orbs */}
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full blur-[120px] opacity-[0.03]"
          style={{
            x: orb1X,
            y: orb1Y,
            background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)",
            top: "15%",
            left: "10%",
          }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full blur-[100px] opacity-[0.025]"
          style={{
            x: orb2X,
            y: orb2Y,
            background: "radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)",
            bottom: "10%",
            right: "15%",
          }}
        />
        <motion.div
          className="absolute w-[250px] h-[250px] rounded-full blur-[90px] opacity-[0.02]"
          style={{
            y: useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]),
            background: "radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)",
            top: "50%",
            left: "55%",
          }}
        />

        {/* Subtle depth gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060A14]/50" />
      </div>

      {/* Floating particles */}
      {!shouldReduceMotion && shouldAnimate && (
        <Particles count={18} speed={0.06} maxSize={1.2} />
      )}

      <Container>
        {/* Section header with blur entrance */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2
            id="solutions-heading"
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text"
          >
            AI Solutions Built for{" "}
            <span className="bg-gradient-to-r from-primary-light via-accent-blue to-accent-cyan bg-clip-text text-transparent">
              Modern Businesses
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={subtitleVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
            Enterprise AI products designed to automate workflows, improve
            productivity and scale operations.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 auto-rows-auto">
          {/* Featured card */}
          <FloatingCard data={cardData[0]} index={0} shouldAnimate={shouldAnimate} />

          {/* Standard cards */}
          {cardData.slice(1).map((card, i) => (
            <FloatingCard key={card.title} data={card} index={i + 1} shouldAnimate={shouldAnimate} />
          ))}
        </div>
      </Container>
    </section>
  );
}
