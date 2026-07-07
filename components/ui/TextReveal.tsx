"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

type TextRevealProps = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  mode?: "words" | "lines" | "chars";
  stagger?: number;
};

const springConfig = { stiffness: 100, damping: 20 };

export function TextReveal({
  children,
  className = "",
  as: Tag = "span",
  mode = "words",
  stagger = 0.04,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.35"],
  });

  const smoothProgress = useSpring(scrollYProgress, springConfig);

  const items = useMemo(() => {
    if (mode === "chars") return children.split("");
    if (mode === "lines") return children.split("\n");
    return children.split(" ");
  }, [children, mode]);

  const transforms = useMemo(
    () =>
      items.map((_, i) => {
        const start = i * stagger;
        const end = start + stagger * 3;
        return { start, end };
      }),
    [items, stagger]
  );

  if (shouldReduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={className}>
      <div ref={containerRef} className="inline">
        {items.map((item, i) => (
          <TextRevealItem
            key={i}
            item={item}
            progress={smoothProgress}
            start={transforms[i].start}
            end={transforms[i].end}
            isWord={mode === "words" && i < items.length - 1}
          />
        ))}
      </div>
    </Tag>
  );
}

function TextRevealItem({
  item,
  progress,
  start,
  end,
  isWord,
}: {
  item: string;
  progress: ReturnType<typeof useSpring>;
  start: number;
  end: number;
  isWord: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [20, 0]);
  const filter = useTransform(progress, [start, end], ["blur(6px)", "blur(0px)"]);

  return (
    <span className="inline-block overflow-hidden">
      <motion.span
        className="inline-block"
        style={{ opacity, y, filter }}
      >
        {item}
        {isWord ? "\u00A0" : ""}
      </motion.span>
    </span>
  );
}
