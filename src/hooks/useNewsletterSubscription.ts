import { useState } from 'react';

export const useNewsletterSubscription = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const subscribe = async (email: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (data.success) {
                setIsSubscribed(true);
                setSuccess(true);
                setTimeout(() => setIsSubscribed(false), 3000);
            } else {
                setError(data.error || 'app.errors.general');
            }
        } catch {
            setError('app.errors.general');
        } finally {
            setLoading(false);
        }
    };

    return { subscribe, loading, error, success, isSubscribed };
};
