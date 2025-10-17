import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';
import { PUBLIC_ROUTES } from './constants';
import { handleRateLimit } from './middlewares';
import { AUTH_ROUTES } from './lib/auth/constants';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const publicRoutes = [
        '/api/newsletter/subscribe',
        ...PUBLIC_ROUTES,
        ...Object.values(AUTH_ROUTES)
    ];

    if (request.nextUrl.pathname.startsWith('/api/')) {
        const isAuthRoute = request.nextUrl.pathname.startsWith('/api/auth/');
        const isInternalRoute = request.nextUrl.pathname.startsWith('/api/internal/');

        if (!isAuthRoute && !isInternalRoute) {
            return handleRateLimit(request);
        }

        return NextResponse.next();
    }

    const publicPathnameRegex = RegExp(
        `^(/(${routing.locales.join('|')}))?(${publicRoutes
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$`,
        'i'
    );

    const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);

    if (isPublicPage) {
        return intlMiddleware(request);
    }

    // Check for session token in cookies
    const sessionToken = request.cookies.get(
        process.env.NODE_ENV === 'production'
            ? '__Secure-authjs.session-token'
            : 'authjs.session-token'
    );

    if (!sessionToken?.value) {
        // Redirect to login page with locale support
        const signInUrl = new URL('/login', request.url);
        if (request.nextUrl.pathname !== '/login') {
            signInUrl.searchParams.set('callbackUrl', request.url);
        }
        return NextResponse.redirect(signInUrl);
    }

    return intlMiddleware(request);
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: [
        '/api/(.*)',
        '/((?!api|trpc|_next|_vercel|sitemap|robots|storybook|issues|.*\\..*).*)'
    ]
};
