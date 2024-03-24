import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function PATCH(request: Request): Promise<Response> {
  const { ids } = await request.json();

  try {
    if (ids.length > 0) {
      const users = await prisma.user.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      if (users.length > 0) {
        users.map(async (user) => {
          if (user.image) {
            const newUrl = user.image.substring(
              user.image.lastIndexOf("/") + 1,
            );
            const utapi = new UTApi();
            await utapi.deleteFiles(newUrl);
          }
        });
      }

      const res = await prisma.user.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      return NextResponse.json(
        {
          message: "Sussessfully deleted!",
          res,
        },
        {
          status: 200,
        },
      );
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
