import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

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
    const { name, slug, description, image, sortOrder } = body;

    // Check the category exists
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    // Check for duplicate name (excluding current category)
    if (name && name !== existing.name) {
      const duplicateName = await prisma.category.findUnique({
        where: { name },
      });
      if (duplicateName) {
        return NextResponse.json(
          { message: "A category with this name already exists" },
          { status: 400 }
        );
      }
    }

    // Check for duplicate slug (excluding current category)
    if (slug && slug !== existing.slug) {
      const duplicateSlug = await prisma.category.findUnique({
        where: { slug },
      });
      if (duplicateSlug) {
        return NextResponse.json(
          { message: "A category with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: name ?? existing.name,
        slug: slug ?? existing.slug,
        description: description !== undefined ? description || null : existing.description,
        image: image !== undefined ? image || null : existing.image,
        sortOrder: sortOrder !== undefined ? sortOrder : existing.sortOrder,
      },
    });

    return NextResponse.json({
      id: category.id,
      name: category.name,
      slug: category.slug,
    });
  } catch (error) {
    console.error("Failed to update category:", error);
    return NextResponse.json(
      { message: "Failed to update category" },
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

    // Check the category exists
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    // Prevent deletion if products are linked
    if (category._count.products > 0) {
      return NextResponse.json(
        {
          message: `Cannot delete category with ${category._count.products} linked product${category._count.products === 1 ? "" : "s"}. Remove the products first.`,
        },
        { status: 400 }
      );
    }

    await prisma.category.delete({ where: { id } });

    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    console.error("Failed to delete category:", error);
    return NextResponse.json(
      { message: "Failed to delete category" },
      { status: 500 }
    );
  }
}
