export interface UserData {
    id: string;
    email: string;
    name?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    username?: string | null;
    image?: string | null;
    phone?: string | null;
    phoneVerified?: boolean | null;
    role: UserRole;
    twoFactorEnabled?: boolean;
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
    updateUser: (newUserData: UserData) => void;
}
