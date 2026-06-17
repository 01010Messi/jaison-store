import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma, { isTransientDbError } from "@/lib/prisma";
import Razorpay from "razorpay";
import { Prisma } from "@prisma/client";
import { generateOrderNumber } from "@/lib/utils";

function getRazorpay() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const {
      amount,
      items,
      address,
      guestEmail,
      guestPhone,
      subtotal,
      shippingCost,
      discount,
      couponCode,
    } = body;

    // Must be logged in OR provide guest email
    const customerEmail = session?.user?.email || guestEmail;
    if (!customerEmail) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    if (!amount || !items?.length || !address) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Determine user
    let userId: string | null = null;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (user) userId = user.id;
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
          const productById = await prisma.product.findUnique({
            where: { id: item.productId },
            select: { id: true },
          });
          if (!productById) {
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

    // Amount should be in paise for Razorpay
    const amountInPaise = Math.round(amount * 100);

    // Call Razorpay BEFORE writing the DB order — if this fails, we never
    // create a row that would otherwise sit as a permanent zombie PENDING
    // order with no payment attached.
    let razorpayOrder;
    try {
      razorpayOrder = await getRazorpay().orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: orderNumber,
        notes: {
          orderNumber,
          customerName: address.fullName,
          customerPhone: address.phone,
          customerEmail,
        },
      });
    } catch (err) {
      console.error("Razorpay order creation failed:", err);
      return NextResponse.json(
        { message: "Payment gateway unavailable, please try again" },
        { status: 502 }
      );
    }

    // Create DB order with PENDING payment status, already linked to the
    // confirmed Razorpay order. Retry on the rare order-number collision
    // (900 possible values/day) rather than failing the whole checkout.
    let finalOrderNumber = orderNumber;
    for (let attempt = 0; ; attempt++) {
      try {
        await prisma.order.create({
          data: {
            orderNumber: finalOrderNumber,
            ...(userId ? { userId } : {}),
            ...(!userId && guestEmail
              ? { guestEmail, guestPhone: guestPhone || address.phone }
              : {}),
            shippingAddressId: savedAddress.id,
            status: "PENDING",
            paymentMethod: "RAZORPAY",
            paymentStatus: "PENDING",
            razorpayOrderId: razorpayOrder.id,
            subtotal: subtotal || amount,
            shippingCost: shippingCost || 0,
            codFee: 0,
            discount: discount || 0,
            total: amount,
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
        });
        break;
      } catch (err) {
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

    return NextResponse.json({
      orderId: finalOrderNumber,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: "INR",
    });
  } catch (error) {
    console.error("Payment order creation failed:", error);
    return NextResponse.json(
      { message: "Failed to create payment order" },
      { status: 500 }
    );
  }
}
