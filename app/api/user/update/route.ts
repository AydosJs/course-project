import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request): Promise<Response> {
  const { id, email, name } = await request.json();

  try {
    if (id) {
      console.log("newEmail", email, "newName", name, id);
      const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
          email: email,
          name: name,
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
