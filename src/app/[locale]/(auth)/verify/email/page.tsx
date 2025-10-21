import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, verifyEmailAction } from '@/lib';
import { Metadata } from 'next';
import { VerifyStatusCard } from './components/verify-status-card';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('auth.verification');
    return await generatePageMetadata({
        params: Promise.resolve({
            title: t('title'),
            description: t('description')
        })
    });
}

interface PageProps {
    searchParams: { token?: string };
}

export default async function Page({ searchParams }: PageProps) {
    const t = await getTranslations('auth.verification');
    const params = await Promise.resolve(searchParams);
    const token: string = String(params.token);

    if (!token) {
        return <VerifyStatusCard type="error" message={t('messages.missingToken')} />;
    }

    try {
        const result = await verifyEmailAction(token);

        if (!result.success) {
            return (
                <VerifyStatusCard
                    type="error"
                    message={result.error || t('messages.generalError')}
                />
            );
        }
        return (
            <VerifyStatusCard
                type="success"
                message={t('messages.successWait')}
                redirectUrl={result.redirectUrl}
            />
        );
    } catch {
        return <VerifyStatusCard type="error" message={t('messages.generalError')} />;
    }
}
