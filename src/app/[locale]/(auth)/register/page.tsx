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
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input id="password" type="password" required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                        <Input id="confirm-password" type="password" required />
                    </Field>
                </FieldGroup>
            </form>
        </FormCard>
    );
}
