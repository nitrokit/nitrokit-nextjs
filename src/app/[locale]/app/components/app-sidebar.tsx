'use client';

import * as React from 'react';
import { translateSafely } from '@/lib/utils';
import { Command } from 'lucide-react';
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
            <SidebarHeader className="md:hidden">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Acme Inc</span>
                                    <span className="truncate text-xs">Enterprise</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
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
