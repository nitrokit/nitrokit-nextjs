'use client';

import { cn } from '@/lib/utils';

interface BackgroundPatternsProps {
    variant?: 'default' | 'geometric' | 'dots' | 'waves' | 'grid' | 'stars' | 'circles';
    className?: string;
    animated?: boolean;
}

export function BackgroundPatterns({
    variant = 'default',
    className,
    animated = true
}: BackgroundPatternsProps) {
    const patterns = {
        default: (
            <>
                {/* Light mode */}
                <div className="absolute inset-0 overflow-hidden dark:hidden">
                    <div
                        className="absolute inset-0 opacity-60"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
                            `,
                            backgroundSize: '50px 50px'
                        }}
                    />
                    <div className="absolute top-10 -right-50 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200 to-indigo-300 opacity-80 blur-3xl" />
                    <div className="absolute top-1/3 -left-32 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-200 to-teal-300 opacity-70 blur-3xl" />
                    <div className="absolute right-1/4 bottom-20 h-48 w-48 rounded-full bg-gradient-to-br from-purple-200 to-pink-300 opacity-60 blur-3xl" />
                    <div className="absolute top-1/4 left-1/4 h-3 w-3 rotate-45 bg-blue-400 opacity-40" />
                    <div className="absolute top-1/2 right-1/3 h-4 w-4 rotate-12 bg-emerald-400 opacity-45" />
                    <div className="absolute bottom-1/3 left-1/2 h-2 w-2 rotate-45 bg-purple-400 opacity-35" />
                    <div className="absolute top-32 right-1/2 h-1 w-16 bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
                    <div className="absolute bottom-1/4 left-1/4 h-12 w-1 bg-gradient-to-b from-transparent via-emerald-300/30 to-transparent" />
                    {animated && (
                        <>
                            <div className="absolute top-1/5 right-1/5 h-2 w-2 animate-pulse rounded-full bg-blue-300 opacity-50" />
                            <div
                                className="absolute right-2/3 bottom-1/3 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300 opacity-40"
                                style={{ animationDelay: '1.5s' }}
                            />
                            <div
                                className="absolute top-2/3 left-1/5 h-1 w-1 animate-pulse rounded-full bg-purple-300 opacity-30"
                                style={{ animationDelay: '3s' }}
                            />
                        </>
                    )}
                </div>
                {/* Dark mode */}
                <div className="absolute inset-0 hidden overflow-hidden dark:block">
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px'
                        }}
                    />
                    <div className="absolute top-22 -right-42 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl" />
                    <div className="absolute top-1/4 -left-24 h-48 w-48 rounded-full bg-gradient-to-br from-blue-500/15 to-indigo-500/15 blur-3xl" />
                    <div className="absolute right-1/3 bottom-32 h-56 w-56 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl" />
                    {animated && (
                        <>
                            <div className="absolute top-1/3 left-1/4 h-1 w-1 animate-pulse bg-emerald-400 opacity-60" />
                            <div
                                className="absolute top-1/2 right-1/4 h-1.5 w-1.5 animate-pulse bg-blue-400 opacity-50"
                                style={{ animationDelay: '1s' }}
                            />
                            <div
                                className="absolute bottom-1/2 left-1/3 h-1 w-1 animate-pulse bg-purple-400 opacity-40"
                                style={{ animationDelay: '2s' }}
                            />
                        </>
                    )}
                    <div className="absolute top-20 left-1/2 h-px w-32 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                    <div className="absolute right-1/4 bottom-40 h-24 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
                </div>
            </>
        ),
        geometric: (
            <>
                {/* Light mode */}
                <div className="absolute inset-0 overflow-hidden dark:hidden">
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: `
                                linear-gradient(45deg, rgba(59, 130, 246, 0.1) 25%, transparent 25%),
                                linear-gradient(-45deg, rgba(16, 185, 129, 0.1) 25%, transparent 25%),
                                linear-gradient(45deg, transparent 75%, rgba(147, 51, 234, 0.1) 75%),
                                linear-gradient(-45deg, transparent 75%, rgba(236, 72, 153, 0.1) 75%)
                            `,
                            backgroundSize: '100px 100px',
                            backgroundPosition: '0 0, 0 50px, 50px -50px, -50px 0px'
                        }}
                    />
                    <div className="absolute top-20 left-20 h-32 w-32 rotate-45 bg-gradient-to-br from-blue-300/30 to-indigo-400/30" />
                    <div className="absolute top-40 right-32 h-24 w-24 -rotate-12 bg-gradient-to-br from-emerald-300/25 to-teal-400/25" />
                    <div className="absolute bottom-32 left-1/3 h-28 w-28 rotate-12 bg-gradient-to-br from-purple-300/20 to-pink-400/20" />
                    <div className="absolute top-1/2 right-1/4 h-20 w-20 -rotate-45 bg-gradient-to-br from-orange-300/15 to-red-400/15" />
                </div>
                {/* Dark mode */}
                <div className="absolute inset-0 hidden overflow-hidden dark:block">
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage: `
                                linear-gradient(45deg, rgba(34, 197, 94, 0.15) 25%, transparent 25%),
                                linear-gradient(-45deg, rgba(59, 130, 246, 0.15) 25%, transparent 25%),
                                linear-gradient(45deg, transparent 75%, rgba(147, 51, 234, 0.15) 75%),
                                linear-gradient(-45deg, transparent 75%, rgba(236, 72, 153, 0.15) 75%)
                            `,
                            backgroundSize: '120px 120px',
                            backgroundPosition: '0 0, 0 60px, 60px -60px, -60px 0px'
                        }}
                    />
                    <div className="absolute top-16 left-16 h-40 w-40 rotate-45 bg-gradient-to-br from-emerald-500/20 to-teal-500/20" />
                    <div className="absolute top-32 right-40 h-32 w-32 -rotate-12 bg-gradient-to-br from-blue-500/15 to-indigo-500/15" />
                    <div className="absolute bottom-40 left-1/4 h-36 w-36 rotate-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
                    <div className="absolute top-1/2 right-1/3 h-24 w-24 -rotate-45 bg-gradient-to-br from-orange-500/10 to-red-500/10" />
                </div>
            </>
        ),
        dots: (
            <>
                {/* Light mode */}
                <div className="absolute inset-0 overflow-hidden dark:hidden">
                    <div
                        className="absolute inset-0 opacity-60"
                        style={{
                            backgroundImage: `
                                radial-gradient(circle, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
                                radial-gradient(circle, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                                radial-gradient(circle, rgba(147, 51, 234, 0.08) 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px, 60px 60px, 80px 80px',
                            backgroundPosition: '0 0, 20px 20px, 40px 40px'
                        }}
                    />
                    {animated && (
                        <>
                            <div className="absolute top-16 left-1/4 h-3 w-3 animate-bounce rounded-full bg-blue-400 opacity-60" />
                            <div
                                className="absolute top-1/3 right-1/3 h-2 w-2 animate-bounce rounded-full bg-emerald-400 opacity-50"
                                style={{ animationDelay: '0.5s' }}
                            />
                            <div
                                className="absolute bottom-1/3 left-1/2 h-2.5 w-2.5 animate-bounce rounded-full bg-purple-400 opacity-40"
                                style={{ animationDelay: '1s' }}
                            />
                            <div
                                className="absolute top-2/3 right-1/4 h-1.5 w-1.5 animate-bounce rounded-full bg-pink-400 opacity-45"
                                style={{ animationDelay: '1.5s' }}
                            />
                        </>
                    )}
                </div>
                {/* Dark mode */}
                <div className="absolute inset-0 hidden overflow-hidden dark:block">
                    <div
                        className="absolute inset-0 opacity-50"
                        style={{
                            backgroundImage: `
                                radial-gradient(circle, rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                                radial-gradient(circle, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
                                radial-gradient(circle, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: '50px 50px, 70px 70px, 90px 90px',
                            backgroundPosition: '0 0, 25px 25px, 50px 50px'
                        }}
                    />
                    {animated && (
                        <>
                            <div className="absolute top-20 left-1/3 h-2 w-2 animate-pulse rounded-full bg-emerald-400 opacity-70" />
                            <div
                                className="absolute top-1/2 right-1/4 h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 opacity-60"
                                style={{ animationDelay: '0.8s' }}
                            />
                            <div
                                className="absolute bottom-1/2 left-1/3 h-2.5 w-2.5 animate-pulse rounded-full bg-purple-400 opacity-50"
                                style={{ animationDelay: '1.6s' }}
                            />
                            <div
                                className="absolute top-3/4 right-1/3 h-1 w-1 animate-pulse rounded-full bg-pink-400 opacity-55"
                                style={{ animationDelay: '2.4s' }}
                            />
                        </>
                    )}
                </div>
            </>
        ),
        waves: (
            <>
                {/* Light mode */}
                <div className="absolute inset-0 overflow-hidden dark:hidden">
                    <div className="absolute inset-0 opacity-30">
                        <svg
                            className="h-full w-full"
                            viewBox="0 0 1200 800"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z"
                                fill="url(#wave1)"
                                opacity="0.6"
                            />
                            <path
                                d="M0,500 C400,400 800,600 1200,500 L1200,800 L0,800 Z"
                                fill="url(#wave2)"
                                opacity="0.4"
                            />
                            <path
                                d="M0,600 C500,500 1000,700 1200,600 L1200,800 L0,800 Z"
                                fill="url(#wave3)"
                                opacity="0.3"
                            />
                            <defs>
                                <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
                                </linearGradient>
                                <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
                                </linearGradient>
                                <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0.15" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    {animated && (
                        <>
                            <div className="absolute top-1/4 left-1/4 h-32 w-32 animate-spin rounded-full border-4 border-blue-300/30 border-t-transparent" />
                            <div
                                className="absolute top-1/2 right-1/3 h-24 w-24 animate-spin rounded-full border-4 border-emerald-300/25 border-t-transparent"
                                style={{ animationDirection: 'reverse' }}
                            />
                            <div className="absolute bottom-1/3 left-1/2 h-20 w-20 animate-spin rounded-full border-4 border-purple-300/20 border-t-transparent" />
                        </>
                    )}
                </div>
                {/* Dark mode */}
                <div className="absolute inset-0 hidden overflow-hidden dark:block">
                    <div className="absolute inset-0 opacity-40">
                        <svg
                            className="h-full w-full"
                            viewBox="0 0 1200 800"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0,350 C300,250 600,450 1200,350 L1200,800 L0,800 Z"
                                fill="url(#darkWave1)"
                                opacity="0.5"
                            />
                            <path
                                d="M0,450 C400,350 800,550 1200,450 L1200,800 L0,800 Z"
                                fill="url(#darkWave2)"
                                opacity="0.3"
                            />
                            <path
                                d="M0,550 C500,450 1000,650 1200,550 L1200,800 L0,800 Z"
                                fill="url(#darkWave3)"
                                opacity="0.2"
                            />
                            <defs>
                                <linearGradient id="darkWave1" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#22C55E" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#A855F7" stopOpacity="0.4" />
                                </linearGradient>
                                <linearGradient id="darkWave2" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
                                </linearGradient>
                                <linearGradient id="darkWave3" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0.2" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    {animated && (
                        <>
                            <div className="absolute top-1/3 left-1/3 h-36 w-36 animate-spin rounded-full border-4 border-emerald-500/30 border-t-transparent" />
                            <div
                                className="absolute top-1/2 right-1/4 h-28 w-28 animate-spin rounded-full border-4 border-blue-500/25 border-t-transparent"
                                style={{ animationDirection: 'reverse' }}
                            />
                            <div className="absolute bottom-1/4 left-1/3 h-24 w-24 animate-spin rounded-full border-4 border-purple-500/20 border-t-transparent" />
                        </>
                    )}
                </div>
            </>
        ),
        grid: (
            <>
                {/* Light mode */}
                <div className="absolute inset-0 overflow-hidden dark:hidden">
                    <div
                        className="absolute inset-0 opacity-50"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
                            `,
                            backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px'
                        }}
                    />
                    <div className="absolute top-16 left-16 h-8 w-8 bg-gradient-to-br from-blue-400/40 to-indigo-500/40" />
                    <div className="absolute top-32 right-32 h-6 w-6 bg-gradient-to-br from-emerald-400/35 to-teal-500/35" />
                    <div className="absolute bottom-32 left-1/3 h-7 w-7 bg-gradient-to-br from-purple-400/30 to-pink-500/30" />
                    <div className="absolute top-1/2 right-1/4 h-5 w-5 bg-gradient-to-br from-orange-400/25 to-red-500/25" />
                    <div className="absolute right-1/3 bottom-1/4 h-6 w-6 bg-gradient-to-br from-cyan-400/20 to-blue-500/20" />
                </div>
                {/* Dark mode */}
                <div className="absolute inset-0 hidden overflow-hidden dark:block">
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(34, 197, 94, 0.15) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(34, 197, 94, 0.15) 1px, transparent 1px),
                                linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px)
                            `,
                            backgroundSize: '25px 25px, 25px 25px, 120px 120px, 120px 120px'
                        }}
                    />
                    <div className="absolute top-20 left-20 h-10 w-10 bg-gradient-to-br from-emerald-500/40 to-teal-500/40" />
                    <div className="absolute top-40 right-40 h-8 w-8 bg-gradient-to-br from-blue-500/35 to-indigo-500/35" />
                    <div className="absolute bottom-40 left-1/4 h-9 w-9 bg-gradient-to-br from-purple-500/30 to-pink-500/30" />
                    <div className="absolute top-1/2 right-1/3 h-7 w-7 bg-gradient-to-br from-orange-500/25 to-red-500/25" />
                    <div className="absolute right-1/4 bottom-1/3 h-8 w-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />
                </div>
            </>
        ),
        stars: (
            <>
                {/* Light mode */}
                <div className="absolute inset-0 overflow-hidden dark:hidden">
                    <div className="absolute inset-0 opacity-60">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div
                                key={i}
                                className={`absolute h-1 w-1 rounded-full bg-blue-400 ${animated ? 'animate-twinkle' : ''}`}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: animated ? `${Math.random() * 3}s` : '0s',
                                    animationDuration: animated ? `${2 + Math.random() * 2}s` : '0s'
                                }}
                            />
                        ))}
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div
                                key={`emerald-${i}`}
                                className={`absolute h-0.5 w-0.5 rounded-full bg-emerald-400 ${animated ? 'animate-twinkle' : ''}`}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: animated ? `${Math.random() * 3}s` : '0s',
                                    animationDuration: animated
                                        ? `${1.5 + Math.random() * 2}s`
                                        : '0s'
                                }}
                            />
                        ))}
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={`purple-${i}`}
                                className={`absolute h-1.5 w-1.5 rounded-full bg-purple-400 ${animated ? 'animate-twinkle' : ''}`}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: animated ? `${Math.random() * 3}s` : '0s',
                                    animationDuration: animated
                                        ? `${2.5 + Math.random() * 2}s`
                                        : '0s'
                                }}
                            />
                        ))}
                    </div>
                    <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-gradient-to-br from-blue-200/30 to-indigo-300/30 blur-2xl" />
                    <div className="absolute top-1/2 right-1/3 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-200/25 to-teal-300/25 blur-2xl" />
                    <div className="absolute bottom-1/3 left-1/2 h-28 w-28 rounded-full bg-gradient-to-br from-purple-200/20 to-pink-300/20 blur-2xl" />
                </div>
                {/* Dark mode */}
                <div className="absolute inset-0 hidden overflow-hidden dark:block">
                    <div className="absolute inset-0 opacity-70">
                        {Array.from({ length: 25 }).map((_, i) => (
                            <div
                                key={i}
                                className={`absolute h-1 w-1 rounded-full bg-emerald-400 ${animated ? 'animate-twinkle' : ''}`}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: animated ? `${Math.random() * 3}s` : '0s',
                                    animationDuration: animated ? `${2 + Math.random() * 2}s` : '0s'
                                }}
                            />
                        ))}
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div
                                key={`blue-${i}`}
                                className={`absolute h-0.5 w-0.5 rounded-full bg-blue-400 ${animated ? 'animate-twinkle' : ''}`}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: animated ? `${Math.random() * 3}s` : '0s',
                                    animationDuration: animated
                                        ? `${1.5 + Math.random() * 2}s`
                                        : '0s'
                                }}
                            />
                        ))}
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div
                                key={`purple-${i}`}
                                className={`absolute h-1.5 w-1.5 rounded-full bg-purple-400 ${animated ? 'animate-twinkle' : ''}`}
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: animated ? `${Math.random() * 3}s` : '0s',
                                    animationDuration: animated
                                        ? `${2.5 + Math.random() * 2}s`
                                        : '0s'
                                }}
                            />
                        ))}
                    </div>
                    <div className="absolute top-1/3 left-1/3 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl" />
                    <div className="absolute top-1/2 right-1/4 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500/15 to-indigo-500/15 blur-3xl" />
                    <div className="absolute bottom-1/4 left-1/3 h-36 w-36 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl" />
                </div>
            </>
        ),
        circles: (
            <>
                {/* Light mode */}
                <div className="absolute inset-0 overflow-hidden dark:hidden">
                    <div className="absolute top-10 left-10 h-64 w-64 rounded-full border-2 border-blue-300/20" />
                    <div className="absolute top-20 left-20 h-48 w-48 rounded-full border-2 border-emerald-300/15" />
                    <div className="absolute top-32 left-32 h-32 w-32 rounded-full border-2 border-purple-300/10" />

                    <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full border-2 border-pink-300/18" />
                    <div className="absolute top-1/3 right-1/3 h-56 w-56 rounded-full border-2 border-orange-300/12" />
                    <div className="absolute top-1/2 right-1/2 h-40 w-40 rounded-full border-2 border-cyan-300/8" />

                    <div className="absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full border-2 border-indigo-300/16" />
                    <div className="absolute bottom-1/3 left-1/3 h-48 w-48 rounded-full border-2 border-teal-300/14" />
                    <div className="absolute bottom-1/2 left-1/2 h-24 w-24 rounded-full border-2 border-yellow-300/6" />

                    {animated && (
                        <>
                            <div className="absolute top-1/2 left-1/2 h-2 w-2 animate-ping rounded-full bg-blue-400 opacity-60" />
                            <div
                                className="absolute top-1/3 right-1/3 h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400 opacity-50"
                                style={{ animationDelay: '1s' }}
                            />
                            <div
                                className="absolute bottom-1/3 left-1/3 h-1 w-1 animate-ping rounded-full bg-purple-400 opacity-40"
                                style={{ animationDelay: '2s' }}
                            />
                        </>
                    )}
                </div>
                {/* Dark mode */}
                <div className="absolute inset-0 hidden overflow-hidden dark:block">
                    <div className="absolute top-16 left-16 h-80 w-80 rounded-full border-2 border-emerald-500/25" />
                    <div className="absolute top-24 left-24 h-56 w-56 rounded-full border-2 border-blue-500/20" />
                    <div className="absolute top-32 left-32 h-40 w-40 rounded-full border-2 border-purple-500/15" />

                    <div className="absolute top-1/3 right-1/3 h-96 w-96 rounded-full border-2 border-pink-500/22" />
                    <div className="absolute top-1/2 right-1/2 h-64 w-64 rounded-full border-2 border-orange-500/18" />
                    <div className="absolute top-2/3 right-2/3 h-48 w-48 rounded-full border-2 border-cyan-500/12" />

                    <div className="absolute bottom-1/3 left-1/3 h-88 w-88 rounded-full border-2 border-indigo-500/20" />
                    <div className="absolute bottom-1/2 left-1/2 h-56 w-56 rounded-full border-2 border-teal-500/16" />
                    <div className="absolute bottom-2/3 left-2/3 h-32 w-32 rounded-full border-2 border-yellow-500/10" />

                    {animated && (
                        <>
                            <div className="absolute top-1/2 left-1/2 h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400 opacity-70" />
                            <div
                                className="absolute top-1/3 right-1/3 h-2 w-2 animate-ping rounded-full bg-blue-400 opacity-60"
                                style={{ animationDelay: '1.2s' }}
                            />
                            <div
                                className="absolute bottom-1/3 left-1/3 h-1.5 w-1.5 animate-ping rounded-full bg-purple-400 opacity-50"
                                style={{ animationDelay: '2.4s' }}
                            />
                        </>
                    )}
                </div>
            </>
        )
    };

    return <div className={cn('absolute inset-0', className)}>{patterns[variant]}</div>;
}
