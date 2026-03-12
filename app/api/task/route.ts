import { prisma } from '@/app/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
  const userId = req.headers.get('userid');
  const noOfDays = req.headers.get('noofdays');

  if (!userId) {
    NextResponse.json({
      success: false,
      message: 'You are not authorized!',
    });
  }

  if (id) {
    const tasks = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        userId: userId!,
      },
    });

    return NextResponse.json({
      tasks,
    });
  } else if (noOfDays) {
    const fromDate = new Date(new Date().setUTCDate(new Date().getUTCDate() - parseInt(noOfDays)));
    const tasks = await prisma.task.findMany({
      where: {
        startTime: {
          gt: fromDate,
        },
        userId: userId!,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      tasks,
    });
  } else {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId!,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json({
      tasks,
    });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { task, categoryId, startTime, endTime, userId } = body;

  const taskDb = await prisma.task.create({
    data: { task, categoryId, startTime, endTime, userId },
  });

  return NextResponse.json(taskDb);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, task, categoryId, endTime } = body;

  if (endTime) {
    const taskDb = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        endTime,
      },
    });
    return NextResponse.json(taskDb);
  } else {
    const taskDb = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        task,
        categoryId,
      },
    });
    return NextResponse.json(taskDb);
  }
}
