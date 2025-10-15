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
                'relative h-full w-full overflow-hidden border font-mono text-sm',
                'bg-gray-50 text-slate-800 transition-colors dark:bg-slate-900 dark:text-slate-200'
            )}
        >
            {/* Arkaplan Animasyonu */}
            <div className="absolute inset-0 z-0">
                <div className="bg-grid-lines animate-flow-down h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white dark:to-slate-900" />
            </div>

            {/* Terminal İçeriği */}
            <div className="relative z-10 flex h-full flex-col space-y-2 p-6">
                <div className="flex-1 overflow-auto">
                    {terminalLines.slice(0, currentLineIndex).map((line, index) => (
                        <pre key={index} className={cn('animate-fade-in-up', line.className)}>
                            {line.text}
                        </pre>
                    ))}
                    {!isDone && (
                        <div className="flex items-center">
                            <pre className="inline-block">
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
                            <span className="animate-blink ml-1">_</span>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
