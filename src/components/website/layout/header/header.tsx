'use client';

import { Navbar } from '@/components/website/navigation';
import { Logo } from '@/components/shared/';
import { CompactLocaleSwitcher } from '@/components/switchers';
import { useSession } from 'next-auth/react';
import { UserMenu } from '@/components/app';
import { useStickyNavbar } from '@nitrokit/core';

export function Header() {
    const { data: session, status } = useSession();
    console.log('Session-Status', session, status);
    const sticky = useStickyNavbar();
    return (
        <header
            className={`sticky top-0 left-0 z-49 w-full items-center px-3 ${
                sticky
                    ? 'border-stroke bg-white/80 shadow-md backdrop-blur-[5px] transition dark:bg-black/40'
                    : 'border-0 bg-transparent'
            }`}
        >
            <div className="mx-auto flex h-20 w-full flex-row items-center bg-transparent lg:w-7xl">
                <div className="text-foreground flex flex-row items-center justify-center gap-2">
                    <Logo />
                </div>
                <div className="hidden grow items-center justify-center lg:flex">
                    <Navbar />
                </div>
                <div className="flex grow flex-row items-center justify-end gap-2 lg:grow-0">
                    <CompactLocaleSwitcher />
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}
