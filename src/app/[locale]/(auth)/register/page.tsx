import { Button, Field, FieldDescription, FieldGroup, FieldLabel, Input } from '@/comp/ui';
import { SignWithButtons } from '../components/sign-with-buttons';
import { FormCard } from '../components/form-card';

export default function Page() {
    return (
        <FormCard
            title="Create an account"
            description="Enter your information below to create your account"
            footer={
                <>
                    {' '}
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                    <SignWithButtons />
                </>
            }
        >
            <form>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input id="name" type="text" placeholder="John Doe" required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                        <FieldDescription>
                            We&apos;ll use this to contact you. We will not share your email with
                            anyone else.
                        </FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input id="password" type="password" required />
                        <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                        <Input id="confirm-password" type="password" required />
                        <FieldDescription>Please confirm your password.</FieldDescription>
                    </Field>
                </FieldGroup>
            </form>
        </FormCard>
    );
}
