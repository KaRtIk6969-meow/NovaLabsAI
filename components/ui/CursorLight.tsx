"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorLightProps = {
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
  className?: string;
  followMouse?: boolean;
};

const springConfig = { stiffness: 80, damping: 25, mass: 0.5 };

export function CursorLight({
  color = "rgba(124,58,237,0.06)",
  size = 600,
  blur = 120,
  opacity = 1,
  className = "",
  followMouse = true,
}: CursorLightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!followMouse) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [followMouse, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <motion.div
        className="absolute will-change-transform"
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          borderRadius: "50%",
          background: color,
          filter: `blur(${blur}px)`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </motion.div>
  );
}
