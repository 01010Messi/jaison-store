import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM = process.env.EMAIL_FROM || "orders@jaisonskincare.com";
const APP_NAME = "jaison";
const OWNER_EMAIL = process.env.ADMIN_EMAIL || "jaisonskincare@gmail.com";

interface OrderEmailData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: { name: string; quantity: number; price: number; image?: string }[];
  subtotal: number;
  shippingCost: number;
  codFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  invoiceUrl?: string;
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmation(data: OrderEmailData) {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #E8D5B7;">
          <strong style="color: #3D2B1F;">${item.name}</strong>
          <br/><span style="color: #7A7A7A;">Qty: ${item.quantity}</span>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #E8D5B7; text-align: right; color: #3D2B1F;">
          ₹${item.price * item.quantity}
        </td>
      </tr>`
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin: 0; padding: 0; background-color: #FEFAE0; font-family: 'Georgia', serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px;">

    <!-- Header -->
    <div style="text-align: center; padding: 32px 0; border-bottom: 2px solid #BCA480;">
      <h1 style="margin: 0; font-size: 28px; color: #3D2B1F; letter-spacing: 2px;">jaison</h1>
      <p style="margin: 4px 0 0; color: #BCA480; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">Natural Ayurvedic Beauty</p>
    </div>

    <!-- Confirmation -->
    <div style="text-align: center; padding: 32px 0;">
      <h2 style="margin: 0; color: #1A3C34; font-size: 22px;">Order Confirmed!</h2>
      <p style="color: #5C5C5C; margin: 8px 0 0;">Thank you for your order, ${data.customerName}.</p>
      <p style="color: #3D2B1F; font-size: 18px; margin: 16px 0 0;">
        Order <strong>#${data.orderNumber}</strong>
      </p>
    </div>

    <!-- Order Items -->
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 2px solid #3D2B1F; font-weight: bold; color: #3D2B1F;">Item</td>
        <td style="padding: 8px 0; border-bottom: 2px solid #3D2B1F; font-weight: bold; color: #3D2B1F; text-align: right;">Amount</td>
      </tr>
      ${itemsHtml}
    </table>

    <!-- Totals -->
    <table style="width: 100%; margin-top: 16px;">
      <tr>
        <td style="padding: 4px 0; color: #5C5C5C;">Subtotal</td>
        <td style="padding: 4px 0; text-align: right; color: #3D2B1F;">₹${data.subtotal}</td>
      </tr>
      <tr>
        <td style="padding: 4px 0; color: #5C5C5C;">Shipping</td>
        <td style="padding: 4px 0; text-align: right; color: #3D2B1F;">${data.shippingCost === 0 ? "Free" : `₹${data.shippingCost}`}</td>
      </tr>
      ${data.codFee > 0 ? `<tr><td style="padding: 4px 0; color: #5C5C5C;">COD Fee</td><td style="padding: 4px 0; text-align: right; color: #3D2B1F;">₹${data.codFee}</td></tr>` : ""}
      ${data.discount > 0 ? `<tr><td style="padding: 4px 0; color: #1A3C34;">Discount</td><td style="padding: 4px 0; text-align: right; color: #1A3C34;">-₹${data.discount}</td></tr>` : ""}
      <tr>
        <td style="padding: 12px 0; border-top: 2px solid #3D2B1F; font-weight: bold; font-size: 18px; color: #C1714F;">Total</td>
        <td style="padding: 12px 0; border-top: 2px solid #3D2B1F; font-weight: bold; font-size: 18px; color: #C1714F; text-align: right;">₹${data.total}</td>
      </tr>
    </table>

    <!-- Payment & Shipping -->
    <div style="margin-top: 24px; padding: 20px; background: #EFE4C5; border-radius: 4px;">
      <table style="width: 100%;">
        <tr>
          <td style="vertical-align: top; width: 50%; padding-right: 12px;">
            <h3 style="margin: 0 0 8px; color: #3D2B1F; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Payment</h3>
            <p style="margin: 0; color: #5C5C5C; font-size: 14px;">${data.paymentMethod === "COD" ? "Cash on Delivery" : "Paid Online (Razorpay)"}</p>
          </td>
          <td style="vertical-align: top; width: 50%; padding-left: 12px;">
            <h3 style="margin: 0 0 8px; color: #3D2B1F; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Shipping To</h3>
            <p style="margin: 0; color: #5C5C5C; font-size: 14px;">
              ${data.shippingAddress.fullName}<br/>
              ${data.shippingAddress.addressLine1}<br/>
              ${data.shippingAddress.addressLine2 ? data.shippingAddress.addressLine2 + "<br/>" : ""}
              ${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.pincode}<br/>
              ${data.shippingAddress.phone}
            </p>
          </td>
        </tr>
      </table>
    </div>

    ${data.invoiceUrl ? `<div style="text-align: center; margin-top: 24px;"><a href="${data.invoiceUrl}" style="display: inline-block; padding: 12px 24px; background: #3D2B1F; color: #FEFAE0; text-decoration: none; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">Download Invoice</a></div>` : ""}

    <!-- Footer -->
    <div style="text-align: center; padding: 32px 0; margin-top: 32px; border-top: 1px solid #E8D5B7;">
      <p style="color: #BCA480; font-size: 12px; margin: 0;">
        Questions? Reply to this email or WhatsApp us at +91 ${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.slice(2) || ""}
      </p>
      <p style="color: #BCA480; font-size: 11px; margin: 8px 0 0;">
        &copy; ${new Date().getFullYear()} ${APP_NAME} Natural Herbals &mdash; jaisonskincare.com
      </p>
    </div>

  </div>
</body>
</html>`;

  const { error } = await getResend().emails.send({
    from: `${APP_NAME} <${FROM}>`,
    to: data.customerEmail,
    bcc: OWNER_EMAIL,
    subject: `Order Confirmed — #${data.orderNumber}`,
    html,
  });

  if (error) {
    console.error("Failed to send order confirmation:", error);
    throw error;
  }
}

/**
 * Send shipping update email
 */
export async function sendShippingUpdate(data: {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  trackingNumber: string;
  trackingUrl: string;
  courierName: string;
  estimatedDelivery?: string;
}) {
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin: 0; padding: 0; background-color: #FEFAE0; font-family: 'Georgia', serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
    <div style="text-align: center; padding: 32px 0; border-bottom: 2px solid #BCA480;">
      <h1 style="margin: 0; font-size: 28px; color: #3D2B1F; letter-spacing: 2px;">jaison</h1>
    </div>
    <div style="text-align: center; padding: 32px 0;">
      <h2 style="margin: 0; color: #1A3C34; font-size: 22px;">Your Order Has Been Shipped!</h2>
      <p style="color: #5C5C5C; margin: 8px 0 0;">Hi ${data.customerName}, your order <strong>#${data.orderNumber}</strong> is on its way.</p>
    </div>
    <div style="padding: 20px; background: #EFE4C5; border-radius: 4px; text-align: center;">
      <p style="margin: 0 0 4px; color: #5C5C5C; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Tracking Number</p>
      <p style="margin: 0; color: #3D2B1F; font-size: 20px; font-weight: bold;">${data.trackingNumber}</p>
      <p style="margin: 8px 0 0; color: #5C5C5C; font-size: 14px;">Via ${data.courierName}</p>
      ${data.estimatedDelivery ? `<p style="margin: 8px 0 0; color: #1A3C34; font-size: 14px;">Estimated delivery: ${data.estimatedDelivery}</p>` : ""}
      <a href="${data.trackingUrl}" style="display: inline-block; margin-top: 16px; padding: 12px 24px; background: #C1714F; color: #FEFAE0; text-decoration: none; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">Track Order</a>
    </div>
    <div style="text-align: center; padding: 32px 0; margin-top: 32px; border-top: 1px solid #E8D5B7;">
      <p style="color: #BCA480; font-size: 11px;">&copy; ${new Date().getFullYear()} ${APP_NAME} Natural Herbals</p>
    </div>
  </div>
</body>
</html>`;

  const { error } = await getResend().emails.send({
    from: `${APP_NAME} <${FROM}>`,
    to: data.customerEmail,
    bcc: OWNER_EMAIL,
    subject: `Your order #${data.orderNumber} has been shipped!`,
    html,
  });

  if (error) {
    console.error("Failed to send shipping update:", error);
    throw error;
  }
}

/**
 * Send welcome email on registration
 */
export async function sendWelcomeEmail(data: {
  name: string;
  email: string;
}) {
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin: 0; padding: 0; background-color: #FEFAE0; font-family: 'Georgia', serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 24px;">
    <div style="text-align: center; padding: 32px 0; border-bottom: 2px solid #BCA480;">
      <h1 style="margin: 0; font-size: 28px; color: #3D2B1F; letter-spacing: 2px;">jaison</h1>
      <p style="margin: 4px 0 0; color: #BCA480; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">Natural Ayurvedic Beauty</p>
    </div>
    <div style="text-align: center; padding: 32px 0;">
      <h2 style="margin: 0; color: #3D2B1F; font-size: 24px;">Welcome, ${data.name}!</h2>
      <p style="color: #5C5C5C; margin: 12px 0 0; line-height: 1.6;">
        Thank you for joining the jaison family. We're so glad you're here.<br/>
        Explore our collection of 100% natural ayurvedic herbal powders,<br/>
        crafted with love for your skin and hair.
      </p>
      <p style="color: #C1714F; margin: 20px 0 0; font-size: 16px; font-style: italic;">
        Use code <strong>WELCOME10</strong> for 10% off your first order!
      </p>
      <a href="https://jaisonskincare.com/shop" style="display: inline-block; margin-top: 20px; padding: 14px 32px; background: #C1714F; color: #FEFAE0; text-decoration: none; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">Shop Now</a>
    </div>
    <div style="text-align: center; padding: 32px 0; border-top: 1px solid #E8D5B7;">
      <p style="color: #BCA480; font-size: 11px;">&copy; ${new Date().getFullYear()} ${APP_NAME} Natural Herbals &mdash; jaisonskincare.com</p>
    </div>
  </div>
</body>
</html>`;

  const { error } = await getResend().emails.send({
    from: `${APP_NAME} <${FROM}>`,
    to: data.email,
    subject: `Welcome to jaison, ${data.name}!`,
    html,
  });

  if (error) {
    console.error("Failed to send welcome email:", error);
    // Don't throw — welcome email failure shouldn't block registration
  }
}
