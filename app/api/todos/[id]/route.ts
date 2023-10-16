import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todo = await prisma.todo.findUnique({
    where: { id: params.id },
  });
  return NextResponse.json(todo, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  await prisma.todo.update({
    where: { id: params.id },
    data: {
      status: body.status,
    },
  });
  return NextResponse.json(
    { message: "Todo status has been changed" },
    { status: 200 }
  );
}
