import { Button } from '@/comp/ui';
import { FormCard } from '../../components/form-card';
import { MoveRight as IconMoveRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';
import { AUTH_ROUTES } from '@/lib/auth/constants';

export default function Page() {
    return (
        <FormCard
            title="Check your email"
            footer={
                <>
                    <Button type="submit" className="w-full">
                        Skip for now <IconMoveRight />
                    </Button>
                    <div className="text-xs">
                        Didn’t receive an email?{' '}
                        <Link href={AUTH_ROUTES.PASSWORD_RESET}>Resend</Link>
                    </div>
                </>
            }
        >
            <div className="text-center text-sm">
                Please click the link sent to your email m@example.com to reset your password. Thank
                you
            </div>
        </FormCard>
    );
}
