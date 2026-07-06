"use client";

import { useRef } from "react";
import {
  motion,
  useSpring,
  useScroll,
  useTransform as useTransformScroll,
} from "framer-motion";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "vertical" | "horizontal" | "both";
  rotate?: number;
  scrollOffset?: [string, string];
};

const springConfig = { stiffness: 100, damping: 30 };

export function Parallax({
  children,
  className = "",
  speed = 0.1,
  direction = "vertical",
  rotate = 0,
  scrollOffset = ["start end", "end start"],
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: scrollOffset as [string, string],
  });

  const y = useTransformScroll(
    scrollYProgress,
    [0, 1],
    direction === "vertical" || direction === "both"
      ? [speed * 100, -speed * 100]
      : [0, 0]
  );

  const x = useTransformScroll(
    scrollYProgress,
    [0, 1],
    direction === "horizontal" || direction === "both"
      ? [speed * 100, -speed * 100]
      : [0, 0]
  );

  const r = useTransformScroll(
    scrollYProgress,
    [0, 1],
    rotate ? [rotate, -rotate] : [0, 0]
  );

  const springY = useSpring(y, springConfig);
  const springX = useSpring(x, springConfig);
  const springR = useSpring(r, springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ y: springY, x: springX, rotate: springR }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
