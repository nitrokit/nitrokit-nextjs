import { DashboardHeader, DashboardFooter, AppBreadcrumb } from '@/components/app';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { APP_ROUTES, AUTH_ROUTES } from '@/lib/auth/constants';
import { requireAuth } from '@/lib/auth/server';
import { redirect } from 'next/navigation';
import { AppSidebar } from './components/app-sidebar';

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
        <div className="[--footer-height:calc(--spacing(8))] [--header-height:calc(--spacing(15))]">
            <SidebarProvider className="bg-background flex flex-col">
                <DashboardHeader>
                    <SidebarTrigger />
                    <AppBreadcrumb />
                </DashboardHeader>
                <div className="flex h-[calc(100vh-7rem)] overflow-hidden">
                    <AppSidebar variant="floating" collapsible="icon" />
                    <SidebarInset>
                        <div className="flex-1 overflow-hidden px-5">
                            <div className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-zinc-950">
                                {children}
                            </div>
                        </div>
                    </SidebarInset>
                </div>
                <DashboardFooter />
            </SidebarProvider>
        </div>
    );
}
