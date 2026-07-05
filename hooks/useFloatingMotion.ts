"use client";

import { useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef } from "react";

type UseFloatingMotionOptions = {
  amplitude?: number;
  frequency?: number;
  phaseOffset?: number;
  enabled?: boolean;
};

export function useFloatingMotion(
  index: number,
  options: UseFloatingMotionOptions = {}
) {
  const {
    amplitude = 3,
    frequency = 0.4,
    phaseOffset = index * 1.2,
    enabled = true,
  } = options;

  const y = useMotionValue(0);
  const startTime = useRef<number | null>(null);

  useAnimationFrame((time) => {
    if (!enabled) {
      y.set(0);
      return;
    }
    if (startTime.current === null) startTime.current = time;
    const elapsed = (time - startTime.current) / 1000;
    const value = Math.sin(elapsed * frequency * Math.PI * 2 + phaseOffset) * amplitude;
    y.set(value);
  });

  return { y };
}
