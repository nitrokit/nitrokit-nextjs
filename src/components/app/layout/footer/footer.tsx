'use client';

import { CompactThemeSwitcher } from '@/components/switchers';
import { DevelopedBy, Version } from '@/components/shared';

export function DashboardFooter() {
    return (
        <footer className="mx-4 mt-2 flex h-8 lg:ml-16">
            <div className="flex w-1/2 items-start justify-start">
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
