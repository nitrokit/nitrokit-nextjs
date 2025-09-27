import { ServiceWorkerRegister } from '@/components/shared/service-worker-register';
import { Toaster } from '@/components/ui';
import AnalyticsProvider from '@/providers/analytics-provider';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};
export default function RootLayout({ children }: Props) {
    return (
        <AnalyticsProvider>
            {children}
            <Toaster />
            <ServiceWorkerRegister />
        </AnalyticsProvider>
    );
}
