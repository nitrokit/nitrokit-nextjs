import { DefaultSession } from 'next-auth';
import { UserData } from './user';
import { locales } from '@/constants';

export type UserRole = 'User' | 'Admin' | 'Moderator';
export type Theme = 'light' | 'dark' | 'system';
export type Locale = (typeof locales)[number];

export interface LinkedAccount {
    provider: string;
    type: string;
    providerAccountId: string;
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: number | null;
}

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: UserData & DefaultSession['user'];
        expires: Date;
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        idToken?: string;
        sub: string;
        email?: string;
        name?: string;
        picture?: string;
        role: UserRole;
        locale?: Locale;
        theme?: Theme;
        receiveUpdates?: boolean;
        phoneVerified?: boolean | null;
        twoFactorEnabled?: boolean;
        refreshToken?: string;
        exp?: number;
        iat?: number;
        jti?: string;
    }
}
