import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    
}

export async function POST(req : NextRequest){
    const body = await req.json();
    const {task, category, startTime} = body;
    
    const taskDb = prisma.task.create({
        data: {task, category, startTime}
    });

    return NextResponse.json(taskDb);
}