"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  side?: "left" | "right";
  className?: string;
}

export default function Drawer({
  isOpen,
  onClose,
  children,
  title,
  side = "right",
  className,
}: DrawerProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscape]);

  const slideFrom = side === "right" ? "100%" : "-100%";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-bark/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: slideFrom }}
            animate={{ x: 0 }}
            exit={{ x: slideFrom }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className={cn(
              "absolute top-0 h-full w-full max-w-md bg-cream shadow-warm-xl",
              side === "right" ? "right-0" : "left-0",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-heading text-xl text-bark">
                {title || "\u00A0"}
              </h3>
              <button
                onClick={onClose}
                className="text-bark/40 hover:text-bark transition-colors p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto h-[calc(100%-65px)]">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
