import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const reminder = await prisma.reminder.create({
    data: {
      userId: session.user.id,
      title: body.title,
      description: body.description,
      links: body.links,
      schedule: body.schedule,
    },
  });

  return NextResponse.json(reminder, { status: 201 });
}
