'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import {
    ScrollArea,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { AppNavigationItems } from '@/constants/app';
import { APP_ROUTES } from '@/lib/auth/constants';
import { Logo } from '../header';
import HamburgerMenu from '@/components/icons/hamburger-menu';
import { useUser } from '@/contexts/user-context';
import { translateSafely, cn } from '@nitrokit/core/lib';

function isActiveRoute(pathname: string, href: string) {
    if (pathname === href) return true;
    if (href === APP_ROUTES.HOME && pathname === `${APP_ROUTES.HOME}/`) return true;
    if (href !== APP_ROUTES.HOME && pathname.startsWith(href)) return true;
    return false;
}

function getNavigationItems(userRole?: string) {
    if (userRole === 'Moderator') {
        return [...AppNavigationItems];
    }
    return AppNavigationItems;
}

export function MobileSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const { user } = useUser();
    if (!user) {
        return null;
    }
    const navigationItems = getNavigationItems(user.firstName!); // TODO: Replace with session.user.role

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <HamburgerMenu
                    variant="ghost"
                    size="icon"
                    className="mr-10 rounded-full hover:bg-white hover:shadow-sm md:hidden dark:hover:bg-zinc-800 [&_svg]:size-7"
                />
            </SheetTrigger>
            <SheetContent side="left" className="w-70">
                <SheetHeader className="text-left">
                    <SheetTitle className="flex items-center gap-2">
                        <Logo className="ml-2" />
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="mt-6 h-[calc(100vh-120px)]">
                    <div className="space-y-1">
                        {navigationItems.map((item) => {
                            const isActive = isActiveRoute(pathname, item.href);
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className={cn(
                                        'hover:border-primary/10 flex items-center gap-3 rounded-lg border border-transparent px-3 py-3 text-sm transition-all',
                                        isActive
                                            ? 'bg-primary/10 text-primary border-primary/10'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="text-sm font-medium">
                                        {translateSafely(t, item.key)}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
