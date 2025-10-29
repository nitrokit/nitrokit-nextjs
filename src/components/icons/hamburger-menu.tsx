'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { JSX, SVGProps } from 'react';

const icons = {
    lines: HamburgerLinesSvg,
    'dots-vertical': DotsVerticalSvg,
    'dots-horizontal': DotsHorizontalSvg,
    grid: GridSvg
};

const hamburgerMenuVariants = cva(
    'inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-6',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline:
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline'
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-2',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10'
            }
        },
        defaultVariants: {
            variant: 'ghost',
            size: 'icon'
        }
    }
);

export interface HamburgerMenuProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof hamburgerMenuVariants> {
    icon?: keyof typeof icons;
    children?: React.ReactNode;
}

const HamburgerMenu = React.forwardRef<HTMLButtonElement, HamburgerMenuProps>(
    ({ className, variant, size, children, icon = 'lines', ...props }, ref) => {
        const IconComponent = icons[icon];

        return (
            <button
                className={cn(hamburgerMenuVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            >
                {children || <IconComponent />}
            </button>
        );
    }
);
HamburgerMenu.displayName = 'HamburgerMenu';

export default HamburgerMenu;

export function HamburgerLinesSvg(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" {...props}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M4 6h16M4 12h16m-7 6h7"
            />
        </svg>
    );
}

export function DotsHorizontalSvg(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fillRule="evenodd"
                d="M4 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export function DotsVerticalSvg(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fillRule="evenodd"
                d="M12 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export function GridSvg(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            fill="currentColor"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zM14 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V6zM4 16a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2zM14 16a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2z"
            />
        </svg>
    );
}
