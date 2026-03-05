"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-body font-medium tracking-wider uppercase transition-all duration-300 ease-out-expo rounded-sm disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-terracotta text-cream hover:bg-terracotta-dark active:translate-y-[1px] shadow-sm hover:shadow-warm",
      secondary:
        "bg-bark text-cream hover:bg-bark-light active:translate-y-[1px]",
      ghost:
        "bg-transparent text-bark hover:bg-parchment/50 active:bg-parchment",
      gold: "bg-gold text-cream hover:bg-gold-dark active:translate-y-[1px] shadow-gold",
      outline:
        "border border-bark/20 text-bark bg-transparent hover:border-terracotta hover:text-terracotta",
    };

    const sizes = {
      sm: "text-xs px-4 py-2 h-8",
      md: "text-sm px-6 py-2.5 h-10",
      lg: "text-sm px-8 py-3 h-12",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
