import { Button, Field, FieldGroup, FieldLabel, Input } from '@/comp/ui';
import { FormCard } from '../../components/form-card';
import { MoveRight as IconMoveRight } from 'lucide-react';

export default function Page() {
    return (
        <FormCard
            title="Your Email"
            description="Enter your email to reset password"
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
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </Field>
                </FieldGroup>
            </form>
        </FormCard>
    );
}
