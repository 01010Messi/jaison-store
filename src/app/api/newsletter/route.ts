import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    // Check if already subscribed
    const existing = await prisma.newsletter.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You're already subscribed!" },
        { status: 400 }
      );
    }

    await prisma.newsletter.create({
      data: { email },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
