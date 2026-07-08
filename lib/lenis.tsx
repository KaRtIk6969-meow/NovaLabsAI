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
};

const LenisContext = createContext<LenisContextType>({
  scrollTo: () => {},
});

// Store lenis instance outside of React state to avoid lint issues
let globalLenisInstance: Lenis | null = null;

export function useLenis() {
  const context = useContext(LenisContext);

  const getLenis = useCallback(() => {
    return globalLenisInstance;
  }, []);

  return useMemo(
    () => ({
      ...context,
      getLenis,
    }),
    [context, getLenis]
  );
}

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const rafIdRef = useRef<number>(0);

  // Initialize Lenis
  useEffect(() => {
    if (shouldReduceMotion) {
      globalLenisInstance = null;
      return;
    }

    const lenisInstance = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    globalLenisInstance = lenisInstance;

    function raf(time: number) {
      lenisInstance.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      lenisInstance.destroy();
      globalLenisInstance = null;
    };
  }, [shouldReduceMotion]);

  // Scroll to top on route change
  useEffect(() => {
    if (globalLenisInstance) {
      globalLenisInstance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: ScrollToOptions
    ) => {
      if (globalLenisInstance) {
        globalLenisInstance.scrollTo(target, {
          offset: options?.offset ?? 0,
          duration: options?.duration ?? 1,
          lock: false,
          immediate: options?.immediate ?? false,
          onComplete: () => {},
          lerp: 0.1,
          force: false,
        });
      } else {
        // Fallback for reduced motion or when Lenis isn't loaded
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

  // Memoize context value - use useMemo to avoid useRef issues
  const contextValue = useMemo<LenisContextType>(
    () => ({
      scrollTo,
    }),
    [scrollTo]
  );

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
}
