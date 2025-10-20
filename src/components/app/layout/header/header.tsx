'use client';

import { ReactNode } from 'react';
import { Logo, MobileSidebar, UserMenu } from '@/components/app';

interface DashboardHeaderProps {
    children?: ReactNode;
}

export function DashboardHeader({ children }: DashboardHeaderProps) {
    return (
        <header className="flex h-15 w-full items-center justify-between bg-gray-100 px-4 dark:bg-zinc-900">
            <div className="flex items-center space-x-4">
                <MobileSidebar />
                <Logo />
                <div className="hidden md:block">{children}</div>
            </div>
            <div className="mr-1 flex items-center space-x-2">
                {/* Notifications */}
                <UserMenu />
            </div>
        </header>
    );
}
