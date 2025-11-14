'use client';

import { CompactThemeSwitcher } from '@/components/switchers';
import { CopyRight, DevelopedBy, Version } from '@/components/shared';

export function DashboardFooter() {
    return (
        <footer className="mt-2 mr-5 flex h-8 lg:ml-16">
            <div className="flex w-1/2 items-center justify-start gap-4">
                <CompactThemeSwitcher
                    className={
                        'border-border/30 bg-background/90 ml-4 rounded-lg border p-1 shadow-xs backdrop-blur-sm lg:ml-0'
                    }
                />
                <CopyRight className="text-muted-foreground hidden text-xs lg:block" />
            </div>
            <div className="flex w-1/2 items-center justify-end gap-2 lg:gap-4">
                <Version />
                <div className="bg-border h-4 w-px" />
                <DevelopedBy />
            </div>
        </footer>
    );
}
