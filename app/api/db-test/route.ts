import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Test the connection
    await prisma.$connect();
    
    // Optional: create a test user
    const user = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}