"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Users, User, Search, ShoppingBag, Phone, Mail, Calendar } from "lucide-react";
import GoldRule from "@/components/decorative/GoldRule";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import toast from "react-hot-toast";

interface RecentOrder {
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
}

interface Customer {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  orderCount: number;
  reviewCount: number;
  totalSpent: number;
  createdAt: string;
  recentOrders: RecentOrder[];
}

const statusBadgeVariant: Record<string, "default" | "sage" | "gold" | "terracotta"> = {
  PENDING: "gold",
  CONFIRMED: "default",
  PROCESSING: "default",
  SHIPPED: "sage",
  DELIVERED: "sage",
  CANCELLED: "terracotta",
  RETURNED: "terracotta",
};

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCustomers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/customers");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setCustomers(data.customers || []);
    } catch {
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return customers;
    const query = searchQuery.toLowerCase();
    return customers.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(query)) ||
        c.email.toLowerCase().includes(query)
    );
  }, [customers, searchQuery]);

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
        <h1 className="font-heading text-2xl text-bark">Customers</h1>
        <p className="text-sm text-bark/60 font-body mt-1">
          Manage and view customer information
        </p>
      </div>

      {/* Summary stats */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-3 bg-cream rounded-sm border border-border/50 px-5 py-3">
          <Users className="h-5 w-5 text-terracotta" />
          <div>
            <p className="text-xs font-accent uppercase tracking-wider text-bark/60">
              Total Customers
            </p>
            <p className="font-heading text-lg text-bark">
              {customers.length}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-bark/30" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm font-body text-bark bg-cream border border-border/50 rounded-sm placeholder:text-bark/30 focus:border-bark/30 transition-colors"
          />
        </div>
      </div>

      <div className="bg-cream rounded-sm border border-border/50">
        <div className="flex items-center gap-3 p-4 border-b border-border/50">
          <span className="section-label text-bark/60">
            {filteredCustomers.length} Customer{filteredCustomers.length !== 1 ? "s" : ""}
            {searchQuery.trim() && ` found`}
          </span>
          <GoldRule variant="simple" width="w-full" />
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-bark/30">
            <Users className="h-12 w-12 mb-3 opacity-50" />
            <p className="font-heading text-lg text-bark/60">
              {searchQuery.trim() ? "No customers match your search" : "No customers yet"}
            </p>
            <p className="text-xs text-bark/30 font-body mt-1">
              {searchQuery.trim()
                ? "Try a different search term"
                : "Customers will appear here once they register"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border-light">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className="flex items-center gap-4 p-4 hover:bg-parchment/20 transition-colors cursor-pointer"
              >
                {/* Avatar */}
                <div className="h-10 w-10 rounded-full bg-parchment flex items-center justify-center shrink-0">
                  <span className="font-accent text-sm text-bark/60 uppercase">
                    {customer.name
                      ? customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                      : customer.email[0].toUpperCase()}
                  </span>
                </div>

                {/* Customer info */}
                <div className="flex-1 min-w-0">
                  <p className="font-accent text-sm font-semibold text-bark truncate">
                    {customer.name || customer.email}
                  </p>
                  <p className="text-xs text-bark/60 font-body truncate">
                    {customer.name ? customer.email : ""}{" "}
                    {customer.phone && (
                      <span>
                        {customer.name ? " \u2022 " : ""}
                        {customer.phone}
                      </span>
                    )}
                  </p>
                </div>

                {/* Order count */}
                <div className="text-center shrink-0 hidden sm:block">
                  <p className="font-heading text-sm text-bark">
                    {customer.orderCount}
                  </p>
                  <p className="text-[10px] text-bark/30 font-accent uppercase tracking-wider">
                    Orders
                  </p>
                </div>

                {/* Total spent */}
                <div className="text-right shrink-0">
                  <p className="font-heading text-sm text-terracotta">
                    {formatPrice(customer.totalSpent)}
                  </p>
                  <p className="text-[10px] text-bark/30 font-accent uppercase tracking-wider">
                    Spent
                  </p>
                </div>

                {/* Member since */}
                <div className="text-right shrink-0 hidden md:block">
                  <p className="text-xs text-bark/60 font-body">
                    {new Date(customer.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Customer detail modal */}
      {selectedCustomer && (
        <Modal
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          title="Customer Details"
          size="lg"
        >
          <div className="space-y-5">
            {/* Customer profile */}
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-full bg-parchment flex items-center justify-center shrink-0">
                <User className="h-6 w-6 text-bark/60" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-lg text-bark">
                  {selectedCustomer.name || "Unnamed Customer"}
                </h3>
                <div className="mt-1 space-y-0.5">
                  <div className="flex items-center gap-2 text-sm text-bark/60 font-body">
                    <Mail className="h-3.5 w-3.5 text-bark/30" />
                    {selectedCustomer.email}
                  </div>
                  {selectedCustomer.phone && (
                    <div className="flex items-center gap-2 text-sm text-bark/60 font-body">
                      <Phone className="h-3.5 w-3.5 text-bark/30" />
                      {selectedCustomer.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-bark/60 font-body">
                    <Calendar className="h-3.5 w-3.5 text-bark/30" />
                    Member since{" "}
                    {new Date(selectedCustomer.createdAt).toLocaleDateString(
                      "en-IN",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </div>
                </div>
              </div>
            </div>

            <GoldRule variant="simple" width="w-full" />

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-parchment/30 rounded-sm p-4 text-center">
                <p className="font-heading text-2xl text-bark">
                  {selectedCustomer.orderCount}
                </p>
                <p className="text-xs font-accent uppercase tracking-wider text-bark/60 mt-1">
                  Total Orders
                </p>
              </div>
              <div className="bg-parchment/30 rounded-sm p-4 text-center">
                <p className="font-heading text-2xl text-terracotta">
                  {formatPrice(selectedCustomer.totalSpent)}
                </p>
                <p className="text-xs font-accent uppercase tracking-wider text-bark/60 mt-1">
                  Total Spent
                </p>
              </div>
            </div>

            {/* Recent orders */}
            <div>
              <h3 className="text-xs font-accent uppercase tracking-wider text-bark/60 mb-3">
                Recent Orders
              </h3>
              {selectedCustomer.recentOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-bark/30">
                  <ShoppingBag className="h-8 w-8 mb-2 opacity-50" />
                  <p className="text-xs text-bark/30 font-body">
                    No orders yet
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedCustomer.recentOrders.map((order) => (
                    <div
                      key={order.orderNumber}
                      className="flex items-center justify-between bg-parchment/20 rounded-sm px-4 py-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-accent text-sm font-semibold text-bark">
                            #{order.orderNumber}
                          </p>
                          <Badge
                            variant={
                              statusBadgeVariant[order.status] || "default"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-bark/60 font-body mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <p className="font-heading text-sm text-terracotta shrink-0">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Bottom decorative rule */}
      <div className="flex justify-center mt-12">
        <GoldRule variant="diamond" width="w-32" />
      </div>
    </div>
  );
}
