"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/lib/lenis";

export function useScrollPosition(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);
  const { getLenis } = useLenis();

  useEffect(() => {
    const lenis = getLenis();

    const updateScroll = () => {
      const scrollY = lenis ? lenis.scroll : window.scrollY;
      setScrolled(scrollY > threshold);
    };

    if (lenis) {
      // Use Lenis scroll event
      lenis.on("scroll", updateScroll);
      updateScroll();

      return () => {
        lenis.off("scroll", updateScroll);
      };
    } else {
      // Fallback to native scroll
      window.addEventListener("scroll", updateScroll, { passive: true });
      updateScroll();

      return () => window.removeEventListener("scroll", updateScroll);
    }
  }, [threshold, getLenis]);

  return scrolled;
}
