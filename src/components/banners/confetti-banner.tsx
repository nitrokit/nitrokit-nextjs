'use client';

import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useCanvasConfetti, type ConfettiEffectType } from '@/hooks/useCanvasConfetti';

interface ConfettiBannerProps {
    href: string;
    badge: string;
    text: string;
    className?: string;
    variant?: 'default' | 'gradient' | 'minimal' | 'premium';
    icon?: React.ReactNode;
    animated?: boolean;
    confettiEffect?: ConfettiEffectType;
    confettiEnabled?: boolean;
    confettiIntensity?: 'low' | 'medium' | 'high';
    confettiColors?: string[];
    confettiEmoji?: string[];
}

export const ConfettiBanner = ({
    href,
    badge,
    text,
    className,
    variant = 'default',
    icon,
    animated = true,
    confettiEffect = 'none',
    confettiEnabled = false,
    confettiIntensity = 'medium',
    confettiColors,
    confettiEmoji,
}: ConfettiBannerProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const { containerRef, triggerConfetti } = useCanvasConfetti({
        effect: confettiEffect,
        enabled: confettiEnabled,
        intensity: confettiIntensity,
        colors: confettiColors,
        emoji: confettiEmoji,
    });

    const variantStyles = {
        default: {
            container:
                'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-blue-900 hover:from-blue-100 hover:to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50 dark:border-blue-800/30 dark:text-blue-100',
            badge: 'bg-blue-600 text-white shadow-lg',
        },
        gradient: {
            container:
                'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-red-600',
            badge: 'bg-white/20 backdrop-blur-sm text-white border border-white/30',
        },
        minimal: {
            container:
                'bg-background/60 backdrop-blur-sm border border-border/50 text-foreground hover:bg-background/80 hover:border-border',
            badge: 'bg-primary text-primary-foreground',
        },
        premium: {
            container:
                'bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border border-yellow-200/50 text-amber-900 hover:from-yellow-100 hover:via-amber-100 hover:to-orange-100 dark:from-yellow-950/20 dark:via-amber-950/20 dark:to-orange-950/20 dark:border-yellow-800/30 dark:text-amber-100',
            badge: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg',
        },
    };

    const currentVariant = variantStyles[variant];

    return (
        <Link
            ref={containerRef as any}
            href={href}
            className={cn(
                'group relative flex flex-row items-center justify-center gap-3 overflow-hidden rounded-full px-3 py-2 text-sm font-medium shadow-sm transition-all duration-300 ease-out',
                currentVariant.container,
                animated && 'hover:scale-[1.02] hover:shadow-md',
                className
            )}
            onMouseEnter={() => {
                setIsHovered(true);
                triggerConfetti();
            }}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background shimmer */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Badge */}
            <span
                className={cn(
                    'relative z-10 flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs font-bold transition-all duration-300',
                    currentVariant.badge,
                    animated && isHovered && 'scale-105'
                )}
            >
                {icon && (
                    <span
                        className={cn(
                            'text-current transition-transform duration-300',
                            isHovered && 'rotate-12'
                        )}
                    >
                        {icon}
                    </span>
                )}
                {badge}
            </span>

            {/* Text */}
            <span
                className={cn(
                    'relative z-10 font-semibold transition-all duration-300',
                    isHovered && 'tracking-wide'
                )}
            >
                {text}
            </span>

            {/* Arrow */}
            <ChevronRight
                size={16}
                className={cn(
                    'relative z-10 transition-all duration-300',
                    isHovered && 'translate-x-1'
                )}
            />
        </Link>
    );
};

// Preset banners with confetti effects
export const CelebrationBanner = ({
    href,
    text,
    className,
}: {
    href: string;
    text: string;
    className?: string;
}) => (
    <ConfettiBanner
        href={href}
        badge="🎉 New"
        text={text}
        variant="gradient"
        confettiEffect="realistic"
        confettiEnabled={true}
        confettiIntensity="high"
        confettiColors={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']}
        className={className}
    />
);

export const LaunchBanner = ({
    href,
    text,
    className,
}: {
    href: string;
    text: string;
    className?: string;
}) => (
    <ConfettiBanner
        href={href}
        badge="🚀 Launch"
        text={text}
        variant="premium"
        icon={<Sparkles size={12} />}
        confettiEffect="fireworks"
        confettiEnabled={true}
        confettiIntensity="high"
        confettiColors={['#FFD700', '#FFA500', '#FF6347']}
        className={className}
    />
);

export const UpdateBanner = ({
    href,
    text,
    className,
}: {
    href: string;
    text: string;
    className?: string;
}) => (
    <ConfettiBanner
        href={href}
        badge="✨ Update"
        text={text}
        variant="default"
        confettiEffect="stars"
        confettiEnabled={true}
        confettiIntensity="medium"
        confettiColors={['#3b82f6', '#8b5cf6', '#10b981']}
        className={className}
    />
);

export const FunBanner = ({
    href,
    text,
    className,
}: {
    href: string;
    text: string;
    className?: string;
}) => (
    <ConfettiBanner
        href={href}
        badge="🎊 Fun"
        text={text}
        variant="gradient"
        confettiEffect="emoji"
        confettiEnabled={true}
        confettiIntensity="high"
        confettiEmoji={['🎉', '🥳', '🎊', '✨', '🎈', '🎁']}
        className={className}
    />
);
