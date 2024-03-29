import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

async function updateLikeCount(itemId: string) {
  try {
    const likes = await prisma.itemLike.findMany({
      where: {
        itemId,
      },
    });

    await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        likeCount: likes.length,
      },
    });

    return likes.length;
  } catch (error) {}
}

export async function POST(request: Request): Promise<Response> {
  const { itemId, userId } = await request.json();

  try {
    const likeExists = await prisma.itemLike.findFirst({
      where: {
        userId,
        itemId,
      },
    });

    if (!Boolean(likeExists)) {
      const res = await prisma.itemLike.create({
        data: {
          itemId,
          userId,
        },
      });

      if (res) {
        const updated = await updateLikeCount(itemId);

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

      return NextResponse.json({ error: "Failed to like" }, { status: 500 });
    }

    if (likeExists) {
      const res = await prisma.itemLike.delete({
        where: {
          id: likeExists.id,
        },
      });

      if (res) {
        const updated = await updateLikeCount(itemId);
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
    }

    return NextResponse.json({ error: "Failed to like" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to like" }, { status: 500 });
  }
}
