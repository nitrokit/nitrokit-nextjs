export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LANGUAGE: Locale = 'en';

export const LOCALES = ['en', 'tr'] as const;

export const LOCALE_CONFIG: Record<Locale, { name: string; flag: string; nativeName: string }> = {
    en: { name: 'English', flag: '/images/flags/us.svg', nativeName: 'English' },
    tr: { name: 'Turkish', flag: '/images/flags/tr.svg', nativeName: 'Türkçe' },
} as const;
