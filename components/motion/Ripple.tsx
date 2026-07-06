"use client";

import { useState, useCallback, useRef, type MouseEvent } from "react";

type RippleProps = {
  color?: string;
  duration?: number;
  className?: string;
};

type RippleState = {
  id: number;
  x: number;
  y: number;
  size: number;
};

export function Ripple({
  color = "rgba(255, 255, 255, 0.3)",
  duration = 600,
  className,
}: RippleProps) {
  const [ripples, setRipples] = useState<RippleState[]>([]);
  const nextId = useRef(0);

  const addRipple = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const id = nextId.current++;
      setRipples((prev) => [...prev, { id, x, y, size }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, duration);
    },
    [duration]
  );

  return {
    ripples,
    addRipple,
    rippleContainer: (
      <span
        className={`absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none ${className ?? ""}`}
        aria-hidden="true"
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: r.x,
              top: r.y,
              width: r.size,
              height: r.size,
              background: color,
              transform: "scale(0)",
              animation: `ripple-expand ${duration}ms ease-out forwards`,
            }}
          />
        ))}
      </span>
    ),
  };
}

export function useRipple(color?: string, duration?: number) {
  return Ripple({ color, duration });
}
