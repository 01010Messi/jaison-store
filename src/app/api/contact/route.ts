import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Name, email, subject, and message are required" },
        { status: 400 }
      );
    }

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
      },
    });

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 }
    );
  }
}
