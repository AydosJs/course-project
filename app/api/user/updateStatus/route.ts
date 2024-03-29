import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request): Promise<Response> {
  const { ids, status } = await request.json();

  try {
    if (ids.length > 0) {
      const updatedUser = await prisma.user.updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: {
          status,
        },
      });

      return NextResponse.json(
        {
          message: "Sussed!",
          updatedUser,
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
