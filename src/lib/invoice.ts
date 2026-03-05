import PDFDocument from "pdfkit";
import { calculateGST, numberToWords } from "@/lib/utils";

interface InvoiceItem {
  name: string;
  sku: string;
  quantity: number;
  price: number;
  hsnCode?: string;
}

interface InvoiceData {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  shippingCost: number;
  codFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  razorpayPaymentId?: string;
}

/**
 * Generate a GST-compliant invoice PDF
 * Returns a Buffer of the PDF
 */
export async function generateInvoice(data: InvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const companyName = process.env.COMPANY_NAME || "Jaison Herbals";
    const companyAddress = process.env.COMPANY_ADDRESS || "";
    const companyState = process.env.COMPANY_STATE || "Maharashtra";
    const companyStateCode = process.env.COMPANY_STATE_CODE || "27";
    const gstin = process.env.GSTIN || "";
    const customerState = data.shippingAddress.state;

    // Calculate GST
    const gst = calculateGST(data.subtotal, customerState, companyState);
    const isIntraState =
      customerState.toLowerCase() === companyState.toLowerCase();

    // --- Header ---
    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .text("TAX INVOICE", { align: "center" });
    doc.moveDown(0.5);

    // Company details (left) | Invoice details (right)
    const topY = doc.y;
    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .text(companyName, 50, topY);
    doc
      .fontSize(9)
      .font("Helvetica")
      .text(companyAddress, 50, doc.y + 2, { width: 250 });
    if (gstin) {
      doc.text(`GSTIN: ${gstin}`);
    }
    doc.text(`State: ${companyState} (${companyStateCode})`);

    // Right side
    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .text(`Invoice No: ${data.orderNumber}`, 350, topY, {
        width: 200,
        align: "right",
      });
    doc
      .font("Helvetica")
      .text(`Date: ${data.orderDate}`, 350, doc.y + 2, {
        width: 200,
        align: "right",
      });
    if (data.razorpayPaymentId) {
      doc.text(`Payment ID: ${data.razorpayPaymentId}`, {
        width: 200,
        align: "right",
      });
    }
    doc.text(
      `Payment: ${data.paymentMethod === "COD" ? "Cash on Delivery" : "Online (Razorpay)"}`,
      { width: 200, align: "right" }
    );

    doc.moveDown(1.5);

    // --- Horizontal Line ---
    doc
      .strokeColor("#3D2B1F")
      .lineWidth(1)
      .moveTo(50, doc.y)
      .lineTo(545, doc.y)
      .stroke();
    doc.moveDown(0.5);

    // --- Bill To / Ship To ---
    const billingY = doc.y;
    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("BILL TO / SHIP TO:", 50, billingY);
    doc.moveDown(0.3);
    doc.font("Helvetica").fontSize(9);
    doc.text(data.customerName);
    doc.text(data.shippingAddress.addressLine1);
    if (data.shippingAddress.addressLine2) {
      doc.text(data.shippingAddress.addressLine2);
    }
    doc.text(
      `${data.shippingAddress.city}, ${data.shippingAddress.state} - ${data.shippingAddress.pincode}`
    );
    doc.text(`Phone: ${data.customerPhone}`);
    doc.text(`Email: ${data.customerEmail}`);
    doc.moveDown(1);

    // --- Line ---
    doc
      .strokeColor("#E8D5B7")
      .lineWidth(0.5)
      .moveTo(50, doc.y)
      .lineTo(545, doc.y)
      .stroke();
    doc.moveDown(0.5);

    // --- Items Table ---
    const tableTop = doc.y;
    const colX = {
      sno: 50,
      desc: 80,
      hsn: 250,
      qty: 310,
      rate: 360,
      amount: 460,
    };

    // Table header
    doc.fontSize(9).font("Helvetica-Bold");
    doc.text("S.No", colX.sno, tableTop, { width: 30 });
    doc.text("Description", colX.desc, tableTop, { width: 170 });
    doc.text("HSN", colX.hsn, tableTop, { width: 50 });
    doc.text("Qty", colX.qty, tableTop, { width: 40, align: "center" });
    doc.text("Rate (₹)", colX.rate, tableTop, { width: 80, align: "right" });
    doc.text("Amount (₹)", colX.amount, tableTop, {
      width: 85,
      align: "right",
    });

    doc
      .moveDown(0.5)
      .strokeColor("#3D2B1F")
      .lineWidth(0.5)
      .moveTo(50, doc.y)
      .lineTo(545, doc.y)
      .stroke();

    // Table rows
    let y = doc.y + 8;
    doc.font("Helvetica").fontSize(9);

    data.items.forEach((item, index) => {
      const amount = item.price * item.quantity;
      doc.text(`${index + 1}`, colX.sno, y, { width: 30 });
      doc.text(item.name, colX.desc, y, { width: 170 });
      doc.text(item.hsnCode || "33049990", colX.hsn, y, { width: 50 });
      doc.text(`${item.quantity}`, colX.qty, y, {
        width: 40,
        align: "center",
      });
      doc.text(`${item.price.toFixed(2)}`, colX.rate, y, {
        width: 80,
        align: "right",
      });
      doc.text(`${amount.toFixed(2)}`, colX.amount, y, {
        width: 85,
        align: "right",
      });
      y += 20;
    });

    // Line after items
    doc
      .strokeColor("#E8D5B7")
      .lineWidth(0.5)
      .moveTo(50, y + 4)
      .lineTo(545, y + 4)
      .stroke();
    y += 14;

    // --- Totals ---
    const totalX = 360;
    const totalValX = 460;

    doc.font("Helvetica").fontSize(9);
    doc.text("Subtotal:", totalX, y, { width: 80, align: "right" });
    doc.text(`${data.subtotal.toFixed(2)}`, totalValX, y, {
      width: 85,
      align: "right",
    });
    y += 16;

    if (data.shippingCost > 0) {
      doc.text("Shipping:", totalX, y, { width: 80, align: "right" });
      doc.text(`${data.shippingCost.toFixed(2)}`, totalValX, y, {
        width: 85,
        align: "right",
      });
      y += 16;
    }

    if (data.codFee > 0) {
      doc.text("COD Fee:", totalX, y, { width: 80, align: "right" });
      doc.text(`${data.codFee.toFixed(2)}`, totalValX, y, {
        width: 85,
        align: "right",
      });
      y += 16;
    }

    if (data.discount > 0) {
      doc.text("Discount:", totalX, y, { width: 80, align: "right" });
      doc.text(`-${data.discount.toFixed(2)}`, totalValX, y, {
        width: 85,
        align: "right",
      });
      y += 16;
    }

    // GST lines
    if (isIntraState) {
      doc.text("CGST @9%:", totalX, y, { width: 80, align: "right" });
      doc.text(`${gst.cgst.toFixed(2)}`, totalValX, y, {
        width: 85,
        align: "right",
      });
      y += 16;
      doc.text("SGST @9%:", totalX, y, { width: 80, align: "right" });
      doc.text(`${gst.sgst.toFixed(2)}`, totalValX, y, {
        width: 85,
        align: "right",
      });
      y += 16;
    } else {
      doc.text("IGST @18%:", totalX, y, { width: 80, align: "right" });
      doc.text(`${gst.igst.toFixed(2)}`, totalValX, y, {
        width: 85,
        align: "right",
      });
      y += 16;
    }

    // Grand total line
    doc
      .strokeColor("#3D2B1F")
      .lineWidth(1)
      .moveTo(totalX, y)
      .lineTo(545, y)
      .stroke();
    y += 8;

    const grandTotal = data.total + gst.total;
    doc.font("Helvetica-Bold").fontSize(11);
    doc.text("Grand Total:", totalX, y, { width: 80, align: "right" });
    doc.text(`₹${grandTotal.toFixed(2)}`, totalValX, y, {
      width: 85,
      align: "right",
    });
    y += 24;

    // Amount in words
    doc.font("Helvetica").fontSize(9);
    doc.text(
      `Amount in Words: ${numberToWords(Math.round(grandTotal))}`,
      50,
      y
    );
    y += 30;

    // --- Footer ---
    doc
      .strokeColor("#E8D5B7")
      .lineWidth(0.5)
      .moveTo(50, y)
      .lineTo(545, y)
      .stroke();
    y += 12;

    doc.fontSize(8).fillColor("#888888");
    doc.text(
      "This is a computer-generated invoice and does not require a physical signature.",
      50,
      y,
      { align: "center", width: 495 }
    );
    doc.text(
      `${companyName} — jaisonskincare.com`,
      50,
      y + 14,
      { align: "center", width: 495 }
    );

    doc.end();
  });
}
