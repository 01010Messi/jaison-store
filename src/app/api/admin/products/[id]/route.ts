import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { deleteImage } from "@/lib/cloudinary";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (
      !session?.user ||
      (session.user as { role?: string }).role !== "ADMIN"
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        categories: { include: { category: true } },
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDescription: product.shortDescription,
        price: Number(product.price),
        compareAtPrice: product.compareAtPrice
          ? Number(product.compareAtPrice)
          : null,
        sku: product.sku,
        weight: product.weight ? Number(product.weight) : null,
        weightUnit: product.weightUnit,
        stock: product.stock,
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        ingredients: product.ingredients,
        howToUse: product.howToUse,
        benefits: product.benefits,
        metaTitle: product.metaTitle,
        metaDescription: product.metaDescription,
        tags: product.tags,
        images: product.images.map((i) => ({
          id: i.id,
          url: i.url,
          publicId: i.publicId,
          altText: i.altText,
          sortOrder: i.sortOrder,
        })),
        categoryIds: product.categories.map((c) => c.categoryId),
        categories: product.categories.map((c) => ({
          id: c.category.id,
          name: c.category.name,
        })),
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (
      !session?.user ||
      (session.user as { role?: string }).role !== "ADMIN"
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    const {
      name,
      slug,
      description,
      shortDescription,
      price,
      compareAtPrice,
      sku,
      weight,
      weightUnit,
      stock,
      isActive,
      isFeatured,
      ingredients,
      howToUse,
      benefits,
      metaTitle,
      metaDescription,
      categoryIds,
      images,
    } = body;

    // Update the product within a transaction
    const product = await prisma.$transaction(async (tx) => {
      // Update the product fields
      const updated = await tx.product.update({
        where: { id },
        data: {
          name,
          slug,
          description,
          shortDescription: shortDescription || null,
          price,
          compareAtPrice: compareAtPrice || null,
          sku,
          weight: weight || null,
          weightUnit: weightUnit || "g",
          stock: stock ?? 0,
          isActive: isActive ?? true,
          isFeatured: isFeatured ?? false,
          ingredients: ingredients || null,
          howToUse: howToUse || null,
          benefits: benefits || null,
          metaTitle: metaTitle || `${name} — jaison Natural Herbals`,
          metaDescription: metaDescription || shortDescription || null,
        },
      });

      // Update categories: delete existing and re-create
      if (categoryIds !== undefined) {
        await tx.productCategory.deleteMany({ where: { productId: id } });
        if (categoryIds.length > 0) {
          await tx.productCategory.createMany({
            data: categoryIds.map((catId: string) => ({
              productId: id,
              categoryId: catId,
            })),
          });
        }
      }

      // Update images: delete existing and re-create
      if (images !== undefined) {
        // Get current images to clean up Cloudinary later
        const existingImages = await tx.productImage.findMany({
          where: { productId: id },
        });

        // Find images that were removed
        const newPublicIds = new Set(
          images.map((img: { publicId: string }) => img.publicId)
        );
        const removedImages = existingImages.filter(
          (img) => !newPublicIds.has(img.publicId)
        );

        // Delete all existing image records
        await tx.productImage.deleteMany({ where: { productId: id } });

        // Create new image records
        if (images.length > 0) {
          await tx.productImage.createMany({
            data: images.map(
              (
                img: { url: string; publicId: string; altText?: string },
                i: number
              ) => ({
                productId: id,
                url: img.url,
                publicId: img.publicId,
                altText: img.altText || name,
                sortOrder: i,
              })
            ),
          });
        }

        // Clean up removed images from Cloudinary (non-blocking)
        for (const img of removedImages) {
          deleteImage(img.publicId).catch((err) =>
            console.error("Failed to delete image from Cloudinary:", err)
          );
        }
      }

      return updated;
    });

    return NextResponse.json({ id: product.id, slug: product.slug });
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (
      !session?.user ||
      (session.user as { role?: string }).role !== "ADMIN"
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    // Get images to clean up from Cloudinary
    const product = await prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Delete product (cascades to images, categories)
    await prisma.product.delete({ where: { id } });

    // Clean up Cloudinary images (non-blocking)
    for (const img of product.images) {
      deleteImage(img.publicId).catch((err) =>
        console.error("Failed to delete image from Cloudinary:", err)
      );
    }

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
