import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import ProductDetail from "@/components/product/ProductDetail";
import {
  ProductJsonLd,
  BreadcrumbJsonLd,
  ProductFAQJsonLd,
} from "@/components/seo/JsonLd";

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const title = `${product.name} — Buy Natural ${product.category} Online | jaison`;
  const rawDescription = `${product.shortDescription} 100% natural, chemical-free. ₹${product.price} for ${product.weight}g. Shop ${product.name} at Jaison Herbals.`;
  const description = rawDescription.length > 160 ? rawDescription.slice(0, 157) + "..." : rawDescription;
  const BASE_URL = "https://jaisonskincare.com";

  return {
    title,
    description,
    keywords: [
      product.name.toLowerCase(),
      `buy ${product.name.toLowerCase()} online`,
      `${product.name.toLowerCase()} for ${product.category.toLowerCase()}`,
      ...product.tags,
      "ayurvedic",
      "natural",
      "herbal",
      "jaison herbals",
    ],
    openGraph: {
      title,
      description,
      images: product.images.map((img, i) => ({
        url: `${BASE_URL}${img}`,
        alt:
          i === 0
            ? `${product.name} — natural ${product.category.toLowerCase()} powder by Jaison Herbals`
            : `${product.name} — product image ${i + 1}`,
      })),
      type: "website",
      url: `${BASE_URL}/shop/${product.slug}`,
    },
    other: {
      "product:price:amount": String(product.price),
      "product:price:currency": "INR",
      "product:availability": "in stock",
      "product:brand": "Jaison Herbals",
      "product:condition": "new",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — jaison Herbals`,
      description: product.shortDescription,
      images: [`${BASE_URL}${product.image}`],
    },
    alternates: {
      canonical: `${BASE_URL}/shop/${product.slug}`,
    },
  };
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductJsonLd slug={params.slug} />
      <ProductFAQJsonLd slug={params.slug} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://jaisonskincare.com" },
          { name: "Shop", url: "https://jaisonskincare.com/shop" },
          {
            name: product.name,
            url: `https://jaisonskincare.com/shop/${product.slug}`,
          },
        ]}
      />
      <ProductDetail product={product} />
    </>
  );
}
