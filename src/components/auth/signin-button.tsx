'use client';

import { useTranslations } from 'next-intl';
import { AuthLink } from './auth-link';
import { LogIn as IconLogIn } from 'lucide-react';
import { AUTH_ROUTES } from '@/lib/auth/constants';

export function SignInButton() {
    const t = useTranslations('auth');
    return (
        <AuthLink href={AUTH_ROUTES.SIGN_IN} variant={'ghost'}>
            <IconLogIn />
            <span>{t('signin.title')}</span>
        </AuthLink>
    );
}
