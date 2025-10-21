'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { useUser } from '@/contexts/user-context';
import { cn } from '@/lib';
import { useSession } from 'next-auth/react';

const sizeClasses = {
    'size-8': 'h-8 w-8',
    'size-10': 'h-10 w-10',
    'size-11': 'h-11 w-11',
    'size-12': 'h-12 w-12',
    'size-16': 'h-16 w-16',
    'size-20': 'h-20 w-20',
    'size-24': 'h-24 w-24'
};

interface UserAvatarProps {
    src?: string | null;
    name?: string | null;
    size?: string;
    className?: string;
    fallbackClassName?: string;
    useSessionData?: boolean;
}

export const UserAvatar = React.forwardRef<HTMLButtonElement, UserAvatarProps>(
    (
        {
            src,
            name,
            size = 'size-11',
            className,
            fallbackClassName,
            useSessionData = false,
            ...props
        },
        ref
    ) => {
        const { data: session } = useSession();
        const { user } = useUser();
        const [displayName, setDisplayName] = useState<string | null>(null);

        const avatarSize = sizeClasses[size as keyof typeof sizeClasses] || size;

        const getAvatarSrc = () => {
            if (useSessionData) {
                // Prefer user from context, fallback to session, then props
                return user?.image || session?.user?.image || src || null;
            }
            return src || null;
        };

        const avatarSrc = getAvatarSrc();

        useEffect(() => {
            if (useSessionData && session?.user) {
                setDisplayName(session.user.name || name || null);
            } else {
                setDisplayName(name || null);
            }
        }, [name, useSessionData, session]);

        const getInitials = () => {
            if (useSessionData && session?.user) {
                const firstName = session.user.firstName;
                const lastName = session.user.lastName;
                const fullName = session.user.name;

                if (firstName && lastName) {
                    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
                } else if (fullName) {
                    const names = fullName.split(' ');
                    if (names.length >= 2) {
                        return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
                    }
                    return fullName.charAt(0).toUpperCase();
                } else if (user?.email) {
                    return user.email.charAt(0).toUpperCase();
                }
            }

            return displayName?.charAt(0)?.toUpperCase() || 'U';
        };

        const initials = getInitials();

        return (
            <Avatar
                ref={ref}
                className={cn('border-stroke cursor-pointer border', avatarSize, className)}
                {...props}
            >
                <AvatarImage
                    src={avatarSrc ?? undefined}
                    alt={displayName ?? 'User'}
                    key={`${avatarSrc}`}
                />
                <AvatarFallback className={cn('bg-gray-200 dark:bg-gray-800', fallbackClassName)}>
                    {initials}
                </AvatarFallback>
            </Avatar>
        );
    }
);

UserAvatar.displayName = 'UserAvatar';
