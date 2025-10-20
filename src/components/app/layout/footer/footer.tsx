'use client';

import { CompactThemeSwitcher } from '@/components/switchers';
import { DevelopedBy, Version } from '@/components/shared';

export function DashboardFooter() {
    return (
        <footer className="mt-2 mr-3 ml-16 flex h-8">
            <div className="flex w-1/2 items-center justify-start">
                <CompactThemeSwitcher />
            </div>
            <div className="flex w-1/2 items-center justify-end gap-4">
                <Version />
                <div className="bg-border h-4 w-px" />
                <DevelopedBy />
            </div>
        </footer>
    );
}
