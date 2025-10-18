import { SignWithButtons } from '../components/sign-with-buttons';
import { FormCard } from '../components/form-card';
import { Link } from '@/lib/i18n/navigation';
import { AUTH_ROUTES } from '@/lib/auth/constants';
import { useTranslations } from 'next-intl';
import { LoginForm } from './components/login-form';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('auth.signin');
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
        <FormCard title={t('auth.signin.title')} footer={<SignWithButtons />}>
            <div className="mb-5 w-full text-center text-sm">
                {t.rich('auth.signin.noAccountYet', {
                    link: (chunks) => (
                        <Link
                            href={AUTH_ROUTES.SIGN_UP}
                            className="inline-block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text font-bold text-transparent underline-offset-2 transition-all duration-300 hover:bg-gradient-to-l hover:underline"
                        >
                            {chunks}
                        </Link>
                    )
                })}
            </div>
            <LoginForm />
        </FormCard>
    );
}
