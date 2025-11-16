import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';
import { PUBLIC_ROUTES } from './constants';
import { AUTH_ROUTES } from './lib/auth/constants';
import { checkAuthentication } from './middlewares/session';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    const publicRoutes = [
        '/api/newsletter/subscribe',
        ...PUBLIC_ROUTES,
        ...Object.values(AUTH_ROUTES)
    ];

    if (request.nextUrl.pathname.startsWith('/api/')) {
        // const isAuthRoute = request.nextUrl.pathname.startsWith('/api/auth/');
        // const isInternalRoute = request.nextUrl.pathname.startsWith('/api/internal/');

        // if (!isAuthRoute && !isInternalRoute) {
        //     return handleRateLimit(request);
        // }
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

    const sessionToken = request.cookies.get(
        process.env.NODE_ENV === 'production'
            ? '__Secure-authjs.session-token'
            : 'authjs.session-token'
    );

    if (!sessionToken?.value) {
        const signInUrl = new URL(AUTH_ROUTES.SIGN_IN, request.url);
        if (request.nextUrl.pathname !== AUTH_ROUTES.SIGN_IN) {
            signInUrl.searchParams.set('callbackUrl', request.url);
        }
        return NextResponse.redirect(signInUrl);
    }

    const authResponse = await checkAuthentication(request);
    if (authResponse) return authResponse;

    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/api/(.*)',
        '/((?!api|trpc|_next|sitemap|robots|storybook|issues|_vercel|_next/static|_next/image|.*\\..*).*)'
    ]
};
