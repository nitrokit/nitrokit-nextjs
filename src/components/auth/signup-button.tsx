'use client';

import { useTranslations } from 'next-intl';
import { AuthLink } from './auth-link';
import { AUTH_ROUTES } from '@/lib/auth/constants';

export function SignUpButton() {
    const t = useTranslations('auth');
    return (
        <AuthLink
            className="hidden bg-blue-600 hover:bg-blue-700 lg:inline-flex dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            href={AUTH_ROUTES.NEW_USER}
        >
            <span>{t('signup.title')}</span>
        </AuthLink>
    );
}
