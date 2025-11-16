import { Skeleton } from '@/components/ui';
import { cn } from '@nitrokit/core/lib';

interface Props {
    height?: string;
    className?: string;
}

export function PageLoading({ height = 'h-[400px]', className }: Props) {
    return (
        <div className={cn('flex w-full flex-col space-y-4 p-8', height, className)}>
            <Skeleton className="mb-4 h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-5/6" />
            <div className="grid grid-cols-3 gap-4 pt-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
            <Skeleton className="mt-8 h-4 w-1/2" />
        </div>
    );
}
