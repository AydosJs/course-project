import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request): Promise<Response> {
  const { id, name, description, topic, cover, customFields } =
    await request.json();

  try {
    const res = await prisma.collection.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        topic,
        cover,
        customFields,
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
