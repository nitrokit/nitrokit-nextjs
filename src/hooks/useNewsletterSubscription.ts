import { useEffect, useState, useTransition } from 'react';
import { newsletterSubscriptionAction, NewsletterSubscriptionResponse } from '@/lib';
import { useLocale, useTranslations } from 'next-intl';

interface UseNewsletterSubscriptionResult {
    subscribe: (email: string) => void;
    loading: boolean;
    isSubscribed: boolean;
    error: string | null;
    success: boolean;
    isInitialLoading: boolean;
}

const getInitialIsSubscribed = (): boolean => false;

export function useNewsletterSubscription(): UseNewsletterSubscriptionResult {
    const [isPending, startTransition] = useTransition();
    const [isSubscribed, setIsSubscribed] = useState(getInitialIsSubscribed);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const t = useTranslations();
    const locale = useLocale();

    useEffect(() => {
        if (localStorage.getItem('isNewsletterSubscribed') === 'true') {
            setIsSubscribed(true);
        }
        setIsInitialLoading(false);
    }, []);

    const subscribe = (email: string) => {
        setError(null);
        setSuccess(false);

        const formData = new FormData();
        formData.append('email', email);
        formData.append('locale', locale);

        startTransition(async () => {
            const result: NewsletterSubscriptionResponse = await newsletterSubscriptionAction(
                { success: false },
                formData
            );

            if (result.success) {
                setSuccess(true);
                setIsSubscribed(true);
                localStorage.setItem('isNewsletterSubscribed', 'true');
            } else {
                setSuccess(false);
                const errorMessage: string =
                    result.error || result.error || t('common.errors.general');
                setError(errorMessage);
            }
        });
    };

    return {
        subscribe,
        loading: isPending,
        isSubscribed,
        error,
        success,
        isInitialLoading
    };
}
