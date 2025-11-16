import { useTranslations } from 'next-intl';
import { FormCard } from '../../components/form-card';
import { ResetPasswordForm } from './components/reset-password-form';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@nitrokit/core/lib';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('auth.reset-password');
    return await generatePageMetadata({
        params: Promise.resolve({
            title: t('title'),
            description: t('description')
        })
    });
}

export default function Page() {
    const t = useTranslations();
    return (
        <FormCard
            title={t('auth.reset-password.title')}
            description={t('auth.reset-password.description')}
        >
            <ResetPasswordForm />
        </FormCard>
    );
}
