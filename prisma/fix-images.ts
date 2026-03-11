import { PrismaClient } from "@prisma/client";
import { products } from "../src/data/products";

const prisma = new PrismaClient();

async function main() {
  console.log("🖼️  Adding missing product images...\n");

  for (const product of products) {
    // Find product by slug
    const dbProduct = await prisma.product.findUnique({
      where: { slug: product.slug },
      include: { images: true },
    });

    if (!dbProduct) {
      console.log(`  ✗ Product not found: ${product.name} (${product.slug})`);
      continue;
    }

    // Check if already has multiple images
    if (dbProduct.images.length >= product.images.length) {
      console.log(`  ○ ${product.name} already has ${dbProduct.images.length} images, skipping`);
      continue;
    }

    // Get existing publicIds to avoid duplicates
    const existingUrls = new Set(dbProduct.images.map((img) => img.url));

    // Add missing images
    const newImages = product.images
      .filter((imgUrl) => !existingUrls.has(imgUrl))
      .map((imgUrl, idx) => ({
        productId: dbProduct.id,
        url: imgUrl,
        publicId: `${product.slug}-${dbProduct.images.length + idx}`,
        altText: product.name,
        sortOrder: dbProduct.images.length + idx,
      }));

    if (newImages.length > 0) {
      await prisma.productImage.createMany({ data: newImages });
      console.log(`  ✓ ${product.name}: added ${newImages.length} images (total: ${dbProduct.images.length + newImages.length})`);
    } else {
      console.log(`  ○ ${product.name}: no new images to add`);
    }
  }

  console.log("\n✅ Image fix complete!");
}

main()
  .catch((e) => {
    console.error("Fix failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
