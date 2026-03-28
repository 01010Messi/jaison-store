"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram } from "lucide-react";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import GoldRule from "@/components/decorative/GoldRule";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

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
        toast.success("Message sent! We'll get back to you soon.");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "Jaisonskincare@gmail.com",
      href: "mailto:Jaisonskincare@gmail.com",
    },
    {
      icon: Phone,
      label: "WhatsApp",
      value: "+91 86001 51677",
      href: "https://wa.me/918600151677",
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@jaison_skincare",
      href: "https://www.instagram.com/jaison_skincare/",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: null,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-surface-warm py-12 md:py-16">
        <div className="container-brand text-center">
          <ScrollReveal animation="fade-up">
            <p className="section-label text-sage mb-3">Get in Touch</p>
            <h1 className="font-heading text-3xl md:text-4xl text-bark font-light tracking-wide">
              Contact Us
            </h1>
            <div className="flex justify-center mt-4">
              <GoldRule variant="leaf" width="w-32" />
            </div>
            <p className="mt-4 text-bark/60 font-body text-sm max-w-md mx-auto">
              Have a question about our products? We&apos;d love to hear from
              you. Drop us a message and we&apos;ll get back within 24 hours.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container-brand py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <ScrollReveal animation="fade-up">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-parchment/50 rounded-full flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-bark/50" />
                    </div>
                    <div>
                      <p className="font-accent text-xs uppercase tracking-wider text-bark/40">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-heading text-sm text-bark hover:text-terracotta transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-heading text-sm text-bark">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </ScrollReveal>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <ScrollReveal animation="fade-up">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                    placeholder="Optional"
                  />
                  <Input
                    label="Subject"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                    Message <span className="text-terracotta">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="w-full px-3 py-2.5 border border-border rounded-sm text-sm font-body bg-cream focus:border-gold focus:ring-0 focus:outline-none transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                >
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </span>
                </Button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
