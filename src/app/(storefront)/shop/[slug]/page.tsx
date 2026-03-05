import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import ProductDetail from "@/components/product/ProductDetail";

interface Props {
  params: { slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} — jaison Natural Herbals`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} — jaison Natural Herbals`,
      description: product.shortDescription,
      images: [{ url: product.image, alt: product.name }],
      type: "website",
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

  return <ProductDetail product={product} />;
}
