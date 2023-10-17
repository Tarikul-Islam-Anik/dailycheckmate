import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const reminder = await prisma.reminder.create({
    data: {
      title: body.title,
      description: body.description,
      links: body.links,
      deadline: body.deadline,
      reminderTime: body.reminderTime,
    },
  });

  return NextResponse.json(reminder, { status: 201 });
}
