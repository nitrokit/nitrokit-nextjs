'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProgressData {
    percentage: number;
    totalTasks: number;
    completedTasks: number;
    backlogTasks: number;
    inProgressTasks?: number;
    todoTasks?: number;
    projectTitle?: string;
    lastUpdated: string;
    source: 'github-projects' | 'fallback';
}

export default function UnderDevelopmentPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [progress, setProgress] = useState<ProgressData>({
        percentage: 1,
        totalTasks: 0,
        completedTasks: 0,
        backlogTasks: 0,
        lastUpdated: new Date().toISOString(),
        source: 'fallback',
    });

    // Progress data'sını API'den çek
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                console.log('Fetching progress data...');
                const response = await fetch('/api/progress');
                console.log('Progress API response status:', response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log('Progress API data:', data);
                    setProgress(data);
                } else {
                    console.log('Progress API failed with status:', response.status);
                    const errorText = await response.text();
                    console.log('Error response:', errorText);
                }
            } catch (error) {
                console.log('Progress API error:', error);
            }
        };

        fetchProgress();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                setMessage(data.message);
                setEmail('');
            } else {
                setIsSuccess(false);
                setMessage(data.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setIsSuccess(false);
            setMessage('Network error. Please try again.');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-40">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                        backgroundRepeat: 'repeat',
                    }}
                ></div>
            </div>

            <div className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    {/* Main Icon */}
                    <div className="mb-8">
                        <Image
                            src="/images/logos/nitrokit.png"
                            alt="Nitrokit Logo"
                            width={96}
                            height={96}
                            className="mx-auto h-24 w-24"
                        />
                    </div>

                    {/* Main Heading */}
                    <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Under Development
                    </h1>

                    {/* Subtitle */}
                    <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-300 sm:text-2xl">
                        We&#39;re crafting something amazing for you. Our team is working hard to
                        bring you an exceptional experience.
                    </p>

                    {/* Features Tags */}
                    <div className="mx-auto mb-10 flex max-w-lg flex-wrap justify-center gap-3">
                        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                            <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                            <span className="text-sm font-medium text-white">Lightning Fast</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                            <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                            <span className="text-sm font-medium text-white">User Focused</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                            <div className="h-2 w-2 rounded-full bg-green-400"></div>
                            <span className="text-sm font-medium text-white">Secure</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mx-auto mb-8 max-w-md">
                        <div className="mb-2 flex justify-between text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                                <span>Development Progress</span>
                                {progress.source === 'github-projects' && (
                                    <span className="flex items-center gap-1 text-xs text-green-400">
                                        <svg
                                            className="h-3 w-3"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Live Project
                                    </span>
                                )}
                            </div>
                            <span>{progress.percentage}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-700">
                            <div
                                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out"
                                style={{ width: `${progress.percentage}%` }}
                            ></div>
                        </div>
                        <div className="mt-2 flex justify-between text-xs text-gray-400">
                            <span>
                                Done: {progress.completedTasks} • Backlog: {progress.backlogTasks}
                            </span>
                            <span>{progress.totalTasks} total tasks</span>
                        </div>
                    </div>

                    {/* Email Newsletter Signup */}
                    <div className="text-gray-300">
                        <p className="mb-6 text-lg">Want to get notified when we launch?</p>

                        <form onSubmit={handleSubmit} className="mx-auto max-w-md">
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                    disabled={isLoading}
                                    className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            <span>Subscribing...</span>
                                        </div>
                                    ) : (
                                        'Notify Me'
                                    )}
                                </button>
                            </div>

                            {message && (
                                <div
                                    className={`mt-4 rounded-lg p-3 text-sm ${
                                        isSuccess
                                            ? 'border border-green-500/30 bg-green-500/20 text-green-300'
                                            : 'border border-red-500/30 bg-red-500/20 text-red-300'
                                    }`}
                                >
                                    {message}
                                </div>
                            )}
                        </form>

                        <p className="mt-4 text-sm text-gray-400">
                            We&#39;ll only send you updates about our launch. No spam, ever.
                        </p>
                    </div>

                    {/* Animated Dots */}
                    <div className="mt-12 flex justify-center space-x-2">
                        <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500"></div>
                        <div
                            className="h-3 w-3 animate-pulse rounded-full bg-purple-500"
                            style={{ animationDelay: '0.2s' }}
                        ></div>
                        <div
                            className="h-3 w-3 animate-pulse rounded-full bg-blue-500"
                            style={{ animationDelay: '0.4s' }}
                        ></div>
                    </div>

                    {/* Footer */}
                    <div className="mt-16 border-t border-white/10 pt-8">
                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <span>© 2025 Nitrokit</span>
                                <span className="hidden sm:inline">•</span>
                                <a
                                    href="https://nitrokit.tr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 transition-colors hover:text-blue-300"
                                >
                                    nitrokit.tr
                                </a>
                                <span className="hidden sm:inline">•</span>
                                <a
                                    href="https://github.com/nitrokit"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-gray-400 transition-colors hover:text-white"
                                    title="Visit our GitHub"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    <span>GitHub</span>
                                </a>
                            </div>
                            <div className="text-xs text-gray-500">
                                Built with Next.js & TypeScript
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
