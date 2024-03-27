import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
  const { ids } = await request.json();

  try {
    const tags = await prisma.tags.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

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
