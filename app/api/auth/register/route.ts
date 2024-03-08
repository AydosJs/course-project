import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!existingUser) {
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return NextResponse.json({
      message: "Sussed!",
      redirect: "/",
      status: 200,
      user: { ...user },
    });
  } else {
    return NextResponse.json({
      message: "User already exists",
      status: 403,
    });
  }
}
