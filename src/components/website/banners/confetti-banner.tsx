'use client';

import { Link } from '@/lib/i18n/navigation';
import { cn } from '@nitrokit/core/lib';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useCanvasConfetti, type ConfettiEffectType } from '@nitrokit/core';

interface ConfettiBannerProps {
    href: string;
    badge: string;
    text: string;
    className?: string;
    variant?:
        | 'default'
        | 'gradient'
        | 'minimal'
        | 'premium'
        | 'ocean'
        | 'sunset'
        | 'twilight'
        | 'forest'
        | 'aurora'
        | 'candy';
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
    variant: initialVariant,
    icon,
    animated = true,
    confettiEffect = 'none',
    confettiEnabled = false,
    confettiIntensity = 'medium',
    confettiColors,
    confettiEmoji
}: ConfettiBannerProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const variantStyles = {
        default: {
            container:
                'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 text-blue-900 hover:from-blue-100 hover:to-indigo-100 dark:from-blue-950/50 dark:to-indigo-950/50 dark:border-blue-800/30 dark:text-blue-100',
            badge: 'bg-blue-600 text-white shadow-lg',
            defaultConfettiColors: ['#3b82f6', '#6366f1', '#2563eb'] // Mavi, İndigo tonları
        },
        gradient: {
            container:
                'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-red-600',
            badge: 'bg-white/20 backdrop-blur-sm text-white border border-white/30',
            defaultConfettiColors: ['#a855f7', '#ec4899', '#ef4444'] // Mor, Pembe, Kırmızı tonları
        },
        minimal: {
            container:
                'bg-background/60 backdrop-blur-sm border border-border/50 text-foreground hover:bg-background/80 hover:border-border',
            badge: 'bg-primary text-primary-foreground',
            defaultConfettiColors: ['#6b7280', '#9ca3af', '#d1d5db'] // Gri tonları
        },
        premium: {
            container:
                'bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border border-yellow-200/50 text-amber-900 hover:from-yellow-100 hover:via-amber-100 hover:to-orange-100 dark:from-yellow-950/20 dark:via-amber-950/20 dark:to-orange-950/20 dark:border-yellow-800/30 dark:text-amber-100',
            badge: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg',
            defaultConfettiColors: ['#facc15', '#fbbf24', '#f97316'] // Sarı, Amber, Turuncu tonları
        },
        ocean: {
            container:
                'bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white hover:from-green-500 hover:via-teal-600 hover:to-blue-600',
            badge: 'bg-white/20 backdrop-blur-sm text-white border border-white/30',
            defaultConfettiColors: ['#34d399', '#20c997', '#0ea5e9'] // Deniz yeşili, turkuaz, açık mavi
        },
        sunset: {
            container:
                'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white hover:from-yellow-500 hover:via-orange-600 hover:to-red-600',
            badge: 'bg-white/20 backdrop-blur-sm text-white border border-white/30',
            defaultConfettiColors: ['#fcd34d', '#f97316', '#ef4444'] // Sarı, Turuncu, Kırmızı
        },
        twilight: {
            container:
                'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600',
            badge: 'bg-white/20 backdrop-blur-sm text-white border border-white/30',
            defaultConfettiColors: ['#6366f1', '#a855f7', '#ec4899'] // İndigo, Mor, Pembe
        },
        forest: {
            container:
                'bg-gradient-to-r from-lime-500 via-green-500 to-emerald-600 text-white hover:from-lime-600 hover:via-green-600 hover:to-emerald-700',
            badge: 'bg-white/20 backdrop-blur-sm text-white border border-white/30',
            defaultConfettiColors: ['#84cc16', '#22c55e', '#10b981'] // Açık yeşil, yeşil, zümrüt
        },
        aurora: {
            container:
                'bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 text-white hover:from-cyan-500 hover:via-sky-600 hover:to-blue-700',
            badge: 'bg-white/20 backdrop-blur-sm text-white border border-white/30',
            defaultConfettiColors: ['#22d3ee', '#0ea5e9', '#3b82f6'] // Camgöbeği, gök mavisi, mavi
        },
        candy: {
            container:
                'bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-600 text-white hover:from-pink-500 hover:via-fuchsia-600 hover:to-purple-700',
            badge: 'bg-white/20 backdrop-blur-sm text-white border border-white/30',
            defaultConfettiColors: ['#f472b6', '#d946ef', '#a855f7'] // Pembe, fuşya, mor
        }
    };

    const [randomVariant] = useState(() => {
        const colorfulVariants = [
            'gradient',
            'premium',
            'ocean',
            'sunset',
            'twilight',
            'forest',
            'aurora',
            'candy'
        ];
        return colorfulVariants[
            Math.floor(Math.random() * colorfulVariants.length)
        ] as keyof typeof variantStyles;
    });

    const variant = initialVariant || randomVariant;

    const { containerRef, triggerConfetti } = useCanvasConfetti({
        effect: confettiEffect,
        enabled: confettiEnabled,
        intensity: confettiIntensity,
        colors: confettiColors || variantStyles[variant].defaultConfettiColors,
        emoji: confettiEmoji
    });

    const currentVariant = variantStyles[variant];

    return (
        <Link
            ref={containerRef as React.RefObject<HTMLAnchorElement>}
            href={href}
            className={cn(
                'group relative flex flex-row items-center justify-center gap-3 overflow-hidden rounded-full px-3 py-2 text-sm font-medium shadow-xs transition-all duration-300 ease-out',
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
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
            <span
                className={cn(
                    'relative z-10 font-semibold transition-all duration-300',
                    isHovered && 'tracking-wide'
                )}
            >
                {text}
            </span>
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

export const CelebrationBanner = ({
    href,
    text,
    className
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
    className
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
    className
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
    className
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
