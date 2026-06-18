"use client";

import { useEffect, useState, useCallback } from "react";
import { ShoppingCart, Eye, Truck, X, Search, Download } from "lucide-react";
import GoldRule from "@/components/decorative/GoldRule";
import { formatPrice, cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
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
  subtotal: number;
  shippingCost: number;
  codFee: number;
  discount: number;
  total: number;
  couponCode?: string;
  trackingNumber?: string;
  invoiceUrl?: string;
  createdAt: string;
  customer: { name?: string; email: string; phone?: string };
  items: OrderItem[];
  shippingAddress: ShippingAddress;
}

const statusBadgeVariant: Record<string, "default" | "sage" | "gold" | "terracotta"> = {
  PENDING: "gold",
  CONFIRMED: "default",
  PROCESSING: "default",
  SHIPPED: "sage",
  DELIVERED: "sage",
  CANCELLED: "terracotta",
};

const validStatuses = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

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

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(true);
    try {
      const body: Record<string, string> = { status: newStatus };
      if (newStatus === "SHIPPED" && trackingNumber) {
        body.trackingNumber = trackingNumber;
      }
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      toast.success(`Order updated to ${newStatus}`);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      setSelectedOrder(null);
      setTrackingNumber("");
    } catch {
      toast.error("Failed to update order");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === "ALL" || o.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      o.orderNumber.toLowerCase().includes(q) ||
      (o.customer.name || "").toLowerCase().includes(q) ||
      o.customer.email.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-bark/20 border-t-terracotta" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl text-bark">Orders</h1>
          <p className="text-sm text-bark/72 font-body mt-1">
            Manage customer orders and shipments
          </p>
        </div>
        <a
          href="/api/admin/orders/export"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-accent uppercase tracking-wider border border-border rounded-sm text-bark/72 hover:border-bark hover:text-bark transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </a>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bark/30" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by order number, name, or email..."
          className="w-full pl-9 pr-4 py-2 bg-cream border border-border rounded-sm text-sm font-body text-bark placeholder:text-bark/30 focus:border-gold"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["ALL", ...validStatuses].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(
              "px-3 py-1.5 text-xs font-accent uppercase tracking-wider rounded-full border transition-colors whitespace-nowrap",
              statusFilter === s
                ? "bg-bark text-cream border-bark"
                : "bg-cream text-bark/72 border-border hover:border-bark/30"
            )}
          >
            {s}
            {s !== "ALL" && (
              <span className="ml-1 opacity-50">
                ({orders.filter((o) => o.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-cream rounded-sm border border-border/50">
        <div className="flex items-center gap-3 p-4 border-b border-border/50">
          <span className="section-label text-bark/72">
            {filteredOrders.length} Order{filteredOrders.length !== 1 ? "s" : ""}
          </span>
          <GoldRule variant="simple" width="w-full" />
        </div>

        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-bark/30">
            <ShoppingCart className="h-12 w-12 mb-3 opacity-50" />
            <p className="font-heading text-lg text-bark/72">No orders found</p>
          </div>
        ) : (
          <div className="divide-y divide-border-light">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-4 p-4 hover:bg-parchment/20 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-accent text-sm font-semibold text-bark">
                      #{order.orderNumber}
                    </p>
                    <Badge variant={statusBadgeVariant[order.status] || "default"}>
                      {order.status}
                    </Badge>
                    {order.paymentStatus === "PAID" && (
                      <Badge variant="sage">Paid</Badge>
                    )}
                    {order.paymentMethod === "COD" && (
                      <Badge variant="gold">COD</Badge>
                    )}
                  </div>
                  <p className="text-xs text-bark/72 font-body">
                    {order.customer.name || order.customer.email} &bull;{" "}
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""} &bull;{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-heading text-sm text-terracotta">
                    {formatPrice(order.total)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="p-2 text-bark/30 hover:text-bark transition-colors"
                  aria-label="View order"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order detail modal */}
      {selectedOrder && (
        <Modal
          isOpen={!!selectedOrder}
          onClose={() => {
            setSelectedOrder(null);
            setTrackingNumber("");
          }}
          title={`Order #${selectedOrder.orderNumber}`}
        >
          <div className="space-y-4">
            {/* Customer info */}
            <div>
              <h3 className="text-xs font-accent uppercase tracking-wider text-bark/72 mb-2">
                Customer
              </h3>
              <p className="text-sm text-bark font-body">
                {selectedOrder.customer.name || "—"}
              </p>
              <p className="text-xs text-bark/72 font-body">
                {selectedOrder.customer.email}
              </p>
              {selectedOrder.customer.phone && (
                <p className="text-xs text-bark/72 font-body">
                  {selectedOrder.customer.phone}
                </p>
              )}
            </div>

            {/* Shipping address */}
            <div>
              <h3 className="text-xs font-accent uppercase tracking-wider text-bark/72 mb-2">
                Shipping Address
              </h3>
              <p className="text-sm text-bark/70 font-body">
                {selectedOrder.shippingAddress.fullName}
                <br />
                {selectedOrder.shippingAddress.addressLine1}
                {selectedOrder.shippingAddress.addressLine2 &&
                  `, ${selectedOrder.shippingAddress.addressLine2}`}
                <br />
                {selectedOrder.shippingAddress.city},{" "}
                {selectedOrder.shippingAddress.state} -{" "}
                {selectedOrder.shippingAddress.pincode}
                <br />
                {selectedOrder.shippingAddress.phone}
              </p>
            </div>

            {/* Items */}
            <div>
              <h3 className="text-xs font-accent uppercase tracking-wider text-bark/72 mb-2">
                Items
              </h3>
              <div className="space-y-2">
                {selectedOrder.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm text-bark/70 font-body"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <GoldRule variant="simple" width="w-full" className="my-2" />
                <div className="flex justify-between text-sm font-body">
                  <span className="text-bark/72">Subtotal</span>
                  <span className="text-bark">
                    {formatPrice(selectedOrder.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-bark/72">Shipping</span>
                  <span className="text-bark">
                    {selectedOrder.shippingCost > 0
                      ? formatPrice(selectedOrder.shippingCost)
                      : "Free"}
                  </span>
                </div>
                {selectedOrder.codFee > 0 && (
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-bark/72">COD Fee</span>
                    <span className="text-bark">
                      {formatPrice(selectedOrder.codFee)}
                    </span>
                  </div>
                )}
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-sage">
                      Discount{selectedOrder.couponCode ? ` (${selectedOrder.couponCode})` : ""}
                    </span>
                    <span className="text-sage">
                      -{formatPrice(selectedOrder.discount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-heading">
                  <span className="text-bark">Total</span>
                  <span className="text-terracotta">
                    {formatPrice(selectedOrder.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Update status */}
            <div>
              <h3 className="text-xs font-accent uppercase tracking-wider text-bark/72 mb-2">
                Update Status
              </h3>
              {!["SHIPPED", "DELIVERED", "CANCELLED"].includes(selectedOrder.status) && (
                <div className="mb-3">
                  <Input
                    label="Tracking Number (for shipping)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number"
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {validStatuses
                  .filter((s) => s !== selectedOrder.status)
                  .map((s) => (
                    <Button
                      key={s}
                      variant={s === "CANCELLED" ? "ghost" : "secondary"}
                      size="sm"
                      isLoading={updatingStatus}
                      onClick={() =>
                        handleStatusUpdate(selectedOrder.id, s)
                      }
                    >
                      {s === "SHIPPED" && (
                        <Truck className="h-3 w-3 mr-1" />
                      )}
                      {s === "CANCELLED" && (
                        <X className="h-3 w-3 mr-1" />
                      )}
                      {s}
                    </Button>
                  ))}
              </div>
            </div>

            {/* Invoice link */}
            {selectedOrder.invoiceUrl && (
              <div>
                <a
                  href={selectedOrder.invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-accent uppercase tracking-wider text-terracotta hover:text-terracotta/80 transition-colors"
                >
                  Download Invoice
                </a>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
