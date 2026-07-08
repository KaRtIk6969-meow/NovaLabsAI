"use client";

import { useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useEffect, useState, type RefObject } from "react";

type UseFloatingMotionOptions = {
  amplitude?: number;
  frequency?: number;
  phaseOffset?: number;
  enabled?: boolean;
  rootMargin?: string;
};

export function useFloatingMotion(
  index: number,
  options: UseFloatingMotionOptions = {},
  containerRef?: RefObject<HTMLDivElement | null>
) {
  const {
    amplitude = 3,
    frequency = 0.4,
    phaseOffset = index * 1.2,
    enabled = true,
    rootMargin = "200px",
  } = options;

  const y = useMotionValue(0);
  const startTime = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const internalRef = useRef<HTMLDivElement | null>(null);
  const targetRef = containerRef ?? internalRef;

  useEffect(() => {
    const el = targetRef.current;
    if (!el || !enabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => { setIsVisible(entry.isIntersecting); },
      { rootMargin }
    );
    observer.observe(el);
    setIsVisible(true);
    return () => observer.disconnect();
  }, [enabled, rootMargin, targetRef]);

  useAnimationFrame((time) => {
    if (!enabled || !isVisible) {
      y.set(0);
      return;
    }
    if (startTime.current === null) startTime.current = time;
    const elapsed = (time - startTime.current) / 1000;
    const value = Math.sin(elapsed * frequency * Math.PI * 2 + phaseOffset) * amplitude;
    y.set(value);
  });

  return { y, ref: internalRef };
}
