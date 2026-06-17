import twilio from "twilio";

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const FROM = process.env.TWILIO_WHATSAPP_FROM; // whatsapp:+14155238886
const ADMIN = process.env.ADMIN_WHATSAPP_NUMBER; // whatsapp:+91XXXXXXXXXX

function client() {
  if (!ACCOUNT_SID || !AUTH_TOKEN) {
    throw new Error("Twilio credentials not configured");
  }
  return twilio(ACCOUNT_SID, AUTH_TOKEN, { timeout: 8000 });
}

export interface OrderNotificationData {
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  paymentMethod: string;
  paymentStatus: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    pincode: string;
  };
}

function buildOrderMessage(order: OrderNotificationData): string {
  const itemLines = order.items
    .map((i) => `  • ${i.name} × ${i.quantity} — ₹${(i.price * i.quantity).toFixed(0)}`)
    .join("\n");

  const addr = order.shippingAddress;
  const addressLine = [addr.addressLine1, addr.addressLine2, `${addr.city}, ${addr.state} — ${addr.pincode}`]
    .filter(Boolean)
    .join(", ");

  const paymentLine =
    order.paymentMethod === "COD"
      ? "💵 Cash on Delivery"
      : `💳 Razorpay (${order.paymentStatus})`;

  return (
    `🛒 *New Order #${order.orderNumber}*\n\n` +
    `👤 ${order.customerName}\n` +
    `📞 ${order.customerPhone}\n` +
    `✉️ ${order.customerEmail}\n` +
    `${paymentLine}\n\n` +
    `📦 *Items:*\n${itemLines}\n\n` +
    `💰 Total: ₹${order.total.toFixed(0)}\n\n` +
    `🏠 Ship to: ${addressLine}\n\n` +
    `─────────────────\n` +
    `Reply with a number to update status:\n` +
    `1️⃣  Confirm\n` +
    `2️⃣  Processing\n` +
    `3️⃣  Ship (will ask for AWB/LRN)\n` +
    `4️⃣  Delivered\n` +
    `5️⃣  Cancel\n` +
    `6️⃣  Return`
  );
}

export async function sendOrderNotification(order: OrderNotificationData): Promise<void> {
  if (!ADMIN || !FROM) {
    console.warn("WhatsApp not configured — skipping notification");
    return;
  }

  const body = buildOrderMessage(order);

  await client().messages.create({ from: FROM, to: ADMIN, body });
}

export async function sendToAdmin(body: string): Promise<void> {
  if (!ADMIN || !FROM) return;
  await client().messages.create({ from: FROM, to: ADMIN, body });
}

export async function sendCancelledAlert(data: {
  orderNumber: string;
  customerName: string;
  total: number;
  reason?: string;
}): Promise<void> {
  if (!ADMIN || !FROM) return;
  const body =
    `⚠️ *Order #${data.orderNumber} CANCELLED*\n\n` +
    `Customer: ${data.customerName}\n` +
    `Total: ₹${data.total.toFixed(0)}\n` +
    (data.reason ? `Reason: ${data.reason}` : "Cancelled by customer");
  await client().messages.create({ from: FROM, to: ADMIN, body });
}

// Validate that the incoming webhook is from the configured admin number.
// Twilio sends the sender as "whatsapp:+91XXXXXXXXXX".
export function isAdminSender(from: string): boolean {
  if (!ADMIN) return false;
  return from === ADMIN;
}

// Map numbered reply → OrderStatus
const STATUS_MAP: Record<string, string> = {
  "1": "CONFIRMED",
  "2": "PROCESSING",
  "3": "SHIPPED",
  "4": "DELIVERED",
  "5": "CANCELLED",
  "6": "RETURNED",
};

export function parseStatusReply(body: string): string | null {
  const trimmed = body.trim();
  return STATUS_MAP[trimmed] ?? null;
}
