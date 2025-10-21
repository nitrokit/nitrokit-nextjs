'use client';

import { CheckCircle, AlertTriangle, Loader, RotateCw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { Link, useRouter } from '@/lib/i18n/navigation';
import { AUTH_ROUTES } from '@/lib/auth/constants';
import { FormCard } from '../../../components/form-card';
import { useEffect } from 'react';

interface VerifyStatusCardProps {
    type: 'loading' | 'success' | 'error';
    message: string;
    redirectUrl?: string;
}

export function VerifyStatusCard({ type, message, redirectUrl }: VerifyStatusCardProps) {
    const router = useRouter();
    const t = useTranslations('auth.verification');

    const waitingTime = 3000;

    useEffect(() => {
        if (type === 'success' && redirectUrl) {
            const timer = setTimeout(() => {
                router.replace(redirectUrl);
            }, waitingTime);

            return () => clearTimeout(timer);
        }
    }, [type, redirectUrl, router]);

    const icon =
        type === 'success' ? (
            <CheckCircle className="h-10 w-10 text-green-500" />
        ) : type === 'error' ? (
            <AlertTriangle className="h-10 w-10 text-red-500" />
        ) : (
            <Loader className="h-10 w-10 animate-spin text-blue-500" />
        );

    const title = type === 'success' ? t('status.successTitle') : t('status.errorTitle');

    return (
        <FormCard title={title}>
            <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4">{icon}</div>
                <p className="text-muted-foreground max-w-sm">{message}</p>

                {type === 'success' && (
                    <div className="mt-6 flex w-full flex-col items-center gap-2">
                        <RotateCw className="h-6 w-6 animate-spin text-blue-500" />
                        <p className="text-muted-foreground text-xs">
                            {t('status.redirectingIn', { seconds: waitingTime / 1000 })}
                        </p>
                    </div>
                )}

                {type === 'error' && (
                    <div className="mt-6 w-full">
                        <Link href={AUTH_ROUTES.SIGN_IN}>
                            <Button className="w-full">{t('status.goToLogin')}</Button>
                        </Link>
                    </div>
                )}
            </div>
        </FormCard>
    );
}
