import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const todo = await prisma.todo.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(todo, { status: 201 });
}
