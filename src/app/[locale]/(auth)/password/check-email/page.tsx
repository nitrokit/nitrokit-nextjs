import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@nitrokit/core/lib';
import { Metadata } from 'next';
import { PasswordResetSentCard } from './components/password-reset-sent-card';
import { Link } from '@/lib/i18n/navigation';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('auth.password-reset-sent');
    return await generatePageMetadata({
        params: Promise.resolve({
            title: t('title'),
            description: t('description')
        })
    });
}

export default async function Page() {
    const t = await getTranslations();
    const userEmail = t('common.placeholders.email');
    return (
        <PasswordResetSentCard
            userEmail={userEmail}
            messages={{
                title: t('auth.password-reset-sent.title'),
                instruction: t('auth.password-reset-sent.description', { email: userEmail }),
                skipButton: t('auth.password-reset-sent.button'),
                noEmail: t.rich('auth.password-reset-sent.noEmail', {
                    link: (chunks: any) => {
                        return (
                            <Link
                                href={`mailto:${chunks}`}
                                className="text-sm font-semibold underline hover:text-red-500"
                            >
                                {chunks}
                            </Link>
                        );
                    }
                }),
                resend: t('auth.password-reset-sent.resend')
            }}
        />
    );
}
