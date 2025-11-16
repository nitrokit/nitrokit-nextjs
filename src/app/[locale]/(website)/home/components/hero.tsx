import { TESTIMONIALS as staticTestimonials } from '@/constants';
import { ConfettiBanner } from '@/components/website/banners';
import { RandomText, TextRotator } from '@/components/shared';
import { UserTrustSection } from '@/components/website/testimonial';
import { useTranslations } from 'next-intl';
import { useGithubRelease } from '@nitrokit/core/hooks/useGithubRelease';
import { Loader2 } from 'lucide-react';

function getTestimonialData() {
    return staticTestimonials;
}

export function Hero() {
    const t = useTranslations();
    const testimonials = getTestimonialData();

    const titles = {
        title1: t.rich('home.hero.titles.title1', { br: () => <br /> }),
        title2: t.rich('home.hero.titles.title2', { br: () => <br /> })
    };

    const descriptions = {
        description1: t.rich('home.hero.description.description1', { br: () => <br /> }),
        description2: t.rich('home.hero.description.description2', { br: () => <br /> }),
        description3: t.rich('home.hero.description.description3', { br: () => <br /> }),
        description4: t.rich('home.hero.description.description4', { br: () => <br /> })
    };

    const titleArray = Object.values(titles);
    const descriptionArray = Object.values(descriptions);

    const { version, release_url, isVersionLoading } = useGithubRelease();

    return (
        <div className="relative">
            <div className="container mx-auto px-4 py-14 lg:py-8">
                <div className="mx-auto mb-10 max-w-fit text-center">
                    {isVersionLoading ? (
                        <Loader2 />
                    ) : (
                        <ConfettiBanner
                            href={release_url}
                            badge={t('common.new')}
                            icon={'🎉'}
                            text={t('home.banner.text', { version: version })}
                            confettiEffect="school-pride"
                            confettiEnabled={true}
                            confettiIntensity="high"
                            animated={false}
                        />
                    )}
                </div>

                <div className="mx-auto mt-20 max-w-5xl text-center">
                    <div className="mb-8 w-full text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                        <TextRotator
                            texts={titleArray}
                            interval={10000}
                            className="mb-6 inline-block bg-linear-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text text-center text-6xl leading-19 font-bold text-transparent text-shadow-xs"
                        />
                    </div>

                    <p className="mx-auto mb-12 w-full max-w-4xl text-xl leading-relaxed text-gray-600 md:text-2xl dark:text-gray-300">
                        <RandomText texts={descriptionArray} />
                    </p>

                    <UserTrustSection
                        testimonials={testimonials}
                        label={t('home.testimonials.slogan')}
                        className="mb-10"
                    />

                    <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row"></div>
                </div>

                <div className="mx-auto mb-20 grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="rounded-xl bg-white/50 p-6 text-center backdrop-blur-sm transition-all hover:bg-white/70 dark:bg-gray-900/50 dark:hover:bg-gray-900/70">
                        <div className="mb-2 text-3xl font-bold text-blue-600 md:text-4xl dark:text-blue-400">
                            {t('home.stats.components.number')}
                        </div>
                        <div className="font-medium text-gray-600 dark:text-gray-400">
                            {t('home.stats.components.label')}
                        </div>
                    </div>

                    <div className="rounded-xl bg-white/50 p-6 text-center backdrop-blur-sm transition-all hover:bg-white/70 dark:bg-gray-900/50 dark:hover:bg-gray-900/70">
                        <div className="mb-2 text-3xl font-bold text-emerald-600 md:text-4xl dark:text-emerald-400">
                            {t('home.stats.typescript.number')}
                        </div>
                        <div className="font-medium text-gray-600 dark:text-gray-400">
                            {t('home.stats.typescript.label')}
                        </div>
                    </div>

                    <div className="rounded-xl bg-white/50 p-6 text-center backdrop-blur-sm transition-all hover:bg-white/70 dark:bg-gray-900/50 dark:hover:bg-gray-900/70">
                        <div className="mb-2 text-3xl font-bold text-purple-600 md:text-4xl dark:text-purple-400">
                            {t('home.stats.modern.number')}
                        </div>
                        <div className="font-medium text-gray-600 dark:text-gray-400">
                            {t('home.stats.modern.label')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
