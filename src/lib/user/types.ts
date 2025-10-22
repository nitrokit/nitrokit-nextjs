import { Prisma, User } from '@/generated/prisma';

export type PasswordStrength = 'strong' | 'medium' | 'weak' | 'none' | 'unknown';

export interface SecurityStatus {
    passwordStrength: PasswordStrength;
    twoFactorEnabled: boolean;
    activeSessions: number;
    lastPasswordChange?: Date;
    recentLoginAttempts: number;
}

export type UserSelectForSecurity = Prisma.UserGetPayload<{
    select: {
        id: true;
        email: true;
        password: true;
        twoFactorEnabled: true;
        emailVerified: true;
        phoneVerified: true;
    };
}>;

export type UserForAnalysis = UserSelectForSecurity & {
    accounts?: {
        provider: string;
        type: string;
        createdAt: Date;
    }[];
    sessions?: {
        id: string;
        expires: Date;
        createdAt: Date;
    }[];
};

export interface Recommendation {
    type: 'warning' | 'error' | 'info';
    title: string;
    description: string;
    action: string;
    href: string;
}

export type UserWithRelations = User & {
    accounts: {
        provider: string;
        type: string;
        createdAt: Date;
    }[];
    sessions: {
        id: string;
        expires: Date;
        createdAt: Date;
    }[];
    emailVerified: Date | null;
    phoneVerified: boolean;
    password: string | null;
};
