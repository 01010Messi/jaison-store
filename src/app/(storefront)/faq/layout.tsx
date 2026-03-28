import type { Metadata } from "next";
import { FAQPageJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Find answers about Jaison Herbals Ayurvedic products — shipping, returns, how to use, storage, and more. 100% natural skincare & haircare from India.",
  alternates: {
    canonical: "https://jaisonskincare.com/faq",
  },
};

const faqs = [
  { question: "Are your products 100% natural?", answer: "Yes, all jaison products are made from 100% natural ingredients with no chemicals, preservatives, or artificial additives. We source our herbs directly from trusted suppliers across India." },
  { question: "How should I store the products?", answer: "Store our powder products in a cool, dry place away from direct sunlight. Keep the packaging tightly sealed after use to maintain freshness and potency. Avoid moisture entering the pouch." },
  { question: "What is your shipping policy?", answer: "We offer free shipping on orders above ₹499. Orders below ₹499 attract a shipping fee of ₹49. Standard delivery takes 5-7 business days across India. We ship via trusted courier partners." },
  { question: "Do you offer Cash on Delivery (COD)?", answer: "Yes, we offer Cash on Delivery at a nominal fee of ₹40. COD is available for all serviceable pin codes. You can also pay online via UPI, credit/debit card, or net banking for free." },
  { question: "What is your return policy?", answer: "We accept returns within 7 days of delivery if the product is unused and in its original packaging. For quality issues, we offer a full replacement. Please contact us with photos and your order number." },
  { question: "Can I use multiple products together?", answer: "Absolutely! Many of our products work wonderfully together. For example, you can mix amla, reetha, and shikakai for a complete hair care routine. Multani mitti pairs beautifully with neem or orange peel for face packs." },
  { question: "Are your products suitable for sensitive skin?", answer: "Our products are made from gentle, natural ingredients and are generally suitable for sensitive skin. However, we always recommend doing a patch test before first use, especially if you have known allergies." },
  { question: "How long will I see results?", answer: "Most customers notice a visible difference within 2-3 weeks of regular use. However, for best results, we recommend consistent use for at least 4-6 weeks as natural ingredients work gradually with your skin and hair." },
  { question: "Do you ship internationally?", answer: "Currently, we ship within India only. We are working on expanding to international markets. Subscribe to our newsletter to be the first to know when we launch international shipping." },
  { question: "How can I contact customer support?", answer: "You can reach us via WhatsApp, email at Jaisonskincare@gmail.com, or through the Contact page on our website. We respond to all queries within 24 hours." },
];

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://jaisonskincare.com" },
          { name: "FAQ", url: "https://jaisonskincare.com/faq" },
        ]}
      />
      {children}
    </>
  );
}
