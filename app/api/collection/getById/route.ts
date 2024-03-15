import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<Response> {
  const { collectionId } = await request.json();
  console.log("collectionId", collectionId);
  try {
    const res = await prisma.collection.findFirst({
      where: {
        id: collectionId,
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
