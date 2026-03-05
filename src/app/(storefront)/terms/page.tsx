import type { Metadata } from "next";
import GoldRule from "@/components/decorative/GoldRule";

export const metadata: Metadata = {
  title: "Terms of Service | jaison Natural Herbals",
  description: "Terms and conditions for using jaisonskincare.com and purchasing jaison products.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-surface-warm py-12 md:py-16">
        <div className="container-brand text-center">
          <p className="section-label text-sage mb-3">Legal</p>
          <h1 className="font-heading text-3xl md:text-4xl text-bark font-light tracking-wide">
            Terms of Service
          </h1>
          <div className="flex justify-center mt-4">
            <GoldRule variant="leaf" width="w-32" />
          </div>
        </div>
      </div>

      <div className="container-brand py-12 md:py-16 max-w-3xl mx-auto">
        <div className="space-y-6 text-bark/70 font-body text-sm leading-relaxed">
          <h2 className="font-heading text-xl text-bark">General</h2>
          <p>
            By accessing and using jaisonskincare.com, you agree to be bound by
            these Terms of Service. If you do not agree, please do not use our
            website or services.
          </p>

          <h2 className="font-heading text-xl text-bark">Products</h2>
          <p>
            All products sold on jaisonskincare.com are for external use only
            unless specifically stated otherwise. We make every effort to
            accurately display product colors and details, but variations may
            occur due to screen settings. Product weights may have a tolerance
            of ±5%.
          </p>

          <h2 className="font-heading text-xl text-bark">Orders &amp; Pricing</h2>
          <p>
            All prices are listed in Indian Rupees (INR) and include applicable
            taxes. We reserve the right to modify prices without prior notice.
            Orders are subject to product availability.
          </p>

          <h2 className="font-heading text-xl text-bark">Shipping</h2>
          <p>
            We aim to dispatch orders within 1-2 business days. Delivery
            timelines (5-7 business days) are estimates and may vary based on
            location and courier partner availability. We are not responsible
            for delays caused by courier partners or force majeure events.
          </p>

          <h2 className="font-heading text-xl text-bark">Intellectual Property</h2>
          <p>
            All content on jaisonskincare.com — including text, images, logos,
            and product photos — is the property of Jaison Herbals and is
            protected by copyright. Unauthorized reproduction or distribution is
            prohibited.
          </p>

          <h2 className="font-heading text-xl text-bark">Limitation of Liability</h2>
          <p>
            jaison shall not be liable for any allergic reactions or adverse
            effects resulting from product use. We recommend performing a patch
            test before first use. Consult a dermatologist if you have specific
            skin conditions.
          </p>

          <h2 className="font-heading text-xl text-bark">Governing Law</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes shall be
            subject to the jurisdiction of courts in India.
          </p>

          <p className="text-bark/40 text-xs mt-8">
            Last updated: March 2026
          </p>
        </div>
      </div>
    </div>
  );
}
