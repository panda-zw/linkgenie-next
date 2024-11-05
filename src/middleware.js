import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { getSession } from "next-auth/react";

export { default } from 'next-auth/middleware';
export const config = {
  matcher: ["/Generate", "/Community", "/posts", "/Project"],
};

export async function middleware(req) {
  console.log('Middleware is running for:', req.nextUrl.pathname);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const signInUrl = new URL('/auth/signin', req.nextUrl.origin);
    signInUrl.searchParams.set('callbackUrl', encodeURIComponent(req.nextUrl.pathname));
    return NextResponse.redirect(signInUrl.toString());
  }

  return NextResponse.next();
}


export async function authMiddleware(req) {
    const session = await getSession({ req });

    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }

    return session;
}