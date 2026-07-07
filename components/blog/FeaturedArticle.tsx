"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { easing, reveal } from "@/design-system";
import { FEATURED_ARTICLE } from "@/data/blog";

const fadeUp = reveal.blurFadeUp;
const ease = easing.default;

export function FeaturedArticle() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();
  const article = FEATURED_ARTICLE;

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="featured-article-heading"
    >
      <Container>
        <motion.div
          initial={shouldReduceMotion ? fadeUp.visible : fadeUp.hidden}
          animate={isInView ? fadeUp.visible : undefined}
          transition={{ duration: 0.8, ease }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-glass/50 backdrop-blur-sm text-[13px] font-medium text-text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-pulse-soft" />
            Featured
          </span>
        </motion.div>

        <motion.article
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="group relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm overflow-hidden"
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: "radial-gradient(circle 600px at 50% 0%, rgba(0,112,243,0.06), transparent 70%)" }}
            aria-hidden="true"
          />
          <div
            className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none -z-10"
            style={{
              background: "linear-gradient(135deg, var(--svg-violet), var(--svg-link), var(--svg-cyan))",
              filter: "blur(8px)",
            }}
            aria-hidden="true"
          />

          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-0">
            {/* Cover */}
            <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[420px] overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${article.coverGradient} opacity-20`} />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas-raised via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-canvas-raised/80" />

              {/* Floating geometric decoration */}
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <motion.div
                  className="w-32 h-32 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  animate={shouldReduceMotion ? {} : { rotate: [0, 5, -3, 0], scale: [1, 1.02, 0.98, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-20 h-20 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
                  animate={shouldReduceMotion ? {} : { rotate: [0, -8, 4, 0], scale: [1, 0.95, 1.05, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  style={{ top: "25%", left: "20%" }}
                />
                <motion.div
                  className="absolute w-14 h-14 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
                  animate={shouldReduceMotion ? {} : { rotate: [0, 12, -6, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                  style={{ bottom: "30%", right: "25%" }}
                />
              </div>

              {/* Category badge on image */}
              <div className="absolute top-6 left-6 z-10">
                <span className="px-3 py-1.5 rounded-full bg-canvas/80 backdrop-blur-sm border border-hairline/50 text-[12px] font-medium text-text-secondary">
                  {article.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="relative p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4 text-[12px] text-text-muted">
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-hairline" />
                <span>{article.readTime} read</span>
              </div>

              <h2
                id="featured-article-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text mb-4 group-hover:text-accent-blue transition-colors duration-300"
              >
                {article.title}
              </h2>

              <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8">
                {article.summary}
              </p>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center text-white text-sm font-semibold">
                  {article.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-medium text-text">{article.author}</div>
                  <div className="text-xs text-text-muted">{article.authorRole}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-accent-blue text-sm font-medium group/link cursor-pointer">
                <span className="group-hover/link:underline">Read Full Article</span>
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </div>
            </div>
          </div>
        </motion.article>
      </Container>
    </section>
  );
}
