import { LOCALES, LOCALE_CONFIG, type Locale } from '@/constants/locale';

// Generate from config to avoid duplication
export const LOCALES_WITH_FLAG = LOCALES.map((locale) => ({
    id: locale,
    name: LOCALE_CONFIG[locale].nativeName,
    flag: LOCALE_CONFIG[locale].flag,
}));

// For metadata generation
export function LOCALES_FOR_METADATA(): { code: string; url: string }[] {
    const baseUrl =
        typeof window !== 'undefined'
            ? window.location.origin
            : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    return LOCALES.map((locale) => ({
        code: locale,
        url: `${baseUrl}/${locale}`,
    }));
}

// Utility functions for easy access
export const getLocaleName = (locale: Locale) => LOCALE_CONFIG[locale].name;
export const getLocaleNativeName = (locale: Locale) => LOCALE_CONFIG[locale].nativeName;
export const getLocaleFlag = (locale: Locale) => LOCALE_CONFIG[locale].flag;

// Bonus utility functions
export const isValidLocale = (locale: string): locale is Locale =>
    LOCALES.includes(locale as Locale);

// Returns the first locale as default
export const getDefaultLocale = () => LOCALES[0];

// Returns array of locale names, either native or English
export const getAllLocaleNames = (native = false) =>
    LOCALES.map((locale) => (native ? getLocaleNativeName(locale) : getLocaleName(locale)));
