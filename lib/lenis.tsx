"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

type ScrollToOptions = {
  offset?: number;
  duration?: number;
  immediate?: boolean;
};

type LenisContextType = {
  scrollTo: (
    target: string | number | HTMLElement,
    options?: ScrollToOptions
  ) => void;
  getLenis: () => Lenis | null;
};

const LenisContext = createContext<LenisContextType>({
  scrollTo: () => {},
  getLenis: () => null,
});

export function useLenis() {
  return useContext(LenisContext);
}

type LenisProviderProps = {
  children: ReactNode;
};

const DEFAULT_CONFIG = {
  duration: 0.8,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 1,
  syncTouch: true,
  syncTouchLerp: 0.075,
  infinite: false,
};

export function LenisProvider({ children }: LenisProviderProps) {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const rafIdRef = useRef<number>(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis(DEFAULT_CONFIG);

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: ScrollToOptions
    ) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, {
          offset: options?.offset ?? 0,
          duration: options?.duration ?? 1,
          immediate: options?.immediate ?? false,
        });
      } else {
        if (typeof target === "string") {
          const el = document.querySelector(target);
          if (el) {
            el.scrollIntoView({ behavior: "auto", block: "start" });
          }
        } else if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "auto" });
        } else {
          target.scrollIntoView({ behavior: "auto", block: "start" });
        }
      }
    },
    []
  );

  const getLenis = useCallback(() => lenisRef.current, []);

  const contextValue = useMemo<LenisContextType>(
    () => ({
      scrollTo,
      getLenis,
    }),
    [scrollTo, getLenis]
  );

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
}
