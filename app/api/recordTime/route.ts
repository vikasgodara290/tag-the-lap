import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req :NextRequest) {
    const body = await req.json();
    const {userId, startTime, stopTime} = body;

    const recordTime = await prisma.recordTime.findFirst({
        where: {userId : userId}
    });

    if(!recordTime && stopTime){
        return NextResponse.json({
            msg : "Recording never start, please start the recording first!"
        })
    }

    if(!recordTime && startTime){
        await prisma.recordTime.create({
            data: {userId, startTime, stopTime}
        });

        return NextResponse.json({
            msg : "Recording started successfully."
        })
    }

    if(startTime){
        await prisma.recordTime.update({
            where: {userId : userId},
            data: {startTime: startTime}
        });

        return NextResponse.json({
            msg : "Recording started successfully."
        })
    }

    if(stopTime){
        await prisma.recordTime.update({
            where: {userId : userId},
            data: {stopTime: stopTime}
        })

        return NextResponse.json({
            msg : "Recording stopped successfully."
        })
    }

    return NextResponse.json({
        msg : "updated successfully."
    })
}

export async function GET(req :NextRequest) {
    const body = await req.json();
    const {userId} = body;

    const recordTime = await prisma.recordTime.findFirst({
        where: {userId : userId}
    });

    return NextResponse.json({
        startTime : recordTime?.startTime,
        stopTime : recordTime?.stopTime
    })
}
