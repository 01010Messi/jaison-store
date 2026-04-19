import { NextResponse } from "next/server";
import { products } from "@/data/products";

const APP_URL = "https://jaisonskincare.com";

export async function GET() {
  const feedItems = products.map((product) => ({
    id: product.sku,
    title: `${product.name} — Jaison Herbals | 100% Natural Ayurvedic`,
    description: product.shortDescription,
    link: `${APP_URL}/shop/${product.slug}`,
    image_link: product.image.startsWith("http")
      ? product.image
      : `${APP_URL}${product.image}`,
    additional_image_link: product.images
      .slice(1, 5)
      .map((img) => (img.startsWith("http") ? img : `${APP_URL}${img}`)),
    availability: "in_stock",
    price: `${product.price}.00 INR`,
    sale_price: product.compareAtPrice
      ? `${product.price}.00 INR`
      : undefined,
    regular_price: product.compareAtPrice
      ? `${product.compareAtPrice}.00 INR`
      : undefined,
    brand: "Jaison Herbals",
    condition: "new",
    google_product_category: "Health & Beauty > Personal Care > Cosmetics > Skin Care",
    product_type: `${product.category} > ${product.name}`,
    identifier_exists: "no",
    shipping: {
      country: "IN",
      price: product.price >= 499 ? "0.00 INR" : "60.00 INR",
    },
    custom_label_0: product.isFeatured ? "featured" : "standard",
    custom_label_1: product.category,
  }));

  return NextResponse.json(feedItems, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
