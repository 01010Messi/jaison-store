const WHATSAPP_API_URL = "https://graph.facebook.com/v21.0";

interface OrderWhatsAppData {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  paymentMethod: string;
  city: string;
  state: string;
}

/**
 * Send WhatsApp notification to the store owner when a new order is placed.
 * Uses Meta WhatsApp Cloud API. Silently skips if env vars are not configured.
 */
export async function sendOwnerOrderWhatsApp(data: OrderWhatsAppData) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const ownerPhone = process.env.WHATSAPP_OWNER_PHONE;

  if (!phoneNumberId || !accessToken || !ownerPhone) {
    return; // WhatsApp not configured — skip silently
  }

  const itemsText = data.items
    .map(
      (item) =>
        `• ${item.name} x ${item.quantity} — ₹${(item.price * item.quantity).toLocaleString("en-IN")}`
    )
    .join("\n");

  const message = `🛒 *New Order #${data.orderNumber}*

👤 *Customer:* ${data.customerName}
📱 *Phone:* ${data.customerPhone}
📍 ${data.city}, ${data.state}

📦 *Items:*
${itemsText}

💰 *Total:* ₹${data.total.toLocaleString("en-IN")}
💳 *Payment:* ${data.paymentMethod === "COD" ? "Cash on Delivery" : "Paid Online (Razorpay)"}

🔗 View: https://jaisonskincare.com/admin/orders`;

  const res = await fetch(
    `${WHATSAPP_API_URL}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: ownerPhone,
        type: "text",
        text: { body: message },
      }),
    }
  );

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("WhatsApp API error:", res.status, errorBody);
    throw new Error(`WhatsApp API error: ${res.status}`);
  }
}
