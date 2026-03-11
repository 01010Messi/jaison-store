import { PrismaClient } from "@prisma/client";
import { products, categories } from "../src/data/products";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.productCategory.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("📦 Creating categories...");

  const categoryMap = new Map<string, string>();

  for (const cat of categories) {
    const created = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        sortOrder: categories.indexOf(cat),
      },
    });
    categoryMap.set(cat.slug, created.id);
    console.log(`  ✓ ${cat.name}`);
  }

  console.log("🧴 Creating products...");

  for (const product of products) {
    const categoryId = categoryMap.get(product.categorySlug);
    if (!categoryId) {
      console.log(`  ✗ Category not found for ${product.name}`);
      continue;
    }

    const created = await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDescription: product.shortDescription,
        price: product.price,
        sku: product.sku,
        weight: product.weight,
        weightUnit: "g",
        stock: 50,
        isActive: true,
        isFeatured: product.isFeatured,
        ingredients: product.ingredients,
        howToUse: product.howToUse,
        benefits: product.benefits,
        metaTitle: `${product.name} — jaison Natural Herbals`,
        metaDescription: product.shortDescription,
        tags: product.tags,
        images: {
          create: product.images.map((imgUrl, idx) => ({
            url: imgUrl,
            publicId: `${product.slug}-${idx}`,
            altText: product.name,
            sortOrder: idx,
          })),
        },
        categories: {
          create: [
            {
              categoryId,
            },
          ],
        },
      },
    });

    console.log(`  ✓ ${created.name} (${product.price})`);
  }

  // Seed coupons
  console.log("🎟️  Creating coupons...");
  await prisma.coupon.deleteMany();

  await prisma.coupon.create({
    data: {
      code: "WELCOME10",
      description: "10% off for new customers",
      discountType: "percentage",
      discountValue: 10,
      minOrderAmount: 299,
      maxDiscount: 100,
      isActive: true,
    },
  });
  console.log("  ✓ WELCOME10 (10% off, min ₹299, max ₹100)");

  await prisma.coupon.create({
    data: {
      code: "FLAT50",
      description: "₹50 off on orders above ₹499",
      discountType: "fixed",
      discountValue: 50,
      minOrderAmount: 499,
      isActive: true,
    },
  });
  console.log("  ✓ FLAT50 (₹50 off, min ₹499)");

  console.log("\n✅ Seed complete!");
  console.log(`   ${categories.length} categories created`);
  console.log(`   ${products.length} products created`);
  console.log(`   2 coupons created`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
