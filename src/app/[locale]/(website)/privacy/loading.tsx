import { Skeleton } from '@/components/ui';

export default function Loading() {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
                <Skeleton className="mx-auto mb-4 h-12 w-1/2" />
                <Skeleton className="mx-auto h-6 w-3/4" />
            </div>
            <div className="mb-8 space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="mb-8 space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
        </div>
    );
}
