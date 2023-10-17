import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const reminders = await prisma.reminder.findMany();
  return NextResponse.json(reminders, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const reminders = await prisma.reminder.deleteMany({
    where: {
      status: "trash",
    },
  });
  return NextResponse.json(reminders, { status: 201 });
}
