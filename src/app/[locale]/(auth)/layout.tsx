export default function AuthLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="grid min-h-screen grow lg:grid-cols-2">
            <div className="order-2 flex items-center justify-center p-8 lg:order-1 lg:p-10">
                <div className="w-full max-w-[370px]">{children}</div>
            </div>
            <div className="lg:border-border xxl:bg-center branded-bg order-1 bg-top bg-no-repeat lg:order-2 lg:m-5 lg:rounded-xl lg:border xl:bg-cover">
                Test
            </div>
        </div>
    );
}
