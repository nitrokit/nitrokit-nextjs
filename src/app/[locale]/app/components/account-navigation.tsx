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
    ChevronDown,
    Menu
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
            group flex cursor-pointer items-center gap-1 rounded-none 
            bg-transparent px-3 py-3.5 text-sm font-medium text-nowrap 
            outline-none select-none transition-all duration-200
            relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transition-all after:duration-200 ${
                isCurrentlyActive
                    ? 'text-primary after:bg-primary font-semibold'
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
            'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all',
            isCurrentlyActive
                ? 'bg-primary/10 text-primary border-l-4 border-primary'
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
            <div className="mx-auto flex w-full items-stretch justify-between gap-5 px-4 lg:px-6">
                {/* Desktop Navigation */}
                <div className="hidden md:grid">
                    <div className="kt-scrollable-x-auto flex items-stretch">
                        <Menubar className="flex h-auto items-stretch gap-5 space-x-0 rounded-none border-none bg-transparent p-0">
                            {/* Account Overview */}
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

                            {/* Profile */}
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

                            {/* Security */}
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
                                            className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <Shield className="h-4 w-4" />
                                            {t('navigation.password')}
                                        </Link>
                                    </MenubarItem>
                                    <MenubarItem asChild>
                                        <Link
                                            href={APP_ROUTES.SECURITY_2FA}
                                            className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            <Smartphone className="h-4 w-4" />
                                            {t('navigation.2fa')}
                                        </Link>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem asChild>
                                        <Link
                                            href={APP_ROUTES.SECURITY_SESSIONS}
                                            className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
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

                {/* Mobile Navigation */}
                <div className="flex w-full items-center justify-between md:hidden">
                    <div className="flex items-center gap-3">
                        <h1 className="text-foreground text-lg font-semibold">
                            {getCurrentPageTitle()}
                        </h1>
                    </div>

                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">{t('mobile.openMenu')}</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80 sm:w-80">
                            <SheetHeader className="text-left">
                                <SheetTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    {t('mobile.title')}
                                </SheetTitle>
                            </SheetHeader>

                            <ScrollArea className="mt-6 h-[calc(100vh-120px)]">
                                <div className="space-y-1">
                                    {/* Overview */}
                                    <Link
                                        href={APP_ROUTES.HOME}
                                        className={getMobileMenuItemClasses(APP_ROUTES.HOME)}
                                        onClick={handleMobileMenuClose}
                                    >
                                        <LayoutDashboard className="h-5 w-5" />
                                        <span>{t('navigation.overview')}</span>
                                    </Link>

                                    {/* Profile */}
                                    <Link
                                        href={APP_ROUTES.PROFILE}
                                        className={getMobileMenuItemClasses(APP_ROUTES.PROFILE)}
                                        onClick={handleMobileMenuClose}
                                    >
                                        <User className="h-5 w-5" />
                                        <span>{t('navigation.profile')}</span>
                                    </Link>

                                    {/* Security Section */}
                                    <div className="pt-2">
                                        <div className="px-3 py-2">
                                            <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                                                {t('navigation.security')}
                                            </h3>
                                        </div>
                                        <div className="space-y-1 pl-3">
                                            <Link
                                                href={APP_ROUTES.SECURITY_PASSWORD}
                                                className="hover:bg-muted hover:text-foreground text-muted-foreground flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all"
                                                onClick={handleMobileMenuClose}
                                            >
                                                <Shield className="h-4 w-4" />
                                                <span>{t('navigation.password')}</span>
                                            </Link>
                                            <Link
                                                href={APP_ROUTES.SECURITY_2FA}
                                                className="hover:bg-muted hover:text-foreground text-muted-foreground flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all"
                                                onClick={handleMobileMenuClose}
                                            >
                                                <Smartphone className="h-4 w-4" />
                                                <span>{t('navigation.2fa')}</span>
                                            </Link>
                                            <Link
                                                href={APP_ROUTES.SECURITY_SESSIONS}
                                                className="hover:bg-muted hover:text-foreground text-muted-foreground flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all"
                                                onClick={handleMobileMenuClose}
                                            >
                                                <Settings className="h-4 w-4" />
                                                <span>{t('navigation.sessions')}</span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Notifications */}
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
