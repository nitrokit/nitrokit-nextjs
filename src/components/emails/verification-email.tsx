import { BaseEmail, emailStyles } from '@/components/emails/base-email';
import { Text, Button, Hr, Section } from '@react-email/components';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface VerificationEmailProps {
    name: string;
    verificationUrl: string;
    locale: Locale;
}

export async function VerificationEmail({ name, verificationUrl, locale }: VerificationEmailProps) {
    const t = await getTranslations({ locale, namespace: 'email.verification' });

    return (
        <BaseEmail
            preview={t('preview')}
            headerTitle={t('headerTitle')}
            headerGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        >
            <Text style={emailStyles.greeting}>{t('greeting', { name })} 👋</Text>

            <Text style={emailStyles.paragraph}>{t('paragraph1')}</Text>

            <Section style={emailStyles.buttonContainer}>
                <Button
                    href={verificationUrl}
                    style={{
                        ...emailStyles.button,
                        backgroundColor: '#667eea'
                    }}
                >
                    {t('verifyButton')}
                </Button>
            </Section>

            <Text style={emailStyles.linkText}>{t('linkText')}</Text>
            <Text style={emailStyles.link}>{verificationUrl}</Text>

            <Hr style={emailStyles.hr} />

            <Text style={emailStyles.footer}>{t('footerNote')}</Text>
        </BaseEmail>
    );
}
