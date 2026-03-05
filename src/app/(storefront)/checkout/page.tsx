"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  CreditCard,
  ClipboardCheck,
  ChevronRight,
  Truck,
  Banknote,
  Check,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import ScrollReveal from "@/components/decorative/ScrollReveal";
import GoldRule from "@/components/decorative/GoldRule";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

type Step = "address" | "payment" | "review";

const steps: { key: Step; label: string; icon: typeof MapPin }[] = [
  { key: "address", label: "Address", icon: MapPin },
  { key: "payment", label: "Payment", icon: CreditCard },
  { key: "review", label: "Review", icon: ClipboardCheck },
];

interface AddressForm {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh",
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<Step>("address");
  const [paymentMethod, setPaymentMethod] = useState<"RAZORPAY" | "COD">("RAZORPAY");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [address, setAddress] = useState<AddressForm>({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof AddressForm, string>>>({});

  const total = subtotal();
  const shipping = total >= 499 ? 0 : 49;
  const codFee = paymentMethod === "COD" ? 40 : 0;
  const grandTotal = total + shipping + codFee;

  const validateAddress = (): boolean => {
    const newErrors: Partial<Record<keyof AddressForm, string>> = {};

    if (!address.fullName.trim()) newErrors.fullName = "Name is required";
    if (!address.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[6-9]\d{9}$/.test(address.phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }
    if (!address.addressLine1.trim()) newErrors.addressLine1 = "Address is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.state) newErrors.state = "State is required";
    if (!address.pincode.trim()) {
      newErrors.pincode = "PIN code is required";
    } else if (!/^\d{6}$/.test(address.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit PIN code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === "address") {
      if (validateAddress()) setCurrentStep("payment");
    } else if (currentStep === "payment") {
      setCurrentStep("review");
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      if (paymentMethod === "RAZORPAY") {
        // Create Razorpay order
        const res = await fetch("/api/payment/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: grandTotal,
            items: items.map((i) => ({
              productId: i.productId,
              name: i.name,
              quantity: i.quantity,
              price: i.price,
              image: i.image,
            })),
            address,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Failed to create order");
          setIsProcessing(false);
          return;
        }

        // Open Razorpay checkout
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: "INR",
          name: "jaison",
          description: "Natural Ayurvedic Products",
          order_id: data.razorpayOrderId,
          handler: async (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) => {
            // Verify payment
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: data.orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok) {
              setOrderNumber(verifyData.orderNumber);
              setOrderPlaced(true);
              clearCart();
              toast.success("Order placed successfully!");
            } else {
              toast.error("Payment verification failed");
            }
          },
          prefill: {
            name: address.fullName,
            contact: address.phone,
          },
          theme: {
            color: "#C1714F",
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
            },
          },
        };

        // Load Razorpay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const razorpay = new (window as any).Razorpay(options);
          razorpay.open();
        };
        document.body.appendChild(script);
      } else {
        // COD order
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({
              productId: i.productId,
              name: i.name,
              quantity: i.quantity,
              price: i.price,
              image: i.image,
            })),
            address,
            paymentMethod: "COD",
            subtotal: total,
            shippingCost: shipping,
            codFee,
            total: grandTotal,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setOrderNumber(data.orderNumber);
          setOrderPlaced(true);
          clearCart();
          toast.success("Order placed successfully!");
        } else {
          toast.error(data.message || "Failed to place order");
        }
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Order success screen
  if (orderPlaced) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-sage" />
        </div>
        <h1 className="font-heading text-2xl md:text-3xl text-bark mb-3">
          Order Confirmed!
        </h1>
        <p className="text-bark/60 font-body text-sm mb-2 max-w-md">
          Thank you for your order. We&apos;ll send you a confirmation email
          with your order details shortly.
        </p>
        <p className="font-accent text-xs uppercase tracking-wider text-bark/40 mb-8">
          Order Number: {orderNumber}
        </p>
        <div className="flex gap-3">
          <Link href="/shop">
            <Button variant="primary" size="md">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Empty cart redirect
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="h-16 w-16 text-bark/15 mb-6" />
        <h1 className="font-heading text-2xl text-bark mb-3">
          Your cart is empty
        </h1>
        <Link href="/shop">
          <Button variant="primary" size="md">
            Shop Now
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-surface-warm py-6 md:py-8">
        <div className="container-brand">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1 text-xs font-accent uppercase tracking-wider text-bark/40 hover:text-bark transition-colors mb-4"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Cart
          </Link>

          {/* Progress steps */}
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const stepIdx = steps.findIndex((s) => s.key === currentStep);
              const isActive = step.key === currentStep;
              const isCompleted = idx < stepIdx;

              return (
                <div key={step.key} className="flex items-center gap-2 md:gap-4">
                  {idx > 0 && (
                    <ChevronRight className="h-4 w-4 text-bark/20" />
                  )}
                  <button
                    onClick={() => {
                      if (isCompleted) setCurrentStep(step.key);
                    }}
                    disabled={!isCompleted}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all",
                      isActive && "bg-bark text-cream",
                      isCompleted && "bg-sage/10 text-sage cursor-pointer",
                      !isActive && !isCompleted && "text-bark/30"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                    <span className="text-xs font-accent uppercase tracking-wider hidden sm:block">
                      {step.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-brand py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <ScrollReveal animation="fade-up">
              {/* Step 1: Address */}
              {currentStep === "address" && (
                <div>
                  <h2 className="font-heading text-xl text-bark mb-6">
                    Shipping Address
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={address.fullName}
                      onChange={(e) =>
                        setAddress({ ...address, fullName: e.target.value })
                      }
                      error={errors.fullName}
                      required
                    />
                    <Input
                      label="Mobile Number"
                      value={address.phone}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                        })
                      }
                      error={errors.phone}
                      required
                      placeholder="10-digit mobile number"
                    />
                    <div className="md:col-span-2">
                      <Input
                        label="Address Line 1"
                        value={address.addressLine1}
                        onChange={(e) =>
                          setAddress({ ...address, addressLine1: e.target.value })
                        }
                        error={errors.addressLine1}
                        required
                        placeholder="House no., Building, Street"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Input
                        label="Address Line 2"
                        value={address.addressLine2}
                        onChange={(e) =>
                          setAddress({ ...address, addressLine2: e.target.value })
                        }
                        placeholder="Apartment, Area, Colony (optional)"
                      />
                    </div>
                    <Input
                      label="City"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      error={errors.city}
                      required
                    />
                    <div>
                      <label className="block text-xs font-accent uppercase tracking-wider text-bark/60 mb-1.5">
                        State <span className="text-terracotta">*</span>
                      </label>
                      <select
                        value={address.state}
                        onChange={(e) =>
                          setAddress({ ...address, state: e.target.value })
                        }
                        className={cn(
                          "w-full px-3 py-2.5 border rounded-sm text-sm font-body bg-cream transition-colors focus:border-gold focus:ring-0 focus:outline-none appearance-none",
                          errors.state
                            ? "border-terracotta"
                            : "border-border"
                        )}
                      >
                        <option value="">Select State</option>
                        {indianStates.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.state && (
                        <p className="mt-1 text-xs text-terracotta">
                          {errors.state}
                        </p>
                      )}
                    </div>
                    <Input
                      label="PIN Code"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
                        })
                      }
                      error={errors.pincode}
                      required
                      placeholder="6-digit PIN code"
                    />
                    <Input
                      label="Landmark"
                      value={address.landmark}
                      onChange={(e) =>
                        setAddress({ ...address, landmark: e.target.value })
                      }
                      placeholder="Near... (optional)"
                    />
                  </div>

                  <div className="mt-8">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {currentStep === "payment" && (
                <div>
                  <h2 className="font-heading text-xl text-bark mb-6">
                    Payment Method
                  </h2>

                  <div className="space-y-3">
                    {/* Razorpay option */}
                    <button
                      onClick={() => setPaymentMethod("RAZORPAY")}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-sm border transition-all duration-300",
                        paymentMethod === "RAZORPAY"
                          ? "border-terracotta bg-terracotta/5"
                          : "border-border hover:border-bark/30"
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                          paymentMethod === "RAZORPAY"
                            ? "border-terracotta"
                            : "border-bark/20"
                        )}
                      >
                        {paymentMethod === "RAZORPAY" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-terracotta" />
                        )}
                      </div>
                      <CreditCard className="h-5 w-5 text-bark/50" />
                      <div className="text-left">
                        <p className="font-heading text-sm text-bark">
                          Pay Online
                        </p>
                        <p className="text-[11px] text-bark/40 font-body">
                          UPI, Credit/Debit Card, Net Banking, Wallets
                        </p>
                      </div>
                    </button>

                    {/* COD option */}
                    <button
                      onClick={() => setPaymentMethod("COD")}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-sm border transition-all duration-300",
                        paymentMethod === "COD"
                          ? "border-terracotta bg-terracotta/5"
                          : "border-border hover:border-bark/30"
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                          paymentMethod === "COD"
                            ? "border-terracotta"
                            : "border-bark/20"
                        )}
                      >
                        {paymentMethod === "COD" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-terracotta" />
                        )}
                      </div>
                      <Banknote className="h-5 w-5 text-bark/50" />
                      <div className="text-left">
                        <p className="font-heading text-sm text-bark">
                          Cash on Delivery
                        </p>
                        <p className="text-[11px] text-bark/40 font-body">
                          Pay when you receive your order (+₹40 COD fee)
                        </p>
                      </div>
                    </button>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <Button
                      variant="ghost"
                      onClick={() => setCurrentStep("address")}
                    >
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleNextStep}
                    >
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === "review" && (
                <div>
                  <h2 className="font-heading text-xl text-bark mb-6">
                    Review Your Order
                  </h2>

                  {/* Shipping address summary */}
                  <div className="border border-border rounded-sm p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-sage" />
                        <span className="font-accent text-xs uppercase tracking-wider text-bark/60">
                          Shipping Address
                        </span>
                      </div>
                      <button
                        onClick={() => setCurrentStep("address")}
                        className="text-xs text-terracotta font-accent uppercase tracking-wider"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="font-heading text-sm text-bark">
                      {address.fullName}
                    </p>
                    <p className="text-xs text-bark/60 font-body leading-relaxed mt-1">
                      {address.addressLine1}
                      {address.addressLine2 && `, ${address.addressLine2}`}
                      <br />
                      {address.city}, {address.state} - {address.pincode}
                      <br />
                      Phone: {address.phone}
                    </p>
                  </div>

                  {/* Payment method summary */}
                  <div className="border border-border rounded-sm p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-sage" />
                        <span className="font-accent text-xs uppercase tracking-wider text-bark/60">
                          Payment Method
                        </span>
                      </div>
                      <button
                        onClick={() => setCurrentStep("payment")}
                        className="text-xs text-terracotta font-accent uppercase tracking-wider"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="font-heading text-sm text-bark">
                      {paymentMethod === "RAZORPAY"
                        ? "Pay Online (UPI / Card / Net Banking)"
                        : "Cash on Delivery (+₹40)"}
                    </p>
                  </div>

                  {/* Order items */}
                  <div className="border border-border rounded-sm p-4 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Truck className="h-4 w-4 text-sage" />
                      <span className="font-accent text-xs uppercase tracking-wider text-bark/60">
                        Order Items
                      </span>
                    </div>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.productId}
                          className="flex items-center gap-3"
                        >
                          <div className="relative w-12 h-14 bg-parchment rounded-sm overflow-hidden shrink-0">
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-heading text-sm text-bark truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-bark/40 font-body">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-body text-sm font-semibold text-bark">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handlePlaceOrder}
                    isLoading={isProcessing}
                  >
                    {paymentMethod === "RAZORPAY"
                      ? `Pay ${formatPrice(grandTotal)}`
                      : `Place Order (${formatPrice(grandTotal)})`}
                  </Button>

                  <p className="text-center text-[11px] text-bark/40 font-body mt-3">
                    By placing this order, you agree to our Terms of Service and
                    Privacy Policy.
                  </p>
                </div>
              )}
            </ScrollReveal>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface-warm p-6 rounded-sm border border-border/50 sticky top-24">
              <h3 className="font-heading text-lg text-bark mb-4">
                Order Summary
              </h3>
              <GoldRule variant="simple" width="w-full" className="mb-4" />

              {/* Items preview */}
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-bark/60 font-body truncate mr-2">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-bark font-body font-medium shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <GoldRule variant="simple" width="w-full" className="mb-4" />

              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between text-bark/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-bark/60">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-sage">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {codFee > 0 && (
                  <div className="flex justify-between text-bark/60">
                    <span>COD Fee</span>
                    <span>{formatPrice(codFee)}</span>
                  </div>
                )}
              </div>

              <GoldRule variant="diamond" width="w-full" className="my-4" />

              <div className="flex justify-between items-baseline">
                <span className="font-heading text-bark">Total</span>
                <span className="font-heading text-xl text-bark">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
