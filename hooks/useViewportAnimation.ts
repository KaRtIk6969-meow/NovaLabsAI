"use client";

import { useEffect, useRef, useState } from "react";

type UseViewportAnimationOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function useViewportAnimation(
  options: UseViewportAnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px" } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);

  const shouldAnimate = isInView && isTabActive;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    const handleVisibility = () => {
      setIsTabActive(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return { ref, isInView, shouldAnimate };
}
