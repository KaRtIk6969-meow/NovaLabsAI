"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { easing } from "@/design-system";
import { TRENDING_ARTICLES } from "@/data/blog";

const ease = easing.default;

export function TrendingArticles() {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="trending-heading"
    >
      <Container>
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-glass/50 backdrop-blur-sm text-[13px] font-medium text-text-secondary mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-pink animate-pulse-soft" />
              Trending
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
              Most Popular This Week
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-xl border border-hairline bg-glass/50 flex items-center justify-center text-text-muted hover:text-text hover:border-hairline-strong transition-all duration-200"
              aria-label="Scroll left"
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-xl border border-hairline bg-glass/50 flex items-center justify-center text-text-muted hover:text-text hover:border-hairline-strong transition-all duration-200"
              aria-label="Scroll right"
            >
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      </Container>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-[max(1rem,calc((100vw-80rem)/2+1rem))] pb-4"
      >
        {TRENDING_ARTICLES.map((article, i) => (
          <motion.article
            key={article.id}
            initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.08 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="group relative flex-shrink-0 w-[300px] sm:w-[320px] rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm overflow-hidden transition-colors duration-500 hover:border-hairline-strong cursor-pointer"
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(circle 300px at 50% 0%, rgba(121,40,202,0.06), transparent 70%)" }}
              aria-hidden="true"
            />

            {/* Cover */}
            <div className="relative h-36 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${article.coverGradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas-raised via-transparent to-transparent" />

              {/* Trending rank */}
              <div className="absolute top-3 left-3 z-10">
                <span className="w-7 h-7 rounded-lg bg-canvas/80 backdrop-blur-sm border border-hairline/50 flex items-center justify-center text-[11px] font-bold text-text">
                  #{i + 1}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="relative p-5">
              <div className="flex items-center gap-2 mb-3 text-[11px] text-text-muted">
                <span className="px-2 py-0.5 rounded-md bg-glass/50 border border-hairline/30 font-medium text-text-secondary">
                  {article.category}
                </span>
                <span>{article.readTime}</span>
              </div>

              <h3 className="text-sm font-semibold text-text mb-2 leading-snug group-hover:text-accent-violet transition-colors duration-300 line-clamp-2">
                {article.title}
              </h3>

              <p className="text-xs text-text-secondary leading-relaxed mb-3 line-clamp-2">
                {article.summary}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-text-muted">{article.author}</span>
                <motion.span
                  className="text-accent-blue text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
