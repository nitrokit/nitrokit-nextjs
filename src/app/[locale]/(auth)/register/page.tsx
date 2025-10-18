import { AUTH_ROUTES } from '@/lib/auth/constants';
import { RegisterForm } from './components/register-form';
import { SignWithButtons } from '../components/sign-with-buttons';
import { FormCard } from '../components/form-card';
import { Link } from '@/lib/i18n/navigation';

export function generateMetadata() {
    return {
        title: 'Sign Up',
        alternates: {
            canonical: AUTH_ROUTES.SIGN_UP
        }
    };
}

export default function Page() {
    return (
        <FormCard
            title="Sign up"
            footer={
                <>
                    <SignWithButtons />
                </>
            }
        >
            <div className="mb-5 w-full text-center text-sm">
                Already have an Account ?{' '}
                <Link
                    href={AUTH_ROUTES.SIGN_IN}
                    className="underline-offset-2 hover:text-blue-600 hover:underline"
                >
                    Sign In
                </Link>
            </div>
            <RegisterForm />
        </FormCard>
    );
}
