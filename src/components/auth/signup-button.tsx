'use client';

import { useTranslations } from 'next-intl';
import { AuthLink } from './auth-link';

export function SignUpButton() {
    const t = useTranslations('auth');
    return (
        <AuthLink
            className="hidden bg-blue-600 hover:bg-blue-700 lg:inline-flex dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            href="/signup"
        >
            <span>{t('signup.title')}</span>
        </AuthLink>
    );
}
