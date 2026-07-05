"use client";

import { useCallback, useState } from "react";
import {
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type UseMouseSpotlightOptions = {
  springConfig?: { stiffness: number; damping: number; mass: number };
};

const defaultSpring = { stiffness: 200, damping: 25, mass: 0.5 };

export function useMouseSpotlight(
  options: UseMouseSpotlightOptions = {}
) {
  const { springConfig = defaultSpring } = options;
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);

  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      if (!target || shouldReduceMotion) return;
      const rect = target.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      rawX.set(px);
      rawY.set(py);
    },
    [rawX, rawY, shouldReduceMotion]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rawX.set(50);
    rawY.set(50);
  }, [rawX, rawY]);

  return {
    x,
    y,
    isHovered,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
