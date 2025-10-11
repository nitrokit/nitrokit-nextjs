'use client';

import { useTranslations } from 'next-intl';
import { AuthLink } from './auth-link';
import { LogIn as IconLogIn } from 'lucide-react';

export function SignInButton() {
    const t = useTranslations('auth');
    return (
        <AuthLink href="/signin" variant={'ghost'}>
            <IconLogIn />
            <span>{t('signin.title')}</span>
        </AuthLink>
    );
}
