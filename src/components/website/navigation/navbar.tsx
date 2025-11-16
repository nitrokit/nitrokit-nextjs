'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/navigation';

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui';
import { cn } from '@nitrokit/core/lib';
import { NAV_LINKS } from '@/constants';

export function Navbar() {
    const t = useTranslations();
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;
    const menuItemClass =
        'group hover:bg-accent/40 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50';
    const menuItemActiveClass = 'bg-accent/40 text-accent-foreground';

    return (
        <NavigationMenu>
            <NavigationMenuList className="space-x-1">
                {NAV_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavigationMenuItem key={item.path}>
                            <Link
                                href={item.path}
                                className={cn(
                                    menuItemClass,
                                    isActive(item.path) && menuItemActiveClass
                                )}
                            >
                                <Icon size={16} className="mr-2" />
                                {t(item.name as any)}
                            </Link>
                        </NavigationMenuItem>
                    );
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
