"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks";
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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardEntry = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease },
  },
};

function BentoItem({ data, index }: { data: (typeof cardData)[number]; index: number }) {
  const Visualization = data.visualization;

  return (
    <motion.div
      variants={cardEntry}
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
  const { ref, isInView } = useScrollAnimation({ threshold: 0.08 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const springBgY = useSpring(bgY, { stiffness: 50, damping: 30 });

  return (
    <section
      ref={(el) => {
        (sectionRef as any).current = el;
        (ref as any).current = el;
      }}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="solutions-heading"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: springBgY }} aria-hidden="true">
        <AnimatedGrid opacity={0.015} spacing={48} />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-blue/[0.015] rounded-full blur-[120px]" />
      </motion.div>

      {/* Floating particles */}
      {!shouldReduceMotion && <Particles count={15} speed={0.08} maxSize={1} />}

      <Container>
        {/* Section header */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
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
          <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
            Enterprise AI products designed to automate workflows, improve
            productivity and scale operations.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 auto-rows-auto"
        >
          {/* Featured card — spans 2 cols, 2 rows */}
          <BentoItem data={cardData[0]} index={0} />

          {/* Standard cards */}
          <BentoItem data={cardData[1]} index={1} />
          <BentoItem data={cardData[2]} index={2} />
          <BentoItem data={cardData[3]} index={3} />
          <BentoItem data={cardData[4]} index={4} />
          <BentoItem data={cardData[5]} index={5} />
        </motion.div>
      </Container>
    </section>
  );
}
