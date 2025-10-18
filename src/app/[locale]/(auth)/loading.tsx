import { Skeleton } from '@/components/ui/skeleton';

export default function AuthLoading() {
    return (
        <div>
            <div className="absolute top-8 left-8 z-10 h-10 w-10 lg:top-10 lg:left-10">
                <Skeleton className="h-full w-full rounded-full" />
            </div>
            <div className="absolute top-20 left-8 z-10 h-10 w-10 lg:top-24 lg:left-10">
                <Skeleton className="h-full w-full rounded-full" />
            </div>

            <div className="w-full max-w-[370px] space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-3/5" />
                    <Skeleton className="h-4 w-4/5" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                </div>

                <div className="space-y-4">
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                </div>

                <Skeleton className="h-10 w-full" />

                <div className="space-y-4 pt-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="mx-auto h-5 w-1/2" />
                </div>
            </div>
        </div>
    );
}
