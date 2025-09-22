import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [],
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/error',
        verifyRequest: '/verify-request',
        newUser: '/register',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    useSecureCookies: process.env.NODE_ENV === 'production',
    cookies: {
        sessionToken: {
            name:
                process.env.NODE_ENV === 'production'
                    ? '__Secure-authjs.session-token'
                    : 'authjs.session-token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            },
        },
    },
    logger: {
        error(code: any, ...message: any[]) {
            console.error(code, message);
        },
        warn(code: any, ...message: any[]) {
            console.warn(code, message);
        },
        debug(code: any, ...message: any[]) {
            console.debug(code, message);
        },
    },
});
