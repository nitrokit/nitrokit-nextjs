'use client';

import { Loader2 as IconLoader2 } from 'lucide-react';

export interface LoadingProps {
    text?: string;
    className?: string;
}

export function Loading({ text, className }: LoadingProps) {
    return (
        <div className="m-auto my-10 w-full">
            <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
                <IconLoader2 className="text-primary h-8 w-8 animate-spin" />
                {text && <p className="text-muted-foreground text-sm">{text}</p>}
            </div>
        </div>
    );
}
