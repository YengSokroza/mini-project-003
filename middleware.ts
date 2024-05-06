
import { NextRequest, NextResponse } from 'next/server'


 
export function middleware(request: NextRequest) {
    console.log("====| MiddleWare is running");
    console.log("header: " , request.headers);
    
    const cookies = request.cookies;

    const session = cookies.get("istad-refresh-token")
    console.log("=> Session: ",session);
    
    
    if(!session){
        return NextResponse.redirect(new URL("/auth/login",request.url).toString());
    }


}

export const config = {
    matcher: "/my-shop",
}