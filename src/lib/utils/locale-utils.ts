import { LOCALES, LOCALE_CONFIG, type Locale } from '@/constants';

export const LOCALES_WITH_FLAG = LOCALES.map((locale) => ({
    id: locale,
    name: LOCALE_CONFIG[locale].nativeName,
    flag: LOCALE_CONFIG[locale].flag
}));

export function LOCALES_FOR_METADATA(): { code: string; url: string }[] {
    const baseUrl =
        typeof window !== 'undefined'
            ? window.location.origin
            : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    return LOCALES.map((locale) => ({
        code: locale,
        url: `${baseUrl}/${locale}`
    }));
}

export const getLocaleName = (locale: Locale) => LOCALE_CONFIG[locale].name;
export const getLocaleNativeName = (locale: Locale) => LOCALE_CONFIG[locale].nativeName;
export const getLocaleFlag = (locale: Locale) => LOCALE_CONFIG[locale].flag;

export const isValidLocale = (locale: string): locale is Locale =>
    LOCALES.includes(locale as Locale);

export const getDefaultLocale = () => LOCALES[0];

export const getAllLocaleNames = (native = false) =>
    LOCALES.map((locale) => (native ? getLocaleNativeName(locale) : getLocaleName(locale)));
