import type { Metadata } from "next";
import GoldRule from "@/components/decorative/GoldRule";

export const metadata: Metadata = {
  title: "Returns & Refunds | Jaison Herbals",
  description:
    "Jaison Herbals replacement policy for damaged or wrong items. Contact us within 48 hours of delivery with your order number and a photo.",
  alternates: {
    canonical: "https://jaisonskincare.com/returns-policy",
  },
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-surface-warm py-12 md:py-16">
        <div className="container-brand text-center">
          <p className="section-label text-sage mb-3">Policies</p>
          <h1 className="font-heading text-3xl md:text-4xl text-bark font-light tracking-wide">
            Returns &amp; Refunds
          </h1>
          <div className="flex justify-center mt-4">
            <GoldRule variant="leaf" width="w-32" />
          </div>
        </div>
      </div>

      <div className="container-brand py-12 md:py-16 max-w-3xl mx-auto">
        <div className="prose-brand space-y-6 text-bark/70 font-body text-sm leading-relaxed">
          <h2 className="font-heading text-xl text-bark">Our Policy</h2>
          <p>
            We do not accept returns or exchanges for change of mind. All sales are
            final once dispatched.
          </p>

          <h3 className="font-heading text-lg text-bark">
            Damaged, Defective, or Wrong Items
          </h3>
          <p>
            If you receive a damaged, defective, or incorrect item, please contact
            us within <strong>48 hours of delivery</strong> via WhatsApp or email.
            Include your order number and a clear photo of the issue.
          </p>
          <p>
            We will send a replacement at no extra cost. No questions asked.
          </p>

          <h3 className="font-heading text-lg text-bark">How to Reach Us</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>WhatsApp: +91 86001 51677</li>
            <li>Email: hello@jaisonskincare.com</li>
            <li>Include: order number + photo of the damaged or wrong item</li>
          </ul>

          <h3 className="font-heading text-lg text-bark">Refunds</h3>
          <p>
            We do not issue refunds to the original payment method. We send a
            replacement product instead. This applies to both Razorpay and COD
            orders.
          </p>

          <p className="text-bark/40 text-xs mt-8">Last updated: June 2026</p>
        </div>
      </div>
    </div>
  );
}
