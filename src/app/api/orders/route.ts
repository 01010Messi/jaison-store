import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma, { isTransientDbError } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { generateOrderNumber } from "@/lib/utils";
import { sendOrderConfirmation } from "@/lib/email";
import { sendTelegramOrderNotification } from "@/lib/telegram";
import { sendOrderNotification } from "@/lib/whatsapp";

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

    // Resolve SKU-based productIds to actual DB product IDs
    const resolvedItems = await Promise.all(
      items.map(
        async (item: {
          productId: string;
          name: string;
          price: number;
          quantity: number;
          image?: string;
        }) => {
          let dbProductId = item.productId;
          // Check if productId is a SKU (not a valid Product.id)
          const productById = await prisma.product.findUnique({
            where: { id: item.productId },
            select: { id: true },
          });
          if (!productById) {
            // Try looking up by SKU
            const productBySku = await prisma.product.findUnique({
              where: { sku: item.productId },
              select: { id: true },
            });
            if (productBySku) {
              dbProductId = productBySku.id;
            }
          }
          return { ...item, productId: dbProductId };
        }
      )
    );

    // Reserve stock and create the order as one atomic step, so two
    // concurrent checkouts on the same low-stock item can't both succeed.
    // Retry on the rare order-number collision (900 possible values/day).
    let order;
    let finalOrderNumber = orderNumber;
    for (let attempt = 0; ; attempt++) {
      try {
        order = await prisma.$transaction(async (tx) => {
          for (const item of resolvedItems) {
            const result = await tx.product.updateMany({
              where: { id: item.productId, stock: { gte: item.quantity } },
              data: { stock: { decrement: item.quantity } },
            });
            if (result.count === 0) {
              throw new Error(`INSUFFICIENT_STOCK:${item.name}`);
            }
          }

          return tx.order.create({
            data: {
              orderNumber: finalOrderNumber,
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
                create: resolvedItems.map((item) => ({
                  productId: item.productId,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image || null,
                })),
              },
            },
            include: {
              items: true,
              shippingAddress: true,
            },
          });
        });
        break;
      } catch (err) {
        if (err instanceof Error && err.message.startsWith("INSUFFICIENT_STOCK:")) {
          return NextResponse.json(
            { message: `Insufficient stock for ${err.message.split(":")[1]}` },
            { status: 409 }
          );
        }
        const isCollision =
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === "P2002";
        if (isCollision && attempt < 2) {
          finalOrderNumber = generateOrderNumber();
          continue;
        }
        if (isTransientDbError(err) && attempt < 2) {
          continue;
        }
        throw err;
      }
    }

    // Send notifications (must await on Vercel serverless)
    const emailData = {
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
    };

    // Fire all notifications in parallel — each already swallows its own
    // error, so one slow/down service can't serialize and stall the others.
    const notifications: Promise<unknown>[] = [
      sendOrderConfirmation(emailData).catch((err) =>
        console.error("Email send failed:", err)
      ),
      sendTelegramOrderNotification({
        orderNumber: order.orderNumber,
        customerName,
        customerEmail,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        items: order.items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: Number(i.price),
        })),
        total: Number(order.total),
        shippingAddress: {
          fullName: savedAddress.fullName,
          addressLine1: savedAddress.addressLine1,
          addressLine2: savedAddress.addressLine2 || undefined,
          city: savedAddress.city,
          state: savedAddress.state,
          pincode: savedAddress.pincode,
          phone: savedAddress.phone,
        },
      }).catch((err) => console.error("Telegram notification failed:", err)),
    ];

    // Send WhatsApp notification to admin and set session context
    const waPayload = {
      orderId: order.id,
      orderNumber: order.orderNumber,
      customerName,
      customerPhone: savedAddress.phone,
      customerEmail,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      items: order.items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: Number(i.price),
      })),
      total: Number(order.total),
      shippingAddress: {
        addressLine1: savedAddress.addressLine1,
        addressLine2: savedAddress.addressLine2,
        city: savedAddress.city,
        state: savedAddress.state,
        pincode: savedAddress.pincode,
      },
    };
    const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER;
    if (adminPhone) {
      notifications.push(
        sendOrderNotification(waPayload).catch((err) =>
          console.error("WhatsApp notification failed:", err)
        ),
        prisma.whatsAppSession.upsert({
          where: { phone: adminPhone },
          create: { phone: adminPhone, orderId: order.id, orderNumber: order.orderNumber },
          update: { orderId: order.id, orderNumber: order.orderNumber, awaitingLrn: false },
        }).catch((err) => console.error("WhatsApp session upsert failed:", err))
      );
    }

    await Promise.all(notifications);

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
