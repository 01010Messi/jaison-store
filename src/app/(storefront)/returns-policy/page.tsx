import type { Metadata } from "next";
import GoldRule from "@/components/decorative/GoldRule";

export const metadata: Metadata = {
  title: "Returns & Refunds | jaison Natural Herbals",
  description:
    "7-day hassle-free returns on Jaison Herbals products. Learn about eligibility, return process, and refund timelines for your order.",
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
          <h2 className="font-heading text-xl text-bark">Return Policy</h2>
          <p>
            At jaison, we want you to be completely satisfied with your purchase.
            If you&apos;re not happy with your order, we offer a hassle-free return
            policy within 7 days of delivery.
          </p>

          <h3 className="font-heading text-lg text-bark">Eligibility</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Products must be unused, unopened, and in original packaging</li>
            <li>Return request must be made within 7 days of delivery</li>
            <li>Products damaged during transit are eligible for immediate replacement</li>
            <li>Quality-related issues are eligible for full replacement</li>
          </ul>

          <h3 className="font-heading text-lg text-bark">How to Return</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Contact us via WhatsApp or email with your order number</li>
            <li>Share photos of the product (if damaged/quality issue)</li>
            <li>We&apos;ll arrange a pickup or provide return shipping details</li>
            <li>Refund or replacement will be processed within 5-7 business days</li>
          </ol>

          <h3 className="font-heading text-lg text-bark">Refunds</h3>
          <p>
            Refunds are processed to the original payment method within 5-7
            business days after we receive and inspect the returned product.
            COD orders are refunded via bank transfer.
          </p>

          <h3 className="font-heading text-lg text-bark">Non-Returnable Items</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Opened or used products (unless quality issue)</li>
            <li>Products returned after 7 days of delivery</li>
            <li>Free gifts or promotional items</li>
          </ul>

          <p className="text-bark/40 text-xs mt-8">
            Last updated: March 2026
          </p>
        </div>
      </div>
    </div>
  );
}
