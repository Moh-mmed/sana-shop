import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// paths that require authentication or authorization
const adminRequireAuth: string[] = ["/api/admin","/admin"];
const userRequireAuth: string[] = ["/user"];


export async function middleware(request: NextRequest) {
    
    const pathname = request.nextUrl.pathname;

    //* Admin 
    // Check for administrator auth
  if (adminRequireAuth.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
      
    //check not logged in
    if (!token) {
      const url = new URL(`/admin/login`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
      }
        //check if not authorized
    if (!token.isAdmin) {
    const url = new URL(`/admin/unauthorized`, request.url);
    return NextResponse.rewrite(url);
    }
    }


    //* User 
    // Check for user auth
  if (userRequireAuth.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
      
    //check not logged in
    if (!token) {
      const url = new URL(`/login`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    if (token.isAdmin) {
    const url = new URL(`/unauthorized`, request.url);
    return NextResponse.rewrite(url);
    }
      
    }
    
  return NextResponse.next();
}