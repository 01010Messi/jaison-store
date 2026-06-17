import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma, { isTransientDbError } from "@/lib/prisma";
import { sendOrderConfirmation } from "@/lib/email";
import { sendTelegramOrderNotification } from "@/lib/telegram";
import { sendOrderNotification } from "@/lib/whatsapp";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      orderId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = body;

    if (
      !orderId ||
      !razorpayPaymentId ||
      !razorpayOrderId ||
      !razorpaySignature
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify signature using HMAC SHA256
    const bodyStr = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(bodyStr)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { message: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Payment verified — update the order in DB
    const order = await prisma.order.findUnique({
      where: { orderNumber: orderId },
      include: { items: true, shippingAddress: true },
    });

    if (!order) {
      // Payment captured by Razorpay but no matching order row exists.
      // Don't report success — flag loudly so it can be reconciled manually.
      console.error(
        `CRITICAL: payment verified but no order found. orderId=${orderId} razorpayPaymentId=${razorpayPaymentId} razorpayOrderId=${razorpayOrderId}`
      );
      return NextResponse.json(
        {
          verified: false,
          message:
            "Payment received but order record not found. Please contact support with your payment ID.",
          paymentId: razorpayPaymentId,
        },
        { status: 409 }
      );
    }

    {
      const oversold: string[] = [];
      for (let attempt = 0; ; attempt++) {
        try {
          await prisma.$transaction(async (tx) => {
            await tx.order.update({
              where: { id: order.id },
              data: {
                paymentStatus: "PAID",
                status: "CONFIRMED",
                razorpayOrderId,
                razorpayPaymentId,
                razorpaySignature,
              },
            });

            for (const item of order.items) {
              const result = await tx.product.updateMany({
                where: { id: item.productId, stock: { gte: item.quantity } },
                data: { stock: { decrement: item.quantity } },
              });
              if (result.count === 0) oversold.push(item.productId);
            }
          });
          break;
        } catch (err) {
          if (isTransientDbError(err) && attempt < 2) {
            oversold.length = 0;
            continue;
          }
          throw err;
        }
      }

      // Payment is already captured, so a paid order is never blocked on
      // stock — but an oversell (stock ran out between checkout and payment)
      // needs to be flagged for manual backorder/restock handling.
      if (oversold.length > 0) {
        console.error(
          `CRITICAL: oversell on order ${order.orderNumber} — products ${oversold.join(
            ", "
          )} had insufficient stock at payment time.`
        );
      }

      // Send order confirmation email
      const customerEmail =
        order.guestEmail ||
        (order.userId
          ? (
              await prisma.user.findUnique({
                where: { id: order.userId },
              })
            )?.email
          : null);

      // Fire all notifications in parallel — each already swallows its own
      // error, so one slow/down service can't serialize and stall the others.
      const notifications: Promise<unknown>[] = [];

      if (customerEmail && order.shippingAddress) {
        notifications.push(
          sendOrderConfirmation({
            orderNumber: order.orderNumber,
            customerName: order.shippingAddress.fullName,
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
              fullName: order.shippingAddress.fullName,
              addressLine1: order.shippingAddress.addressLine1,
              addressLine2: order.shippingAddress.addressLine2 || undefined,
              city: order.shippingAddress.city,
              state: order.shippingAddress.state,
              pincode: order.shippingAddress.pincode,
              phone: order.shippingAddress.phone,
            },
          }).catch((err) => console.error("Email send failed:", err))
        );
      }

      if (order.shippingAddress) {
        notifications.push(
          sendTelegramOrderNotification({
            orderNumber: order.orderNumber,
            customerName: order.shippingAddress.fullName,
            customerEmail: customerEmail || "N/A",
            paymentMethod: order.paymentMethod,
            paymentStatus: "PAID",
            items: order.items.map((i) => ({
              name: i.name,
              quantity: i.quantity,
              price: Number(i.price),
            })),
            total: Number(order.total),
            shippingAddress: {
              fullName: order.shippingAddress.fullName,
              addressLine1: order.shippingAddress.addressLine1,
              addressLine2: order.shippingAddress.addressLine2 || undefined,
              city: order.shippingAddress.city,
              state: order.shippingAddress.state,
              pincode: order.shippingAddress.pincode,
              phone: order.shippingAddress.phone,
            },
          }).catch((err) => console.error("Telegram notification failed:", err))
        );

        // Send WhatsApp notification and set session context
        const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER;
        if (adminPhone && order.shippingAddress) {
          notifications.push(
            sendOrderNotification({
              orderId: order.id,
              orderNumber: order.orderNumber,
              customerName: order.shippingAddress.fullName,
              customerPhone: order.shippingAddress.phone,
              customerEmail: customerEmail || "N/A",
              paymentMethod: order.paymentMethod,
              paymentStatus: "PAID",
              items: order.items.map((i) => ({
                name: i.name,
                quantity: i.quantity,
                price: Number(i.price),
              })),
              total: Number(order.total),
              shippingAddress: {
                addressLine1: order.shippingAddress.addressLine1,
                addressLine2: order.shippingAddress.addressLine2,
                city: order.shippingAddress.city,
                state: order.shippingAddress.state,
                pincode: order.shippingAddress.pincode,
              },
            }).catch((err) => console.error("WhatsApp notification failed:", err)),
            prisma.whatsAppSession.upsert({
              where: { phone: adminPhone },
              create: { phone: adminPhone, orderId: order.id, orderNumber: order.orderNumber },
              update: { orderId: order.id, orderNumber: order.orderNumber, awaitingLrn: false },
            }).catch((err) => console.error("WhatsApp session upsert failed:", err))
          );
        }
      }

      await Promise.all(notifications);
    }

    return NextResponse.json({
      verified: true,
      orderNumber: orderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { message: "Payment verification failed" },
      { status: 500 }
    );
  }
}
