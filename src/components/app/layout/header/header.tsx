'use client';

import { ReactNode } from 'react';
import { Logo, MobileSidebar, UserMenu } from '@/components/app';
import { CompactLocaleSwitcher } from '@/components/switchers';

interface DashboardHeaderProps {
    children?: ReactNode;
}

export function DashboardHeader({ children }: DashboardHeaderProps) {
    return (
        <header className="flex h-(--header-height) w-full items-center justify-between px-4">
            <div className="ml-3 flex items-center space-x-4">
                <MobileSidebar />
                <Logo />
                {children}
            </div>
            <div className="mr-1 flex items-center space-x-2">
                <CompactLocaleSwitcher />
                <UserMenu />
            </div>
        </header>
    );
}
