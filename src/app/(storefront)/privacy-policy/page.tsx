import type { Metadata } from "next";
import PolicyHero from "@/components/layout/PolicyHero";

export const metadata: Metadata = {
  title: "Privacy Policy | Jaison Natural Herbals",
  description:
    "Learn how Jaison Herbals collects, uses, and protects your personal information. Data security, cookies, and your rights explained.",
  alternates: {
    canonical: "https://jaisonskincare.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <PolicyHero
        eyebrow="— Legal · Privacy Policy"
        title="Your data,"
        accent="your rights."
        sub="What we collect, how we use it, and what you can do about it."
      />

      <div className="container-brand py-10 md:py-12 max-w-3xl mx-auto">
        <div className="space-y-10 font-body text-bark/70 text-base leading-relaxed">

          <div>
            <h2 className="font-heading text-xl md:text-2xl text-bark font-light mb-3">Information We Collect</h2>
            <p>We collect personal information you provide when creating an account, placing an order, subscribing to our newsletter, or contacting us — including your name, email address, phone number, shipping address, and payment information.</p>
          </div>

          <div className="pt-6 border-t border-border-light">
            <h2 className="font-heading text-xl md:text-2xl text-bark font-light mb-3">How We Use Your Information</h2>
            <ul className="space-y-2">
              {[
                "Process and fulfill your orders",
                "Send order confirmations and shipping updates",
                "Respond to your inquiries and customer support requests",
                "Send promotional offers (only if you opt in)",
                "Improve our products and website experience",
              ].map((item, i) => (
                <li key={i} className="flex items-baseline gap-3">
                  <span className="font-heading text-terracotta font-light shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-border-light">
            <h2 className="font-heading text-xl md:text-2xl text-bark font-light mb-3">Data Protection</h2>
            <p>We implement industry-standard security measures to protect your personal data. Payment transactions are processed through Razorpay&apos;s secure payment gateway. We never store your card details on our servers.</p>
          </div>

          <div className="pt-6 border-t border-border-light">
            <h2 className="font-heading text-xl md:text-2xl text-bark font-light mb-3">Cookies</h2>
            <p>Our website uses cookies to enhance your browsing experience and remember your preferences. You can disable cookies in your browser settings, though this may affect site functionality.</p>
          </div>

          <div className="pt-6 border-t border-border-light">
            <h2 className="font-heading text-xl md:text-2xl text-bark font-light mb-3">Third-Party Services</h2>
            <p>We share your shipping information with our logistics partners (Shiprocket) to deliver your orders. Payment processing is handled by Razorpay. We do not sell or share your data with any other third parties.</p>
          </div>

          <div className="pt-6 border-t border-border-light">
            <h2 className="font-heading text-xl md:text-2xl text-bark font-light mb-3">Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information at any time. Contact us at Jaisonskincare@gmail.com to exercise these rights.</p>
          </div>

          <p className="pt-6 border-t border-border-light text-bark/35 text-xs">Last updated: March 2026</p>
        </div>
      </div>
    </div>
  );
}
