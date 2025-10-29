'use client';

import { usePathname, Link } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
    LayoutDashboard,
    User,
    Shield,
    Smartphone,
    Bell,
    Settings,
    ChevronDown
} from 'lucide-react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
    Button,
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    ScrollArea
} from '@/components/ui';
import { cn } from '@/lib';
import { APP_ROUTES } from '@/lib/auth/constants';
import HamburgerMenu from '@/components/icons/hamburger-menu';

export function AccountNavigation() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const t = useTranslations('app');

    const isActive = (path: string) => {
        if (path === APP_ROUTES.HOME) {
            return pathname === APP_ROUTES.HOME;
        }
        if (path === APP_ROUTES.PROFILE) {
            return pathname.includes(APP_ROUTES.PROFILE);
        }
        if (path === APP_ROUTES.SECURITY) {
            return pathname.includes(APP_ROUTES.SECURITY);
        }
        if (path === APP_ROUTES.NOTIFICATIONS) {
            return pathname.includes(APP_ROUTES.NOTIFICATIONS);
        }
        return false;
    };

    const getNavItemClasses = (path: string) => {
        const isCurrentlyActive = isActive(path);

        return `
            group flex items-center gap-1 rounded-none 
            bg-transparent px-2 py-3 text-sm text-nowrap
            outline-none select-none transition-all duration-200
            relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transition-all after:duration-200 ${
                isCurrentlyActive
                    ? 'text-primary after:bg-primary'
                    : 'text-muted-foreground after:bg-transparent hover:text-foreground'
            }
            hover:bg-transparent focus:bg-transparent 
            data-[state=open]:bg-transparent data-[state=open]:text-foreground
        `
            .replace(/\s+/g, ' ')
            .trim();
    };

    const getMobileMenuItemClasses = (path: string) => {
        const isCurrentlyActive = isActive(path);

        return cn(
            'flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all hover:border-primary/10 border border-transparent',
            isCurrentlyActive
                ? 'bg-primary/10 text-primary border-primary/10'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        );
    };

    const handleMobileMenuClose = () => {
        setIsMobileMenuOpen(false);
    };

    const getCurrentPageTitle = () => {
        if (isActive(APP_ROUTES.HOME)) return t('navigation.overview');
        if (isActive(APP_ROUTES.PROFILE)) return t('navigation.profile');
        if (isActive(APP_ROUTES.SECURITY)) return t('navigation.security');
        if (isActive(APP_ROUTES.NOTIFICATIONS)) return t('navigation.notifications');
        return t('navigation.overview');
    };

    return (
        <div className="sticky top-0 z-10 rounded-t-2xl border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-zinc-950">
            <div className="mx-auto flex w-full items-stretch justify-between gap-3 px-4 lg:px-5">
                <div className="hidden md:grid">
                    <div className="flex items-stretch">
                        <Menubar className="flex h-auto items-stretch gap-3 space-x-0 rounded-none border-none bg-transparent p-0">
                            <MenubarMenu>
                                <MenubarTrigger asChild>
                                    <Link
                                        href={APP_ROUTES.HOME}
                                        className={getNavItemClasses(APP_ROUTES.HOME)}
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        {t('navigation.overview')}
                                    </Link>
                                </MenubarTrigger>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger asChild>
                                    <Link
                                        href={APP_ROUTES.PROFILE}
                                        className={getNavItemClasses(APP_ROUTES.PROFILE)}
                                    >
                                        <User className="h-4 w-4" />
                                        {t('navigation.profile')}
                                    </Link>
                                </MenubarTrigger>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className={getNavItemClasses(APP_ROUTES.SECURITY)}>
                                    <Shield className="h-4 w-4" />
                                    {t('navigation.security')}
                                    <ChevronDown className="ms-auto size-3.5" />
                                </MenubarTrigger>
                                <MenubarContent className="bg-white dark:bg-zinc-950">
                                    <MenubarItem asChild>
                                        <Link
                                            href={APP_ROUTES.SECURITY_PASSWORD}
                                            className="flex items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <Shield className="h-4 w-4" />
                                            {t('navigation.password')}
                                        </Link>
                                    </MenubarItem>
                                    <MenubarItem asChild>
                                        <Link
                                            href={APP_ROUTES.SECURITY_2FA}
                                            className="flex items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <Smartphone className="h-4 w-4" />
                                            {t('navigation.2fa')}
                                        </Link>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem asChild>
                                        <Link
                                            href={APP_ROUTES.SECURITY_SESSIONS}
                                            className="flex items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <Settings className="h-4 w-4" />
                                            {t('navigation.sessions')}
                                        </Link>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger asChild>
                                    <Link
                                        href={APP_ROUTES.NOTIFICATIONS}
                                        className={getNavItemClasses(APP_ROUTES.NOTIFICATIONS)}
                                    >
                                        <Bell className="mr-2 h-4 w-4" />
                                        {t('navigation.notifications')}
                                    </Link>
                                </MenubarTrigger>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>
                <div className="flex w-full items-center justify-between px-1 py-2 md:hidden">
                    <div className="flex items-center gap-3">
                        <h1 className="text-foreground text-lg font-semibold">
                            {getCurrentPageTitle()}
                        </h1>
                    </div>
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <HamburgerMenu variant="ghost" size="sm" icon="dots" className="px-1" />
                        </SheetTrigger>
                        <SheetContent side="right" className="w-70">
                            <SheetHeader className="text-left">
                                <SheetTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    {t('mobile.title')}
                                </SheetTitle>
                            </SheetHeader>
                            <ScrollArea className="mt-6 h-[calc(100vh-120px)]">
                                <div className="space-y-1">
                                    <Link
                                        href={APP_ROUTES.HOME}
                                        className={getMobileMenuItemClasses(APP_ROUTES.HOME)}
                                        onClick={handleMobileMenuClose}
                                    >
                                        <LayoutDashboard className="h-5 w-5" />
                                        <span>{t('navigation.overview')}</span>
                                    </Link>
                                    <Link
                                        href={APP_ROUTES.PROFILE}
                                        className={getMobileMenuItemClasses(APP_ROUTES.PROFILE)}
                                        onClick={handleMobileMenuClose}
                                    >
                                        <User className="h-5 w-5" />
                                        <span>{t('navigation.profile')}</span>
                                    </Link>
                                    <div className="pt-2">
                                        <div className="px-3 py-2">
                                            <h3 className="text-muted-foreground text-xs tracking-wider uppercase">
                                                {t('navigation.security')}
                                            </h3>
                                        </div>
                                        <div className="space-y-1 pl-3">
                                            <Link
                                                href={APP_ROUTES.SECURITY_PASSWORD}
                                                className={getMobileMenuItemClasses(
                                                    APP_ROUTES.SECURITY_PASSWORD
                                                )}
                                                onClick={handleMobileMenuClose}
                                            >
                                                <Shield className="h-4 w-4" />
                                                <span>{t('navigation.password')}</span>
                                            </Link>
                                            <Link
                                                href={APP_ROUTES.SECURITY_2FA}
                                                className={getMobileMenuItemClasses(
                                                    APP_ROUTES.SECURITY_2FA
                                                )}
                                                onClick={handleMobileMenuClose}
                                            >
                                                <Smartphone className="h-4 w-4" />
                                                <span>{t('navigation.2fa')}</span>
                                            </Link>
                                            <Link
                                                href={APP_ROUTES.SECURITY_SESSIONS}
                                                className={getMobileMenuItemClasses(
                                                    APP_ROUTES.SECURITY_PASSWORD
                                                )}
                                                onClick={handleMobileMenuClose}
                                            >
                                                <Settings className="h-4 w-4" />
                                                <span>{t('navigation.sessions')}</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <Link
                                        href={APP_ROUTES.NOTIFICATIONS}
                                        className={getMobileMenuItemClasses(
                                            APP_ROUTES.NOTIFICATIONS
                                        )}
                                        onClick={handleMobileMenuClose}
                                    >
                                        <Bell className="h-5 w-5" />
                                        <span>{t('navigation.notifications')}</span>
                                    </Link>
                                </div>
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
}
