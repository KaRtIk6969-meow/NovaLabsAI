"use client";

import { useCallback, useEffect, useRef } from "react";

type CursorGlowProps = {
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
  className?: string;
};

export function CursorGlow({
  color = "var(--svg-violet-dim)",
  size = 400,
  blur = 100,
  opacity = 1,
  className = "",
}: CursorGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const updatePosition = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = `translate(${posRef.current.x - size / 2}px, ${posRef.current.y - size / 2}px)`;
  }, [size]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          updatePosition();
          rafRef.current = 0;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updatePosition]);

  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 pointer-events-none z-50 will-change-transform ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: `blur(${blur}px)`,
        opacity,
      }}
      aria-hidden="true"
    />
  );
}
