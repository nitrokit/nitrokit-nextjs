'use client';

import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AccountNavigation } from '../components/account-navigation';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
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
                            {children}
                        </Suspense>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
