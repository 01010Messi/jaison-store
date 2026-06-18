import type { Metadata } from "next";
import PolicyHero from "@/components/layout/PolicyHero";

export const metadata: Metadata = {
  title: "Terms of Service | Jaison Natural Herbals",
  description:
    "Terms and conditions for using jaisonskincare.com and purchasing Jaison Herbals natural Ayurvedic skincare products. Orders, shipping, returns, and more.",
  alternates: {
    canonical: "https://jaisonskincare.com/terms",
  },
};

const sections = [
  {
    heading: "General",
    body: "By accessing and using jaisonskincare.com, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.",
  },
  {
    heading: "Products",
    body: "All products sold on jaisonskincare.com are for external use only unless specifically stated otherwise. We make every effort to accurately display product details, but variations may occur due to screen settings. Product weights may have a tolerance of ±5%.",
  },
  {
    heading: "Orders & Pricing",
    body: "All prices are listed in Indian Rupees (INR) and include applicable taxes. We reserve the right to modify prices without prior notice. Orders are subject to product availability.",
  },
  {
    heading: "Shipping",
    body: "We aim to dispatch orders within 1–2 business days. Delivery timelines of 5–7 business days are estimates and may vary based on location and courier partner availability. We are not responsible for delays caused by courier partners or force majeure events.",
  },
  {
    heading: "Intellectual Property",
    body: "All content on jaisonskincare.com — including text, images, logos, and product photos — is the property of Jaison Herbals and is protected by copyright. Unauthorized reproduction or distribution is prohibited.",
  },
  {
    heading: "Limitation of Liability",
    body: "Jaison shall not be liable for any allergic reactions or adverse effects resulting from product use. We recommend performing a patch test before first use. Consult a dermatologist if you have specific skin conditions.",
  },
  {
    heading: "Governing Law",
    body: "These Terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in India.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <PolicyHero
        eyebrow="— Legal · Terms of Service"
        title="Using our site,"
        accent="your agreement."
        sub="The rules that govern your use of jaisonskincare.com and our products."
      />

      <div className="container-brand py-10 md:py-12 max-w-3xl mx-auto">
        <div className="space-y-0 font-body text-bark/70 text-base leading-relaxed">
          {sections.map((section, i) => (
            <div key={i} className={i > 0 ? "pt-8 mt-8 border-t border-border-light" : ""}>
              <h2 className="font-heading text-xl md:text-2xl text-bark font-light mb-3">{section.heading}</h2>
              <p>{section.body}</p>
            </div>
          ))}
          <p className="pt-8 mt-8 border-t border-border-light text-bark/72 text-xs">Last updated: March 2026</p>
        </div>
      </div>
    </div>
  );
}
