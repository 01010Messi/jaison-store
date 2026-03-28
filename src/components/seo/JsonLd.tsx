import { products } from "@/data/products";
import { blogPosts } from "@/data/blog";

const BASE_URL = "https://jaisonskincare.com";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jaison Herbals",
    alternateName: "Jaison Skincare",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description:
      "100% natural Ayurvedic herbal powders for skin and hair — handcrafted with love in India.",
    foundingLocation: {
      "@type": "Place",
      name: "Nashik, Maharashtra, India",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8600151677",
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: ["https://www.instagram.com/jaison_skincare/"],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "60, Floor No. 6, Business Bay Premises, Shree Hari Kute Marg, Mumbai Naka",
      addressLocality: "Nashik",
      addressRegion: "Maharashtra",
      postalCode: "422002",
      addressCountry: "IN",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "jaison",
    alternateName: "Jaison Skincare",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug);
  if (!product) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((img) => `${BASE_URL}${img}`),
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "Jaison Herbals",
    },
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/shop/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Jaison Herbals",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
      },
    },
    category: product.category,
    weight: {
      "@type": "QuantitativeValue",
      value: product.weight,
      unitCode: "GRM",
    },
    material: product.ingredients,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CollectionPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Shop All Products — Jaison Herbals",
    description:
      "Browse our complete collection of 100% natural Ayurvedic herbal powders for skin and hair care.",
    url: `${BASE_URL}/shop`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${BASE_URL}/shop/${product.slug}`,
        name: product.name,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQPageJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleJsonLd({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Jaison Herbals",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Jaison Herbals",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductFAQJsonLd({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug);
  if (!product) return null;

  const faqs = [
    {
      question: `What are the ingredients in ${product.name}?`,
      answer: product.ingredients,
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
      question: `What is the weight and price of ${product.name}?`,
      answer: `${product.name} comes in a ${product.weight}g pack priced at ₹${product.price}. Free shipping is available on orders above ₹499.`,
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Jaison Herbals",
    image: `${BASE_URL}/images/logo.png`,
    url: BASE_URL,
    telephone: "+91-8600151677",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "60, Floor No. 6, Business Bay Premises, Shree Hari Kute Marg, Mumbai Naka",
      addressLocality: "Nashik",
      addressRegion: "Maharashtra",
      postalCode: "422002",
      addressCountry: "IN",
    },
    priceRange: "₹250 - ₹550",
    sameAs: ["https://www.instagram.com/jaison_skincare/"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
