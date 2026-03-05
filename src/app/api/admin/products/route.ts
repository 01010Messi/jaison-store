import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (
      !session?.user ||
      (session.user as { role?: string }).role !== "ADMIN"
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const products = await prisma.product.findMany({
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        categories: { include: { category: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: Number(p.price),
        sku: p.sku,
        stock: p.stock,
        isActive: p.isActive,
        isFeatured: p.isFeatured,
        images: p.images.map((i) => ({ url: i.url, publicId: i.publicId })),
        categories: p.categories.map((c) => c.category.name),
        createdAt: p.createdAt,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (
      !session?.user ||
      (session.user as { role?: string }).role !== "ADMIN"
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const {
      name,
      slug,
      description,
      shortDescription,
      price,
      sku,
      weight,
      stock,
      isActive,
      isFeatured,
      ingredients,
      howToUse,
      benefits,
      categoryIds,
      images,
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        shortDescription,
        price,
        sku,
        weight,
        stock: stock || 0,
        isActive: isActive ?? true,
        isFeatured: isFeatured ?? false,
        ingredients,
        howToUse,
        benefits,
        metaTitle: `${name} — jaison Natural Herbals`,
        metaDescription: shortDescription,
        categories: {
          create: (categoryIds || []).map((catId: string) => ({
            categoryId: catId,
          })),
        },
        images: {
          create: (images || []).map(
            (img: { url: string; publicId: string }, i: number) => ({
              url: img.url,
              publicId: img.publicId,
              altText: name,
              sortOrder: i,
            })
          ),
        },
      },
    });

    return NextResponse.json({ id: product.id, slug: product.slug });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}
