"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const STORAGE_KEY = "jaison_guide_popup";
const SCROLL_THRESHOLD = 0.4;
const EXCLUDED_PREFIXES = [
  "/checkout",
  "/cart",
  "/login",
  "/register",
  "/admin",
];

export default function LeadMagnetPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const panelRef = useFocusTrap<HTMLDivElement>(open);

  const dismiss = useCallback(() => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "true");
  }, []);

  useEffect(() => {
    if (EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p))) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= SCROLL_THRESHOLD) {
        setOpen(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "unset";
    };
  }, [open, dismiss]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok || data.error?.toLowerCase().includes("already")) {
        setSubmitted(true);
        sessionStorage.setItem(STORAGE_KEY, "true");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-bark/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={dismiss}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-popup-title"
            tabIndex={-1}
            className="relative w-full max-w-md bg-bark rounded-xl shadow-warm-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close */}
            <button
              onClick={dismiss}
              aria-label="Close"
              className="absolute top-4 right-4 p-1 text-cream/50 hover:text-cream transition-colors duration-200 z-10"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <div className="px-8 py-10 md:px-10">
              {!submitted ? (
                <>
                  <p className="font-accent text-[11px] tracking-[0.22em] uppercase text-terracotta mb-3">
                    Free Guide
                  </p>

                  <h2
                    id="lead-popup-title"
                    className="font-heading font-light text-cream leading-[1.15] mb-4"
                    style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
                  >
                    The{" "}
                    <em style={{ color: "var(--color-terracotta-light)" }}>
                      Ayurvedic Skin Reset
                    </em>{" "}
                    Guide
                  </h2>

                  <p className="font-body text-cream/65 text-sm leading-relaxed mb-7">
                    12 pages: ingredient breakdowns, seasonal routines, and
                    ancient rituals adapted for modern skin — free with your
                    email.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="space-y-3">
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-label="Email address"
                      className="bg-bark-light border-cream/15 text-cream placeholder:text-cream/35 hover:border-cream/30 focus:border-terracotta focus:ring-terracotta/25"
                    />
                    {error && (
                      <p className="text-[11px] font-accent text-terracotta-light tracking-[0.08em]">
                        {error}
                      </p>
                    )}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={isLoading}
                    >
                      Get the Free Guide
                    </Button>
                  </form>

                  <p className="font-accent text-[10px] text-cream/35 tracking-[0.14em] uppercase mt-5 text-center">
                    No spam &middot; Unsubscribe anytime
                  </p>
                </>
              ) : (
                <div className="text-center py-2">
                  <p className="font-accent text-[11px] tracking-[0.22em] uppercase text-terracotta mb-3">
                    It&apos;s on its way
                  </p>
                  <h2
                    className="font-heading font-light text-cream leading-[1.15] mb-4"
                    style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}
                  >
                    Check your inbox
                  </h2>
                  <p className="font-body text-cream/65 text-sm leading-relaxed mb-8">
                    Your guide is heading to{" "}
                    <span className="text-cream">{email}</span>. While
                    you&apos;re here, explore our powders.
                  </p>
                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    onClick={dismiss}
                    className="bg-bark-light hover:bg-bark-light/80"
                  >
                    Continue Exploring
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
