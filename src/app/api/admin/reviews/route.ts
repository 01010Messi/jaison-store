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

    const reviews = await prisma.review.findMany({
      include: {
        user: { select: { name: true, email: true } },
        product: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      reviews: reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        title: r.title,
        body: r.body,
        status: r.status,
        user: r.user,
        product: r.product,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json(
      { message: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (
      !session?.user ||
      (session.user as { role?: string }).role !== "ADMIN"
    ) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { id, status } = body;

    if (!["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    const review = await prisma.review.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ id: review.id, status: review.status });
  } catch (error) {
    console.error("Failed to update review:", error);
    return NextResponse.json(
      { message: "Failed to update review" },
      { status: 500 }
    );
  }
}
