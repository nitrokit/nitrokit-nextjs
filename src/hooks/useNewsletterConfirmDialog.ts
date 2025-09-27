import { useRouter } from '@/lib/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

type ConfirmationStatus = 'loading' | 'success' | 'error';

export const useNewsletterConfirmDialog = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const newsletterDialogOpen = !!searchParams.get('newsletter_confirm');
    const [status, setStatus] = useState<ConfirmationStatus | null>(null);
    const [message, setMessage] = useState('');
    const [requestSent, setRequestSent] = useState(false);

    useEffect(() => {
        const token = searchParams.get('newsletter_confirm');

        // Eğer token yoksa VEYA istek zaten gönderilmişse işlemi durdur
        if (!token || requestSent) {
            return;
        }

        setStatus('loading');
        setRequestSent(true);

        fetch(`/api/newsletter/confirm?token=${token}`)
            .then(async (res) => {
                const data = await res.json();
                if (data.success) {
                    setStatus('success');
                    setMessage(data.message);
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete('newsletter_confirm');
                    router.replace(`?${params.toString()}`, { scroll: false });
                } else {
                    setStatus('error');
                    setMessage(data.error);
                }
            })
            .catch(() => {
                setStatus('error');
                setMessage('An unexpected error occurred.');
            });
    }, [searchParams, requestSent, router]);

    const onOpenChange = useCallback(
        (open: boolean) => {
            if (!open) {
                const params = new URLSearchParams(searchParams.toString());
                params.delete('newsletter_confirm');
                router.replace(`?${params.toString()}`, { scroll: false });
            }
        },
        [router, searchParams]
    );

    return { newsletterDialogOpen, onOpenChange, status, message };
};
