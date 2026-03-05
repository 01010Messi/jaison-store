// Shiprocket API integration
// Docs: https://apidocs.shiprocket.in/

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAuthToken(): Promise<string> {
  // Return cached token if still valid (tokens last 10 days, we refresh at 9)
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const res = await fetch(
    "https://apiv2.shiprocket.in/v1/external/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Shiprocket auth failed: ${res.status}`);
  }

  const data = await res.json();
  cachedToken = {
    token: data.token,
    expiresAt: Date.now() + 9 * 24 * 60 * 60 * 1000, // 9 days
  };

  return data.token;
}

async function shiprocketFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getAuthToken();
  return fetch(`https://apiv2.shiprocket.in/v1/external${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
}

/**
 * Check serviceability for a PIN code
 */
export async function checkServiceability(
  pickupPincode: string,
  deliveryPincode: string,
  weight: number, // in kg
  codEnabled: boolean = true
) {
  const params = new URLSearchParams({
    pickup_postcode: pickupPincode,
    delivery_postcode: deliveryPincode,
    weight: weight.toString(),
    cod: codEnabled ? "1" : "0",
  });

  const res = await shiprocketFetch(
    `/courier/serviceability/?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error(`Serviceability check failed: ${res.status}`);
  }

  const data = await res.json();

  if (!data.data?.available_courier_companies?.length) {
    return {
      serviceable: false,
      estimatedDays: null,
      courierName: null,
      codAvailable: false,
    };
  }

  // Get the cheapest/fastest option
  const best = data.data.available_courier_companies[0];

  return {
    serviceable: true,
    estimatedDays: best.estimated_delivery_days,
    courierName: best.courier_name,
    codAvailable: best.cod === 1,
    shippingCharge: best.freight_charge,
  };
}

/**
 * Create a Shiprocket order
 */
export async function createShiprocketOrder(orderData: {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: "Prepaid" | "COD";
  subtotal: number;
  items: {
    name: string;
    sku: string;
    units: number;
    sellingPrice: number;
  }[];
  weight: number; // in kg
}) {
  const res = await shiprocketFetch("/orders/create/adhoc", {
    method: "POST",
    body: JSON.stringify({
      order_id: orderData.orderNumber,
      order_date: orderData.orderDate,
      pickup_location: "Primary",
      billing_customer_name: orderData.customerName,
      billing_last_name: "",
      billing_address: orderData.addressLine1,
      billing_address_2: orderData.addressLine2 || "",
      billing_city: orderData.city,
      billing_pincode: orderData.pincode,
      billing_state: orderData.state,
      billing_country: "India",
      billing_email: orderData.customerEmail,
      billing_phone: orderData.customerPhone,
      shipping_is_billing: true,
      order_items: orderData.items.map((item) => ({
        name: item.name,
        sku: item.sku,
        units: item.units,
        selling_price: item.sellingPrice.toString(),
      })),
      payment_method: orderData.paymentMethod,
      sub_total: orderData.subtotal,
      length: 20,
      breadth: 15,
      height: 10,
      weight: orderData.weight,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      `Shiprocket order creation failed: ${JSON.stringify(errorData)}`
    );
  }

  const data = await res.json();
  return {
    shiprocketOrderId: data.order_id?.toString(),
    shiprocketShipmentId: data.shipment_id?.toString(),
    status: data.status,
  };
}

/**
 * Generate AWB (tracking number) for a shipment
 */
export async function generateAWB(shipmentId: string) {
  const res = await shiprocketFetch("/courier/assign/ship", {
    method: "POST",
    body: JSON.stringify({ shipment_id: [shipmentId] }),
  });

  if (!res.ok) {
    throw new Error(`AWB generation failed: ${res.status}`);
  }

  const data = await res.json();
  return {
    awbCode: data.response?.data?.awb_code,
    courierName: data.response?.data?.courier_name,
  };
}

/**
 * Get tracking info for a shipment
 */
export async function getTrackingInfo(shipmentId: string) {
  const res = await shiprocketFetch(
    `/courier/track/shipment/${shipmentId}`
  );

  if (!res.ok) {
    throw new Error(`Tracking failed: ${res.status}`);
  }

  return res.json();
}
