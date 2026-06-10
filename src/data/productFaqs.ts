import type { Product } from "@/data/products";

export interface ProductFaq {
  question: string;
  answer: string;
}

// Single source of truth for product FAQs — used by the visible
// FAQ accordion on the product page AND the FAQPage JSON-LD schema,
// so the structured data always matches on-page content.
export function getProductFaqs(product: Product): ProductFaq[] {
  return [
    {
      question: `What are the ingredients in ${product.name}?`,
      answer: product.ingredients.replace(/\n/g, " "),
    },
    {
      question: `How do I use ${product.name}?`,
      answer: product.howToUse.replace(/\n/g, " "),
    },
    {
      question: `What are the benefits of ${product.name}?`,
      answer: product.benefits.replace(/\n/g, " "),
    },
    {
      question: `Is ${product.name} 100% natural?`,
      answer: `Yes, ${product.name} by Jaison Herbals is made from 100% natural ingredients with zero chemicals, preservatives, or artificial additives. It is handcrafted in Nashik, India using traditional Ayurvedic formulations.`,
    },
    {
      question: `How should I store ${product.name}?`,
      answer: `Keep the jar tightly closed in a cool, dry place away from direct sunlight and moisture. Always use a dry spoon — water in the jar is the only thing that can spoil a pure herbal powder.`,
    },
    {
      question: `What is the weight and price of ${product.name}?`,
      answer: `${product.name} comes in a ${product.weight}g pack priced at ₹${product.price}. Free shipping is available on orders above ₹499, and Cash on Delivery is supported.`,
    },
    {
      question: `What if my order arrives damaged or wrong?`,
      answer: `If your order arrives damaged or you receive the wrong item, contact us within 48 hours on WhatsApp (+91 86001 51677) or email with a photo, and we will ship a free replacement. As a hygiene-first policy on personal care products, we do not accept standard returns.`,
    },
  ];
}
