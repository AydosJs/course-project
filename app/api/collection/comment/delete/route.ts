import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request): Promise<Response> {
  const { id } = await request.json();

  try {
    await prisma.commentLike.deleteMany({ where: { collectionCommentId: id } });

    const res = await prisma.collectionComments.delete({
      where: {
        id,
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
