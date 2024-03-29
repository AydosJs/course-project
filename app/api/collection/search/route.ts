import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const query = request.nextUrl.searchParams.get("q");
  if (typeof query !== "string") throw new Error("Invalid query");
  if (query.trim() === "") {
    const collection = await prisma.collection.findMany();
    return NextResponse.json({ collection });
  }
  try {
    const collection = await prisma.collection.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            topic: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            Comment: {
              some: {
                text: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      },
    });

    return NextResponse.json(
      {
        message: "Sussed!",
        collection: collection,
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
