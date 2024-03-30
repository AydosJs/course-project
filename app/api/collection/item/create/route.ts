import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<Response> {
  const { formData, newTags } = await request.json();
  try {
    const res = await prisma.item.create({
      data: formData,
    });
    let updatedItem;

    if (res && newTags.length !== 0) {
      const newTagsFresh: string[] = [];
      for (const tag of newTags) {
        const existingTag = await prisma.tags.findUnique({
          where: {
            text: tag,
          },
        });

        if (!existingTag) {
          const tagsRes = await prisma.tags.create({
            data: {
              text: tag,
              itemId: res.id,
              userId: res.ownerId,
            },
          });

          newTagsFresh.push(tagsRes.id);
        }
      }
      if (newTagsFresh.length > 0) {
        const tagsId = [...res.tagsId, ...newTagsFresh];
        const tags = await prisma.tags.findMany({
          where: {
            id: {
              in: tagsId,
            },
          },
        });

        const updatedRes = await prisma.item.update({
          where: {
            id: res.id,
          },
          data: {
            tagsForSearch: tags.map((tag) => tag.text),
            tagsId: [...res.tagsId, ...newTagsFresh],
          },
        });

        updatedItem = updatedRes;
      }
    }

    if (updatedItem) {
      return NextResponse.json(
        {
          message: "Sussed!",
          res: updatedItem,
        },
        {
          status: 200,
        },
      );
    } else {
      const tags = await prisma.tags.findMany({
        where: {
          id: {
            in: res.tagsId,
          },
        },
      });

      const updatedRes = await prisma.item.update({
        where: {
          id: res.id,
        },
        data: {
          tagsForSearch: tags.map((tag) => tag.text),
        },
      });

      return NextResponse.json(
        {
          message: "Sussed!",
          updatedRes,
        },
        {
          status: 200,
        },
      );
    }
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
