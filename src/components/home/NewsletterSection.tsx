"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import GoldRule from "@/components/decorative/GoldRule";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("Welcome to the jaison family!");
        setEmail("");
      } else {
        const data = await res.json();
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 md:py-28 bg-bark relative overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <pattern id="mandala-bg" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="30" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="40" cy="40" r="20" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="40" cy="40" r="10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#mandala-bg)" />
        </svg>
      </div>

      <div className="container-brand relative z-10">
        <ScrollReveal animation="fade-up">
          <div className="max-w-xl mx-auto text-center">
            <svg
              width="20"
              height="16"
              viewBox="0 0 24 20"
              className="mx-auto mb-4 text-sage-light"
              fill="currentColor"
            >
              <ellipse cx="12" cy="7" rx="3" ry="7" opacity="0.8" />
              <ellipse cx="7" cy="9" rx="2.5" ry="5.5" transform="rotate(-25 7 9)" opacity="0.6" />
              <ellipse cx="17" cy="9" rx="2.5" ry="5.5" transform="rotate(25 17 9)" opacity="0.6" />
            </svg>

            <h2 className="font-heading text-2xl md:text-3xl text-cream mb-3">
              Ancient Beauty Wisdom
            </h2>

            <GoldRule variant="diamond" width="w-24 mx-auto" className="mb-4" />

            <p className="text-sm text-cream/50 font-body mb-8">
              Subscribe for Ayurvedic beauty tips, new product launches,
              and exclusive offers delivered to your inbox.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 bg-cream/10 border border-cream/20 rounded-sm text-cream text-sm font-body placeholder:text-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <Button
                type="submit"
                variant="gold"
                size="lg"
                isLoading={isLoading}
              >
                Subscribe
              </Button>
            </form>

            <p className="text-[11px] text-cream/30 mt-4 font-body">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
