'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Theme } from '@radix-ui/themes';

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const defaultProps = {
        attribute: 'class' as const,
        defaultTheme: 'system' as const,
        enableSystem: true,
        storageKey: 'nitrokit-theme'
    };

    const mergedProps = { ...defaultProps, ...props };

    return (
        <NextThemesProvider {...mergedProps}>
            <Theme>{children}</Theme>
        </NextThemesProvider>
    );
}
