"use client";

import { MessageSquare } from "lucide-react";

export default function AdminMessagesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl text-bark">Messages</h1>
        <p className="text-sm text-bark/50 font-body mt-1">
          Contact form submissions
        </p>
      </div>

      <div className="bg-cream p-5 rounded-sm border border-border/50">
        <div className="flex flex-col items-center justify-center py-16 text-bark/30">
          <MessageSquare className="h-12 w-12 mb-3 opacity-50" />
          <p className="font-heading text-lg text-bark/40">No messages yet</p>
          <p className="text-xs text-bark/30 font-body mt-1">
            Customer messages from the contact form will appear here
          </p>
        </div>
      </div>
    </div>
  );
}
