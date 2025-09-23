'use client';

import { useCallback, useRef } from 'react';

export type HoverEffectType = 'none' | 'fireworks' | 'sparkles' | 'confetti' | 'ripple' | 'glow';

interface HoverEffectsOptions {
    effect: HoverEffectType;
    enabled: boolean;
    intensity?: 'low' | 'medium' | 'high';
    color?: string;
}

export const useHoverEffects = (options: HoverEffectsOptions) => {
    const containerRef = useRef<HTMLElement>(null);

    const createParticle = useCallback((x: number, y: number, type: string, color: string) => {
        const particle = document.createElement('div');
        particle.className = `absolute pointer-events-none z-50 ${type}`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.background = color;

        return particle;
    }, []);

    const createFireworks = useCallback(
        (e: React.MouseEvent) => {
            if (!containerRef.current || !options.enabled) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const container = containerRef.current;
            const particleCount =
                options.intensity === 'high' ? 12 : options.intensity === 'medium' ? 8 : 5;

            for (let i = 0; i < particleCount; i++) {
                const particle = createParticle(
                    x,
                    y,
                    'firework-particle',
                    options.color || '#3b82f6'
                );
                particle.style.width = '3px';
                particle.style.height = '3px';
                particle.style.borderRadius = '50%';
                particle.style.position = 'absolute';

                const angle = (i / particleCount) * Math.PI * 2;
                const velocity = 20 + Math.random() * 10;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;

                container.appendChild(particle);

                let px = x;
                let py = y;
                let opacity = 1;

                const animate = () => {
                    px += vx * 0.1;
                    py += vy * 0.1;
                    opacity -= 0.02;

                    particle.style.left = `${px}px`;
                    particle.style.top = `${py}px`;
                    particle.style.opacity = opacity.toString();

                    if (opacity > 0) {
                        requestAnimationFrame(animate);
                    } else {
                        particle.remove();
                    }
                };

                requestAnimationFrame(animate);
            }
        },
        [options, createParticle]
    );

    const createSparkles = useCallback(
        (e: React.MouseEvent) => {
            if (!containerRef.current || !options.enabled) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const container = containerRef.current;
            const sparkleCount =
                options.intensity === 'high' ? 8 : options.intensity === 'medium' ? 5 : 3;

            for (let i = 0; i < sparkleCount; i++) {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.className = 'absolute pointer-events-none z-50 text-xs';
                sparkle.style.left = `${x + (Math.random() - 0.5) * 30}px`;
                sparkle.style.top = `${y + (Math.random() - 0.5) * 30}px`;
                sparkle.style.animation = 'sparkle 1s ease-out forwards';

                container.appendChild(sparkle);

                setTimeout(() => sparkle.remove(), 1000);
            }
        },
        [options]
    );

    const createConfetti = useCallback(
        (e: React.MouseEvent) => {
            if (!containerRef.current || !options.enabled) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const container = containerRef.current;
            const confettiCount =
                options.intensity === 'high' ? 15 : options.intensity === 'medium' ? 10 : 6;
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];

            for (let i = 0; i < confettiCount; i++) {
                const confetti = createParticle(
                    x,
                    y,
                    'confetti-piece',
                    colors[Math.floor(Math.random() * colors.length)]
                );
                confetti.style.width = '6px';
                confetti.style.height = '4px';
                confetti.style.position = 'absolute';
                confetti.style.animation = 'confetti 2s ease-out forwards';
                confetti.style.animationDelay = `${Math.random() * 0.3}s`;

                container.appendChild(confetti);

                setTimeout(() => confetti.remove(), 2000);
            }
        },
        [options, createParticle]
    );

    const createRipple = useCallback(
        (e: React.MouseEvent) => {
            if (!containerRef.current || !options.enabled) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const container = containerRef.current;
            const ripple = document.createElement('div');

            ripple.className =
                'absolute pointer-events-none z-40 rounded-full border-2 border-current opacity-70';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out forwards';

            container.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        },
        [options]
    );

    const handleMouseEnter = useCallback(
        (e: React.MouseEvent) => {
            if (!options.enabled) return;

            switch (options.effect) {
                case 'fireworks':
                    createFireworks(e);
                    break;
                case 'sparkles':
                    createSparkles(e);
                    break;
                case 'confetti':
                    createConfetti(e);
                    break;
                case 'ripple':
                    createRipple(e);
                    break;
                default:
                    break;
            }
        },
        [options, createFireworks, createSparkles, createConfetti, createRipple]
    );

    return {
        containerRef,
        handleMouseEnter,
    };
};
