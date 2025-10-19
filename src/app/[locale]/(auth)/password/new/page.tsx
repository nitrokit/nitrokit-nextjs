import { Button, Field, FieldGroup, FieldLabel, Input } from '@/comp/ui';
import { FormCard } from '../../components/form-card';
import { MoveRight as IconMoveRight } from 'lucide-react';

export default function Page() {
    return (
        <FormCard
            title="Reset Password"
            description="Enter your new password"
            footer={
                <>
                    <Button type="submit" className="w-full">
                        Continue <IconMoveRight />
                    </Button>
                </>
            }
        >
            <form>
                <FieldGroup>
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
