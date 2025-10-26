'use client';

import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useHoverEffects, type HoverEffectType } from '@/hooks';

interface CompactBannerProps {
    href: string;
    badge: string;
    text: string;
    className?: string;
    variant?: 'default' | 'gradient' | 'minimal' | 'premium';
    icon?: React.ReactNode;
    animated?: boolean;
    hoverEffect?: HoverEffectType;
    effectEnabled?: boolean;
    effectIntensity?: 'low' | 'medium' | 'high';
    effectColor?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
    rel?: string;
}

export const CompactBanner = ({
    href,
    badge,
    text,
    className,
    variant = 'default',
    icon,
    animated = true,
    hoverEffect = 'none',
    effectEnabled = true,
    effectIntensity = 'medium',
    effectColor,
    target = '_self',
    rel = ''
}: CompactBannerProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const { containerRef, handleMouseEnter } = useHoverEffects({
        effect: hoverEffect,
        enabled: effectEnabled,
        intensity: effectIntensity,
        color: effectColor
    });

    const variantStyles = {
        default: {
            container:
                'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-blue-900 hover:from-blue-100 hover:to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50 dark:border-blue-800/30 dark:text-blue-100',
            badge: 'bg-blue-600 text-white shadow-lg'
        },
        gradient: {
            container:
                'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-red-600',
            badge: 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
        },
        minimal: {
            container:
                'bg-background/60 backdrop-blur-sm border border-border/50 text-foreground hover:bg-background/80 hover:border-border',
            badge: 'bg-primary text-primary-foreground'
        },
        premium: {
            container:
                'bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border border-yellow-200/50 text-amber-900 hover:from-yellow-100 hover:via-amber-100 hover:to-orange-100 dark:from-yellow-950/20 dark:via-amber-950/20 dark:to-orange-950/20 dark:border-yellow-800/30 dark:text-amber-100',
            badge: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg'
        }
    };

    const currentVariant = variantStyles[variant];

    return (
        <Link
            ref={containerRef as React.RefObject<HTMLAnchorElement>}
            href={href}
            target={target}
            rel={rel}
            className={cn(
                'group relative flex flex-row items-center justify-center gap-3 overflow-hidden rounded-full px-3 py-2 text-sm font-medium shadow-sm transition-all duration-300 ease-out',
                currentVariant.container,
                animated && 'hover:scale-[1.02] hover:shadow-md',
                hoverEffect === 'glow' &&
                    effectEnabled &&
                    'hover:animate-[glow-pulse_1s_ease-in-out_infinite]',
                className
            )}
            onMouseEnter={(e) => {
                setIsHovered(true);
                handleMouseEnter(e);
            }}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span
                className={cn(
                    'relative z-10 flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold transition-all duration-300',
                    currentVariant.badge,
                    animated && 'group-hover:scale-105'
                )}
            >
                {icon && <span className="text-current">{icon}</span>}
                {badge}
            </span>
            <span className="relative z-10 font-semibold transition-all duration-300">{text}</span>
            <ChevronRight
                size={16}
                className={cn(
                    'relative z-10 transition-all duration-300',
                    animated && isHovered && 'translate-x-0.5'
                )}
            />
            {animated && (
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-500 group-hover:animate-pulse group-hover:opacity-100" />
            )}
        </Link>
    );
};

export const NewFeatureBanner = ({
    href,
    text,
    className,
    hoverEffect = 'fireworks',
    effectEnabled = true
}: {
    href: string;
    text: string;
    className?: string;
    hoverEffect?: HoverEffectType;
    effectEnabled?: boolean;
}) => (
    <CompactBanner
        href={href}
        badge="New"
        text={text}
        variant="gradient"
        icon={<Sparkles size={12} />}
        hoverEffect={hoverEffect}
        effectEnabled={effectEnabled}
        effectIntensity="high"
        effectColor="#8b5cf6"
        className={className}
    />
);

export const UpdateBanner = ({
    href,
    text,
    className,
    hoverEffect = 'ripple',
    effectEnabled = true
}: {
    href: string;
    text: string;
    className?: string;
    hoverEffect?: HoverEffectType;
    effectEnabled?: boolean;
}) => (
    <CompactBanner
        href={href}
        badge="Update"
        text={text}
        variant="default"
        hoverEffect={hoverEffect}
        effectEnabled={effectEnabled}
        effectIntensity="medium"
        className={className}
    />
);

export const PremiumBanner = ({
    href,
    text,
    className,
    hoverEffect = 'confetti',
    effectEnabled = true
}: {
    href: string;
    text: string;
    className?: string;
    hoverEffect?: HoverEffectType;
    effectEnabled?: boolean;
}) => (
    <CompactBanner
        href={href}
        badge="Pro"
        text={text}
        variant="premium"
        icon={<Sparkles size={12} />}
        hoverEffect={hoverEffect}
        effectEnabled={effectEnabled}
        effectIntensity="high"
        className={className}
    />
);
