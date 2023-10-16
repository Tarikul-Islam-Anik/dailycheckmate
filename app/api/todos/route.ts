import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const todo = await prisma.todo.findMany();
  return NextResponse.json(todo, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const todo = await prisma.todo.deleteMany({
    where: {
      status: "trash",
    },
  });
  return NextResponse.json(todo, { status: 201 });
}
