import { Logo } from '@/comp/shared';
import { UserTrustSection } from '@/comp/website/testimonial';
import { useTranslations } from 'next-intl';
import { TESTIMONIALS as staticTestimonials } from '@/constants';
import { TerminalVisual } from './components/terminal-visual';
import Image from 'next/image';
import Link from 'next/link';
import { BackButton } from '@/comp/shared/back-button';
import { LocaleSwitcher, ThemeToggle } from '@/comp/switchers';
import { BackgroundPatterns } from '@/comp/website/layout';

export default function AuthLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const t = useTranslations();

    return (
        <div className="grid min-h-screen grow lg:grid-cols-2">
            <BackgroundPatterns variant="dots" animated={true} />
            <div className="relative order-2 flex items-center justify-center p-8 lg:order-1 lg:p-10">
                <BackButton />
                <div className="absolute top-20 left-8 z-10 lg:top-24 lg:left-10">
                    <ThemeToggle />
                </div>
                <div className="absolute top-32 left-8 z-10 lg:top-40 lg:left-10">
                    <LocaleSwitcher side="right" />
                </div>
                <div className="w-full max-w-[370px]">{children}</div>
            </div>
            <div className="lg:border-border xxl:bg-center branded-bg z-[99] order-1 bg-top bg-no-repeat lg:order-2 lg:m-4 lg:rounded-xl lg:border xl:bg-cover">
                <div className="flex h-full flex-col gap-4 p-12">
                    <Logo className="mb-3" />
                    <div className="flex flex-1 flex-col gap-3">
                        <h3 className="text-mono text-xl font-semibold">
                            {t('auth.layout.title')}
                        </h3>
                        <div className="text-secondary-foreground text-sm font-medium">
                            {t('auth.layout.description')}
                        </div>
                        <div className="flex flex-1 flex-col gap-5 py-3">
                            <TerminalVisual />
                            <Link
                                href={'https://www.npmjs.com/package/nitrokit-cli'}
                                target="_blank"
                                className="ml-auto"
                            >
                                <Image
                                    alt="Nitrokit CLI"
                                    src="https://img.shields.io/npm/v/nitrokit-cli?logo=npm&label=nitrokit-cli"
                                    width={129}
                                    height={20}
                                    unoptimized={true}
                                    className=""
                                />
                            </Link>
                        </div>
                        <UserTrustSection
                            testimonials={staticTestimonials}
                            label={t('home.testimonials.slogan')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
