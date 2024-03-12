import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<Response> {
  const { itemId } = await request.json();

  try {
    if (itemId) {
      const itemTags = await prisma.tags.findMany({
        where: {
          itemId,
        },
      });

      return NextResponse.json(
        {
          message: "Sussed!",
          itemTags,
        },
        {
          status: 200,
        },
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
