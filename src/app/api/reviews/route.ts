import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
    const featured = searchParams.get("featured");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: Record<string, unknown> = { status: "APPROVED" };
    if (productId) where.productId = productId;

    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: { select: { name: true } },
        product: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: featured ? limit : undefined,
    });

    const totalCount = reviews.length;
    const averageRating =
      totalCount > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalCount
        : 0;

    return NextResponse.json({
      reviews: reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        title: r.title,
        body: r.body,
        userName: r.user.name || "Customer",
        productName: r.product.name,
        createdAt: r.createdAt,
      })),
      averageRating: Math.round(averageRating * 10) / 10,
      count: totalCount,
    });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json(
      { message: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Please login to write a review" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { productId, rating, title, reviewBody } = body;

    if (!productId || !rating || !reviewBody) {
      return NextResponse.json(
        { message: "Rating and review are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Check if user already reviewed this product
    const existing = await prisma.review.findUnique({
      where: { userId_productId: { userId: user.id, productId } },
    });

    if (existing) {
      return NextResponse.json(
        { message: "You have already reviewed this product" },
        { status: 409 }
      );
    }

    const review = await prisma.review.create({
      data: {
        userId: user.id,
        productId,
        rating,
        title: title || null,
        body: reviewBody,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      { message: "Review submitted! It will appear after approval.", id: review.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to submit review:", error);
    return NextResponse.json(
      { message: "Failed to submit review" },
      { status: 500 }
    );
  }
}
