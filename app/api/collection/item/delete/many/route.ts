import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function DELETE(request: Request): Promise<Response> {
  const { ids } = await request.json();
  try {
    if (ids.length === 0) {
      throw new Error("Item id is required");
    }

    const items = await prisma.item.findMany({
      where: { id: { in: ids } },
    });

    items.length !== 0 &&
      items.map(async (item) => {
        const cover = item.cover;
        if (cover && cover !== "") {
          const newUrl = cover.substring(cover.lastIndexOf("/") + 1);
          const utapi = new UTApi();
          await utapi.deleteFiles(newUrl);
        }
      });

    const res = await prisma.item.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json(
      {
        message: "Sussed!",
        // res,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
