import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
  const { collectionId } = await request.json();
  try {
    const res = await prisma.collectionComments.findMany({
      where: {
        collectionId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        CommentLike: true,
      },
    });

    const sortedComments = res.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return NextResponse.json(
      {
        message: "Sussed!",
        sortedComments,
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
