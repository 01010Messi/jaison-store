import { NextResponse } from "next/server";
import { products } from "@/data/products";

const APP_URL = "https://jaisonskincare.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = products
    .map((p) => {
      const imageUrl = p.image.startsWith("http") ? p.image : `${APP_URL}${p.image}`;
      const additionalImages = p.images
        .slice(1, 5)
        .map((img) => {
          const url = img.startsWith("http") ? img : `${APP_URL}${img}`;
          return `      <g:additional_image_link>${escapeXml(url)}</g:additional_image_link>`;
        })
        .join("\n");

      return `    <item>
      <g:id>${escapeXml(p.sku)}</g:id>
      <g:title>${escapeXml(p.name)} — Jaison Herbals | 100% Natural Ayurvedic</g:title>
      <g:description>${escapeXml(p.shortDescription)}</g:description>
      <g:link>${APP_URL}/shop/${p.slug}</g:link>
      <g:image_link>${escapeXml(imageUrl)}</g:image_link>
${additionalImages}
      <g:availability>in_stock</g:availability>
      <g:price>${p.price}.00 INR</g:price>${
        p.compareAtPrice
          ? `\n      <g:sale_price>${p.price}.00 INR</g:sale_price>`
          : ""
      }
      <g:brand>Jaison Herbals</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>Health &amp; Beauty &gt; Personal Care &gt; Cosmetics &gt; Skin Care</g:google_product_category>
      <g:product_type>${escapeXml(p.category)} &gt; ${escapeXml(p.name)}</g:product_type>
      <g:identifier_exists>no</g:identifier_exists>
      <g:shipping>
        <g:country>IN</g:country>
        <g:price>${p.price >= 499 ? "0.00" : "60.00"} INR</g:price>
      </g:shipping>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Jaison Herbals — Natural Ayurvedic Skincare</title>
    <link>${APP_URL}</link>
    <description>100% Natural Ayurvedic herbal powders for skin and hair care</description>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
