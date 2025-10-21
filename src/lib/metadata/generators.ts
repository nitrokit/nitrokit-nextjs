import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';

import { LOCALES_FOR_METADATA } from '@/lib/utils';
import { env, getBaseUrl } from '@/lib';

/**
 * Generates the site metadata for the application.
 * @returns {Promise<Metadata>} The site
 */
export async function generateSiteMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const t = await getTranslations({ locale, namespace: 'common.metadata' });
    const baseUrl = getBaseUrl();

    const imageData = {
        images: [{ url: baseUrl + '/api/og' }]
    };

    return {
        metadataBase: new URL(baseUrl),
        generator: 'Nitrokit',
        applicationName: t('applicationName'),
        referrer: 'origin-when-cross-origin',
        authors: [
            {
                name: 'Nitrokit',
                url: 'https://nitrokit.tr'
            }
        ],
        creator: t('author'),
        publisher: t('author'),
        appleWebApp: {
            statusBarStyle: 'black-translucent',
            title: t('title'),
            capable: true,
            startupImage: [
                {
                    url: `${baseUrl}/images/apple-touch-startup-image.png`,
                    media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)'
                }
            ]
        },
        title: {
            default: t('title'),
            template: `%s - ${t('title')}`
        },
        description: t('description'),
        alternates: {
            canonical: baseUrl,
            languages: Object.fromEntries(
                LOCALES_FOR_METADATA().map((LOCALE) => [LOCALE.code, LOCALE.url])
            )
        },
        icons: {
            icon: `${baseUrl}/favicon.ico`
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
            creator: t('author'),
            ...imageData
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            url: baseUrl,
            siteName: t('title'),
            ...imageData
        },
        verification: {
            google: env.GOOGLE_SITE_VERIFICATION,
            yandex: env.YANDEX_VERIFICATION
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1
            }
        }
    };
}

/**
 * Generates the page metadata for a specific page.
 * @param params - The parameters containing the title and description.
 * @returns {Promise<Metadata>} The page
 */
export type PageMetaDataProps = Promise<{ title: string; description: string }>;

/**
 * @param params - The parameters containing the title and description.
 * @returns {Promise<Metadata>} The page
 * @description: This function generates the page metadata for a specific page.
 * It takes the title and description from the params and returns a Metadata object.
 * The metadata includes the title and description for the page.
 * It is used to set the metadata for the page in the Next.js application.
 * @example
 * const params = { title: 'My Page', description: 'This is my page' };
 * const metadata = await generatePageMetadata({ params });
 */
export async function generatePageMetadata({
    params
}: {
    params: PageMetaDataProps;
}): Promise<Metadata> {
    const { title, description } = await params;

    const baseMetadata = {
        title: title,
        description: description
    };

    return {
        ...baseMetadata
    };
}
