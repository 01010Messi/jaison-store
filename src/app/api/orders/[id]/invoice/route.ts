import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { generateInvoice } from "@/lib/invoice";
import { uploadImage } from "@/lib/cloudinary";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        items: true,
        shippingAddress: true,
        user: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    // Check ownership (unless admin)
    const isAdmin =
      (session.user as { role?: string }).role === "ADMIN";
    if (!isAdmin && order.user?.email !== session.user.email) {
      return NextResponse.json(
        { message: "Not authorized" },
        { status: 403 }
      );
    }

    // If invoice already generated, return the URL
    if (order.invoiceUrl) {
      return NextResponse.json({ invoiceUrl: order.invoiceUrl });
    }

    // Generate invoice PDF
    const pdfBuffer = await generateInvoice({
      orderNumber: order.orderNumber,
      orderDate: order.createdAt.toLocaleDateString("en-IN"),
      customerName: order.shippingAddress.fullName,
      customerEmail: order.user?.email || order.guestEmail || "",
      customerPhone: order.shippingAddress.phone,
      shippingAddress: {
        addressLine1: order.shippingAddress.addressLine1,
        addressLine2: order.shippingAddress.addressLine2 || undefined,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        pincode: order.shippingAddress.pincode,
      },
      items: order.items.map((item) => ({
        name: item.name,
        sku: item.productId,
        quantity: item.quantity,
        price: Number(item.price),
      })),
      subtotal: Number(order.subtotal),
      shippingCost: Number(order.shippingCost),
      codFee: Number(order.codFee),
      discount: Number(order.discount),
      total: Number(order.total),
      paymentMethod: order.paymentMethod,
      razorpayPaymentId: order.razorpayPaymentId || undefined,
    });

    // Upload to Cloudinary
    const uploaded = await uploadImage(pdfBuffer, "jaison/invoices");

    // Save invoice URL to order
    await prisma.order.update({
      where: { id: order.id },
      data: { invoiceUrl: uploaded.url },
    });

    return NextResponse.json({ invoiceUrl: uploaded.url });
  } catch (error) {
    console.error("Invoice generation failed:", error);
    return NextResponse.json(
      { message: "Failed to generate invoice" },
      { status: 500 }
    );
  }
}
