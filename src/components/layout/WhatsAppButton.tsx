"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918600151677";
  const message = encodeURIComponent("Hi! I'd like to know more about your products.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-4 z-30 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20" />

        {/* Button */}
        <div className="relative flex items-center justify-center w-12 h-12 bg-[#25D366] rounded-full shadow-warm-lg hover:shadow-warm-xl hover:scale-105 transition-all duration-300">
          <MessageCircle className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-bark text-cream text-xs font-body px-3 py-1.5 rounded-full whitespace-nowrap shadow-warm">
          Chat with us
        </div>
      </div>
    </a>
  );
}
