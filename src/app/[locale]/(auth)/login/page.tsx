import { Button, Input, Label } from '@/comp/ui';
import { SignWithButtons } from '../components/sign-with-buttons';
import { FormCard } from '../components/form-card';

export default function Page() {
    return (
        <FormCard
            title="Login to your account"
            description="Enter your email below to login to your account"
            footer={
                <>
                    {' '}
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <SignWithButtons />
                </>
            }
        >
            <form>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <a
                                href="#"
                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                            >
                                Forgot your password?
                            </a>
                        </div>
                        <Input id="password" type="password" required />
                    </div>
                </div>
            </form>
        </FormCard>
    );
}
