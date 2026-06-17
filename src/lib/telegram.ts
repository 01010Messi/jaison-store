const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface OrderNotification {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  paymentMethod: string;
  paymentStatus: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
}

export async function sendTelegramOrderNotification(order: OrderNotification) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("Telegram not configured — skipping notification");
    return;
  }

  const itemLines = order.items
    .map((i) => `  • ${i.name} × ${i.quantity} — ₹${i.price * i.quantity}`)
    .join("\n");

  const addr = order.shippingAddress;
  const addressLines = [
    addr.addressLine1,
    addr.addressLine2,
    `${addr.city}, ${addr.state} — ${addr.pincode}`,
  ]
    .filter(Boolean)
    .join("\n");

  const message = `🛒 *New Order \\#${order.orderNumber}*

*Customer:* ${escapeMarkdown(order.customerName)}
*Email:* ${escapeMarkdown(order.customerEmail)}
*Phone:* ${escapeMarkdown(addr.phone)}

*Items:*
${escapeMarkdown(itemLines)}

*Total:* ₹${order.total}
*Payment:* ${order.paymentMethod} \\(${order.paymentStatus}\\)

*Ship To:*
${escapeMarkdown(addressLines)}`;

  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "MarkdownV2",
      }),
      signal: AbortSignal.timeout(8000),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Telegram notification failed:", err);
  }
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
}
