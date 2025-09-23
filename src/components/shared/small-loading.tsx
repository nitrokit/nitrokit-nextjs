'use client';

import { Loader } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function SmallLoading() {
    return (
        <Button size="icon" variant="ghost">
            <Loader className="size-5 animate-spin text-zinc-400" />
        </Button>
    );
}
