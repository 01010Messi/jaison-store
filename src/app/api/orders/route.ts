import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import { sendOrderConfirmation } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const {
      items,
      address,
      paymentMethod,
      subtotal,
      shippingCost,
      codFee,
      discount,
      couponCode,
      total,
      guestEmail,
      guestPhone,
    } = body;

    // Must be logged in OR provide guest email
    if (!session?.user?.email && !guestEmail) {
      return NextResponse.json(
        { message: "Email is required for checkout" },
        { status: 400 }
      );
    }

    if (!items?.length || !address || !paymentMethod) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["RAZORPAY", "COD"].includes(paymentMethod)) {
      return NextResponse.json(
        { message: "Invalid payment method" },
        { status: 400 }
      );
    }

    // Determine user (logged in) or guest
    let userId: string | null = null;
    let customerEmail: string;
    const customerName: string = address.fullName;

    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (user) {
        userId = user.id;
      }
      customerEmail = session.user.email;
    } else {
      customerEmail = guestEmail;
    }

    // Save shipping address
    const savedAddress = await prisma.address.create({
      data: {
        ...(userId ? { userId } : {}),
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 || null,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        landmark: address.landmark || null,
      },
    });

    const orderNumber = generateOrderNumber();

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        ...(userId ? { userId } : {}),
        ...(!userId && guestEmail
          ? { guestEmail, guestPhone: guestPhone || address.phone }
          : {}),
        shippingAddressId: savedAddress.id,
        status: "PENDING",
        paymentMethod,
        paymentStatus: paymentMethod === "COD" ? "PENDING" : "PAID",
        subtotal,
        shippingCost: shippingCost || 0,
        codFee: codFee || 0,
        discount: discount || 0,
        total,
        couponCode: couponCode || null,
        items: {
          create: items.map(
            (item: {
              productId: string;
              name: string;
              price: number;
              quantity: number;
              image?: string;
            }) => ({
              productId: item.productId,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image || null,
            })
          ),
        },
      },
      include: {
        items: true,
        shippingAddress: true,
      },
    });

    // Update product stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Send order confirmation email
    sendOrderConfirmation({
      orderNumber: order.orderNumber,
      customerName,
      customerEmail,
      items: order.items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: Number(i.price),
        image: i.image || undefined,
      })),
      subtotal: Number(order.subtotal),
      shippingCost: Number(order.shippingCost),
      codFee: Number(order.codFee),
      discount: Number(order.discount),
      total: Number(order.total),
      paymentMethod: order.paymentMethod,
      shippingAddress: {
        fullName: savedAddress.fullName,
        addressLine1: savedAddress.addressLine1,
        addressLine2: savedAddress.addressLine2 || undefined,
        city: savedAddress.city,
        state: savedAddress.state,
        pincode: savedAddress.pincode,
        phone: savedAddress.phone,
      },
    }).catch((err) => console.error("Email send failed:", err));

    return NextResponse.json({
      orderNumber: order.orderNumber,
      orderId: order.id,
      status: order.status,
      paymentMethod: order.paymentMethod,
      total: Number(order.total),
      estimatedDelivery: "5-7 business days",
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}

// GET — list orders for current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ orders: [] });
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        items: true,
        shippingAddress: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      orders: orders.map((o) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        status: o.status,
        paymentMethod: o.paymentMethod,
        paymentStatus: o.paymentStatus,
        subtotal: Number(o.subtotal),
        shippingCost: Number(o.shippingCost),
        total: Number(o.total),
        trackingNumber: o.trackingNumber,
        trackingUrl: o.trackingUrl,
        invoiceUrl: o.invoiceUrl,
        createdAt: o.createdAt,
        items: o.items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: Number(i.price),
          image: i.image,
        })),
        shippingAddress: o.shippingAddress,
      })),
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
