'use client';

import { useEffect, useState } from 'react';

interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
}

function isBot(): boolean {
    if (typeof window === 'undefined') return false;

    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = [
        'googlebot',
        'bingbot',
        'slurp',
        'duckduckbot',
        'baiduspider',
        'yandexbot',
        'facebookexternalhit',
        'twitterbot',
        'rogerbot',
        'linkedinbot',
        'embedly',
        'quora link preview',
        'showyoubot',
        'outbrain',
        'pinterest',
        'developers.google.com/+/web/snippet'
    ];

    return botPatterns.some((pattern) => userAgent.includes(pattern));
}

export function useCookieConsent() {
    const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
    const [hasConsent, setHasConsent] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isBotDetected, setIsBotDetected] = useState(false);

    useEffect(() => {
        const botDetected = isBot();
        setIsBotDetected(botDetected);

        if (botDetected) {
            setIsLoading(false);
            return;
        }

        const consent = localStorage.getItem('nitrokit-cookie-consent');
        const savedPreferences = localStorage.getItem('nitrokit-cookie-preferences');

        if (consent && savedPreferences) {
            const parsedPreferences = JSON.parse(savedPreferences) as CookiePreferences;
            setPreferences(parsedPreferences);
            setHasConsent(true);
        }

        setIsLoading(false);

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'nitrokit-cookie-preferences' && e.newValue) {
                const newPreferences = JSON.parse(e.newValue) as CookiePreferences;
                setPreferences(newPreferences);
                setHasConsent(true);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return {
        preferences,
        hasConsent,
        isLoading,
        isBotDetected,
        canUseAnalytics: isBotDetected || (hasConsent && preferences?.analytics),
        canUseMarketing: isBotDetected || (hasConsent && preferences?.marketing),
        canUseFunctional: isBotDetected || (hasConsent && preferences?.functional)
    };
}
