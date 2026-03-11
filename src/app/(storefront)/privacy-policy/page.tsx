import type { Metadata } from "next";
import GoldRule from "@/components/decorative/GoldRule";

export const metadata: Metadata = {
  title: "Privacy Policy | jaison Natural Herbals",
  description: "Learn how jaison collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-surface-warm py-12 md:py-16">
        <div className="container-brand text-center">
          <p className="section-label text-sage mb-3">Legal</p>
          <h1 className="font-heading text-3xl md:text-4xl text-bark font-light tracking-wide">
            Privacy Policy
          </h1>
          <div className="flex justify-center mt-4">
            <GoldRule variant="leaf" width="w-32" />
          </div>
        </div>
      </div>

      <div className="container-brand py-12 md:py-16 max-w-3xl mx-auto">
        <div className="space-y-6 text-bark/70 font-body text-sm leading-relaxed">
          <h2 className="font-heading text-xl text-bark">Information We Collect</h2>
          <p>
            We collect personal information that you provide when creating an
            account, placing an order, subscribing to our newsletter, or
            contacting us. This may include your name, email address, phone
            number, shipping address, and payment information.
          </p>

          <h2 className="font-heading text-xl text-bark">How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Respond to your inquiries and customer support requests</li>
            <li>Send promotional offers (only if you opt in)</li>
            <li>Improve our products and website experience</li>
          </ul>

          <h2 className="font-heading text-xl text-bark">Data Protection</h2>
          <p>
            We implement industry-standard security measures to protect your
            personal data. Payment transactions are processed through Razorpay&apos;s
            secure payment gateway, and we never store your card details on our
            servers.
          </p>

          <h2 className="font-heading text-xl text-bark">Cookies</h2>
          <p>
            Our website uses cookies to enhance your browsing experience and
            remember your preferences. You can disable cookies in your browser
            settings, though this may affect site functionality.
          </p>

          <h2 className="font-heading text-xl text-bark">Third-Party Services</h2>
          <p>
            We share your shipping information with our logistics partners
            (Shiprocket) to deliver your orders. Payment processing is handled
            by Razorpay. We do not sell or share your data with any other third
            parties.
          </p>

          <h2 className="font-heading text-xl text-bark">Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal
            information at any time. Contact us at Jaisonskincare@gmail.com to
            exercise these rights.
          </p>

          <p className="text-bark/40 text-xs mt-8">
            Last updated: March 2026
          </p>
        </div>
      </div>
    </div>
  );
}
