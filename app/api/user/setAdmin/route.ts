import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request): Promise<Response> {
  const { ids, isAdmin } = await request.json();

  try {
    if (ids.length > 0) {
      const res = await prisma.user.updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: {
          isAdmin,
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
