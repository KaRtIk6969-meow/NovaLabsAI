"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/lib/lenis";

export function useScrollPosition(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);
  const { getLenis } = useLenis();
  const isScrolledRef = useRef(false);

  useEffect(() => {
    const lenis = getLenis();

    const updateScroll = () => {
      const scrollY = lenis ? lenis.scroll : window.scrollY;
      const hasCrossed = scrollY > threshold;
      if (hasCrossed !== isScrolledRef.current) {
        isScrolledRef.current = hasCrossed;
        setScrolled(hasCrossed);
      }
    };

    if (lenis) {
      lenis.on("scroll", updateScroll);
      updateScroll();

      return () => {
        lenis.off("scroll", updateScroll);
      };
    } else {
      window.addEventListener("scroll", updateScroll, { passive: true });
      updateScroll();

      return () => window.removeEventListener("scroll", updateScroll);
    }
  }, [threshold, getLenis]);

  return scrolled;
}
