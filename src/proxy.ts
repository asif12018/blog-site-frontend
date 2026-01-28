import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./app/constants/roles";


export async function proxy (request: NextRequest){
   const pathname = request.nextUrl.pathname;
   let isAuthenticated = false;
   let isAdmin = false;
   const {data} = await userService.getSession();
   if(data){
     isAuthenticated = true;
     isAdmin = data.user.role === Roles.admin;
   }
   
   //user is not authenticated at all
   if(!isAuthenticated){
     return NextResponse.redirect(new URL("/login", request.url))
   }
   // user is authenticated role == admin
   // user cannot visit user dashboard
   if(isAdmin && pathname.startsWith("/dashboard")){
       return NextResponse.redirect(new URL("/admin-dashboard", request.url));
   }
   // user is authenticated and role === user
   // user cannot visit admin-dashboard
   if(!isAdmin && pathname.startsWith("/admin-dashboard")){
    return  NextResponse.redirect(new URL("/dashboard", request.url));
   }
   return NextResponse.next();
}


export const config = {
    matcher:["/dashboard","/admin-dashboard", "/dashboard/:path*", "/admin-dashboard/:path*"]
}