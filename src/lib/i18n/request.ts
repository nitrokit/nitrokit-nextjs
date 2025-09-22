import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

    const messageModules = await Promise.all([
        import(`../../../messages/${locale}/common.json`),
        import(`../../../messages/${locale}/app.json`),
        import(`../../../messages/${locale}/metadata.json`),
    ]);

    return {
        locale,
        messages: {
            common: messageModules[0].default,
            app: messageModules[1].default,
            metadata: messageModules[2].default,
        },
    };
});
