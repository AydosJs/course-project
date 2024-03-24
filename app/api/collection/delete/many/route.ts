import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function DELETE(request: Request): Promise<Response> {
  const { ids } = await request.json();
  try {
    if (ids.length === 0) {
      throw new Error("Collection id is required");
    }

    const collections = await prisma.collection.findMany({
      where: { id: { in: ids } },
      include: {
        Item: true,
      },
    });

    collections.length !== 0 &&
      collections.map(async (collection) => {
        const cover = collection.cover;
        if (cover && cover !== "") {
          console.log("collection.cover", cover);
          const newUrl = cover.substring(cover.lastIndexOf("/") + 1);
          const utapi = new UTApi();
          await utapi.deleteFiles(newUrl);
        }

        collection.Item.length !== 0 &&
          collection.Item.map(async (item) => {
            const cover = item.cover;
            if (cover && cover !== "") {
              console.log("item.cover", cover);
              const newUrl = cover.substring(cover.lastIndexOf("/") + 1);
              const utapi = new UTApi();
              await utapi.deleteFiles(newUrl);
            }
          });
      });

    const res = await prisma.collection.deleteMany({
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
