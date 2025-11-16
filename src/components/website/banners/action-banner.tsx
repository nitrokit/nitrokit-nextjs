'use client';

import { Link } from '@/lib/i18n/navigation';
import { cn } from '@nitrokit/core/lib';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface ActionBannerProps {
    title: string;
    description: string;
    buttonText: string;
    href: string;
    variant?: 'default' | 'gradient' | 'minimal' | 'enterprise' | 'premium';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    buttonVariant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    external?: boolean;
    className?: string;
    animated?: boolean;
}

export function ActionBanner({
    title,
    description,
    buttonText,
    href,
    variant = 'default',
    size = 'md',
    icon,
    buttonVariant = 'primary',
    external = false,
    className,
    animated = false
}: ActionBannerProps) {
    const [isHovered, setIsHovered] = useState(false);

    const variantStyles = {
        default: {
            container:
                'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 dark:from-blue-950/20 dark:to-indigo-950/20 dark:border-blue-800/30',
            title: 'text-blue-900 dark:text-blue-100',
            description: 'text-blue-700 dark:text-blue-200'
        },
        gradient: {
            container:
                'bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white border-0',
            title: 'text-white',
            description: 'text-white/90'
        },
        minimal: {
            container: 'bg-background border border-border/50 hover:border-border hover:shadow-lg',
            title: 'text-foreground',
            description: 'text-muted-foreground'
        },
        enterprise: {
            container:
                'bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 dark:from-slate-900/50 dark:to-gray-900/50 dark:border-slate-700',
            title: 'text-slate-900 dark:text-slate-100',
            description: 'text-slate-600 dark:text-slate-300'
        },
        premium: {
            container:
                'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border border-yellow-200/50 dark:from-yellow-950/20 dark:via-amber-950/20 dark:to-orange-950/20 dark:border-yellow-800/30',
            title: 'text-amber-900 dark:text-amber-100',
            description: 'text-amber-700 dark:text-amber-200'
        }
    };

    const sizeStyles = {
        sm: {
            container: 'p-4 gap-3 rounded-lg',
            title: 'text-lg font-semibold',
            description: 'text-sm',
            button: 'px-4 py-2 text-sm'
        },
        md: {
            container: 'p-6 gap-4 rounded-xl',
            title: 'text-xl lg:text-2xl font-bold',
            description: 'text-base',
            button: 'px-6 py-2.5 text-base'
        },
        lg: {
            container: 'p-8 gap-6 rounded-2xl',
            title: 'text-2xl lg:text-4xl font-bold',
            description: 'text-lg',
            button: 'px-8 py-3 text-lg'
        }
    };

    const buttonStyles = {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border-2 border-current bg-transparent hover:bg-current/10',
        ghost: 'bg-transparent hover:bg-current/10'
    };

    const currentVariant = variantStyles[variant];
    const currentSize = sizeStyles[size];

    const ButtonIcon = external ? ExternalLink : ArrowRight;

    return (
        <div
            className={cn(
                'mx-auto flex max-w-5xl flex-col items-center justify-between transition-all duration-300',
                'lg:flex-row lg:text-left',
                currentVariant.container,
                currentSize.container,
                animated && 'hover:scale-[1.02] hover:shadow-xl',
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Content Section */}
            <div className="flex flex-1 flex-col items-center gap-2 lg:items-start">
                {/* Title with Icon */}
                <div className="flex items-center gap-3">
                    {icon && (
                        <div
                            className={cn(
                                'flex-shrink-0 transition-transform duration-300',
                                animated && isHovered && 'scale-110'
                            )}
                        >
                            {icon}
                        </div>
                    )}
                    <h3
                        className={cn(
                            currentSize.title,
                            currentVariant.title,
                            'text-center lg:text-left'
                        )}
                    >
                        {title}
                    </h3>
                </div>

                {/* Description */}
                <p
                    className={cn(
                        currentSize.description,
                        currentVariant.description,
                        'text-center leading-relaxed lg:text-left'
                    )}
                >
                    {description}
                </p>
            </div>

            {/* Action Button */}
            <Link
                href={href}
                className={cn(
                    'group flex items-center gap-2 rounded-lg font-medium transition-all duration-300',
                    currentSize.button,
                    buttonStyles[buttonVariant],
                    'flex-shrink-0 whitespace-nowrap'
                )}
                {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
            >
                {buttonText}
                <ButtonIcon
                    size={16}
                    className={cn(
                        'transition-transform duration-300',
                        animated && 'group-hover:translate-x-0.5'
                    )}
                />
            </Link>
        </div>
    );
}

// Preset variants for common use cases
export function EnterpriseBanner({
    title,
    description,
    buttonText,
    href,
    className
}: {
    title: string;
    description: string;
    buttonText: string;
    href: string;
    className?: string;
}) {
    return (
        <ActionBanner
            title={title}
            description={description}
            buttonText={buttonText}
            href={href}
            variant="enterprise"
            size="lg"
            buttonVariant="outline"
            className={className}
        />
    );
}

export function PremiumBanner({
    title,
    description,
    buttonText,
    href,
    icon,
    className
}: {
    title: string;
    description: string;
    buttonText: string;
    href: string;
    icon?: React.ReactNode;
    className?: string;
}) {
    return (
        <ActionBanner
            title={title}
            description={description}
            buttonText={buttonText}
            href={href}
            variant="premium"
            size="md"
            buttonVariant="primary"
            icon={icon}
            className={className}
        />
    );
}

export function CallToActionBanner({
    title,
    description,
    buttonText,
    href,
    className
}: {
    title: string;
    description: string;
    buttonText: string;
    href: string;
    className?: string;
}) {
    return (
        <ActionBanner
            title={title}
            description={description}
            buttonText={buttonText}
            href={href}
            variant="gradient"
            size="md"
            buttonVariant="secondary"
            className={className}
        />
    );
}
export function MinimalBanner({
    title,
    description,
    buttonText,
    href,
    className
}: {
    title: string;
    description: string;
    buttonText: string;
    href: string;
    className?: string;
}) {
    return (
        <ActionBanner
            title={title}
            description={description}
            buttonText={buttonText}
            href={href}
            variant="minimal"
            size="md"
            buttonVariant="ghost"
            className={className}
        />
    );
}
