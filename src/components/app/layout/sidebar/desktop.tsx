'use client';

import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui';
import { cn, translateSafely } from '@/lib/utils';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { APP_ROUTES } from '@/lib/auth/constants';
import { AppNavigationItems } from '@/constants/app';

function isActiveRoute(pathname: string, href: string) {
    console.log('Pathname', pathname);
    console.log('Href', href);

    if (pathname === href) return true;
    if (href === APP_ROUTES.HOME && pathname === `${APP_ROUTES.HOME}/`) return true;
    if (href === APP_ROUTES.HOME && pathname.startsWith(APP_ROUTES.ACCOUNT)) return true;
    if (href !== APP_ROUTES.HOME && pathname.startsWith(href)) return true;
    return false;
}

function getNavigationItems(userRole?: string) {
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

    const navigationItems = getNavigationItems('Moderator'); // TODO: Replace with session.user.role

    return (
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
                                            ? 'bg-white text-blue-600 shadow-xs ring-1 ring-blue-100 dark:bg-zinc-800 dark:text-blue-400 dark:ring-blue-900/20'
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
    );
}

export function DashboardSidebar() {
    return <DesktopSidebar />;
}
