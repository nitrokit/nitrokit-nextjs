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
                            className="underline-offset-2 hover:text-blue-600 hover:underline"
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
