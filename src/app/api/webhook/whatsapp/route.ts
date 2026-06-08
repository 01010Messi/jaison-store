import prisma from "@/lib/prisma";
import { isAdminSender, parseStatusReply, sendToAdmin } from "@/lib/whatsapp";
import { createShiprocketOrder, generateAWB } from "@/lib/shiprocket";
import { sendShippingUpdate } from "@/lib/email";

// Twilio sends webhook as application/x-www-form-urlencoded
async function parseBody(req: Request): Promise<Record<string, string>> {
  const text = await req.text();
  const params = new URLSearchParams(text);
  const result: Record<string, string> = {};
  params.forEach((v, k) => { result[k] = v; });
  return result;
}

export async function POST(req: Request) {
  try {
    const body = await parseBody(req);
    const from: string = body.From ?? "";       // whatsapp:+91XXXXXXXXXX
    const msgBody: string = (body.Body ?? "").trim();

    // Only accept messages from the configured admin number
    if (!isAdminSender(from)) {
      return new Response("", { status: 200 });
    }

    const phone = from; // used as session key

    // ── Check if we're awaiting an LRN/AWB from the admin ──
    const session = await prisma.whatsAppSession.findUnique({ where: { phone } });

    if (session?.awaitingLrn) {
      // Admin just typed the tracking number
      const trackingNumber = msgBody.replace(/\s+/g, "");

      if (!/^[A-Za-z0-9]{5,25}$/.test(trackingNumber)) {
        await sendToAdmin(
          "❌ That doesn't look like a valid AWB number.\nPlease send only the numeric tracking number (e.g. 173450012345)."
        );
        return new Response("", { status: 200 });
      }

      const order = await prisma.order.findUnique({
        where: { id: session.orderId },
        include: {
          items: true,
          shippingAddress: true,
          user: { select: { email: true, name: true } },
        },
      });

      if (!order) {
        await sendToAdmin("❌ Order not found. The session may be stale.");
        await prisma.whatsAppSession.delete({ where: { phone } });
        return new Response("", { status: 200 });
      }

      const trackingUrl = `https://www.shiprocket.in/shipment-tracking/${trackingNumber}`;

      await prisma.order.update({
        where: { id: order.id },
        data: { status: "SHIPPED", trackingNumber, trackingUrl },
      });

      // Notify customer by email
      const customerEmail = order.user?.email ?? order.guestEmail ?? "";
      if (customerEmail) {
        await sendShippingUpdate({
          customerName: order.user?.name ?? order.shippingAddress.fullName,
          customerEmail,
          orderNumber: order.orderNumber,
          trackingNumber,
          trackingUrl,
          courierName: "Shiprocket",
        }).catch((err) => console.error("Shipping email failed:", err));
      }

      // Clear the session
      await prisma.whatsAppSession.delete({ where: { phone } });

      await sendToAdmin(
        `✅ Order #${order.orderNumber} marked as *SHIPPED*\n` +
        `📦 AWB: ${trackingNumber}\n` +
        `Customer notified by email.`
      );
      return new Response("", { status: 200 });
    }

    // ── Normal status reply (1–6) ──
    const newStatus = parseStatusReply(msgBody);

    if (!newStatus) {
      await sendToAdmin(
        "ℹ️ Reply with a number (1–6) to update an order status:\n\n" +
        "1️⃣  Confirm\n2️⃣  Processing\n3️⃣  Ship\n4️⃣  Delivered\n5️⃣  Cancel\n6️⃣  Return\n\n" +
        "A notification for the latest order must have been received first."
      );
      return new Response("", { status: 200 });
    }

    // We need a session to know which order to update
    if (!session) {
      await sendToAdmin(
        "⚠️ No active order context. A new order notification sets the context automatically.\n" +
        "Wait for the next order, or check the web dashboard."
      );
      return new Response("", { status: 200 });
    }

    const order = await prisma.order.findUnique({
      where: { id: session.orderId },
      include: {
        items: true,
        shippingAddress: true,
        user: { select: { email: true, name: true } },
      },
    });

    if (!order) {
      await sendToAdmin("❌ Order not found. It may have been deleted.");
      await prisma.whatsAppSession.delete({ where: { phone } });
      return new Response("", { status: 200 });
    }

    // ── SHIPPED: trigger Shiprocket then ask for LRN ──
    if (newStatus === "SHIPPED") {
      if (!order.shiprocketOrderId) {
        // Create Shiprocket order first
        const productIds = order.items.map((i) => i.productId);
        const products = await prisma.product.findMany({
          where: { id: { in: productIds } },
          select: { id: true, weight: true, weightUnit: true },
        });
        const weightMap = new Map(products.map((p) => [p.id, p]));

        let totalWeightKg = 0;
        for (const item of order.items) {
          const p = weightMap.get(item.productId);
          if (p?.weight) {
            const grams = p.weightUnit === "kg"
              ? Number(p.weight) * 1000
              : Number(p.weight);
            totalWeightKg += (grams * item.quantity) / 1000;
          }
        }
        if (totalWeightKg < 0.5) totalWeightKg = 0.5;

        try {
          const sr = await createShiprocketOrder({
            orderNumber: order.orderNumber,
            orderDate: order.createdAt.toISOString().split("T")[0],
            customerName: order.shippingAddress.fullName,
            customerPhone: order.shippingAddress.phone,
            customerEmail: order.user?.email ?? order.guestEmail ?? "",
            addressLine1: order.shippingAddress.addressLine1,
            addressLine2: order.shippingAddress.addressLine2 ?? undefined,
            city: order.shippingAddress.city,
            state: order.shippingAddress.state,
            pincode: order.shippingAddress.pincode,
            paymentMethod: order.paymentMethod === "COD" ? "COD" : "Prepaid",
            subtotal: Number(order.subtotal),
            items: order.items.map((i) => ({
              name: i.name,
              sku: i.productId,
              units: i.quantity,
              sellingPrice: Number(i.price),
            })),
            weight: totalWeightKg,
          });

          const updateData: Record<string, unknown> = {
            shiprocketOrderId: sr.shiprocketOrderId,
            shiprocketShipmentId: sr.shiprocketShipmentId,
          };

          // Try auto-generating AWB
          if (sr.shiprocketShipmentId) {
            try {
              const awb = await generateAWB(sr.shiprocketShipmentId);
              if (awb.awbCode) {
                const trackingUrl = `https://www.shiprocket.in/shipment-tracking/${awb.awbCode}`;
                updateData.status = "SHIPPED";
                updateData.trackingNumber = awb.awbCode;
                updateData.trackingUrl = trackingUrl;

                await prisma.order.update({ where: { id: order.id }, data: updateData });
                await prisma.whatsAppSession.delete({ where: { phone } });

                const customerEmail = order.user?.email ?? order.guestEmail ?? "";
                if (customerEmail) {
                  await sendShippingUpdate({
                    customerName: order.user?.name ?? order.shippingAddress.fullName,
                    customerEmail,
                    orderNumber: order.orderNumber,
                    trackingNumber: awb.awbCode,
                    trackingUrl,
                    courierName: awb.courierName ?? "Shiprocket",
                  }).catch((err) => console.error("Shipping email failed:", err));
                }

                await sendToAdmin(
                  `✅ Order #${order.orderNumber} marked as *SHIPPED*\n` +
                  `📦 AWB auto-generated: ${awb.awbCode}\n` +
                  `Customer notified by email.`
                );
                return new Response("", { status: 200 });
              }
            } catch {
              // AWB failed — fall through to manual entry
            }
          }

          await prisma.order.update({ where: { id: order.id }, data: updateData });
        } catch (err) {
          console.error("Shiprocket order creation failed:", err);
          await sendToAdmin(
            `❌ Could not create Shiprocket shipment for #${order.orderNumber}.\n` +
            "Please use the web dashboard to ship this order."
          );
          return new Response("", { status: 200 });
        }
      }

      // Ask admin for manual LRN
      await prisma.whatsAppSession.update({
        where: { phone },
        data: { awaitingLrn: true },
      });

      await sendToAdmin(
        `✈️ Enter the AWB/LRN tracking number for order *#${order.orderNumber}*:\n` +
        "(Send only the numeric tracking number)"
      );
      return new Response("", { status: 200 });
    }

    // ── All other statuses ──
    const updateData: Record<string, unknown> = { status: newStatus };

    if (newStatus === "DELIVERED" && order.paymentMethod === "COD" && order.paymentStatus !== "PAID") {
      updateData.paymentStatus = "PAID";
    }

    if (newStatus === "CANCELLED" && order.status !== "CANCELLED") {
      for (const item of order.items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        });
      }
      if (order.paymentStatus === "PAID" && order.paymentMethod === "RAZORPAY") {
        updateData.paymentStatus = "REFUNDED";
      }
    }

    await prisma.order.update({ where: { id: order.id }, data: updateData });
    await prisma.whatsAppSession.delete({ where: { phone } });

    const statusLabels: Record<string, string> = {
      CONFIRMED: "✅ Confirmed",
      PROCESSING: "🔄 Processing",
      DELIVERED: "📬 Delivered",
      CANCELLED: "❌ Cancelled",
      RETURNED: "↩️ Returned",
    };

    await sendToAdmin(
      `${statusLabels[newStatus] ?? newStatus}: Order *#${order.orderNumber}* updated.\n` +
      (newStatus === "DELIVERED" && order.paymentMethod === "COD"
        ? "💰 COD payment marked as collected."
        : "")
    );

    return new Response("", { status: 200 });
  } catch (err) {
    console.error("WhatsApp webhook error:", err);
    return new Response("", { status: 200 }); // Always 200 to Twilio to prevent retries
  }
}
