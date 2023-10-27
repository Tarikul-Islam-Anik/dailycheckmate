import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.todo.updateMany({
    where: {
      userId: session.user.id,
      status: 'completed',
    },
    data: {
      status: 'trash',
    },
  });
  return NextResponse.json(
    { message: 'Moved all completed todos to trash' },
    { status: 201 }
  );
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await prisma.todo.deleteMany({
    where: {
      userId: session.user.id,
      status: 'trash',
    },
  });
  return NextResponse.json(
    { message: 'Deleted all todos in trash' },
    { status: 201 }
  );
}
