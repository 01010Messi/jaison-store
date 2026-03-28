import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import ProductDetail from "@/components/product/ProductDetail";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const title = `${product.name} — Buy Natural ${product.category} Online | jaison`;
  const description = `${product.shortDescription} 100% natural, chemical-free. ₹${product.price} for ${product.weight}g. Shop ${product.name} at Jaison Herbals.`;

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
      images: product.images.map((img) => ({
        url: img,
        alt: product.name,
      })),
      type: "website",
      url: `https://jaisonskincare.com/shop/${product.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — jaison Herbals`,
      description: product.shortDescription,
      images: [product.image],
    },
    alternates: {
      canonical: `https://jaisonskincare.com/shop/${product.slug}`,
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
