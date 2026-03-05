import { NextResponse } from "next/server";
import { checkServiceability } from "@/lib/shiprocket";

// Pickup PIN code (your warehouse)
const PICKUP_PINCODE = "400001"; // Update with your actual warehouse pincode

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pincode } = body;

    if (!pincode || !/^[1-9][0-9]{5}$/.test(pincode)) {
      return NextResponse.json(
        { serviceable: false, message: "Enter a valid 6-digit PIN code" },
        { status: 400 }
      );
    }

    const result = await checkServiceability(
      PICKUP_PINCODE,
      pincode,
      0.5, // 500g default weight
      true
    );

    if (!result.serviceable) {
      return NextResponse.json({
        serviceable: false,
        message: "Delivery not available for this PIN code",
      });
    }

    return NextResponse.json({
      serviceable: true,
      estimatedDays: result.estimatedDays,
      courierName: result.courierName,
      codAvailable: result.codAvailable,
      message: `Delivery in ${result.estimatedDays} days via ${result.courierName}`,
    });
  } catch (error) {
    console.error("Serviceability check failed:", error);
    // Graceful fallback — assume serviceable if API fails
    return NextResponse.json({
      serviceable: true,
      estimatedDays: "5-7",
      message: "Estimated delivery: 5-7 business days",
      codAvailable: true,
    });
  }
}
