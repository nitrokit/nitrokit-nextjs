import { DefaultSession } from 'next-auth';
import { UserData } from './user';
import { locales } from '@/constants';

// export type UserRole = 'User' | 'Admin' | 'Moderator';
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
    interface Session {
        user: DefaultSession['user'] & UserData;
        expires: Date;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        sub: string;
        email?: string;
        name?: string;
        picture?: string;
        locale?: Locale;
        theme?: Theme;
        receiveEmailUpdates?: boolean;
        receiveSmsUpdates?: boolean;
        phoneVerified?: boolean | null;
        twoFactorEnabled?: boolean;
        refreshToken?: string;
        exp?: number;
        iat?: number;
        jti?: string;
    }
}
