import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Check if phone already exists
    if (phone) {
      const existingPhone = await prisma.user.findUnique({
        where: { phone },
      });

      if (existingPhone) {
        return NextResponse.json(
          { message: "An account with this phone number already exists" },
          { status: 409 }
        );
      }
    }

    // Hash password and create user
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        passwordHash,
        role: "CUSTOMER",
      },
    });

    // Send welcome email (fire and forget)
    sendWelcomeEmail({ name: user.name || name, email: user.email }).catch(
      (err) => console.error("Welcome email failed:", err)
    );

    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json(
      { message: "Failed to create account" },
      { status: 500 }
    );
  }
}
