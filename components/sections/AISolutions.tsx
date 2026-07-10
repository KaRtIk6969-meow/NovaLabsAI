"use client";

import { useRef } from "react";
import {
  motion,
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
import { reveal, cardEntry, sectionSubtitle } from "@/design-system";
const blurFadeUp = reveal.blurFadeUp;

const cardData = [
  {
    title: "Workflow Automation",
    description:
      "Design and deploy intelligent workflows that adapt to your business logic in real time.",
    visualization: WorkflowVisualization,
    featured: true,
    glowColor: "var(--svg-violet-dim)",
  },
  {
    title: "AI Agents",
    description:
      "Deploy autonomous agents that handle complex tasks across your organization.",
    visualization: AIAgentsVisualization,
    featured: false,
    glowColor: "var(--svg-violet-dim)",
  },
  {
    title: "Business Analytics",
    description:
      "Real-time insights powered by AI to drive smarter decisions.",
    visualization: AnalyticsVisualization,
    featured: false,
    glowColor: "var(--svg-link-dim)",
  },
  {
    title: "Document Intelligence",
    description:
      "Extract, classify and understand documents automatically with OCR and NLP.",
    visualization: DocumentVisualization,
    featured: false,
    glowColor: "var(--svg-cyan-dim)",
  },
  {
    title: "Customer Support AI",
    description:
      "Resolve customer queries instantly with AI-powered conversations.",
    visualization: CustomerSupportVisualization,
    featured: false,
    glowColor: "var(--svg-success-dim)",
  },
  {
    title: "Enterprise Integration",
    description:
      "Connect all your platforms with secure, automated data flows.",
    visualization: IntegrationVisualization,
    featured: false,
    glowColor: "var(--svg-violet-dim)",
  },
];

const headingVariants = blurFadeUp;

const subtitleVariants = sectionSubtitle;

function FloatingCard({
  data,
  index,
  shouldAnimate,
}: {
  data: (typeof cardData)[number];
  index: number;
  shouldAnimate: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Visualization = data.visualization;
  const floatY = useFloatingMotion(index, {
    amplitude: data.featured ? 2 : 3,
    frequency: 0.3 + index * 0.05,
    enabled: shouldAnimate,
  }, cardRef);

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={cardEntry}
      style={{ y: floatY.y }}
      className={data.featured ? "sm:col-span-2 sm:row-span-2" : ""}
    >
      <BentoCard
        span={data.featured ? "featured" : "standard"}
        glowColor={data.glowColor}
        className="h-full"
      >
        <div
          className={`flex flex-col h-full ${data.featured ? "p-6 sm:p-8" : "p-5 sm:p-6"}`}
        >
          {/* Visualization area */}
          <div
            className={`relative flex-1 ${data.featured ? "min-h-[240px]" : "min-h-[140px]"} mb-4`}
          >
            <Visualization />
          </div>

          {/* Text content */}
          <div>
            <h3
              className={`font-semibold text-text tracking-tight ${data.featured ? "text-lg sm:text-xl mb-2" : "text-base mb-1.5"}`}
            >
              {data.title}
            </h3>
            <p
              className={`text-text-secondary leading-relaxed ${data.featured ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}
            >
              {data.description}
            </p>
          </div>
        </div>
      </BentoCard>
    </motion.div>
  );
}

export function AISolutions() {
  const { ref: sectionRef, shouldAnimate } = useViewportAnimation({
    threshold: 0.08,
  });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden bg-canvas contain-layout contain-paint"
      aria-labelledby="solutions-heading"
    >
      {/* Premium background layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Animated grid with subtle shimmer */}
        <AnimatedGrid
          opacity={0.018}
          spacing={48}
          className={
            shouldAnimate && !shouldReduceMotion
              ? "animate-[grid-shimmer_8s_ease-in-out_infinite]"
              : ""
          }
        />

        {/* Soft animated radial glow — breathing center (CSS keyframe) */}
        <div
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[200px] ${shouldReduceMotion ? '' : 'animate-solutions-glow'}`}
          style={{
            background:
              "radial-gradient(circle, var(--svg-violet) 0%, var(--svg-link) 40%, transparent 70%)",
          }}
        />

        {/* Static radial anchors */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/[0.025] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-blue/[0.02] rounded-full blur-[140px]" />

        {/* Slow-orbiting gradient orbs with breathing opacity (CSS keyframes + scroll transforms) */}
        <div
          className={`absolute w-[350px] h-[350px] rounded-full blur-[120px] ${shouldReduceMotion ? '' : 'animate-solutions-orb-1'}`}
          style={{
            background:
              "radial-gradient(circle, var(--svg-violet) 0%, transparent 70%)",
            top: "15%",
            left: "10%",
          }}
        />
        <div
          className={`absolute w-[300px] h-[300px] rounded-full blur-[100px] ${shouldReduceMotion ? '' : 'animate-solutions-orb-2'}`}
          style={{
            background:
              "radial-gradient(circle, var(--svg-cyan) 0%, transparent 70%)",
            bottom: "10%",
            right: "15%",
          }}
        />
        <div
          className={`absolute w-[250px] h-[250px] rounded-full blur-[90px] ${shouldReduceMotion ? '' : 'animate-solutions-orb-3'}`}
          style={{
            background:
              "radial-gradient(circle, var(--svg-link) 0%, transparent 70%)",
            top: "50%",
            left: "55%",
          }}
        />

        {/* Subtle depth gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-canvas/50" />
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
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
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
          <FloatingCard
            data={cardData[0]}
            index={0}
            shouldAnimate={shouldAnimate}
          />

          {/* Standard cards */}
          {cardData.slice(1).map((card, i) => (
            <FloatingCard
              key={card.title}
              data={card}
              index={i + 1}
              shouldAnimate={shouldAnimate}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
