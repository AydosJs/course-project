import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
  const { userId, collectionId, text } = await request.json();

  try {
    const res = await prisma.collectionComments.create({
      data: {
        userId,
        collectionId,
        text,
        likeCount: 0,
      },
    });

    return NextResponse.json(
      {
        message: "Sussed!",
        res,
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
