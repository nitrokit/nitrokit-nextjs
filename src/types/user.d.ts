import { DefaultUser } from 'next-auth';
export interface UserData extends DefaultUser {
    id: string;
    email: string;
    name?: string | null;
    firstName: string | null;
    lastName: string | null;
    username?: string | null;
    image?: string | null;
    phone?: string | null;
    phoneVerified?: boolean | null;
    role: UserRole;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string;
    twoFactorBackupCodes?: string[];
    twoFactorVerifiedAt?: Date;
    emailVerified?: boolean;
    locale: Locale;
    theme: string;
    receiveUpdates: boolean;
    refreshToken?: string;
    linkedAccounts?: LinkedAccount[];
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt?: Date;
    lastActivityAt?: Date;
    isActive: boolean;
    preferences?: {
        notifications: {
            email: boolean;
            push: boolean;
            inApp: boolean;
        };
    };
}

export interface UserContextType {
    user: UserData | null;
    isLoading: boolean;
    updateUser: (updatedUserData: Partial<UserData>) => void;
    updateAvatar: (url: string | null) => void;
}
