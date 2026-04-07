/**
 * Admin notification system — WhatsApp + Email on every order
 */

const ADMIN_PHONE = process.env.ADMIN_WHATSAPP_PHONE || "";
const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY || "";

interface OrderNotification {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  total: number;
  paymentMethod: string;
  items: { name: string; quantity: number; price: number }[];
  city: string;
  state: string;
  pincode: string;
}

/**
 * Send WhatsApp notification to admin via CallMeBot API
 * One-time setup: Send "I allow callmebot to send me messages" to +34 644 22 01 86 on WhatsApp
 * Then set ADMIN_WHATSAPP_PHONE and WHATSAPP_API_KEY in env vars
 */
async function sendWhatsAppNotification(data: OrderNotification) {
  if (!ADMIN_PHONE || !WHATSAPP_API_KEY) {
    console.warn("WhatsApp notification skipped — ADMIN_WHATSAPP_PHONE or WHATSAPP_API_KEY not set");
    return;
  }

  const itemsList = data.items
    .map((i) => `  • ${i.name} x${i.quantity} — ₹${i.price * i.quantity}`)
    .join("\n");

  const message = `🛒 *New Order!*

*Order:* #${data.orderNumber}
*Customer:* ${data.customerName}
*Email:* ${data.customerEmail}
*Phone:* ${data.customerPhone}
*Payment:* ${data.paymentMethod === "COD" ? "Cash on Delivery" : "Razorpay (Paid)"}

*Items:*
${itemsList}

*Total:* ₹${data.total}
*Ship to:* ${data.city}, ${data.state} - ${data.pincode}

👉 https://jaisonskincare.com/admin/orders`;

  try {
    const encodedMsg = encodeURIComponent(message);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${ADMIN_PHONE}&text=${encodedMsg}&apikey=${WHATSAPP_API_KEY}`;

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      console.error("WhatsApp notification failed:", response.status, await response.text());
    }
  } catch (err) {
    console.error("WhatsApp notification error:", err);
  }
}

/**
 * Send admin email notification (separate from customer email)
 */
async function sendAdminEmail(data: OrderNotification) {
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const FROM = process.env.EMAIL_FROM || "orders@jaisonskincare.com";
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "Jaisonskincare@gmail.com";

    const itemsHtml = data.items
      .map((i) => `<li><strong>${i.name}</strong> x${i.quantity} — ₹${i.price * i.quantity}</li>`)
      .join("");

    const html = `
      <h2>🛒 New Order — #${data.orderNumber}</h2>
      <p><strong>Customer:</strong> ${data.customerName} (${data.customerEmail})</p>
      <p><strong>Phone:</strong> ${data.customerPhone}</p>
      <p><strong>Payment:</strong> ${data.paymentMethod === "COD" ? "Cash on Delivery" : "Razorpay (Paid)"}</p>
      <ul>${itemsHtml}</ul>
      <p><strong>Total: ₹${data.total}</strong></p>
      <p><strong>Ship to:</strong> ${data.city}, ${data.state} - ${data.pincode}</p>
      <p><a href="https://jaisonskincare.com/admin/orders">View in Admin Dashboard</a></p>
    `;

    const { error } = await resend.emails.send({
      from: `jaison Orders <${FROM}>`,
      to: ADMIN_EMAIL,
      subject: `🛒 New Order #${data.orderNumber} — ₹${data.total} (${data.paymentMethod})`,
      html,
    });

    if (error) {
      console.error("Admin email notification failed:", error);
    }
  } catch (err) {
    console.error("Admin email notification error:", err);
  }
}

/**
 * Notify admin of new order via all channels (email + WhatsApp)
 * This never throws — failures are logged but don't block order creation
 */
export async function notifyAdminNewOrder(data: OrderNotification) {
  await Promise.allSettled([
    sendAdminEmail(data),
    sendWhatsAppNotification(data),
  ]);
}
