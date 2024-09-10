import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { URL } from 'url';

export { default } from 'next-auth/middleware';
export const config = {
  matcher: ["/Generate", "/Community"],
};

export async function middleware(req) {
  console.log('Middleware is running for:', req.nextUrl.pathname);
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const signInUrl = new URL('/auth/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', encodeURIComponent(req.nextUrl.pathname));
    return NextResponse.redirect(signInUrl.toString());
  }

  return NextResponse.next();
}

