'use client';

import { Loader } from 'lucide-react';

import { Button } from '@/comp/ui';

export function SmallLoading() {
    return (
        <Button size="icon" variant="ghost">
            <Loader className="size-5 animate-spin text-zinc-400" />
        </Button>
    );
}
