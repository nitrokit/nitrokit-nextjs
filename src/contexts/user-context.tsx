'use client';

import { createContext, useContext, ReactNode, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { UserContextType, UserData } from '@/types/user';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { data: session, status, update } = useSession();

    const updateUser = useCallback(
        (updatedUserData: Partial<UserData>) => {
            void update(updatedUserData);
        },
        [update]
    );

    const updateAvatar = useCallback(
        (url: string | null) => {
            updateUser({ image: url });
        },
        [updateUser]
    );

    const contextValue: UserContextType = {
        user: (session?.user as UserData) || null,
        updateUser,
        updateAvatar,
        isLoading: status === 'loading'
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
