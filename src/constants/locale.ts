import { getBaseUrl } from '@/lib';

const DEFAULT_LANGUAGE = 'en';

/**
 * List of locales supported by the application.
 * This is used to determine the language of the application.
 * The default locale is Turkish (tr).
 * The English locale is also supported (en).
 * The application will use the browser's language settings to determine the default locale.
 * @returns {string[]} An array of supported locales.
 */
const LOCALES = ['en', 'tr'];

/**
 * List of locales with their respective flags.
 * This is used to display the language selection in the UI.
 * The flag URLs are relative to the public directory.
 * For example, the flag for Turkish is located at /public/flags/tr.svg.
 * The flag for English is located at /public/flags/us.svg.
 * https://github.com/lipis/flag-icons
 * @returns {Array<{ id: string, name: string, flag: string }>}
 */
const LOCALES_WITH_FLAG = [
    { id: 'en', name: 'English', flag: '/images/flags/us.svg' },
    { id: 'tr', name: 'Türkçe', flag: '/images/flags/tr.svg' },
];

/**
 * This function returns the locales for metadata.
 * This is used to generate the metadata for the application.
 * The metadata is used to determine the language of the application.
 * The metadata is used in the middleware to redirect to the correct locale.
 * @returns {Array<{ [key: string]: string }>} An array of objects with the locale and its URL.
 */
function LOCALES_FOR_METADATA(): { [key: string]: string }[] {
    const baseUrl = getBaseUrl();
    return LOCALES.map((LOCALE) => {
        return {
            [LOCALE]: `${baseUrl}/${LOCALE}`,
        };
    });
}

export { LOCALES, LOCALES_WITH_FLAG, LOCALES_FOR_METADATA, DEFAULT_LANGUAGE };
