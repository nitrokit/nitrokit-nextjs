'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils/cn';

type Line = {
    text: string;
    delay: number;
    className?: string;
};

// Terminalde görünecek satırların listesi
const terminalLines: Line[] = [
    { text: '$ nitrokit new amazing-app', delay: 1500 },
    { text: '> Which package manager would you like to use?', delay: 1000 },
    { text: 'pnpm', delay: 500, className: 'text-green-600 dark:text-green-400' },
    { text: 'Creating project "amazing-app"...', delay: 2000 },
    {
        text: 'Project "amazing-app" created successfully!',
        delay: 1000,
        className: 'text-green-600 dark:text-green-400'
    },
    { text: 'Next steps:', delay: 500 },
    { text: '  cd amazing-app', delay: 500, className: 'text-cyan-600 dark:text-cyan-400' },
    { text: '  pnpm install', delay: 500, className: 'text-cyan-600 dark:text-cyan-400' },
    { text: '  pnpm run dev', delay: 500, className: 'text-cyan-600 dark:text-cyan-400' },
    { text: 'Happy coding!', delay: 1000, className: 'text-yellow-600 dark:text-yellow-400' }
];

export function TerminalVisual() {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (currentLineIndex < terminalLines.length) {
            const timer = setTimeout(() => {
                setCurrentLineIndex((prev) => prev + 1);
            }, terminalLines[currentLineIndex].delay);
            return () => clearTimeout(timer);
        } else {
            setIsDone(true);
        }
    }, [currentLineIndex]);

    return (
        <Card
            className={cn(
                'relative min-h-fit w-full overflow-hidden bg-gray-50 text-slate-800 transition-colors',
                'dark:bg-slate-900 dark:text-slate-200',
                'font-mono text-sm'
            )}
        >
            <div className="flex flex-col space-y-2 p-6">
                {terminalLines.slice(0, currentLineIndex).map((line, index) => (
                    <pre key={index} className={cn('animate-fade-in-up', line.className)}>
                        {line.text}
                    </pre>
                ))}
                {!isDone && (
                    <div className="flex items-center">
                        <pre className="inline-block text-slate-800 dark:text-slate-200">
                            {terminalLines[currentLineIndex]?.text.split('').map((char, i) => (
                                <span
                                    key={i}
                                    className="animate-type-out opacity-0"
                                    style={{ animationDelay: `${i * 20}ms` }}
                                >
                                    {char}
                                </span>
                            ))}
                        </pre>
                        <span className="animate-blink ml-1 text-slate-800 dark:text-slate-200">
                            _
                        </span>
                    </div>
                )}
            </div>

            <style jsx global>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out;
                }
                @keyframes type-out {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                .animate-type-out {
                    animation-name: type-out;
                    animation-duration: 20ms;
                    animation-timing-function: ease-out;
                    animation-fill-mode: forwards;
                }
                @keyframes blink {
                    50% {
                        opacity: 0;
                    }
                }
                .animate-blink {
                    animation: blink 1s step-end infinite;
                }
            `}</style>
        </Card>
    );
}
