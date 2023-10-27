import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.habits.update({
    where: { id: params.id, userId: session.user.id },
    data: {
      days: {
        push: new Date(),
      },
    },
  });
  return NextResponse.json(
    { message: 'Habit status has been changed' },
    { status: 200 }
  );
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.habits.delete({
    where: {
      userId: session.user.id,
      id: params.id,
    },
  });

  return NextResponse.json({ message: 'Deleted habit' }, { status: 201 });
}
