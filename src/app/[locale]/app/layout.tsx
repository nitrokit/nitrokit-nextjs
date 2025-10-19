import { DashboardFooter } from '@/comp/app/layout/footer/footer';
import { DashboardHeader } from '@/comp/app/layout/header/header';
import { APP_ROUTES, AUTH_ROUTES } from '@/lib/auth/constants';
import { requireAuth } from '@/lib/auth/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await requireAuth();

    if (!session) {
        redirect(`${AUTH_ROUTES.SIGN_IN}?callbackUrl=${APP_ROUTES.HOME}`);
    }
    return (
        <div className="h-screen bg-gray-100 dark:bg-neutral-900">
            <DashboardHeader>{/* DashboardBreadcrumb */}</DashboardHeader>
            <div className="flex h-[calc(100vh-7rem)] overflow-hidden">
                {/* DashboardSidebar */}
                <div className="flex-1 overflow-hidden px-5 md:pt-0 md:pr-5 md:pb-0 md:pl-0">
                    <main className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-zinc-950">
                        {children}
                    </main>
                </div>
            </div>
            <DashboardFooter />
        </div>
    );
}
