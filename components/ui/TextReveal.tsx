"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type TextRevealProps = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  mode?: "words" | "lines" | "chars";
  stagger?: number;
  once?: boolean;
};

const springConfig = { stiffness: 100, damping: 20 };

export function TextReveal({
  children,
  className = "",
  as: Tag = "span",
  mode = "words",
  stagger = 0.04,
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.35"],
  });

  const smoothProgress = useSpring(scrollYProgress, springConfig);

  let items: string[];
  if (mode === "words") {
    items = children.split(" ");
  } else if (mode === "chars") {
    items = children.split("");
  } else {
    items = children.split("\n");
  }

  return (
    <Tag className={className}>
      <div ref={containerRef} className="inline">
        {items.map((item, i) => {
          const start = i * stagger;
          const end = start + stagger * 3;

          return (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                style={{
                  opacity: useTransform(smoothProgress, [start, end], [0, 1]),
                  y: useTransform(smoothProgress, [start, end], [20, 0]),
                  filter: useTransform(
                    smoothProgress,
                    [start, end],
                    ["blur(6px)", "blur(0px)"]
                  ),
                }}
              >
                {item}
                {mode === "words" && i < items.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          );
        })}
      </div>
    </Tag>
  );
}
