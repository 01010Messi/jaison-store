import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in Indian Rupees
 */
export function formatPrice(price: number | string): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numPrice);
}

/**
 * Generate URL-friendly slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Generate order number: JAIS-YYYYMMDD-XXX
 */
export function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 900 + 100);
  return `JAIS-${dateStr}-${random}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

/**
 * Delay utility for animations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Calculate GST based on state
 */
export function calculateGST(
  subtotal: number,
  customerState: string,
  companyState: string = "Maharashtra"
): { cgst: number; sgst: number; igst: number; total: number } {
  const gstRate = 0.18; // 18% GST
  const taxableAmount = subtotal;

  if (customerState.toLowerCase() === companyState.toLowerCase()) {
    // Intra-state: CGST + SGST
    const halfRate = gstRate / 2;
    const cgst = Math.round(taxableAmount * halfRate * 100) / 100;
    const sgst = Math.round(taxableAmount * halfRate * 100) / 100;
    return { cgst, sgst, igst: 0, total: cgst + sgst };
  } else {
    // Inter-state: IGST
    const igst = Math.round(taxableAmount * gstRate * 100) / 100;
    return { cgst: 0, sgst: 0, igst, total: igst };
  }
}

/**
 * Convert number to Indian words for invoice
 */
export function numberToWords(num: number): string {
  if (num === 0) return "Zero";

  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function convertGroup(n: number): string {
    if (n === 0) return "";
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " and " + convertGroup(n % 100) : "");
  }

  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const remainder = num % 1000;

  let result = "";
  if (crore) result += convertGroup(crore) + " Crore ";
  if (lakh) result += convertGroup(lakh) + " Lakh ";
  if (thousand) result += convertGroup(thousand) + " Thousand ";
  if (remainder) result += convertGroup(remainder);

  return result.trim() + " Rupees Only";
}
