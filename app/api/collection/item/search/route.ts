import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  const query = request.nextUrl.searchParams.get("q");
  if (typeof query !== "string") throw new Error("Invalid query");
  if (query.trim() === "") {
    const items = await prisma.item.findMany();
    return NextResponse.json({ items });
  }
  try {
    const items = await prisma.item.findMany({
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
            customFields: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            Tags: {
              some: {
                text: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            ItemComments: {
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
        items,
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
