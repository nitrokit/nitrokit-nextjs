import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Users, Target, Award, Heart, Globe, Zap, Shield, TrendingUp } from 'lucide-react';
import { generatePageMetadata } from '@/lib';
import { CallToActionSection, PageHero } from '@/components/website/layout';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('about');
    return await generatePageMetadata({
        params: Promise.resolve({
            title: t('title'),
            description: t('description')
        })
    });
}

export default async function Page() {
    const t = await getTranslations('about');

    const ctaButtons = [
        {
            href: '/contact',
            label: t('cta.buttons.contact'),
            variant: 'primary' as const
        },
        {
            href: '/projects',
            label: t('cta.buttons.viewWork'),
            variant: 'secondary' as const
        }
    ];
    return (
        <div>
            <div className="w-full px-4 lg:mx-auto lg:w-7xl lg:p-0">
                <PageHero h1={t('pageHero.h1')} h2={t('pageHero.h2')} p={t('pageHero.p')} />
                <div className="flex items-center justify-center space-x-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            {t('stats.experience.value')}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {t('stats.experience.label')}
                        </div>
                    </div>
                    <div className="h-12 w-px bg-gray-300 dark:bg-gray-600"></div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                            {t('stats.clients.value')}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {t('stats.clients.label')}
                        </div>
                    </div>
                    <div className="h-12 w-px bg-gray-300 dark:bg-gray-600"></div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                            {t('stats.projects.value')}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            {t('stats.projects.label')}
                        </div>
                    </div>
                </div>

                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                            <div className="space-y-6">
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                                        <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {t('mission.title')}
                                    </h2>
                                </div>
                                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                                    {t('mission.p')}
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start space-x-3">
                                        <Zap className="mt-1 h-5 w-5 shrink-0 text-yellow-500" />
                                        <span className="text-gray-600 dark:text-gray-300">
                                            {t('mission.list.item1')}
                                        </span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <Shield className="mt-1 h-5 w-5 shrink-0 text-green-500" />
                                        <span className="text-gray-600 dark:text-gray-300">
                                            {t('mission.list.item2')}
                                        </span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <Globe className="mt-1 h-5 w-5 shrink-0 text-blue-500" />
                                        <span className="text-gray-600 dark:text-gray-300">
                                            {t('mission.list.item3')}
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                                        <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {t('vision.title')}
                                    </h2>
                                </div>
                                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                                    {t('vision.p')}
                                </p>
                                <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
                                    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                                        {t('vision.goals.title')}
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600 dark:text-gray-300">
                                                {t('vision.goals.goal1.label')}
                                            </span>
                                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                {t('vision.goals.goal1.percentage')}
                                            </span>
                                        </div>
                                        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                            <div
                                                className="h-2 rounded-full bg-blue-600"
                                                style={{ width: '75%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto mb-16 max-w-3xl text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                                {t('coreValues.title')}
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                {t('coreValues.p')}
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <div className="group rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900">
                                    <Heart className="h-6 w-6 text-blue-600 group-hover:text-white dark:text-blue-400" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                    {t('coreValues.items.customerFirst.title')}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {t('coreValues.items.customerFirst.description')}
                                </p>
                            </div>

                            <div className="group rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 transition-colors group-hover:bg-green-600 group-hover:text-white dark:bg-green-900">
                                    <Shield className="h-6 w-6 text-green-600 group-hover:text-white dark:text-green-400" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                    {t('coreValues.items.integrity.title')}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {t('coreValues.items.integrity.description')}
                                </p>
                            </div>

                            <div className="group rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 transition-colors group-hover:bg-purple-600 group-hover:text-white dark:bg-purple-900">
                                    <Zap className="h-6 w-6 text-purple-600 group-hover:text-white dark:text-purple-400" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                    {t('coreValues.items.innovation.title')}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {t('coreValues.items.innovation.description')}
                                </p>
                            </div>

                            <div className="group rounded-lg bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 transition-colors group-hover:bg-orange-600 group-hover:text-white dark:bg-orange-900">
                                    <Award className="h-6 w-6 text-orange-600 group-hover:text-white dark:text-orange-400" />
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                    {t('coreValues.items.excellence.title')}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {t('coreValues.items.excellence.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto mb-16 max-w-3xl text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                                {t('team.title')}
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                {t('team.p')}
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {/* Team Member 1 */}
                            <div className="group text-center">
                                <div className="relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full bg-linear-to-br from-blue-400 to-purple-600">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Users className="h-16 w-16 text-white" />
                                    </div>
                                </div>
                                <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
                                    {t('team.members.johnSmith.name')}
                                </h3>
                                <p className="mb-3 text-blue-600 dark:text-blue-400">
                                    {t('team.members.johnSmith.role')}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {t('team.members.johnSmith.bio')}
                                </p>
                            </div>

                            {/* Team Member 2 */}
                            <div className="group text-center">
                                <div className="relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full bg-linear-to-br from-green-400 to-blue-600">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Users className="h-16 w-16 text-white" />
                                    </div>
                                </div>
                                <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
                                    {t('team.members.sarahJohnson.name')}
                                </h3>
                                <p className="mb-3 text-green-600 dark:text-green-400">
                                    {t('team.members.sarahJohnson.role')}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {t('team.members.sarahJohnson.bio')}
                                </p>
                            </div>

                            {/* Team Member 3 */}
                            <div className="group text-center">
                                <div className="relative mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full bg-linear-to-br from-purple-400 to-pink-600">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Users className="h-16 w-16 text-white" />
                                    </div>
                                </div>
                                <h3 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
                                    {t('team.members.mikeChen.name')}
                                </h3>
                                <p className="mb-3 text-purple-600 dark:text-purple-400">
                                    {t('team.members.mikeChen.role')}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {t('team.members.mikeChen.bio')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <CallToActionSection
                title={t('cta.title')}
                description={t('cta.description')}
                buttons={ctaButtons}
                variant="gradient"
            />
        </div>
    );
}
