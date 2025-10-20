'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { cn, translateSafely } from '@/lib';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    Button,
    Sheet,
    SheetContent,
    SheetTrigger
} from '@/components/ui';
import { Menu } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { APP_ROUTES } from '@/lib/auth/constants';
import { AppNavigationItems } from '@/constants/app';

function isActiveRoute(pathname: string, href: string) {
    if (pathname === href) return true;
    if (href === APP_ROUTES.HOME && pathname === `${APP_ROUTES.HOME}/`) return true;
    if (href !== APP_ROUTES.HOME && pathname.startsWith(href)) return true;
    return false;
}

function getNavigationItems(userRole?: string) {
    // userRole === 'Admin' ||
    if (userRole === 'Moderator') {
        return [...AppNavigationItems];
    }
    return AppNavigationItems;
}

function DesktopSidebar() {
    const pathname = usePathname();
    const t = useTranslations('app');
    const { data: session } = useSession();
    console.log(session);
    const navigationItems = getNavigationItems('Moderator');

    return (
        <TooltipProvider>
            <aside className="hidden w-16 flex-col bg-gray-100 md:flex dark:bg-zinc-900">
                <nav className="flex flex-1 flex-col items-center justify-start space-y-3 p-2">
                    {navigationItems.map((item) => {
                        const isActive = isActiveRoute(pathname, item.href);
                        const Icon = item.icon;

                        return (
                            <Tooltip key={item.key} delayDuration={300}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200',
                                            isActive
                                                ? 'bg-white text-blue-600 shadow-lg ring-2 ring-blue-100 dark:bg-zinc-800 dark:text-blue-400 dark:ring-blue-900/20'
                                                : 'text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-md dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={12}>
                                    <p>{translateSafely(t, item.key)}</p>
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </nav>
            </aside>
        </TooltipProvider>
    );
}

export function MobileSidebarTrigger() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const t = useTranslations('app');
    const { data: session } = useSession();
    console.log(session);

    const navigationItems = getNavigationItems('Moderator');

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 rounded-full hover:bg-white hover:shadow-sm md:hidden dark:hover:bg-zinc-800"
                >
                    <Menu className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
                <div className="flex h-full flex-col bg-white dark:bg-zinc-950">
                    <div className="flex h-12 items-center border-b border-gray-200 px-6 dark:border-zinc-800">
                        <Link href="/" className="group flex items-center space-x-4">
                            <div className="relative flex h-9 w-9 items-center justify-center">
                                <div
                                    className="absolute inset-0 bg-slate-900 transition-all duration-500 group-hover:bg-linear-to-br group-hover:from-blue-600 group-hover:to-purple-600 dark:bg-slate-100"
                                    style={{
                                        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
                                    }}
                                ></div>
                                <span className="relative z-10 text-lg font-bold text-white transition-all duration-300 group-hover:text-blue-100 dark:text-slate-900 dark:group-hover:text-white">
                                    N
                                </span>
                            </div>
                            <div className="hidden lg:block">
                                <span className="bg-linear-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-xl font-bold tracking-tight text-transparent transition-all duration-300 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300 dark:group-hover:from-blue-400 dark:group-hover:via-purple-400 dark:group-hover:to-pink-400">
                                    Nitrokit
                                </span>
                                <div className="h-0.5 w-0 bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
                            </div>
                        </Link>
                    </div>

                    <nav className="flex-1 space-y-2 px-4 pt-4">
                        {navigationItems.map((item) => {
                            const isActive = isActiveRoute(pathname, item.href);
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center space-x-3 rounded-xl px-3 py-2.5 transition-all duration-200',
                                        isActive
                                            ? 'border border-blue-100 bg-blue-50 text-blue-600 shadow-sm dark:border-blue-800/30 dark:bg-blue-900/20 dark:text-blue-400'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="text-sm font-medium">
                                        {translateSafely(t, item.key)}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export function DashboardSidebar() {
    return <DesktopSidebar />;
}
