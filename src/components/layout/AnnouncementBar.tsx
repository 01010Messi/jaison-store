"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [isDismissed, setIsDismissed] = useState(true); // Start hidden to avoid flash

  useEffect(() => {
    const dismissed = localStorage.getItem("announcement-dismissed");
    setIsDismissed(dismissed === "true");
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem("announcement-dismissed", "true");
  };

  if (isDismissed) return null;

  return (
    <div className="bg-bark text-cream/90 text-center py-2 px-4 relative z-50">
      <p className="text-xs font-accent tracking-wide">
        Free Shipping on orders above &#8377;499 &bull; 100% Natural Products
      </p>
      <button
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/50 hover:text-cream transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
