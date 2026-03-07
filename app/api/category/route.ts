import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    const category = await prisma.category.findMany(
        {
            orderBy : {
                category : 'asc'
            }
        }
    )
    return NextResponse.json({
        category
    })
}

export async function POST(req: NextRequest){
    const body = await req.json();
    const {category, categoryColor, userId} = body;

    const categoryEntry = await prisma.category.create({
        data: {
            category,
            categoryColor,
            userId
        }
    })
    return NextResponse.json({
        categoryEntry
    })
}