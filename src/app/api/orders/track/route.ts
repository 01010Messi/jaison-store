import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Guest-friendly order lookup — no login required. A guest checkout never
// creates a password, so the account-orders page (session-gated) is a dead
// end for them. This verifies ownership via orderNumber + the email used at
// checkout instead, which only the customer and their inbox would have.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderNumber = (body.orderNumber || "").trim();
    const email = (body.email || "").trim().toLowerCase();

    if (!orderNumber || !email) {
      return NextResponse.json(
        { message: "Order number and email are required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: true,
        shippingAddress: true,
        user: { select: { email: true } },
      },
    });

    const ownerEmail = (order?.user?.email || order?.guestEmail || "").toLowerCase();

    // Same generic response whether the order doesn't exist or the email
    // doesn't match — don't give an enumeration oracle.
    if (!order || ownerEmail !== email) {
      return NextResponse.json(
        { message: "We couldn't find an order with that number and email. Double-check both and try again." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      order: {
        orderNumber: order.orderNumber,
        status: order.status,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        subtotal: Number(order.subtotal),
        shippingCost: Number(order.shippingCost),
        codFee: Number(order.codFee),
        discount: Number(order.discount),
        total: Number(order.total),
        trackingNumber: order.trackingNumber,
        trackingUrl: order.trackingUrl,
        invoiceUrl: order.invoiceUrl,
        estimatedDelivery: order.estimatedDelivery,
        createdAt: order.createdAt,
        items: order.items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: Number(i.price),
          image: i.image,
        })),
        shippingAddress: {
          fullName: order.shippingAddress.fullName,
          city: order.shippingAddress.city,
          state: order.shippingAddress.state,
          pincode: order.shippingAddress.pincode,
        },
      },
    });
  } catch (error) {
    console.error("Failed to look up order:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
