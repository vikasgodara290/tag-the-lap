import { NextRequest, NextResponse } from "next/server";


export async function POST(request : NextRequest) {
    const data = request.body;

    console.log(data)

    return NextResponse.json(
        {
            user : data
        }
    )
} 