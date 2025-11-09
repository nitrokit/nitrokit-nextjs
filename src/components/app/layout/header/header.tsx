'use client';

import { ReactNode } from 'react';
import { Logo, UserMenu } from '@/components/app';
import { CompactLocaleSwitcher } from '@/components/switchers';

interface DashboardHeaderProps {
    children?: ReactNode;
}

export function DashboardHeader({ children }: DashboardHeaderProps) {
    return (
        <header className="flex h-(--header-height) w-full items-center justify-between px-4">
            <div className="flex items-center space-x-4">
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
