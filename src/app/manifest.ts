import { getLocale, getTranslations } from 'next-intl/server';
import { getLangDir } from 'rtl-detect';
import { getBaseUrl } from '@/lib';
import type { MetadataRoute } from 'next';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
    const baseUrl = getBaseUrl();
    const locale = await getLocale();
    const direction = getLangDir(locale);
    const t = await getTranslations({ locale, namespace: 'app' });

    const manifest = {
        id: 'nitrokit',
        name: t('name'),
        short_name: t('shortName'),
        description: t('description'),
        start_url: `${baseUrl}/`,
        display: 'standalone',
        dir: direction,
        lang: locale,
        scope: baseUrl,
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#6FBDFF',
        icons: [
            {
                src: `${baseUrl}/images/favicon/android-chrome-192x192.png`,
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: `${baseUrl}/images/favicon/android-chrome-512x512.png`,
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        screenshots: [
            {
                form_factor: 'wide',
                src: `${baseUrl}/screenshots/screenshot-1.png`,
                label: 'Home',
                sizes: '1920x871',
            },
            {
                form_factor: 'wide',
                src: `${baseUrl}/screenshots/screenshot-2.png`,
                label: 'About',
                sizes: '1920x871',
            },
            {
                form_factor: 'wide',
                src: `${baseUrl}/screenshots/screenshot-3.png`,
                label: 'Pricing',
                sizes: '1920x871',
            },
            {
                form_factor: 'wide',
                src: `${baseUrl}/screenshots/screenshot-4.png`,
                label: 'Contact',
                sizes: '1920x871',
            },
            {
                form_factor: 'wide',
                src: `${baseUrl}/screenshots/screenshot-5.png`,
                label: 'Login',
                sizes: '1920x871',
            },
        ],
        gcm_sender_id: '103953800507',
    };
    return manifest as any;
}
