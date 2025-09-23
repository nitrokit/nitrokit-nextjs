'use client';

import { BackgroundPatterns } from '@/components/layout';
import { useUser } from '@/contexts/user-context';

export default function Home() {
    const { user, isLoading } = useUser();
    console.log('User', user, isLoading);

    return (
        <div className="relative min-h-screen overflow-hidden bg-white transition-colors duration-300 dark:bg-[#111113]">
            <BackgroundPatterns variant="default" />
        </div>
    );
}
