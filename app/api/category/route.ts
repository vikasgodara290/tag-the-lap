import { prisma } from "@/app/lib/db";
import { NextResponse } from "next/server";

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