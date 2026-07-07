"use client";

import { useRef, useCallback, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { easing, timelineNode } from "@/design-system";

const ease = easing.default;

type TimelineItem = {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
  lineColor?: string;
  nodeColor?: string;
};

export function Timeline({
  items,
  className,
  lineColor = "from-accent-blue via-accent-violet to-accent-cyan",
  nodeColor = "bg-accent-blue",
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.3"],
  });
  const lineHeight = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["100%", "100%"] : ["0%", "100%"]
  );

  const callbackRef = useCallback((el: HTMLDivElement | null) => {
    (containerRef as React.RefObject<HTMLDivElement | null>).current = el;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={callbackRef} className={className}>
      <div className="relative">
        {/* Animated line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-hairline">
          <motion.div
            className={`absolute inset-x-0 top-0 bg-gradient-to-b ${lineColor} origin-top`}
            style={{ height: lineHeight }}
          />
        </div>

        {/* Items */}
        <div className="space-y-8">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, x: -16 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.6, ease, delay: 0.1 + i * 0.15 },
                },
              }}
              initial={shouldReduceMotion ? "visible" : "hidden"}
              animate={isInView ? "visible" : "hidden"}
              className="relative flex gap-6"
            >
              {/* Node */}
              <motion.div
                variants={timelineNode}
                className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full ${nodeColor} border-2 border-bg-alt flex items-center justify-center`}
              >
                {item.icon ? (
                  <span className="text-white text-xs">{item.icon}</span>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-white/80" />
                )}
              </motion.div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h3 className="text-base font-semibold text-text tracking-tight">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
