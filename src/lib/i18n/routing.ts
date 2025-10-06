import { DEFAULT_LANGUAGE, LOCALES } from '@/constants';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: LOCALES,
    defaultLocale: DEFAULT_LANGUAGE,
    localePrefix: 'as-needed'
});
