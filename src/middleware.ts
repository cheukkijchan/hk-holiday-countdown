import { NextRequest, NextResponse } from 'next/server';
import { locales } from './dictionaries';

export const defaultLocale = 'tc';

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  return request.nextUrl.pathname.split('/')[1] || defaultLocale;
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // /*
    //  * Match all request paths except for the ones starting with:
    //  * - api (API routes)
    //  * - _next/static (static files)
    //  * - _next/image (image optimization files)
    //  * - favicon.ico (favicon file)
    //  */
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/',
  ],
};
