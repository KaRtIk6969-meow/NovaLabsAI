"use client";

import { useScroll } from "framer-motion";
import type { RefObject } from "react";

type UseScrollProgressOptions = {
  target?: RefObject<HTMLElement>;
  offset?: [string, string];
};

export function useScrollProgress(options: UseScrollProgressOptions = {}) {
  const { target, offset = ["start end", "end start"] } = options;
  const { scrollYProgress } = useScroll(
    target ? { target, offset } : undefined
  );
  return { scrollYProgress };
}
