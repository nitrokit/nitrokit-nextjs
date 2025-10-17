import { SignWithButtons } from '../components/sign-with-buttons';
import { FormCard } from '../components/form-card';
import { Link } from '@/lib/i18n/navigation';
import { AUTH_ROUTES } from '@/lib/auth/constants';
import { useTranslations } from 'next-intl';
import { LoginForm } from './components/login-form';

export default function Page() {
    const t = useTranslations();

    return (
        <FormCard title={t('auth.signin.title')} footer={<SignWithButtons />}>
            <div className="mb-5 w-full text-center text-sm">
                Need an account?{' '}
                <Link
                    href={AUTH_ROUTES.SIGN_UP}
                    className="underline-offset-2 hover:text-blue-600 hover:underline"
                >
                    Sign up
                </Link>
            </div>
            <LoginForm />
        </FormCard>
    );
}
