import { Skeleton } from '@/components/ui';

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
                <Skeleton className="mb-4 h-10 w-1/4" />
                <Skeleton className="mb-6 h-16 w-3/4" />
                <Skeleton className="mb-8 h-6 w-1/2" />
                <div className="flex gap-4">
                    <Skeleton className="h-12 w-32" />
                    <Skeleton className="h-12 w-32" />
                </div>
                <div className="mt-16 grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
                    <Skeleton className="h-24 w-48" />
                    <Skeleton className="h-24 w-48" />
                    <Skeleton className="h-24 w-48" />
                </div>
            </div>
        </div>
    );
}
