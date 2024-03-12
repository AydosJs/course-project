import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, res: Response) {
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

    return null;
  } catch (error) {
    console.error("Error updating user:", error);
    return null; // Or throw a specific error for handling at the caller level
  }
}
