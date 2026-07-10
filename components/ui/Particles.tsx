"use client";

import { useEffect, useRef } from "react";

type ParticlesProps = {
  count?: number;
  color?: string;
  maxSize?: number;
  speed?: number;
  className?: string;
  active?: boolean;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
};

export function Particles({
  count = 40,
  color = "rgba(255,255,255,0.3)",
  maxSize = 2,
  speed = 0.3,
  className = "",
  active = true,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const isInViewRef = useRef(true);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      dimensionsRef.current = {
        width: rect.width,
        height: rect.height,
      };
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0, rootMargin: "100px" }
    );

    observer.observe(canvas);

    const { width, height } = dimensionsRef.current;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * maxSize + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const animate = () => {
      if (!activeRef.current || !isInViewRef.current) {
        return;
      }

      const w = dimensionsRef.current.width;
      const h = dimensionsRef.current.height;

      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    const scheduleLoop = () => {
      cancelAnimationFrame(rafRef.current);
      if (activeRef.current && isInViewRef.current) {
        animate();
      }
    };

    scheduleLoop();

    return () => {
      window.removeEventListener("resize", updateDimensions);
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [count, color, maxSize, speed, active]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
