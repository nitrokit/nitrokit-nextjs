'use client';

import { useTranslations } from 'next-intl';
import { AuthLink } from './auth-link';
import { signOut } from 'next-auth/react';

export function SignOutButton() {
    const t = useTranslations('auth');
    return (
        <AuthLink
            size={'sm'}
            className="text-primary w-full cursor-pointer border-1 bg-white p-2 text-xs shadow-2xs outline-hidden hover:bg-gray-100 dark:bg-black dark:hover:bg-black/60"
            onClick={() => {
                void signOut();
            }}
        >
            <span>{t('signout')}</span>
        </AuthLink>
    );
}
