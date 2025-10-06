import { Header, Footer } from '@/components/layout';

export default function WebSiteLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
