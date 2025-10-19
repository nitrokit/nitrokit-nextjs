'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { Link } from '@/lib/i18n/navigation';
import { redirect, useSearchParams } from 'next/navigation';
import { AUTH_ROUTES } from '@/lib/auth/constants';
import { resendVerificationEmailAction } from '@/lib';
import { FormCard } from '../../components/form-card';
import { MoveLeft as IconMoveLeft } from 'lucide-react';

export default function Page() {
    const t = useTranslations('auth');
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const [isPending, startTransition] = React.useTransition();
    const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

    if (!email) {
        redirect(AUTH_ROUTES.SIGN_IN);
    }

    const handleResend = () => {
        setStatus('idle');
        startTransition(async () => {
            const result = await resendVerificationEmailAction(email);

            if (result.success) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        });
    };

    return (
        <FormCard
            title={t('verificationSent.heading')}
            footer={
                <>
                    <Link href="/auth/login" className="w-full">
                        <Button type="submit" className="w-full" disabled={isPending}>
                            <IconMoveLeft className="mr-2 h-4 w-4" />
                            {t('verificationSent.backToLogin')}{' '}
                        </Button>
                    </Link>

                    <div className="text-center text-xs">
                        {t('verificationSent.noEmail')}
                        <Button
                            onClick={handleResend}
                            disabled={isPending}
                            variant="link"
                            size="sm"
                            className="ml-0.5 h-auto p-0 text-xs"
                        >
                            {t('verificationSent.resend')}
                        </Button>
                    </div>
                </>
            }
        >
            <div className="text-center text-sm">
                {t.rich('verificationSent.description', {
                    email: () => <strong className="text-foreground">{email}</strong>
                })}

                {status === 'success' && (
                    <p className="mt-4 text-sm text-green-600">
                        {t('verificationSent.resendSuccess')}
                    </p>
                )}
                {status === 'error' && (
                    <p className="mt-4 text-sm text-red-600">{t('verificationSent.resendError')}</p>
                )}
            </div>
        </FormCard>
    );
}
