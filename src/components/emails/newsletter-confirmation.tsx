import { BaseEmail, emailStyles } from './base-email';
import { Button, Section, Text, Hr } from '@react-email/components';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface NewsletterConfirmationEmailProps {
    confirmUrl: string;
    locale: Locale;
}

export async function NewsletterConfirmationEmail({
    confirmUrl,
    locale
}: NewsletterConfirmationEmailProps) {
    const t = await getTranslations({ locale, namespace: 'email.newsletterConfirmation' });

    return (
        <BaseEmail
            preview={t('preview')}
            headerTitle={t('headerTitle')}
            headerGradient="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
        >
            <Section>
                <Text style={emailStyles.greeting}>{t('greeting')}</Text>
                <Text style={emailStyles.paragraph}>{t('paragraph1')}</Text>
            </Section>

            <Section style={emailStyles.buttonContainer}>
                <Button
                    href={confirmUrl}
                    style={{
                        ...emailStyles.button,
                        background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
                        boxShadow: '0 2px 8px rgba(99,102,241,0.15)'
                    }}
                >
                    {t('button')}
                </Button>
            </Section>

            <Hr style={emailStyles.hr} />

            <Section>
                <Text style={emailStyles.linkText}>{t('footerNote')}</Text>
            </Section>
        </BaseEmail>
    );
}
