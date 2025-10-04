import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata } from '@/lib';
import { PageHero } from '@/components/layout';
import { ContactForm } from './components/contact-form';
import { ContactInfo } from './components/contact-info';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('contact');
    return await generatePageMetadata({
        params: Promise.resolve({
            title: t('title'),
            description: t('description'),
        }),
    });
}

export default async function Page() {
    const t = await getTranslations('contact');
    return (
        <div className="w-full px-4 lg:mx-auto lg:w-7xl lg:p-0">
            <PageHero
                h1={t('pageHero.title')}
                h2={t('pageHero.subtitle')}
                p={t('pageHero.description')}
            />
            <div className="mx-auto my-20 grid w-full grid-cols-1 gap-16 lg:grid-cols-2">
                <div className="order-2 lg:order-1">
                    <ContactForm />
                </div>
                <div className="order-1 lg:order-2">
                    <ContactInfo />
                </div>
            </div>
        </div>
    );
}
