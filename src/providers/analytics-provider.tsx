'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { GoogleAnalytics } from '@/components/shared/google-analytics';

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    const { canUseAnalytics, canUseFunctional, isLoading } = useCookieConsent();
    const googleAnalyticsId = process.env.GOOGLE_ANALYTICS;

    if (isLoading) {
        return <>{children}</>;
    }

    return (
        <>
            {children}
            {canUseAnalytics && <Analytics />}
            {canUseFunctional && <SpeedInsights />}
            {canUseAnalytics && googleAnalyticsId && (
                <GoogleAnalytics measurementId={googleAnalyticsId} />
            )}
        </>
    );
}
