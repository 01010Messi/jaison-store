"use client";

import { useEffect, useState, useCallback } from "react";
import { Truck, Package, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import GoldRule from "@/components/decorative/GoldRule";
import { formatPrice, cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  total: number;
  trackingNumber?: string;
  shiprocketOrderId?: string;
  createdAt: string;
  customer: { name?: string; email: string; phone?: string };
  items: OrderItem[];
  shippingAddress: ShippingAddress;
}

export default function AdminShippingPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [shippingOrder, setShippingOrder] = useState<string | null>(null);
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleShip = async (orderId: string) => {
    setShippingOrder(orderId);
    try {
      const body: Record<string, string> = { status: "SHIPPED" };
      const tracking = trackingInputs[orderId];
      if (tracking) body.trackingNumber = tracking;

      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { message?: string }).message || "Failed");
      }
      toast.success("Order marked as shipped — customer email sent");
      await fetchOrders();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update order");
    } finally {
      setShippingOrder(null);
    }
  };

  const readyToShip = orders.filter((o) =>
    ["CONFIRMED", "PROCESSING"].includes(o.status)
  );
  const inTransit = orders.filter((o) => o.status === "SHIPPED");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-bark/20 border-t-terracotta" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl text-bark">Shipping</h1>
        <p className="text-sm text-bark/72 font-body mt-1">
          {readyToShip.length > 0
            ? `${readyToShip.length} order${readyToShip.length !== 1 ? "s" : ""} ready to ship`
            : "All orders shipped or no pending shipments"}
        </p>
      </div>

      {/* Ready to Ship */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-accent text-xs uppercase tracking-[0.18em] text-bark/72 whitespace-nowrap">
            Ready to Ship
          </h2>
          <GoldRule variant="simple" width="w-full" />
          <span className="font-accent text-xs text-bark/40 whitespace-nowrap">
            {readyToShip.length}
          </span>
        </div>

        {readyToShip.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-bark/30 bg-cream rounded-xl border border-border/50">
            <Package className="h-10 w-10 mb-2 opacity-40" />
            <p className="font-body text-sm">No orders awaiting shipment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {readyToShip.map((order) => {
              const expanded = expandedCards[order.id] ?? false;
              return (
                <div
                  key={order.id}
                  className="bg-cream rounded-xl border border-border/50 overflow-hidden"
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-accent text-sm font-semibold text-bark">
                          #{order.orderNumber}
                        </span>
                        <Badge variant={order.paymentMethod === "COD" ? "gold" : "sage"}>
                          {order.paymentMethod === "COD" ? "COD" : "Prepaid"}
                        </Badge>
                        <Badge variant="default">{order.status}</Badge>
                        <span className="text-xs text-bark/40 font-body">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-bark/72 font-body mt-1">
                        {order.customer.name || order.customer.email} &bull;{" "}
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""} &bull;{" "}
                        {formatPrice(order.total)}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setExpandedCards((prev) => ({
                          ...prev,
                          [order.id]: !prev[order.id],
                        }))
                      }
                      className="p-1.5 text-bark/30 hover:text-bark transition-colors"
                      aria-label={expanded ? "Collapse" : "Expand"}
                    >
                      {expanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Expanded detail */}
                  {expanded && (
                    <div className="border-t border-border/50 p-4 space-y-4">
                      {/* Address */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-accent uppercase tracking-wider text-bark/40 mb-1">
                            Ship To
                          </p>
                          <address className="not-italic text-sm text-bark/72 font-body leading-relaxed">
                            <strong className="text-bark font-semibold">
                              {order.shippingAddress.fullName}
                            </strong>
                            <br />
                            {order.shippingAddress.addressLine1}
                            {order.shippingAddress.addressLine2 &&
                              `, ${order.shippingAddress.addressLine2}`}
                            <br />
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state} — {order.shippingAddress.pincode}
                            <br />
                            {order.shippingAddress.phone}
                          </address>
                        </div>

                        {/* Items */}
                        <div>
                          <p className="text-[10px] font-accent uppercase tracking-wider text-bark/40 mb-1">
                            Items
                          </p>
                          <div className="space-y-1">
                            {order.items.map((item, i) => (
                              <p key={i} className="text-sm text-bark/72 font-body">
                                {item.name}{" "}
                                <span className="text-bark/40">× {item.quantity}</span>
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Ship action */}
                      <div
                        className={cn(
                          "rounded-lg p-3 flex flex-col sm:flex-row items-start sm:items-end gap-3",
                          order.shiprocketOrderId
                            ? "bg-parchment/50"
                            : "bg-terracotta/5 border border-terracotta/20"
                        )}
                      >
                        {!order.shiprocketOrderId && (
                          <div className="flex-1 w-full sm:w-auto">
                            <Input
                              label="Tracking number (optional — auto-generated if blank)"
                              value={trackingInputs[order.id] ?? ""}
                              onChange={(e) =>
                                setTrackingInputs((prev) => ({
                                  ...prev,
                                  [order.id]: e.target.value,
                                }))
                              }
                              placeholder="e.g. 1234567890"
                            />
                          </div>
                        )}
                        {order.shiprocketOrderId ? (
                          <p className="text-xs text-bark/60 font-body">
                            Shiprocket order already created (ID {order.shiprocketOrderId}). Marking
                            shipped will skip re-creation.
                          </p>
                        ) : null}
                        <Button
                          variant="primary"
                          size="sm"
                          isLoading={shippingOrder === order.id}
                          onClick={() => handleShip(order.id)}
                          className="shrink-0"
                        >
                          <Truck className="h-3.5 w-3.5 mr-1.5" />
                          Ship Now
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* In Transit */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-accent text-xs uppercase tracking-[0.18em] text-bark/72 whitespace-nowrap">
            In Transit
          </h2>
          <GoldRule variant="simple" width="w-full" />
          <span className="font-accent text-xs text-bark/40 whitespace-nowrap">
            {inTransit.length}
          </span>
        </div>

        {inTransit.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-bark/30 bg-cream rounded-xl border border-border/50">
            <Truck className="h-10 w-10 mb-2 opacity-40" />
            <p className="font-body text-sm">No orders in transit</p>
          </div>
        ) : (
          <div className="bg-cream rounded-xl border border-border/50 divide-y divide-border/50">
            {inTransit.map((order) => (
              <div key={order.id} className="flex items-center gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-accent text-sm font-semibold text-bark">
                      #{order.orderNumber}
                    </span>
                    <Badge variant={order.paymentMethod === "COD" ? "gold" : "sage"}>
                      {order.paymentMethod === "COD" ? "COD" : "Prepaid"}
                    </Badge>
                  </div>
                  <p className="text-xs text-bark/72 font-body">
                    {order.customer.name || order.customer.email} &bull;{" "}
                    {order.shippingAddress.city}, {order.shippingAddress.state}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  {order.trackingNumber ? (
                    <a
                      href={`https://www.shiprocket.in/shipment-tracking/${order.trackingNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-accent text-terracotta hover:text-terracotta/80 transition-colors"
                    >
                      {order.trackingNumber}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-xs text-bark/40 font-body">No tracking</span>
                  )}
                  <p className="text-[10px] text-bark/40 font-body mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
