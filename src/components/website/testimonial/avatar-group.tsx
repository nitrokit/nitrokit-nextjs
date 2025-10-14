import Image from 'next/image';
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/comp/ui';

interface AvatarGroupProps {
    users: { id: string; name: string; title: string; company: string; avatarUrl: string }[];
}

export function AvatarGroup({ users }: AvatarGroupProps) {
    return (
        <div className="me-2.5 flex -space-x-2.5">
            {users.map((user) => (
                <Tooltip key={user.id} delayDuration={0}>
                    <TooltipTrigger asChild>
                        <div className="group relative -me-2.5">
                            <Image
                                height={100}
                                width={100}
                                src={user.avatarUrl}
                                alt={user.name}
                                className="border-background relative size-10 rounded-full border-2 object-cover object-top p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
                            />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-background/90 text-foreground rounded-lg px-3 py-2 text-center shadow-lg backdrop-blur-sm">
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-muted-foreground text-xs">{user.title}</div>
                        <div className="text-muted-foreground text-xs">{user.company}</div>
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    );
}
