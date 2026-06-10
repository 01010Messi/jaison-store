"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const channels = [
  {
    num: "01",
    label: "WhatsApp",
    note: "Fastest — we reply within hours",
    value: "+91 86001 51677",
    href: "https://wa.me/918600151677",
  },
  {
    num: "02",
    label: "Email",
    note: "For orders, ingredients, anything",
    value: "Jaisonskincare@gmail.com",
    href: "mailto:Jaisonskincare@gmail.com",
  },
  {
    num: "03",
    label: "Instagram",
    note: "DMs open, rituals daily",
    value: "@jaison_skincare",
    href: "https://www.instagram.com/jaison_skincare/",
  },
  {
    num: "04",
    label: "Workshop",
    note: "Where every jar is packed by hand",
    value: "Nashik, Maharashtra, India",
    href: null,
  },
];

const fieldClass =
  "contact-field w-full bg-transparent font-body text-sm py-2.5 outline-none transition-colors";

const fieldStyle = {
  border: "none",
  borderBottom: "1px solid rgba(96,108,56,0.18)",
  color: "#606C38",
  borderRadius: 0,
} as const;

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Message sent! We'll get back to you within 24 hours.");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .contact-field::placeholder {
          color: rgba(96,108,56,0.32);
        }
        .contact-field:focus {
          border-bottom-color: #834316 !important;
        }
        .contact-submit-btn:hover {
          box-shadow: 0 0 28px rgba(96, 108, 56, 0.3);
        }
        .contact-submit-btn:active {
          box-shadow: 0 0 40px rgba(96, 108, 56, 0.42);
          transform: scale(0.98);
        }
        .contact-wa-btn:hover {
          box-shadow: 0 0 28px rgba(254, 250, 224, 0.35);
        }
        .contact-wa-btn:active {
          box-shadow: 0 0 40px rgba(254, 250, 224, 0.5);
          transform: scale(0.98);
        }
        .contact-channel-link:hover .contact-channel-value {
          color: #834316;
        }
      `}</style>

      <div className="min-h-screen" style={{ backgroundColor: "#FEFAE0" }}>
        {/* ── Hero ── */}
        <section
          style={{ backgroundColor: "#EFE4C5" }}
          className="relative overflow-hidden pt-28 pb-20 px-6 md:px-14 lg:px-24"
        >
          {/* Watermark */}
          <div
            className="absolute inset-0 flex items-end pointer-events-none select-none overflow-hidden"
            aria-hidden="true"
          >
            <span
              className="font-heading font-light leading-none whitespace-nowrap"
              style={{
                fontSize: "clamp(7rem, 22vw, 18rem)",
                color: "rgba(96,108,56,0.045)",
                letterSpacing: "-0.04em",
                marginBottom: "-0.15em",
                marginLeft: "-0.04em",
              }}
            >
              SAY HELLO
            </span>
          </div>

          <p
            className="relative font-accent text-[10px] tracking-[0.22em] uppercase mb-10"
            style={{ color: "rgba(96,108,56,0.42)" }}
          >
            — GET IN TOUCH · WE REPLY WITHIN 24 HOURS
          </p>

          <h1
            className="relative font-heading font-light leading-[1.04]"
            style={{
              fontSize: "clamp(3rem, 7.5vw, 6.25rem)",
              letterSpacing: "-0.02em",
              color: "#606C38",
            }}
          >
            Write to us.{" "}
            <span style={{ color: "#834316", fontStyle: "italic" }}>
              A person replies.
            </span>
          </h1>

          <p
            className="relative mt-8 font-body text-base leading-relaxed"
            style={{ color: "rgba(96,108,56,0.52)", maxWidth: "520px" }}
          >
            A question about a powder, an order on its way, or what suits your
            skin — send it over. No bots, no ticket numbers. The people who
            grind the herbs read every message.
          </p>
        </section>

        {/* ── Channels + Form ── */}
        <section className="px-6 md:px-14 lg:px-24 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 lg:gap-20 max-w-6xl">
            {/* Channels */}
            <div className="lg:col-span-2">
              <p
                className="font-accent text-[10px] tracking-[0.22em] uppercase mb-8"
                style={{ color: "rgba(96,108,56,0.42)" }}
              >
                — FOUR WAYS TO REACH US
              </p>

              <ul className="space-y-7">
                {channels.map((ch) => {
                  const inner = (
                    <span className="flex items-baseline gap-4">
                      <span
                        className="font-heading text-sm shrink-0"
                        style={{ color: "rgba(96,108,56,0.3)" }}
                      >
                        {ch.num}
                      </span>
                      <span>
                        <span
                          className="block font-accent text-[10px] tracking-[0.18em] uppercase"
                          style={{ color: "rgba(96,108,56,0.42)" }}
                        >
                          {ch.label}
                        </span>
                        <span
                          className="contact-channel-value block font-heading text-xl md:text-2xl font-light mt-1 transition-colors"
                          style={{ color: "#606C38" }}
                        >
                          {ch.value}
                        </span>
                        <span
                          className="block font-body text-xs mt-1"
                          style={{ color: "rgba(96,108,56,0.45)" }}
                        >
                          {ch.note}
                        </span>
                      </span>
                    </span>
                  );
                  return (
                    <li key={ch.num}>
                      {ch.href ? (
                        <a
                          href={ch.href}
                          target={ch.href.startsWith("http") ? "_blank" : undefined}
                          rel={
                            ch.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="contact-channel-link block"
                        >
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </ul>

              <p
                className="mt-10 font-body text-xs leading-relaxed"
                style={{ color: "rgba(96,108,56,0.45)" }}
              >
                Looking for shipping times or order help? Most answers are
                already in our{" "}
                <Link
                  href="/faq"
                  className="underline underline-offset-2"
                  style={{ color: "#834316" }}
                >
                  FAQ
                </Link>
                .
              </p>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <h2
                className="font-heading font-light leading-tight mb-10"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  color: "#606C38",
                }}
              >
                Or send it{" "}
                <span style={{ color: "#834316", fontStyle: "italic" }}>
                  right here.
                </span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8" noValidate={false}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-accent text-[10px] tracking-[0.18em] uppercase mb-1"
                      style={{ color: "rgba(96,108,56,0.42)" }}
                    >
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-accent text-[10px] tracking-[0.18em] uppercase mb-1"
                      style={{ color: "rgba(96,108,56,0.42)" }}
                    >
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block font-accent text-[10px] tracking-[0.18em] uppercase mb-1"
                      style={{ color: "rgba(96,108,56,0.42)" }}
                    >
                      Phone
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      inputMode="numeric"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                        })
                      }
                      autoComplete="tel"
                      placeholder="Optional"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block font-accent text-[10px] tracking-[0.18em] uppercase mb-1"
                      style={{ color: "rgba(96,108,56,0.42)" }}
                    >
                      Subject *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      required
                      placeholder="What's this about?"
                      className={fieldClass}
                      style={fieldStyle}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-accent text-[10px] tracking-[0.18em] uppercase mb-1"
                    style={{ color: "rgba(96,108,56,0.42)" }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                    rows={5}
                    placeholder="How can we help you?"
                    className={`${fieldClass} resize-none`}
                    style={fieldStyle}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-submit-btn inline-flex items-center gap-3 px-10 py-4 rounded-full font-accent text-[11px] tracking-[0.15em] uppercase transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#606C38", color: "#FEFAE0" }}
                >
                  {isSubmitting ? "Sending…" : "Send Message →"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ── WhatsApp CTA ── */}
        <section
          className="relative overflow-hidden px-6 md:px-14 lg:px-24 py-20 md:py-28"
          style={{ backgroundColor: "#606C38" }}
        >
          {/* Watermark */}
          <div
            className="absolute inset-0 flex items-end pointer-events-none select-none overflow-hidden"
            aria-hidden="true"
          >
            <span
              className="font-heading font-light italic leading-none whitespace-nowrap"
              style={{
                fontSize: "clamp(7rem, 20vw, 16rem)",
                color: "rgba(254,250,224,0.04)",
                letterSpacing: "-0.04em",
                marginBottom: "-0.18em",
              }}
            >
              hello
            </span>
          </div>

          <p
            className="relative font-accent text-[10px] tracking-[0.22em] uppercase mb-8"
            style={{ color: "rgba(254,250,224,0.45)" }}
          >
            — IN A HURRY?
          </p>

          <h2
            className="relative font-heading font-light leading-[1.08]"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              letterSpacing: "-0.02em",
              color: "#FEFAE0",
            }}
          >
            WhatsApp is the{" "}
            <span style={{ color: "#E26713", fontStyle: "italic" }}>
              fast lane.
            </span>
          </h2>

          <p
            className="relative mt-6 font-body text-sm leading-relaxed"
            style={{ color: "rgba(254,250,224,0.55)", maxWidth: "440px" }}
          >
            Order updates, ritual doubts, which powder for which skin — message
            us and we&apos;ll sort it out in chat.
          </p>

          <a
            href="https://wa.me/918600151677"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-wa-btn relative inline-flex items-center gap-3 px-10 py-4 mt-10 rounded-full font-accent text-[11px] tracking-[0.15em] uppercase transition-all duration-200"
            style={{ backgroundColor: "#FEFAE0", color: "#606C38" }}
          >
            Chat on WhatsApp →
          </a>
        </section>
      </div>
    </>
  );
}
