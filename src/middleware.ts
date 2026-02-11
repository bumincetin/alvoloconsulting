import { NextResponse, type NextRequest } from 'next/server';

/**
 * Minimal middleware to clean up URL artifacts.
 * - Removes nxtPlocale and locale query parameters
 * - Redirects literal [locale] in URLs to /en/
 */
export function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

    // Skip static files and Next.js internals
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // Fix literal "[locale]" in URL (redirect to /en/)
    if (pathname.includes('[locale]') || pathname.includes('%5Blocale%5D')) {
        const url = request.nextUrl.clone();
        url.pathname = '/en/';
        url.search = '';
        return NextResponse.redirect(url);
    }

    // Remove nxtPlocale and locale query params if present
    if (searchParams.has('nxtPlocale') || searchParams.has('locale')) {
        const url = request.nextUrl.clone();
        url.searchParams.delete('nxtPlocale');
        url.searchParams.delete('locale');
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};
