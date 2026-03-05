import { z } from "zod";

/**
 * Indian phone number validation
 * Must be 10 digits, starting with 6-9
 */
export const phoneSchema = z
  .string()
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number");

/**
 * Indian PIN code validation
 */
export const pincodeSchema = z
  .string()
  .regex(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit PIN code");

/**
 * Email validation
 */
export const emailSchema = z
  .string()
  .email("Enter a valid email address")
  .toLowerCase();

/**
 * Password validation
 */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password is too long");

/**
 * Address form schema
 */
export const addressSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: phoneSchema,
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: pincodeSchema,
  landmark: z.string().optional(),
  isDefault: z.boolean().default(false),
});

/**
 * Registration schema
 */
export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema.optional(),
});

/**
 * Login schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

/**
 * Review form schema
 */
export const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  title: z.string().optional(),
  body: z.string().min(10, "Review must be at least 10 characters"),
});

/**
 * Contact form schema
 */
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

/**
 * Newsletter schema
 */
export const newsletterSchema = z.object({
  email: emailSchema,
});

/**
 * Coupon validation schema
 */
export const couponSchema = z.object({
  code: z.string().min(3, "Enter a coupon code").toUpperCase(),
});

/**
 * Product form schema (admin)
 */
export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  shortDescription: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  compareAtPrice: z.number().positive().optional().nullable(),
  sku: z.string().min(2, "SKU is required"),
  weight: z.number().positive().optional().nullable(),
  weightUnit: z.string().default("g"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  ingredients: z.string().optional(),
  howToUse: z.string().optional(),
  benefits: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
});

export type AddressInput = z.infer<typeof addressSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ProductInput = z.infer<typeof productSchema>;
