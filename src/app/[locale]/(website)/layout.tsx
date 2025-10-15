import { Header, Footer } from '@/comp/website/layout';

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
