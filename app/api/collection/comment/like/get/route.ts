import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
  const { commentId, userId } = await request.json();

  try {
    const likes = await prisma.commentLike.findMany({
      where: {
        collectionCommentId: commentId,
      },
    });

    if (userId) {
      const liked = likes.some((like) => like.userId === userId);
      return NextResponse.json(
        {
          message: "Success!",
          likes,
          liked,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        message: "Success!",
        likes,
        liked: false,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to like" }, { status: 500 });
  }
}
