import { Button, Field, FieldGroup, FieldLabel, Input, PasswordInput } from '@/comp/ui';
import { SignWithButtons } from '../components/sign-with-buttons';
import { FormCard } from '../components/form-card';
import { Link } from '@/lib/i18n/navigation';
import { AUTH_ROUTES } from '@/lib/auth/constants';

export default function Page() {
    return (
        <FormCard
            title="Sign In"
            footer={
                <>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <SignWithButtons />
                </>
            }
        >
            <div className="mb-5 w-full text-center text-sm">
                Need an account?{' '}
                <Link
                    href={AUTH_ROUTES.SIGN_UP}
                    className="underline-offset-2 hover:text-blue-600 hover:underline"
                >
                    Sign up
                </Link>
            </div>
            <form>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </Field>
                    <Field>
                        <div className="flex items-center">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Link
                                href={AUTH_ROUTES.PASSWORD_RESET}
                                className="ml-auto inline-block text-xs underline-offset-2 hover:text-blue-600 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <PasswordInput id="password" type="password" required />
                    </Field>
                </FieldGroup>
            </form>
        </FormCard>
    );
}
