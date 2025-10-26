import { Skeleton } from '@/components/ui';

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center">
                <Skeleton className="mx-auto mb-4 h-8 w-1/4" />
                <Skeleton className="mx-auto mb-6 h-6 w-1/2" />
                <Skeleton className="mx-auto h-10 w-48" />
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="h-96 w-full rounded-lg" />
                <Skeleton className="h-96 w-full rounded-lg" />
                <Skeleton className="h-96 w-full rounded-lg" />
            </div>
        </div>
    );
}
