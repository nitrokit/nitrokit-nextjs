'use client';

import { ReactNode } from 'react';
import { Button, buttonVariants } from '@/components/ui';
import { cn } from '@/lib';
import { Link } from '@/lib/i18n/navigation';

interface AuthLinkProps {
    href?: string;
    variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant'];
    size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size'];
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export function AuthLink({ href, variant, size, children, className, onClick }: AuthLinkProps) {
    if (onClick && !href) {
        return (
            <Button size={size} variant={variant} className={cn(className)} onClick={onClick}>
                {children}
            </Button>
        );
    }

    if (href) {
        return (
            <Button
                asChild
                size={size}
                variant={variant}
                className={cn(className)}
                onClick={onClick}
            >
                <Link href={href}>{children}</Link>
            </Button>
        );
    }

    return (
        <Button size={size} variant={variant} className={cn(className)}>
            {children}
        </Button>
    );
}
