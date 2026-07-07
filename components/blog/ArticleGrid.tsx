"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useViewportAnimation } from "@/hooks/useViewportAnimation";
import { easing } from "@/design-system";
import type { BlogArticle } from "@/data/blog";

const ease = easing.default;

type ArticleGridProps = {
  articles: BlogArticle[];
};

function ArticleCard({ article, index }: { article: BlogArticle; index: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      layout
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16, filter: "blur(4px)" }}
      transition={{ duration: 0.5, ease, delay: index * 0.05 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative rounded-2xl border border-hairline bg-canvas-raised/80 backdrop-blur-sm overflow-hidden transition-colors duration-500 hover:border-hairline-strong cursor-pointer"
    >
      {/* Hover spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "radial-gradient(circle 400px at 50% 0%, rgba(0,112,243,0.06), transparent 70%)" }}
        aria-hidden="true"
      />
      {/* Hover border glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background: "linear-gradient(135deg, var(--svg-violet), var(--svg-link), var(--svg-cyan))",
          filter: "blur(8px)",
        }}
        aria-hidden="true"
      />

      {/* Cover gradient */}
      <div className="relative h-44 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${article.coverGradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas-raised via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full bg-canvas/80 backdrop-blur-sm border border-hairline/50 text-[11px] font-medium text-text-secondary">
            {article.category}
          </span>
        </div>

        {/* Read time */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[11px] text-text-muted">{article.readTime}</span>
        </div>

        {/* Image zoom decoration */}
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <motion.div
            className="w-16 h-16 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        <h3 className="text-base font-semibold text-text mb-2 leading-snug group-hover:text-accent-blue transition-colors duration-300 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
          {article.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-glass/50 text-[10px] font-medium text-text-muted border border-hairline/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-hairline/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center text-white text-[9px] font-semibold">
              {article.author.split(" ").map((n) => n[0]).join("")}
            </div>
            <span className="text-[11px] text-text-muted">{article.author}</span>
          </div>
          <span className="text-[11px] text-text-muted">{article.date}</span>
        </div>

        {/* Arrow slide on hover */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-accent-blue" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </motion.article>
  );
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  const { ref } = useViewportAnimation({ threshold: 0.05 });

  return (
    <div ref={ref} id="articles">
      <div aria-live="polite" aria-atomic="false" className="sr-only">
        {articles.length === 0
          ? "No articles match your search."
          : `Showing ${articles.length} article${articles.length !== 1 ? "s" : ""}.`}
      </div>
      <AnimatePresence mode="popLayout">
        {articles.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-2xl bg-glass/50 border border-hairline flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-text-muted" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16 16l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-text-secondary text-sm">No articles match your search.</p>
            <p className="text-text-muted text-xs mt-1">Try adjusting your filters or search terms.</p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {articles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
