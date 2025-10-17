import { Button, Checkbox, Field, FieldGroup, FieldLabel, Input, PasswordInput } from '@/comp/ui';
import { SignWithButtons } from '../components/sign-with-buttons';
import { FormCard } from '../components/form-card';
import { AUTH_ROUTES } from '@/lib/auth/constants';
import { Link } from '@/lib/i18n/navigation';

export default function Page() {
    return (
        <FormCard
            title="Sign up"
            footer={
                <>
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
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
            <form>
                <FieldGroup>
                    <div className="grid grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="firstname">Firstname</FieldLabel>
                            <Input id="firstname" type="text" placeholder="Firstname" />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="lastname">Lastname</FieldLabel>
                            <Input id="lastname" type="text" placeholder="Lastname" />
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <PasswordInput id="password" type="password" required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                        <PasswordInput id="confirm-password" type="password" required />
                    </Field>
                    <FieldGroup>
                        <Field orientation="horizontal">
                            <Checkbox id="terms" defaultChecked />
                            <FieldLabel htmlFor="terms" className="font-normal">
                                Accept terms and conditions
                            </FieldLabel>
                        </Field>
                    </FieldGroup>
                </FieldGroup>
            </form>
        </FormCard>
    );
}
