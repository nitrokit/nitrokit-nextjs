import type { User } from 'next-auth';

/**
 * Defines the type returned from the Auth.js provider 'profile' callback,
 * which maps to the application's database user schema.
 */
export interface UserDbProfile {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
    firstName: string | null;
    lastName: string | null;
    username?: string | null;
    role: string;
    locale: string;
    theme: string;
    receiveUpdates: boolean;
    twoFactorEnabled: boolean;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    [key: string]: any; // For additional fields (e.g., extra data from Google)
}

/**
 * Defines the expected return type for Auth.js profile functions.
 * This type is an intersection of Auth.js's base User type and the custom UserDbProfile.
 */
export type NextAuthProfileReturnType = UserDbProfile & User;
