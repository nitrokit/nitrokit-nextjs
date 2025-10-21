'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AlertCircle, ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AUTH_ROUTES } from '@/lib/auth/constants';
import Link from 'next/link';
import { translateRichSafely } from '@/lib';

export function AuthErrorComponent() {
    const t = useTranslations('auth.error');
    const searchParams = useSearchParams();

    const errorType = searchParams.get('error') || 'Default';
    const errorKey = errorType.toLowerCase();

    const errorMessage = translateRichSafely(t, `messages.${errorKey}`, {
        link: (chunks) => (
            <Link
                href={AUTH_ROUTES.SIGN_IN}
                className="text-sm font-semibold underline hover:text-red-500"
            >
                {chunks}
            </Link>
        )
    });

    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <Alert className="border-red-400 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <AlertTitle className="font-bold">{t('title')}</AlertTitle>
                <AlertDescription className="mt-2">{errorMessage}</AlertDescription>
            </Alert>

            <Button asChild className="w-full">
                <Link href={AUTH_ROUTES.SIGN_IN}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('backToLogin')}
                </Link>
            </Button>
        </div>
    );
}
