/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '../prisma';
import { AUTH_ROUTES } from './constants';
import GitHub from 'next-auth/providers/github';
import GitLab from 'next-auth/providers/gitlab';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import Apple from 'next-auth/providers/apple';
import Instagram from 'next-auth/providers/instagram';
import Facebook from 'next-auth/providers/facebook';
import Twitter from 'next-auth/providers/twitter';
import LinkedIn from 'next-auth/providers/linkedin';
import { NextAuthProfileReturnType } from '@/types/auth';

const defaultLocale = 'en';
const defaultTheme = 'system';
const defaultRole = 'User';
const defaultReceiveUpdates = true;

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Resend,
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile: any): NextAuthProfileReturnType {
                return {
                    id: profile.sub,
                    email: profile.email || '',
                    name: profile.name || null,
                    image: profile.picture || null,
                    firstName: profile.given_name || null,
                    lastName: profile.family_name || null,
                    role: defaultRole,
                    locale: profile.locale || defaultLocale,
                    theme: defaultTheme,
                    receiveUpdates: defaultReceiveUpdates,
                    twoFactorEnabled: false,
                    emailVerified: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isActive: true
                } as NextAuthProfileReturnType;
            }
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            profile(profile: any): NextAuthProfileReturnType {
                return {
                    id: profile.id?.toString() || '',
                    email: profile.email || '',
                    name: profile.name || profile.login || null,
                    image: profile.avatar_url || null,
                    role: defaultRole,
                    locale: defaultLocale,
                    theme: defaultTheme,
                    receiveUpdates: defaultReceiveUpdates,
                    twoFactorEnabled: false,
                    emailVerified: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isActive: true
                } as NextAuthProfileReturnType;
            }
        }),
        GitLab({
            clientId: process.env.GITLAB_CLIENT_ID!,
            clientSecret: process.env.GITLAB_CLIENT_SECRET!,
            profile(profile: any): NextAuthProfileReturnType {
                return {
                    id: profile.id?.toString() || '',
                    email: profile.email || '',
                    name: profile.name || null,
                    image: profile.avatar_url || null,
                    role: defaultRole,
                    locale: defaultLocale,
                    theme: defaultTheme,
                    receiveUpdates: defaultReceiveUpdates,
                    twoFactorEnabled: false,
                    emailVerified: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isActive: true
                } as NextAuthProfileReturnType;
            }
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
            profile(profile: any): NextAuthProfileReturnType {
                return {
                    id: profile.id,
                    email: profile.email || '',
                    name: profile.name || null,
                    image: profile.picture?.data?.url || null,
                    role: defaultRole,
                    locale: profile.locale || defaultLocale,
                    theme: defaultTheme,
                    receiveUpdates: defaultReceiveUpdates,
                    twoFactorEnabled: false,
                    emailVerified: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isActive: true
                } as NextAuthProfileReturnType;
            }
        }),
        Apple({
            clientId: process.env.APPLE_CLIENT_ID!,
            clientSecret: process.env.APPLE_CLIENT_SECRET!,
            profile(profile: any): NextAuthProfileReturnType {
                return {
                    id: profile.sub,
                    email: profile.email || '',
                    name:
                        profile.name ||
                        `${profile.firstName || ''} ${profile.lastName || ''}`.trim() ||
                        null,
                    image: profile.picture || null,
                    role: defaultRole,
                    locale: defaultLocale,
                    theme: defaultTheme,
                    receiveUpdates: defaultReceiveUpdates,
                    twoFactorEnabled: false,
                    emailVerified: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isActive: true
                } as NextAuthProfileReturnType;
            }
        }),
        Instagram({
            clientId: process.env.INSTAGRAM_CLIENT_ID!,
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
            profile(profile: any): NextAuthProfileReturnType {
                return {
                    id: profile.id?.toString() || '',
                    email: profile.email || '',
                    name: profile.name || profile.username || null,
                    image: profile.picture || null,
                    role: defaultRole,
                    locale: defaultLocale,
                    theme: defaultTheme,
                    receiveUpdates: defaultReceiveUpdates,
                    twoFactorEnabled: false,
                    emailVerified: !!profile.email,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isActive: true
                } as NextAuthProfileReturnType;
            }
        }),
        Twitter({
            clientId: process.env.TWITTER_CLIENT_ID!,
            clientSecret: process.env.TWITTER_CLIENT_SECRET!,
            profile(profile: any): NextAuthProfileReturnType {
                const data = profile.data || profile;
                return {
                    id: data.id?.toString() || '',
                    email: data.email || '',
                    name: data.name || data.username || null,
                    image: data.profile_image_url?.replace('_normal', '_400x400') || null,
                    firstName: data.name?.split(' ')[0] || null,
                    lastName: data.name?.split(' ').slice(1).join(' ') || null,
                    username: data.username || null,
                    role: defaultRole,
                    locale: defaultLocale,
                    theme: defaultTheme,
                    receiveUpdates: defaultReceiveUpdates,
                    twoFactorEnabled: false,
                    emailVerified: !!data.email,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isActive: true
                } as NextAuthProfileReturnType;
            }
        }),
        LinkedIn({
            clientId: process.env.LINKEDIN_CLIENT_ID!,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
            profile(profile: any): NextAuthProfileReturnType {
                const email = profile.email || profile.emailAddress || '';
                const firstName = profile.firstName || profile.given_name || null;
                const lastName = profile.lastName || profile.family_name || null;
                return {
                    id: profile.id || profile.sub || '',
                    email: email,
                    name:
                        profile.name ||
                        `${firstName} ${lastName}`.trim() ||
                        profile.localizedFirstName ||
                        null,
                    image:
                        profile.picture ||
                        profile.profilePicture?.displayImage ||
                        profile['profilePicture(displayImage~:playableStreams)']?.displayImage
                            ?.elements?.[0]?.identifiers?.[0]?.identifier ||
                        null,
                    firstName: firstName,
                    lastName: lastName,
                    username: profile.vanityName || null,
                    role: defaultRole,
                    locale: profile.locale || defaultLocale,
                    theme: defaultTheme,
                    receiveUpdates: defaultReceiveUpdates,
                    twoFactorEnabled: false,
                    emailVerified: !!email,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isActive: true
                } as NextAuthProfileReturnType;
            }
        })
    ],
    pages: {
        signIn: AUTH_ROUTES.SIGN_IN,
        signOut: AUTH_ROUTES.SIGN_OUT,
        newUser: AUTH_ROUTES.NEW_USER,
        error: AUTH_ROUTES.ERROR,
        verifyRequest: AUTH_ROUTES.VERIFY_REQUEST
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60 // 24 hours
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60 // 30 days
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
                secure: process.env.NODE_ENV === 'production'
            }
        }
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
        }
    }
});
