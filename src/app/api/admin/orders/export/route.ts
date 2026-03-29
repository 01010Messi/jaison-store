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

    const orders = await prisma.order.findMany({
      include: {
        items: true,
        shippingAddress: true,
        user: { select: { name: true, email: true, phone: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      "Order Number",
      "Date",
      "Customer Name",
      "Email",
      "Phone",
      "Status",
      "Payment Method",
      "Payment Status",
      "Items",
      "Subtotal",
      "Shipping",
      "COD Fee",
      "Discount",
      "Total",
      "Coupon Code",
      "Tracking Number",
      "Address",
      "City",
      "State",
      "Pincode",
    ];

    const rows = orders.map((o) => {
      const customer = o.user || {
        name: o.guestEmail?.split("@")[0] || "Guest",
        email: o.guestEmail || "",
        phone: o.guestPhone || "",
      };
      const itemsSummary = o.items
        .map((i) => `${i.name} x${i.quantity}`)
        .join("; ");
      const addr = o.shippingAddress;

      return [
        o.orderNumber,
        new Date(o.createdAt).toISOString().slice(0, 10),
        customer.name || "",
        customer.email || "",
        customer.phone || "",
        o.status,
        o.paymentMethod,
        o.paymentStatus,
        itemsSummary,
        Number(o.subtotal).toFixed(2),
        Number(o.shippingCost).toFixed(2),
        Number(o.codFee).toFixed(2),
        Number(o.discount).toFixed(2),
        Number(o.total).toFixed(2),
        o.couponCode || "",
        o.trackingNumber || "",
        addr
          ? `${addr.addressLine1}${addr.addressLine2 ? ", " + addr.addressLine2 : ""}`
          : "",
        addr?.city || "",
        addr?.state || "",
        addr?.pincode || "",
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
        "Content-Disposition": `attachment; filename="jaison-orders-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error("Orders export failed:", error);
    return NextResponse.json(
      { message: "Failed to export orders" },
      { status: 500 }
    );
  }
}
