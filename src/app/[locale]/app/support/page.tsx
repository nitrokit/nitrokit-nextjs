import { ScrollArea } from '@/comp/ui';

export default function DashboardPage({
    searchParams: _searchParams
}: {
    searchParams: Promise<{
        tab?: string;
        view?: string;
    }>;
}) {
    return (
        <div className="flex h-full flex-col">
            <ScrollArea className="h-full">
                <div className="px-4 py-6 lg:px-6">Support</div>
            </ScrollArea>
        </div>
    );
}
