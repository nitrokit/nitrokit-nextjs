import '@/styles/globals.css';

import { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/lib/i18n/routing';
import { generateSiteMetadata } from '@/lib';
import { lexend, montserrat } from '@/constants/fonts';
import { getLangDir } from 'rtl-detect';
import { ThemeProvider } from '@/providers/theme-provider';
import { CookieConsent } from '@/components/shared';
import { TooltipProvider } from '@/components/ui';
import { SessionProvider } from 'next-auth/react';
import { UserProvider } from '@/contexts/user-context';

export async function generateMetadata(): Promise<Metadata> {
    return await generateSiteMetadata();
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
};

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const direction = getLangDir(locale);
    const messages = await getMessages();

    return (
        <html
            lang={locale}
            dir={direction}
            suppressHydrationWarning={true}
            className="scroll-smooth"
        >
            <body
                className={`${lexend.variable} ${montserrat.variable} font-[family-name:var(--font-lexend)] antialiased`}
            >
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <SessionProvider>
                        <UserProvider>
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="system"
                                enableSystem
                                disableTransitionOnChange
                            >
                                <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
                                <CookieConsent />
                            </ThemeProvider>
                        </UserProvider>
                    </SessionProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
