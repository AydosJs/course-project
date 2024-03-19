import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

async function updateItemCommentLikeCount(commentId: string) {
  try {
    const commentLikes = await prisma.commentLike.findMany({
      where: {
        itemCommentsId: commentId,
      },
    });

    await prisma.itemComments.update({
      where: {
        id: commentId,
      },
      data: {
        likeCount: commentLikes.length,
      },
    });

    return commentLikes.length;
  } catch (error) {}
}

export async function POST(request: Request): Promise<Response> {
  const { userId, commentId } = await request.json();
  try {
    const likeExists = await prisma.commentLike.findFirst({
      where: {
        userId,
        itemCommentsId: commentId,
      },
    });

    if (likeExists) {
      const deletedLike = await prisma.commentLike.delete({
        where: {
          id: likeExists.id,
        },
      });

      if (deletedLike) {
        const updated = await updateItemCommentLikeCount(commentId);

        return NextResponse.json(
          {
            message: "Sussed!",
            liked: false,
            likeCount: updated,
          },
          {
            status: 200,
          },
        );
      }
      return NextResponse.json({ error: "Failed to like" }, { status: 500 });
    } else {
      console.log("userId", userId, "commentId", commentId);
      const createdLike = await prisma.commentLike.create({
        data: {
          userId,
          itemCommentsId: commentId,
        },
      });

      if (createdLike) {
        const updated = await updateItemCommentLikeCount(commentId);

        return NextResponse.json(
          {
            message: "Sussed!",
            liked: true,
            likeCount: updated,
          },
          {
            status: 200,
          },
        );
      }
      return NextResponse.json({ error: `Failed to like` }, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
