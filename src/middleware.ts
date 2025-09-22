import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

const publicPages = [
    '/',
    '/login',
    // (/secret requires auth)
];

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/api')) {
        return NextResponse.next();
    }

    const publicPathnameRegex = RegExp(
        `^(/(${routing.locales.join('|')}))?(${publicPages
            .flatMap((p) => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$`,
        'i'
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    if (isPublicPage) {
        return intlMiddleware(req);
    }

    // Check for session token in cookies
    const sessionToken = req.cookies.get(
        process.env.NODE_ENV === 'production'
            ? '__Secure-authjs.session-token'
            : 'authjs.session-token'
    );

    if (!sessionToken?.value) {
        // Redirect to login page with locale support
        const signInUrl = new URL('/login', req.url);
        if (req.nextUrl.pathname !== '/login') {
            signInUrl.searchParams.set('callbackUrl', req.url);
        }
        return NextResponse.redirect(signInUrl);
    }

    return intlMiddleware(req);
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: [
        '/api/(.*)',
        '/dashboard/:path*',
        '/((?!api|trpc|_next|_vercel|sitemap|robots|storybook|issues|.*\\..*).*)',
    ],
};
