import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';  // Import getToken from next-auth/jwt

export { default } from 'next-auth/middleware';

export const config = {
  matcher: ["/Generate", "/Community"],  // Apply only to restricted routes
};

export async function middleware(req) {
  console.log('Middleware is running for:', req.nextUrl.pathname);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // User is not authenticated, redirect to the sign-in page
    const signInUrl = new URL('/', req.nextUrl.origin);
    signInUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);  // Set return URL after sign-in
    return NextResponse.redirect(signInUrl);
  }

  // User is authenticated, allow the request to proceed
  return NextResponse.next();
}
