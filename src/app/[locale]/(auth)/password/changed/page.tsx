import { Button } from '@/comp/ui';
import { FormCard } from '../../components/form-card';

export default function Page() {
    return (
        <FormCard
            title="Your password is changed"
            footer={
                <>
                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </>
            }
        >
            <div className="text-center text-sm">
                Your password has been successfully updated. Your account's security is our
                priority.
            </div>
        </FormCard>
    );
}
