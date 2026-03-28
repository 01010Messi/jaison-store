// ─── User Types ────────────────────────────────────────────────

export interface UserSession {
  id: string;
  name: string | null;
  email: string;
  role: "CUSTOMER" | "ADMIN";
}

// ─── Product Types ─────────────────────────────────────────────

export interface ProductImage {
  id: string;
  url: string;
  publicId: string;
  altText: string | null;
  sortOrder: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  price: number;
  compareAtPrice: number | null;
  sku: string;
  weight: number | null;
  weightUnit: string;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  ingredients: string | null;
  howToUse: string | null;
  benefits: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  tags: string[];
  images: ProductImage[];
  categories: Category[];
  averageRating: number;
  reviewCount: number;
}

export interface ProductListItem {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  price: number;
  compareAtPrice: number | null;
  images: ProductImage[];
  categories: Category[];
  averageRating: number;
  reviewCount: number;
  isFeatured: boolean;
  stock: number;
}

// ─── Cart Types ────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string | null;
  quantity: number;
  stock: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string | null;
  discount: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
  setCoupon: (code: string, discount: number) => void;
  clearCoupon: () => void;
}

// ─── Order Types ───────────────────────────────────────────────

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED";

export type PaymentMethod = "RAZORPAY" | "COD";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface OrderItem {
  id: string;
  name: string;
  image: string | null;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  codFee: number;
  discount: number;
  tax: number;
  total: number;
  trackingNumber: string | null;
  trackingUrl: string | null;
  estimatedDelivery: string | null;
  invoiceUrl: string | null;
  createdAt: string;
}

// ─── Review Types ──────────────────────────────────────────────

export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Review {
  id: string;
  rating: number;
  title: string | null;
  body: string;
  status: ReviewStatus;
  userName: string;
  createdAt: string;
}

// ─── Address Types ─────────────────────────────────────────────

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string;
  pincode: string;
  landmark: string | null;
  isDefault: boolean;
}

// ─── Shipping Types ────────────────────────────────────────────

export interface ShippingOption {
  courier: string;
  estimatedDays: number;
  cost: number;
  cod: boolean;
}

// ─── Admin Stats ───────────────────────────────────────────────

export interface DashboardStats {
  todayRevenue: number;
  weekRevenue: number;
  monthRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  topProducts: { name: string; count: number }[];
  lowStockProducts: { name: string; stock: number }[];
}

// ─── Coupon Types ──────────────────────────────────────────────

export interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount: number | null;
  maxDiscount: number | null;
  usageLimit: number | null;
  usedCount: number;
  isActive: boolean;
  validFrom: string;
  validUntil: string | null;
}

// ─── NextAuth Extensions ───────────────────────────────────────

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string;
      role: string;
      image?: string | null;
    };
  }

  interface User {
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
