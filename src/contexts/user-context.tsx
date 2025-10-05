'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { UserContextType, UserData } from '@/types/user';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<UserData | null>(session?.user || null);

    useEffect(() => {
        if (session) {
            setUser(session.user as UserData);
        }
    }, [session]);

    const updateUser = (newUserData: UserData) => {
        setUser(newUserData);
    };

    const contextValue: UserContextType = {
        user,
        updateUser,
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
