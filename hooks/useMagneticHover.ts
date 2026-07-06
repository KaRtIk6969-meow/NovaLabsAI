"use client";

import { useRef, useCallback, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

type MagneticHoverOptions = {
  strength?: number;
  springStiffness?: number;
  springDamping?: number;
};

type MagneticHoverReturn = {
  ref: React.RefObject<HTMLDivElement | null>;
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
  isHovered: boolean;
  handlers: {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
};

export function useMagneticHover(
  options: MagneticHoverOptions = {}
): MagneticHoverReturn {
  const {
    strength = 0.3,
    springStiffness = 150,
    springDamping = 15,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const xMotion = useMotionValue(0);
  const yMotion = useMotionValue(0);
  const x = useSpring(xMotion, {
    stiffness: springStiffness,
    damping: springDamping,
    mass: 0.1,
  });
  const y = useSpring(yMotion, {
    stiffness: springStiffness,
    damping: springDamping,
    mass: 0.1,
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = (e.clientX - centerX) * strength;
      const distY = (e.clientY - centerY) * strength;
      xMotion.set(distX);
      yMotion.set(distY);
    },
    [strength, xMotion, yMotion]
  );

  const onMouseEnter = useCallback(() => setIsHovered(true), []);

  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
    xMotion.set(0);
    yMotion.set(0);
  }, [xMotion, yMotion]);

  return {
    ref,
    x,
    y,
    isHovered,
    handlers: { onMouseMove, onMouseEnter, onMouseLeave },
  };
}
