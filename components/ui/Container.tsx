import { cn } from "@/utils";

type ContainerProps = {
  size?: "default" | "narrow" | "wide";
  children: React.ReactNode;
  className?: string;
};

const sizeStyles = {
  default: "max-w-7xl",
  narrow: "max-w-3xl",
  wide: "max-w-[1400px]",
};

export function Container({
  size = "default",
  children,
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        sizeStyles[size],
        className
      )}
    >
      {children}
    </div>
  );
}
