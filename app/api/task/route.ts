import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    if(!id){
        const tasks = await prisma.task.findMany({
            orderBy: {
                createdAt : 'desc'
            }
        })
        return NextResponse.json({
            tasks
        })
    }
    else{
        const tasks = await prisma.task.findFirst({
            where:{
                id : parseInt(id)
            }
        })

        return NextResponse.json({
            tasks
        })
    }
}

export async function POST(req : NextRequest){
    const body = await req.json();
    const {task, category, startTime, endTime} = body;

    const taskDb = await prisma.task.create({
        data: {task, category, startTime, endTime}
    });

    return NextResponse.json(taskDb);
}