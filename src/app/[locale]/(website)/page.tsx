'use client';

// import { useUser } from '@/contexts/user-context';

// export default function Home() {
//     const { user, isLoading } = useUser();
//     console.log('User', user, isLoading);
// }

import { BackgroundPatterns, LibraryLogos } from '@/components/layout';
import { GITHUB_URL } from '@/constants/site';
import { useTranslations } from 'next-intl';
import { CompactBanner } from '@/components/banners';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { ExternalLink as IconExternalLink, Github as IconGithub } from 'lucide-react';

export default function Home() {
    const t = useTranslations('home');

    return (
        <div className="relative min-h-screen overflow-hidden bg-white transition-colors duration-300 dark:bg-[#111113]">
            <BackgroundPatterns variant="default" />
            <div className="relative z-10">
                <div className="relative">
                    <div className="container mx-auto px-4 py-16 lg:py-10">
                        <div className="mb-12 text-center">
                            <CompactBanner
                                href={`${GITHUB_URL}/releases`}
                                badge={t('banner.badge')}
                                text={t('banner.text')}
                                className="inline-flex border border-gray-200 bg-gray-50/80 backdrop-blur-sm transition-colors hover:bg-gray-100/80 dark:border-gray-800 dark:bg-gray-900/80 dark:hover:bg-gray-800/80"
                            />
                        </div>

                        <div className="mx-auto mb-16 max-w-4xl text-center">
                            <h1 className="mb-8 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                                <span className="mb-6 inline-block bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text text-center text-6xl leading-19 font-bold text-transparent text-shadow-xs">
                                    {t('hero.title.primary')}
                                </span>
                                <span className="mb-6 block bg-gradient-to-r text-center font-bold text-emerald-500 text-shadow-xs">
                                    {t('hero.title.secondary')}
                                </span>
                            </h1>

                            <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl dark:text-gray-300">
                                {t('hero.subtitle')}
                            </p>

                            <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"></div>
                        </div>

                        <div className="mx-auto mb-20 grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="rounded-xl bg-white/50 p-6 text-center backdrop-blur-sm transition-all hover:bg-white/70 dark:bg-gray-900/50 dark:hover:bg-gray-900/70">
                                <div className="mb-2 text-3xl font-bold text-blue-600 md:text-4xl dark:text-blue-400">
                                    {t('stats.components.number')}
                                </div>
                                <div className="font-medium text-gray-600 dark:text-gray-400">
                                    {t('stats.components.label')}
                                </div>
                            </div>

                            <div className="rounded-xl bg-white/50 p-6 text-center backdrop-blur-sm transition-all hover:bg-white/70 dark:bg-gray-900/50 dark:hover:bg-gray-900/70">
                                <div className="mb-2 text-3xl font-bold text-emerald-600 md:text-4xl dark:text-emerald-400">
                                    {t('stats.typescript.number')}
                                </div>
                                <div className="font-medium text-gray-600 dark:text-gray-400">
                                    {t('stats.typescript.label')}
                                </div>
                            </div>

                            <div className="rounded-xl bg-white/50 p-6 text-center backdrop-blur-sm transition-all hover:bg-white/70 dark:bg-gray-900/50 dark:hover:bg-gray-900/70">
                                <div className="mb-2 text-3xl font-bold text-purple-600 md:text-4xl dark:text-purple-400">
                                    {t('stats.modern.number')}
                                </div>
                                <div className="font-medium text-gray-600 dark:text-gray-400">
                                    {t('stats.modern.label')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <LibraryLogos variant="compact" />

                <div className="my-10 rounded-2xl border-t border-gray-200/50 bg-gradient-to-r from-white/40 via-white/60 to-white/40 pt-12 text-center backdrop-blur-sm dark:border-gray-800/50 dark:from-gray-900/40 dark:via-gray-900/60 dark:to-gray-900/40">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                        {t('cta.title')}
                    </h3>
                    <p className="mb-6 text-gray-600 dark:text-gray-400">{t('cta.description')}</p>

                    <div className="flex flex-col items-center justify-center gap-3 pb-8 sm:flex-row">
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="bg-white/70 backdrop-blur-sm hover:bg-white dark:bg-gray-900/70 dark:hover:bg-gray-900"
                        >
                            <Link href={GITHUB_URL}>
                                <IconGithub className="mr-2 h-4 w-4" />
                                {t('cta.github')}
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="hover:bg-white/50 dark:hover:bg-gray-900/50"
                        >
                            <Link href={GITHUB_URL + '/wiki'}>
                                <IconExternalLink className="mr-2 h-4 w-4" />
                                {t('cta.docs')}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
