import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middlware(request: NextRequest, response: NextResponse) {

}
export const config = {
    matcher : [
        "/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)",
    ]
}