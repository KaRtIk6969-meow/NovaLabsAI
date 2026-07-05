"use client";

type AnimatedGridProps = {
  className?: string;
  opacity?: number;
  spacing?: number;
};

export function AnimatedGrid({
  className = "",
  opacity = 0.03,
  spacing = 48,
}: AnimatedGridProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: `${spacing}px ${spacing}px`,
        maskImage:
          "radial-gradient(ellipse 60% 50% at 50% 50%, black 15%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 60% 50% at 50% 50%, black 15%, transparent 70%)",
      }}
    />
  );
}
