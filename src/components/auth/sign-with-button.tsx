'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib';
import { Provider } from '@/lib/auth/providers';
import {
    GoogleIcon,
    GithubIcon,
    GitlabIcon,
    AppleIcon,
    InstagramIcon,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon
} from '@/components/icons';
import { signIn } from '@/lib/auth/auth';
import { AUTH_ROUTES } from '@/lib/auth/constants';

type ButtonVariantProps = NonNullable<Parameters<typeof buttonVariants>[0]>;

function getProviderDetail({ t, provider }: { t: (key: string) => string; provider: Provider }): {
    text: string;
    Icon: React.ComponentType<{ className?: string; color?: string }>;
} {
    switch (provider) {
        case 'google':
            return {
                text: t('auth.signinWithGoogle'),
                Icon: GoogleIcon
            };
        case 'github':
            return {
                text: t('auth.signinWithGithub'),
                Icon: GithubIcon
            };
        case 'gitlab':
            return {
                text: t('auth.signinWithGitlab'),
                Icon: GitlabIcon
            };
        case 'apple':
            return {
                text: t('auth.signinWithApple'),
                Icon: AppleIcon
            };
        case 'instagram':
            return {
                text: t('auth.signinWithInstagram'),
                Icon: InstagramIcon
            };
        case 'facebook':
            return {
                text: t('auth.signinWithFacebook'),
                Icon: FacebookIcon
            };
        case 'twitter':
            return {
                text: t('auth.signinWithTwitter'),
                Icon: TwitterIcon
            };
        case 'linkedin':
            return {
                text: t('auth.signinWithLinkedIn'),
                Icon: LinkedinIcon
            };
        default:
            throw new Error('Unsupported provider');
    }
}

type SignWithButtonProps = React.ComponentPropsWithoutRef<'button'> &
    ButtonVariantProps & {
        provider: Provider;
        onlyIcon?: boolean;
        asChild?: boolean;
        className?: string;
    };

function SignWithButton({
    provider,
    className,
    variant,
    size,
    onlyIcon = false,
    asChild = false,
    ...props
}: SignWithButtonProps) {
    const t = useTranslations();
    const { text, Icon } = getProviderDetail({ t: (key) => t(key as any), provider });

    return (
        <form
            action={async () => {
                'use server';

                await signIn(provider, { redirectTo: AUTH_ROUTES.DASHBOARD });
            }}
            className={cn('w-full', className)}
        >
            <Button
                type="submit"
                aria-label={text}
                asChild={asChild}
                className={cn(
                    'w-full items-center justify-center border-1 border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-950'
                )}
                variant={variant}
                size={size}
                {...props}
            >
                <Icon className="h-5 w-5 text-black dark:text-white" />
                <span
                    className={cn('ml-2 text-sm text-black dark:text-gray-400', {
                        hidden: onlyIcon
                    })}
                >
                    {text}
                </span>
            </Button>
        </form>
    );
}

export { SignWithButton };
