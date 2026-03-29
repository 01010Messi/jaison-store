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
        categories: { include: { category: true } },
      },
      orderBy: { name: "asc" },
    });

    const headers = [
      "Name",
      "SKU",
      "Price",
      "Compare At Price",
      "Stock",
      "Weight (g)",
      "Categories",
      "Active",
      "Featured",
      "Slug",
    ];

    const rows = products.map((p) => {
      const cats = p.categories.map((c) => c.category.name).join("; ");
      return [
        p.name,
        p.sku,
        Number(p.price).toFixed(2),
        p.compareAtPrice ? Number(p.compareAtPrice).toFixed(2) : "",
        String(p.stock),
        String(p.weight || ""),
        cats,
        p.isActive ? "Yes" : "No",
        p.isFeatured ? "Yes" : "No",
        p.slug,
      ];
    });

    const escapeCsv = (val: string) => {
      if (val.includes(",") || val.includes('"') || val.includes("\n")) {
        return `"${val.replace(/"/g, '""')}"`;
      }
      return val;
    };

    const csv = [
      headers.map(escapeCsv).join(","),
      ...rows.map((row) => row.map(escapeCsv).join(",")),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="jaison-products-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error("Products export failed:", error);
    return NextResponse.json(
      { message: "Failed to export products" },
      { status: 500 }
    );
  }
}
