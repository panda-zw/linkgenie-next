import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

export const config = {
  matcher: ["/Generate", "/Community", "/credits", "/posts"],
};

export async function middleware(req) {
  console.log('Middleware is running for:', req.nextUrl.pathname);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, secureCookie: process.env.NODE_ENV === "production" });


  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const signInUrl = new URL('/auth/signin', req.nextUrl.origin);
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}
