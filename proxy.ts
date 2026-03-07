import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middlware(request: NextRequest, response: NextResponse) {
    //console.log('from middleware: ', await getToken({req : request}));
    
}
export const config = {
    matcher : [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ]
}