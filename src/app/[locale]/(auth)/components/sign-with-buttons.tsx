import { SignWithButton } from '@/comp/auth/sign-with-button';

export function SignWithButtons() {
    return (
        <div className="mt-3 grid grow grid-cols-5 gap-5">
            <SignWithButton provider="google" variant={'outline'} onlyIcon={true} />
            <SignWithButton provider="github" variant={'outline'} onlyIcon={true} />
            <SignWithButton provider="gitlab" variant={'outline'} onlyIcon={true} />
            <SignWithButton provider="linkedin" variant={'outline'} onlyIcon={true} />
            <SignWithButton provider="twitter" variant={'outline'} onlyIcon={true} />
        </div>
    );
}
