"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  glareColor?: string;
  intensity?: number;
};

const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };

export function TiltCard({
  children,
  className = "",
  glareColor = "rgba(255,255,255,0.06)",
  intensity = 12,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-intensity, intensity]);

  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {/* Glare overlay */}
      <motion.div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, ${glareColor}, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}
