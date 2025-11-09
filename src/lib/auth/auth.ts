import NextAuth, { Account, CredentialsSignin, Profile, Session, User } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '../prisma';
import { AUTH_ROUTES } from './constants';
import Credentials from 'next-auth/providers/credentials';
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
import bcrypt from 'bcryptjs';
import { TwoFactorService } from './2fa-service';
import { refreshAccessToken } from './token-service';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

const defaultLocale = 'en';
const defaultTheme = 'system';
const defaultRole = 'User';
const defaultReceiveUpdates = true;

type JwtParams = {
    token: JWT;
    user?: User | AdapterUser;
    account?: Account | null;
    profile?: Profile;
    email?: { verificationRequest?: boolean | undefined };
    credentials?: Record<string, unknown>;
    trigger?: 'signIn' | 'signUp' | 'update' | undefined;
    isNewUser?: boolean;
};

class InvalidLoginError extends CredentialsSignin {
    code = 'Invalid identifier or password';
}

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
                    receiveEmailUpdates: defaultReceiveUpdates,
                    receiveSmsUpdates: defaultReceiveUpdates,
                    twoFactorEnabled: false,
                    emailVerified: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isActive: true
                } as NextAuthProfileReturnType;
            }
        }),
        GitHub({
            clientId: process.env.GH_CLIENT_ID!,
            clientSecret: process.env.GH_CLIENT_SECRET!,
            profile(profile: any): NextAuthProfileReturnType {
                return {
                    id: profile.id?.toString() || '',
                    email: profile.email || '',
                    name: profile.name || profile.login || null,
                    image: profile.avatar_url || null,
                    role: defaultRole,
                    locale: defaultLocale,
                    theme: defaultTheme,
                    receiveEmailUpdates: defaultReceiveUpdates,
                    receiveSmsUpdates: defaultReceiveUpdates,
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
                    receiveEmailUpdates: defaultReceiveUpdates,
                    receiveSmsUpdates: defaultReceiveUpdates,
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
                    receiveEmailUpdates: defaultReceiveUpdates,
                    receiveSmsUpdates: defaultReceiveUpdates,
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
                    receiveEmailUpdates: defaultReceiveUpdates,
                    receiveSmsUpdates: defaultReceiveUpdates,
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
                    receiveEmailUpdates: defaultReceiveUpdates,
                    receiveSmsUpdates: defaultReceiveUpdates,
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
                    receiveEmailUpdates: defaultReceiveUpdates,
                    receiveSmsUpdates: defaultReceiveUpdates,
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
                    receiveEmailUpdates: defaultReceiveUpdates,
                    receiveSmsUpdates: defaultReceiveUpdates,
                    twoFactorEnabled: false,
                    emailVerified: !!email,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isActive: true
                } as NextAuthProfileReturnType;
            }
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
                twoFactorCode: { label: '2FA Code', type: 'text' }
            },
            async authorize(credentials: any) {
                if (!credentials?.email || !credentials?.password) {
                    throw new InvalidLoginError();
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email as string
                        }
                    });

                    if (!user || !user.password) {
                        return null;
                    }

                    if (!user.emailVerified) {
                        return null;
                    }

                    const isValidPassword = await bcrypt.compare(
                        credentials.password as string,
                        user.password
                    );

                    if (!isValidPassword) {
                        return null;
                    }

                    if (user.twoFactorEnabled) {
                        if (!credentials.twoFactorCode) {
                            return null;
                        }

                        const verification = await TwoFactorService.verifyToken(
                            user.id,
                            credentials.twoFactorCode as string
                        );

                        if (!verification.success) {
                            return null;
                        }
                    }

                    await prisma.user.update({
                        where: { id: user.id },
                        data: { lastLoginAt: new Date() }
                    });

                    const { ...userWithoutPassword } = user;
                    return {
                        ...userWithoutPassword,
                        emailVerified: !!user.emailVerified,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        lastLoginAt: user.lastLoginAt || undefined
                    };
                } catch {
                    throw new InvalidLoginError();
                }
            }
        })
    ],
    events: {
        async session({ session }) {
            if (session?.user?.id) {
                try {
                    await prisma.user.update({
                        where: { id: session.user.id },
                        data: { lastLoginAt: new Date() }
                    });
                } catch {}
            }
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'credentials') {
                return true;
            }
            if (user.email) {
                try {
                    const existingUser = await prisma.user.findUnique({
                        where: { email: user.email },
                        include: {
                            accounts: true
                        }
                    });
                    if (existingUser) {
                        const existingAccount = existingUser.accounts.find(
                            (acc) => acc.provider === account?.provider
                        );

                        if (!existingAccount && account) {
                            console.log(
                                `Linking ${account.provider} to existing user ${existingUser.id}`
                            );
                        }

                        user.id = existingUser.id;
                        return true;
                    } else {
                        return true;
                    }
                } catch {
                    return false;
                }
            }
            return true;
        },
        async session(params: { session: Session; token: JWT; user?: AdapterUser | undefined }) {
            const { session, token } = params;

            if (token && token.sub) {
                session.user.id = token.sub;

                session.user.email = token.email || session.user.email;
                session.user.name = token.name || session.user.name;
                session.user.image = token.picture || session.user.image;

                const dbUser = await prisma.user.findUnique({
                    where: { id: token.sub },
                    include: { accounts: true }
                });

                if (dbUser) {
                    session.user.firstName = dbUser.firstName;
                    session.user.lastName = dbUser.lastName;
                    session.user.username = dbUser.username;
                    session.user.createdAt = dbUser.createdAt;
                    session.user.updatedAt = dbUser.updatedAt;
                    session.user.lastLoginAt = dbUser.lastLoginAt || undefined;
                    session.user.receiveEmailUpdates = dbUser.receiveEmailUpdates;
                    session.user.receiveSmsUpdates = dbUser.receiveSmsUpdates;
                    session.user.phone = dbUser.phone;
                    session.user.locale = dbUser.locale || 'tr';
                    session.user.theme = dbUser.theme || 'light';
                    session.user.twoFactorEnabled = dbUser.twoFactorEnabled ?? false;

                    session.user.linkedAccounts = dbUser.accounts.map((account) => ({
                        provider: account.provider,
                        type: account.type,
                        providerAccountId: account.providerAccountId,
                        accessToken: account.access_token,
                        refreshToken: account.refresh_token,
                        expiresAt: account.expires_at
                    }));
                }
            }

            return session;
        },
        async jwt(params: JwtParams): Promise<JWT> {
            const { token, user } = params;
            if (user) {
                const dbUser = await prisma.user.findUnique({
                    where: { id: user.id },
                    select: {
                        twoFactorEnabled: true,
                        locale: true,
                        theme: true
                    }
                });

                if (dbUser) {
                    token.twoFactorEnabled = dbUser.twoFactorEnabled;
                    token.locale = dbUser.locale;
                }
            }

            const shouldRefresh =
                token.exp && token.exp - Math.floor(Date.now() / 1000) < 24 * 60 * 60;

            if (shouldRefresh && token.refreshToken) {
                try {
                    const newTokens = await refreshAccessToken(token.refreshToken);
                    return {
                        ...token,
                        ...newTokens
                    };
                } catch {
                    return token;
                }
            }

            return token;
        }
    },
    pages: {
        signIn: AUTH_ROUTES.SIGN_IN,
        signOut: AUTH_ROUTES.SIGN_OUT,
        newUser: AUTH_ROUTES.NEW_USER,
        error: AUTH_ROUTES.ERROR,
        verifyRequest: AUTH_ROUTES.VERIFY_REQUEST
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.AUTH_SECRET,
    // debug: process.env.NODE_ENV === 'development',
    debug: true,
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
