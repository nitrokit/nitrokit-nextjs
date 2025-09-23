'use client';

import React from 'react';
import { CompactThemeSwitcher } from '@/components/switchers';
import { Version, DevelopedBy } from '@/components/shared';
import { Heart as IconHeart } from 'lucide-react';

export function Footer() {
    return (
        <footer className="my-10 flex w-full flex-col items-center justify-center lg:mx-auto lg:w-7xl">
            <div className="relative">
                <section className="flex flex-col items-center justify-between gap-4 py-3 md:flex-row">
                    <div className="text-muted-foreground flex items-center gap-1 text-sm">
                        <span>© 2024 Nitrokit. Tüm hakları saklıdır.</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            Made with <IconHeart className="h-3 w-3 fill-red-500 text-red-500" /> in
                            Turkey
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <CompactThemeSwitcher />
                        <div className="bg-border h-4 w-px" />
                        <Version />
                        <div className="bg-border h-4 w-px" />
                        <DevelopedBy />
                    </div>
                </section>
            </div>
        </footer>
    );
}
