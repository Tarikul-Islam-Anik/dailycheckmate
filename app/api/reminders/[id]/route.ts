import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const reminder = await prisma.reminder.findUnique({
    where: { id: params.id },
  });
  return NextResponse.json(reminder, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  await prisma.reminder.update({
    where: { id: params.id },
    data: {
      status: body.status,
    },
  });
  return NextResponse.json(
    { message: "Reminder status has been changed" },
    { status: 200 }
  );
}
