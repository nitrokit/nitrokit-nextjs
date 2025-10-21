import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

    const messageModules = await Promise.all([
        import(`../../../messages/${locale}/website/about.json`),
        import(`../../../messages/${locale}/app/app.json`),
        import(`../../../messages/${locale}/auth.json`),
        import(`../../../messages/${locale}/validations.json`),
        import(`../../../messages/${locale}/website/contact.json`),
        import(`../../../messages/${locale}/website/home.json`),
        import(`../../../messages/${locale}/website/pricing.json`),
        import(`../../../messages/${locale}/website/faq.json`),
        import(`../../../messages/${locale}/email.json`),
        import(`../../../messages/${locale}/common.json`)
    ]);

    return {
        locale,
        messages: {
            about: messageModules[0].default,
            app: messageModules[1].default,
            auth: messageModules[2].default,
            validations: messageModules[3].default,
            contact: messageModules[4].default,
            home: messageModules[5].default,
            pricing: messageModules[6].default,
            faq: messageModules[7].default,
            email: messageModules[8].default,
            common: messageModules[9].default
        }
    };
});
