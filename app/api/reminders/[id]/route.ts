import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const reminder = await prisma.reminder.findUnique({
    where: { id: params.id, userId: session.user.id },
  });
  return NextResponse.json(reminder, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  await prisma.reminder.update({
    where: { id: params.id, userId: session.user.id },
    data: {
      status: body.status,
    },
  });
  return NextResponse.json(
    { message: 'Reminder status has been changed' },
    { status: 200 }
  );
}
