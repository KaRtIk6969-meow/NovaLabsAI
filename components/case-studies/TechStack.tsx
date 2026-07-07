"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";
import { easing } from "@/design-system";
import { CASE_STUDIES } from "@/data/case-studies";

const ease = easing.default;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
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

// Collect all unique technologies
const ALL_TECH = [...new Set(CASE_STUDIES.flatMap((s) => s.techStack || []))];

const TECH_COLORS: Record<string, string> = {
  Python: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30",
  TensorFlow: "from-orange-500/20 to-orange-600/10 border-orange-500/30",
  PyTorch: "from-red-500/20 to-red-600/10 border-red-500/30",
  "FHIR API": "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  Kubernetes: "from-blue-600/20 to-blue-700/10 border-blue-600/30",
  PostgreSQL: "from-blue-400/20 to-blue-500/10 border-blue-400/30",
  Redis: "from-red-400/20 to-red-500/10 border-red-400/30",
  OpenCV: "from-green-500/20 to-green-600/10 border-green-500/30",
  "NVIDIA CUDA": "from-green-600/20 to-green-700/10 border-green-600/30",
  "AWS IoT": "from-orange-400/20 to-orange-500/10 border-orange-400/30",
  InfluxDB: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
  Grafana: "from-orange-500/20 to-orange-600/10 border-orange-500/30",
  XGBoost: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  "Apache Kafka": "from-blue-400/20 to-blue-500/10 border-blue-400/30",
  Docker: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  Prophet: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
  "Apache Airflow": "from-teal-500/20 to-teal-600/10 border-teal-500/30",
  Snowflake: "from-blue-300/20 to-blue-400/10 border-blue-300/30",
  dbt: "from-orange-400/20 to-orange-500/10 border-orange-400/30",
  Looker: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  Go: "from-cyan-400/20 to-cyan-500/10 border-cyan-400/30",
  "Google OR-Tools": "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  MQTT: "from-purple-400/20 to-purple-500/10 border-purple-400/30",
  TimescaleDB: "from-blue-400/20 to-blue-500/10 border-blue-400/30",
};

export function TechStack() {
  const { ref: sectionRef, shouldAnimate } = useViewportAnimation({ threshold: 0.06 });

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
                Technology Stack
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-text mb-4"
            >
              Built with{" "}
              <span className="bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan bg-clip-text text-transparent">
                Modern Tech
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-text-secondary">
              Enterprise-grade tools and frameworks powering every deployment.
            </motion.p>
          </div>

          {/* Tech grid */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {ALL_TECH.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.03, ease }}
                className={`px-4 py-2.5 rounded-xl border bg-gradient-to-br backdrop-blur-sm text-sm font-mono text-text-secondary hover:text-text transition-colors duration-300 ${
                  TECH_COLORS[tech] || "from-hairline/20 to-transparent border-hairline"
                }`}
              >
                {tech}
              </motion.div>
            ))}
          </div>

          {/* Per-study tech mapping */}
          <motion.div variants={fadeUp} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {CASE_STUDIES.map((study) => (
              <div
                key={study.id}
                className="p-4 rounded-xl border border-hairline bg-canvas-raised/60 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{study.icon}</span>
                  <span className="text-sm font-semibold text-text">{study.company}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {study.techStack?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono text-text-muted bg-glass/50 border border-hairline/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
