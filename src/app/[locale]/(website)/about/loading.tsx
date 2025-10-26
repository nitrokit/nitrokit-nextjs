import { Skeleton } from '@/components/ui';

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center">
                <Skeleton className="mx-auto mb-4 h-8 w-1/4" />
                <Skeleton className="mx-auto h-12 w-1/2" />
            </div>

            <div className="my-16 grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
                <Skeleton className="mx-auto h-24 w-40" />
                <Skeleton className="mx-auto h-24 w-40" />
                <Skeleton className="mx-auto h-24 w-40" />
            </div>

            <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
    );
}
