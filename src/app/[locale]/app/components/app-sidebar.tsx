'use client';

import * as React from 'react';
import { Home, Inbox, Search, Sparkles } from 'lucide-react';
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg'
    },
    teams: [
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise'
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup'
        },
        {
            name: 'Evil Corp.',
            logo: Command,
            plan: 'Free'
        }
    ],
    navMain: [
        {
            title: 'Search',
            url: '#',
            icon: Search
        },
        {
            title: 'Ask AI',
            url: '#',
            icon: Sparkles
        },
        {
            title: 'Home',
            url: '#',
            icon: Home,
            isActive: true
        },
        {
            title: 'Inbox',
            url: '#',
            icon: Inbox,
            badge: '10'
        }
    ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar
            className="top-[calc(var(--header-height))] z-99 h-[calc(100svh-var(--header-height)-var(--footer-height)-21px)]! bg-white"
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
                    {data.navMain.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.isActive}>
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
