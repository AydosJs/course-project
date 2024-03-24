import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request): Promise<Response> {
  const { collectionId } = await request.json();
  try {
    if (!collectionId) {
      throw new Error("Collection id is required");
    }

    // const items = await prisma.item.findMany({ where: { collectionId } });

    // // Delete items and their tags (if applicable)
    // for (const item of items) {
    //   await prisma.tags.deleteMany({ where: { itemId: item.id } });
    //   await prisma.itemLike.deleteMany({ where: { itemId: item.id } }); // Delete likes on items
    //   await prisma.itemComments.deleteMany({ where: { itemId: item.id } }); // Delete comments on items
    //   await prisma.item.delete({ where: { id: item.id } });
    // }

    // // Delete comments on the collection and likes on comments (if applicable)
    // const comments = await prisma.collectionComments.findMany({
    //   where: { collectionId },
    // });
    // for (const comment of comments) {
    //   await prisma.commentLike.deleteMany({
    //     where: { collectionCommentId: comment.id },
    //   });
    //   await prisma.collectionComments.delete({ where: { id: comment.id } });
    // }

    const res = await prisma.collection.delete({ where: { id: collectionId } });

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
    console.error("Collection delete:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
