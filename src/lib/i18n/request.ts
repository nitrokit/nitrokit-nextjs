import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

    const messageModules = await Promise.all([
        import(`../../../messages/${locale}/about.json`),
        import(`../../../messages/${locale}/app.json`),
        import(`../../../messages/${locale}/auth.json`),
        import(`../../../messages/${locale}/common.json`),
        import(`../../../messages/${locale}/contact.json`),
        import(`../../../messages/${locale}/home.json`),
        import(`../../../messages/${locale}/metadata.json`),
        import(`../../../messages/${locale}/pricing.json`),
        import(`../../../messages/${locale}/services.json`),
        import(`../../../messages/${locale}/navigation.json`),
    ]);

    return {
        locale,
        messages: {
            about: messageModules[0].default,
            app: messageModules[1].default,
            auth: messageModules[2].default,
            common: messageModules[3].default,
            contact: messageModules[4].default,
            home: messageModules[5].default,
            metadata: messageModules[6].default,
            pricing: messageModules[7].default,
            services: messageModules[8].default,
            navigation: messageModules[9].default,
        },
    };
});
