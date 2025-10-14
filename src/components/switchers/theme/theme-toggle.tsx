'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/comp/ui';

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 rounded-full hover:bg-white hover:shadow-sm dark:hover:bg-zinc-800"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
    );
}
