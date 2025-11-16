import { Metadata } from 'next';

import { generatePageMetadata } from '@nitrokit/core';
import { ScrollArea, Skeleton } from '@/components/ui';
import { AccountNavigation } from './components/account-navigation';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
    return await generatePageMetadata({
        params: Promise.resolve({
            title: 'Dashboard',
            description: 'This is the dashboard page'
        })
    });
}

export default function DashboardPage({
    searchParams: _searchParams
}: {
    searchParams: Promise<{
        tab?: string;
    }>;
}) {
    return (
        <div className="flex h-full flex-col">
            <AccountNavigation />

            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="px-4 py-6 lg:px-6">
                        <Suspense
                            fallback={
                                <div className="space-y-4">
                                    <Skeleton className="h-8 w-48" />
                                    <Skeleton className="h-96 w-full" />
                                </div>
                            }
                        >
                            Test
                        </Suspense>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
