'use client';

import * as React from 'react';
import { translateSafely } from '@/lib/utils';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import { AppNavigationItems } from '@/constants';
import { useTranslations } from 'next-intl';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const t = useTranslations();
    return (
        <Sidebar
            className="top-[calc(var(--header-height))] z-99 h-[calc(100svh-var(--header-height)-var(--footer-height)-21px)]!"
            {...props}
        >
            <SidebarHeader className="md:hidden"></SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {AppNavigationItems.map((item) => (
                        <SidebarMenuItem key={item.key}>
                            <SidebarMenuButton asChild variant={'rounded'}>
                                <a href={item.href}>
                                    <item.icon />
                                    <span>{translateSafely(t, item.key)}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
