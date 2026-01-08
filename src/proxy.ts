import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/'];

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtectedRoute = pathname.startsWith('/dashboard');
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const token = (await cookies()).get('token')?.value;

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (!isProtectedRoute && isPublicRoute && token) {
    return NextResponse.redirect(new URL('/dashboard/accounts', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
