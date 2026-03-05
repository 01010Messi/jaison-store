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
      select: { id: true, name: true, email: true, phone: true },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, phone } = body;

    const updateData: Record<string, string> = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
      select: { id: true, name: true, email: true, phone: true },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Failed to update profile:", error);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
