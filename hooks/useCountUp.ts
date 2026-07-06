"use client";

import { useEffect, useState } from "react";

type UseCountUpOptions = {
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  startOnMount?: boolean;
};

export function useCountUp(
  options: UseCountUpOptions | number,
  duration = 1200,
  delay = 0
) {
  const opts: UseCountUpOptions =
    typeof options === "number"
      ? { end: options, duration, delay }
      : options;

  const { end, duration: dur = 1200, delay: del = 0, decimals = 0, startOnMount = true } = opts;

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startOnMount) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      const raf = requestAnimationFrame(() => setValue(end));
      return () => cancelAnimationFrame(raf);
    }

    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / dur, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * end;
        setValue(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.round(current));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, del);

    return () => clearTimeout(timeout);
  }, [end, dur, del, decimals, startOnMount]);

  return decimals > 0 ? value.toFixed(decimals) : value.toString();
}
