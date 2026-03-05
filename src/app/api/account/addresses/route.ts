import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        addresses: { orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }] },
      },
    });

    return NextResponse.json({ addresses: user?.addresses || [] });
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    return NextResponse.json(
      { message: "Failed to fetch addresses" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const {
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      landmark,
      isDefault,
    } = body;

    // If setting as default, unset other defaults
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const address = await prisma.address.create({
      data: {
        userId: user.id,
        fullName,
        phone,
        addressLine1,
        addressLine2: addressLine2 || null,
        city,
        state,
        pincode,
        landmark: landmark || null,
        isDefault: isDefault || false,
      },
    });

    return NextResponse.json(address, { status: 201 });
  } catch (error) {
    console.error("Failed to create address:", error);
    return NextResponse.json(
      { message: "Failed to save address" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Address ID required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Verify ownership
    const address = await prisma.address.findFirst({
      where: { id, userId: user.id },
    });

    if (!address) {
      return NextResponse.json(
        { message: "Address not found" },
        { status: 404 }
      );
    }

    await prisma.address.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete address:", error);
    return NextResponse.json(
      { message: "Failed to delete address" },
      { status: 500 }
    );
  }
}
