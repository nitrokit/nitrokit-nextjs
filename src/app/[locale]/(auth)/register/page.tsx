import { AUTH_ROUTES } from '@/lib/auth/constants';
import { RegisterForm } from './components/register-form';
import { SignWithButtons } from '../components/sign-with-buttons';
import { FormCard } from '../components/form-card';
import { Link } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import { generatePageMetadata } from '@nitrokit/core/lib';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('auth.signup');
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
            title={t('auth.signup.title')}
            footer={
                <>
                    <SignWithButtons />
                </>
            }
        >
            <div className="mb-5 w-full text-center text-sm">
                {t.rich('auth.signup.hasAccount', {
                    link: (chunks) => (
                        <Link
                            href={AUTH_ROUTES.SIGN_IN}
                            className="inline-block bg-linear-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text font-bold text-transparent underline-offset-2 transition-all duration-300 hover:bg-gradient-to-l hover:underline"
                        >
                            {chunks}
                        </Link>
                    )
                })}
            </div>
            <RegisterForm />
        </FormCard>
    );
}
