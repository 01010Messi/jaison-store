import type { Metadata } from "next";
import PolicyHero from "@/components/layout/PolicyHero";

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
      <PolicyHero
        eyebrow="— Policies · Returns & Refunds"
        title="Simple policy,"
        accent="no surprises."
        sub="All sales are final. If something arrives damaged or wrong, we make it right — no questions asked."
      />

      <div className="container-brand py-10 md:py-12 max-w-3xl mx-auto">
        <div className="space-y-10 font-body text-bark/70 text-base leading-relaxed">

          <div>
            <h2 className="font-heading text-xl md:text-2xl text-bark font-light mb-3">Our Policy</h2>
            <p>We do not accept returns or exchanges for change of mind. All sales are final once dispatched.</p>
          </div>

          <div className="pt-6 border-t border-border-light">
            <h2 className="font-heading text-xl md:text-2xl text-bark font-light mb-3">Damaged, Defective, or Wrong Items</h2>
            <p className="mb-3">
              If you receive a damaged, defective, or incorrect item, please contact us within{" "}
              <strong className="text-bark font-medium">48 hours of delivery</strong> via email. Include your order number and a clear photo of the issue.
            </p>
            <p>We will send a replacement at no extra cost.</p>
          </div>

          <div className="pt-6 border-t border-border-light">
            <h2 className="font-heading text-xl md:text-2xl text-bark font-light mb-3">How to Reach Us</h2>
            <ul className="space-y-2">
              <li className="flex items-baseline gap-3">
                <span className="font-heading text-terracotta font-light">01</span>
                <span>Email: hello@jaisonskincare.com</span>
              </li>
              <li className="flex items-baseline gap-3">
                <span className="font-heading text-terracotta font-light">02</span>
                <span>Include your order number and a photo of the issue</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-border-light">
            <h2 className="font-heading text-xl md:text-2xl text-bark font-light mb-3">Refunds</h2>
            <p>We do not issue refunds to the original payment method. We send a replacement product instead. This applies to both Razorpay and COD orders.</p>
          </div>

          <p className="pt-6 border-t border-border-light text-bark/72 text-xs">Last updated: June 2026</p>
        </div>
      </div>
    </div>
  );
}
