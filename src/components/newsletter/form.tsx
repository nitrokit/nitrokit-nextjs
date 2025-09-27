'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, Mail, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useNewsletterSubscription } from '@/hooks/useNewsletterSubscription';

export function CompactNewsletter() {
    const t = useTranslations('app');
    const [email, setEmail] = useState('');
    const { subscribe, loading, isSubscribed, error, success } = useNewsletterSubscription();

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        await subscribe(email);
        if (success) {
            setEmail('');
        }
    };

    console.log(error);

    return (
        <div>
            <h3 className="text-foreground mb-4 flex items-center gap-2 font-semibold">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-purple-500/10">
                    <Mail className="h-3 w-3 text-purple-500" />
                </div>
                {t('newsletter.title')}
            </h3>

            <div className="mb-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                    {t('newsletter.description')}
                </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-3">
                <Input
                    type="email"
                    placeholder={t('newsletter.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-9 w-full"
                    required
                    disabled={loading || isSubscribed}
                />
                <Button
                    type="submit"
                    disabled={isSubscribed || loading}
                    size="sm"
                    className="h-9 w-full"
                >
                    {loading ? (
                        t('newsletter.sending')
                    ) : isSubscribed ? (
                        <>
                            <Heart className="mr-2 h-3 w-3 fill-current" />
                            {t('newsletter.thankYou')}
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-3 w-3" />
                            {t('newsletter.subscribe')}
                        </>
                    )}
                </Button>
            </form>
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
            {success && <p className="mt-2 text-xs text-green-600">{t('newsletter.success')}</p>}
            <p className="text-muted-foreground mt-2 text-[11px]">{t('newsletter.unsubscribe')}</p>
        </div>
    );
}
