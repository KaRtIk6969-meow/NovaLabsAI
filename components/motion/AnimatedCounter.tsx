"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type AnimatedCounterProps = {
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  threshold?: number;
};

export function AnimatedCounter({
  end,
  duration = 1200,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  threshold = 0.1,
}: AnimatedCounterProps) {
  const { ref, isInView } = useScrollAnimation({ threshold });
  const shouldReduceMotion = useReducedMotion();
  const [hasStarted, setHasStarted] = useState(false);
  const [display, setDisplay] = useState(
    shouldReduceMotion ? end.toFixed(decimals) : "0"
  );

  useEffect(() => {
    if (!isInView || hasStarted) return;
    if (shouldReduceMotion) {
      setDisplay(end.toFixed(decimals));
      return;
    }

    setHasStarted(true);
    const startTime = performance.now();
    const delayMs = delay * 1000;

    const timer = setTimeout(() => {
      const animate = (now: number) => {
        const elapsed = now - startTime - delayMs;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * end;
        setDisplay(current.toFixed(decimals));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [isInView, hasStarted, end, duration, delay, decimals, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
