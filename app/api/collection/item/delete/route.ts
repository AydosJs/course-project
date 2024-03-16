import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request): Promise<Response> {
  const { id } = await request.json();
  try {
    if (!id) {
      throw new Error("Collection id is required");
    }

    await prisma.tags.deleteMany({ where: { itemId: id } });
    await prisma.itemLike.deleteMany({ where: { itemId: id } }); // Delete likes on items
    await prisma.itemComments.deleteMany({ where: { itemId: id } }); // Delete comments on items
    const res = await prisma.item.delete({ where: { id: id } });

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
