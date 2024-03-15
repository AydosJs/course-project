import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<Response> {
  try {
    const tags = await prisma.tags.findMany();

    return NextResponse.json(
      {
        message: "Sussed!",
        tags,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
