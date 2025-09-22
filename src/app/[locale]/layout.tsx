import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/lib/i18n/routing';

import '@/styles/globals.css';

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <head>
                <title>Nitrokit</title>
            </head>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
