"use client";

import { useCallback, useState, useEffect } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

type UseTilt3DOptions = {
  maxAngle?: number;
  springConfig?: { stiffness: number; damping: number; mass: number };
};

const defaultSpring = { stiffness: 180, damping: 22, mass: 0.6 };

export function useTilt3D(options: UseTilt3DOptions = {}) {
  const { maxAngle = 6, springConfig = defaultSpring } = options;
  const shouldReduceMotion = useReducedMotion();

  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(!e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [maxAngle, -maxAngle]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxAngle, maxAngle]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      if (!target || shouldReduceMotion || isTouchDevice) return;
      const rect = target.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY, shouldReduceMotion, isTouchDevice]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const enabled = !shouldReduceMotion && !isTouchDevice;

  return {
    rotateX: enabled ? rotateX : 0,
    rotateY: enabled ? rotateY : 0,
    perspective: 1200,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}
