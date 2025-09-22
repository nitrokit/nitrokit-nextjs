import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Analytics />
            <SpeedInsights />
        </>
    );
}
