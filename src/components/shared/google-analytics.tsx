'use client';

import Script from 'next/script';

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('consent', 'default', {
                            analytics_storage: 'denied',
                            ad_storage: 'denied',
                            ad_user_data: 'denied',
                            ad_personalization: 'denied',
                            wait_for_update: 500,
                        });
                        gtag('config', '${measurementId}');
                    `
                }}
            />
        </>
    );
}
