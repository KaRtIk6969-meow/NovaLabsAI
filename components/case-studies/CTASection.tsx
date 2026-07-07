"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";
import { easing } from "@/design-system";

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

export function CTASection() {
  const { ref: sectionRef, shouldAnimate } = useViewportAnimation({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[200px] bg-accent-blue/[0.04]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-blue/25 to-transparent" />
      </div>

      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-4"
          >
            Ready to{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Transform
            </span>{" "}
            Your Enterprise?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-text-secondary mb-8 max-w-xl mx-auto"
          >
            Join 500+ enterprises that automated operations, reduced costs, and scaled
            with NovaLabs AI. Start with a free Discovery session.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/contact" size="lg">
              Book a Free Strategy Session
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore Our Services
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
