"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  /** ids of items open on mount */
  defaultOpen?: string[];
  className?: string;
  /** override trigger label styles (defaults to the standard heading style) */
  titleClassName?: string;
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
  titleClassName,
}: AccordionProps) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState<Set<string>>(
    () => new Set(defaultOpen)
  );

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("divide-y divide-border", className)}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        const headerId = `${baseId}-${item.id}-header`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id}>
            <button
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleItem(item.id)}
              className="flex items-center justify-between w-full py-4 text-left group"
            >
              <span
                className={cn(
                  "font-heading text-xl text-bark group-hover:text-terracotta transition-colors",
                  titleClassName
                )}
              >
                {item.title}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "h-4 w-4 text-bark/72 transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 text-base text-bark/70 font-body leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
