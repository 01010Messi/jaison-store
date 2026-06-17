"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-[11px] font-accent uppercase tracking-[0.14em] text-bark/60"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full px-4 py-2.5 bg-cream border border-border rounded-lg",
            "font-body text-bark text-sm placeholder:text-bark/60",
            "transition-all duration-200 resize-y",
            "hover:border-gold/60",
            "focus:border-gold focus:ring-1 focus:ring-gold/30",
            error && "border-terracotta focus:border-terracotta focus:ring-terracotta/30",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-terracotta font-body">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-xs text-bark/60 font-body">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
