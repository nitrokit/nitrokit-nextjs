'use client';

import { BackgroundPatterns, NewsletterConfirmDialog, Testimonials } from '@/components/website';
import { Hero, DeploySection } from './home/components';
import { LibraryLogos } from '@/components/shared';

export default function Page() {
    return (
        <div className="relative -top-20 min-h-screen overflow-hidden bg-white transition-colors duration-300 dark:bg-[#111113]">
            <NewsletterConfirmDialog />
            <BackgroundPatterns variant="default" animated={true} />
            <div className="relative z-10 pt-20 lg:pt-30">
                <Hero />
                <LibraryLogos variant="compact" />
                <Testimonials variant="default" />
                <DeploySection />
            </div>
        </div>
    );
}
