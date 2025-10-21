import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { generatePageMetadata } from '@/lib';
import PricingSection from './components/pricing-section';
import { PLANS } from '@/constants';
import { ActionBanner } from '@/components/website/banners/action-banner';
import { Building } from 'lucide-react';
import { PageHero } from '@/components/website/layout';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('pricing');
    return await generatePageMetadata({
        params: Promise.resolve({
            title: t('title'),
            description: t('description')
        })
    });
}

export default async function Page() {
    const t = await getTranslations();
    return (
        <div className="w-full px-4 lg:mx-auto lg:w-7xl lg:p-0">
            <PageHero
                h1={t('pricing.subtitle')}
                h2={t('pricing.title')}
                p={t('pricing.description')}
            />
            <div className="mb-10 lg:mb-20">
                <PricingSection plans={PLANS} />
            </div>
            <div className="mb-30">
                <ActionBanner
                    title={t('pricing.enterprise.title')}
                    description={t('pricing.enterprise.description')}
                    buttonText={t('common.contactUs')}
                    href="/contact"
                    icon={<Building size={32} />}
                    size="lg"
                    variant="enterprise"
                />
            </div>
        </div>
    );
}
