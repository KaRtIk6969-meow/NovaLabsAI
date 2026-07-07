import { type ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-accent-blue to-accent-violet text-white hover:opacity-90 shadow-lg shadow-accent-blue/25",
  secondary:
    "border border-border bg-transparent text-text hover:bg-glass-hover",
  ghost: "text-text-secondary hover:text-text hover:bg-glass-hover",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 px-3.5 text-sm gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

function handleHashClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  const id = href.slice(1);
  const target = document.getElementById(id);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
  }
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      if (href.startsWith("#")) {
        return (
          <a
            href={href}
            className={classes}
            onClick={(e) => handleHashClick(e, href)}
          >
            {children}
          </a>
        );
      }

      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
