import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const todo = await prisma.todo.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return NextResponse.json(todo, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const todo = await prisma.todo.deleteMany({
    where: {
      userId: session.user.id,
      status: "trash",
    },
  });
  return NextResponse.json({ status: 201 });
}
