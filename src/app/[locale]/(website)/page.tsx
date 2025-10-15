'use client';

// import { useUser } from '@/contexts/user-context';

// export default function Home() {
//     const { user, isLoading } = useUser();
//     console.info('User', user, isLoading);
// }

import { BackgroundPatterns } from '@/comp/website/layout';
import { NewsletterConfirmDialog } from '@/comp/website/newsletter';
import { Testimonials } from '@/comp/website/testimonial';
import { Hero, GitHubSection } from './home/components';
import { LibraryLogos } from '@/comp/shared';

export default function Page() {
    return (
        <div className="relative -top-20 min-h-screen overflow-hidden bg-white transition-colors duration-300 dark:bg-[#111113]">
            <NewsletterConfirmDialog />
            <BackgroundPatterns variant="default" animated={true} />
            <div className="relative z-10 pt-20 lg:pt-30">
                <Hero />
                <LibraryLogos variant="compact" />
                <Testimonials variant="default" />
                <GitHubSection />
            </div>
        </div>
    );
}
