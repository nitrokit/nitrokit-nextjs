'use client';

import { Spinner } from '../ui';

export interface LoadingProps {
    text?: string;
    className?: string;
}

export function Loading({ text, className }: LoadingProps) {
    return (
        <div className="m-auto my-10 w-full">
            <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
                <Spinner className="text-primary" />
                {text && <p className="text-muted-foreground text-sm">{text}</p>}
            </div>
        </div>
    );
}
