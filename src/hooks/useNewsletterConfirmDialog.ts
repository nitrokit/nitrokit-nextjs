import { newsletterConfirmResponseSchema } from '@/lib';
import { useRouter } from '@/lib/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

type ConfirmationStatus = 'loading' | 'success' | 'error';

export const useNewsletterConfirmDialog = (t: (key: string) => string) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const newsletterDialogOpen = !!searchParams.get('newsletter_confirm');
    const [status, setStatus] = useState<ConfirmationStatus | null>(null);
    const [message, setMessage] = useState('');
    const [requestSent, setRequestSent] = useState(false);

    useEffect(() => {
        const token = searchParams.get('newsletter_confirm');

        if (!token || requestSent) {
            return;
        }

        setStatus('loading');
        setRequestSent(true);

        fetch(`/api/newsletter/confirm?token=${token}`)
            .then(async (res) => {
                const parsed = newsletterConfirmResponseSchema.safeParse(await res.json());

                if (!parsed.success) {
                    setStatus('error');
                    setMessage(t('common.errors.general'));
                    return;
                }

                const data = parsed.data;

                if (data.success) {
                    setStatus('success');
                    setMessage(data.message || t('common.newsletter.success'));
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete('newsletter_confirm');
                    router.replace(`?${params.toString()}`, { scroll: false });
                } else {
                    setStatus('error');
                    setMessage(data.error || t('common.errors.general'));
                }
            })
            .catch(() => {
                setStatus('error');
                setMessage(t('common.errors.general'));
            });
    }, [searchParams, requestSent, router, t]);

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
