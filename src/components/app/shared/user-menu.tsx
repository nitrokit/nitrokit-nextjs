'use client';

import {
    CircleUserRound,
    HeartHandshake,
    ReceiptText,
    User,
    Shield,
    Bell,
    Key,
    Smartphone,
    Monitor,
    ChevronRight,
    LucideIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { useHotkeys } from '@/hooks/useHotkeys';
import { useUser } from '@/contexts/user-context';
import { SignOutButton, SignInButton, SignUpButton } from '@/components/auth';

import { cn } from '@/lib';
import { useRouter } from '@/lib/i18n/navigation';
import { APP_ROUTES } from '@/lib/auth/constants';
import { Spinner } from '@radix-ui/themes';
import { UserAvatar } from './user-avatar';

interface UserMenuProps {
    size?: string;
}

interface MenuItemProps {
    icon: LucideIcon;
    children: React.ReactNode;
    onClick?: () => void;
    shortcut?: string;
    className?: string;
}

export function UserMenu({ size = 'size-10' }: UserMenuProps) {
    const { user, isLoading } = useUser();
    const [open, setOpen] = React.useState(false);
    const [securityOpen, setSecurityOpen] = React.useState(false);
    const router = useRouter();

    const t = useTranslations('app');

    const handleNavigation = React.useCallback(
        (route: string) => {
            setOpen(false);
            setSecurityOpen(false);
            router.push(route);
        },
        [router]
    );

    const shortcuts = React.useMemo(
        () => [
            {
                key: 'e',
                metaKey: true,
                action: () => {
                    setOpen((prevOpen) => !prevOpen);
                }
            },
            {
                key: 'j',
                metaKey: true,
                action: () => {
                    handleNavigation(APP_ROUTES.HOME);
                }
            },
            {
                key: 'p',
                metaKey: true,
                action: () => {
                    handleNavigation(APP_ROUTES.ACCOUNT);
                }
            },
            {
                key: 's',
                metaKey: true,
                action: () => {
                    handleNavigation(APP_ROUTES.ACCOUNT);
                }
            }
        ],
        [handleNavigation]
    );

    useHotkeys(shortcuts, [shortcuts]);

    const getDisplayName = () => {
        if (user?.firstName && user?.lastName) {
            return `${user.firstName} ${user.lastName}`;
        }
        return user?.name || t('user.defaultUserName');
    };

    const MenuItem = ({
        icon: Icon,
        children,
        onClick,
        shortcut,
        className = ''
    }: MenuItemProps) => (
        <button
            onClick={onClick}
            className={cn(
                'flex w-full items-center gap-2.5 px-2.5 py-1.5 text-xs transition-colors hover:bg-gray-100 dark:hover:bg-gray-800',
                className
            )}
        >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">{children}</span>
            {shortcut && (
                <span className="text-xs text-gray-500 dark:text-gray-400">{shortcut}</span>
            )}
        </button>
    );

    const SecurityMenuItem = () => (
        <Popover open={securityOpen} onOpenChange={setSecurityOpen}>
            <PopoverTrigger asChild>
                <button className="flex w-full items-center gap-2.5 px-2.5 py-1.5 text-xs transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Shield className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left">{t('user.menu.security.title')}</span>
                    <ChevronRight className="h-4 w-4 shrink-0" />
                </button>
            </PopoverTrigger>
            <PopoverContent side="right" align="start" className="w-52 p-1.5" sideOffset={8}>
                <div className="space-y-0.5">
                    <MenuItem icon={Shield} onClick={() => handleNavigation(APP_ROUTES.SECURITY)}>
                        {t('user.menu.security.overview')}
                    </MenuItem>
                    <div className="my-1.5 h-px bg-gray-200 dark:bg-gray-700" />
                    <MenuItem
                        icon={Key}
                        onClick={() => handleNavigation(APP_ROUTES.SECURITY_PASSWORD)}
                    >
                        {t('user.menu.security.password')}
                    </MenuItem>
                    <MenuItem
                        icon={Smartphone}
                        onClick={() => handleNavigation(APP_ROUTES.SECURITY_2FA)}
                    >
                        {t('user.menu.security.twoFactor')}
                    </MenuItem>
                    <MenuItem
                        icon={Monitor}
                        onClick={() => handleNavigation(APP_ROUTES.SECURITY_SESSIONS)}
                    >
                        {t('user.menu.security.sessions')}
                    </MenuItem>
                </div>
            </PopoverContent>
        </Popover>
    );

    if (!isLoading && !user) {
        return (
            <div className="flex items-center gap-2 lg:ml-4">
                <SignInButton />
                <SignUpButton />
            </div>
        );
    }

    if (isLoading) {
        return <Spinner />;
    }

    if (!user) return null;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <UserAvatar useSessionData={true} size={size} className="ml-4" />
            </PopoverTrigger>
            <PopoverContent className="w-58 p-0 shadow-lg" side="bottom" align="end">
                <div className="flex w-full flex-row items-center justify-start gap-3 border-b border-gray-200 p-3 dark:border-gray-700">
                    <div className="relative">
                        <UserAvatar
                            useSessionData={true}
                            size={size}
                            className="border-2 border-green-500"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h4 className="truncate text-xs font-semibold text-gray-900 dark:text-white">
                            {getDisplayName()}
                        </h4>
                        <p className="truncate text-xs text-gray-600 dark:text-gray-400">
                            {user.email}
                        </p>
                    </div>
                </div>

                <div className="p-0.5">
                    <div className="mb-3">
                        <div className="mb-1.5 px-2 py-1">
                            <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                {t('user.menu.account.title')}
                            </h3>
                        </div>
                        <div className="space-y-0.5">
                            <MenuItem
                                icon={CircleUserRound}
                                onClick={() => handleNavigation(APP_ROUTES.ACCOUNT)}
                                shortcut="⌘J"
                            >
                                {t('user.menu.account.overview')}
                            </MenuItem>
                            <MenuItem
                                icon={User}
                                onClick={() => handleNavigation(APP_ROUTES.ACCOUNT_PROFILE)}
                                shortcut="⌘P"
                            >
                                {t('user.menu.account.profile')}
                            </MenuItem>
                            <SecurityMenuItem />
                            <MenuItem
                                icon={Bell}
                                onClick={() => handleNavigation(APP_ROUTES.ACCOUNT_NOTIFICATIONS)}
                            >
                                {t('user.menu.account.notifications')}
                            </MenuItem>
                        </div>
                    </div>

                    <div className="my-2 h-px bg-gray-200 dark:bg-gray-700" />

                    <div className="mb-3">
                        <div className="mb-1.5 px-2 py-1">
                            <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                {t('user.menu.other')}
                            </h3>
                        </div>
                        <div className="space-y-0.5">
                            <MenuItem
                                icon={HeartHandshake}
                                onClick={() => handleNavigation(APP_ROUTES.SUPPORT)}
                            >
                                {t('navigation.support')}
                            </MenuItem>
                            <MenuItem
                                icon={ReceiptText}
                                onClick={() => handleNavigation(APP_ROUTES.INVOICES)}
                            >
                                {t('navigation.invoices')}
                            </MenuItem>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 p-2 dark:border-gray-700">
                    <SignOutButton />
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default UserMenu;
