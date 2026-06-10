"use client";

import PolicyHero from "@/components/layout/PolicyHero";
import Accordion from "@/components/ui/Accordion";

const faqs = [
  { id: "1", title: "Are your products 100% natural?", content: "Yes, all Jaison products are made from 100% natural ingredients with no chemicals, preservatives, or artificial additives. We source our herbs directly from trusted suppliers across India." },
  { id: "2", title: "How should I store the products?", content: "Store our powder products in a cool, dry place away from direct sunlight. Keep the packaging tightly sealed after use to maintain freshness and potency. Avoid moisture entering the pouch." },
  { id: "3", title: "What is your shipping policy?", content: "We offer free shipping on orders above ₹499. Orders below ₹499 attract a shipping fee of ₹49. Standard delivery takes 5–7 business days across India. We ship via trusted courier partners." },
  { id: "4", title: "Do you offer Cash on Delivery (COD)?", content: "Yes, we offer Cash on Delivery at a nominal fee of ₹40. COD is available for all serviceable PIN codes. You can also pay online via UPI, credit/debit card, or net banking for free." },
  { id: "5", title: "What is your return policy?", content: "We accept returns within 7 days of delivery if the product is unused and in its original packaging. For quality issues, we offer a full replacement. Please contact us with photos and your order number." },
  { id: "6", title: "Can I use multiple products together?", content: "Absolutely. Many of our products work wonderfully together. Mix amla, reetha, and shikakai for a complete hair care routine. Multani mitti pairs beautifully with neem or orange peel for face packs." },
  { id: "7", title: "Are your products suitable for sensitive skin?", content: "Our products are made from gentle, natural ingredients and are generally suitable for sensitive skin. We always recommend a patch test before first use, especially if you have known allergies." },
  { id: "8", title: "How long will I see results?", content: "Most customers notice a visible difference within 2–3 weeks of regular use. For best results, use consistently for at least 4–6 weeks as natural ingredients work gradually with your skin and hair." },
  { id: "9", title: "Do you ship internationally?", content: "Currently we ship within India only. We are working on expanding to international markets. Subscribe to our newsletter to be the first to know when we launch international shipping." },
  { id: "10", title: "How can I contact customer support?", content: "You can reach us via email at Jaisonskincare@gmail.com or through the Contact page on our website. We respond to all queries within 24 hours." },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <PolicyHero
        watermark="FAQ"
        eyebrow="— Help Center · Common Questions"
        title="Questions,"
        accent="answered."
        sub="Everything you need to know about our products, shipping, and care."
      />
      <div className="container-brand py-10 md:py-12 max-w-3xl mx-auto">
        <Accordion items={faqs} allowMultiple />
      </div>
    </div>
  );
}
