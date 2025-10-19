import { BaseEmail, emailStyles } from '@/components/emails/base-email';
import { Text, Button, Hr, Section } from '@react-email/components';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server'; // next-intl importu

interface WelcomeEmailProps {
    name: string;
    appUrl?: string;
    locale: Locale;
}

export async function WelcomeEmail({ name, appUrl, locale }: WelcomeEmailProps) {
    const t = await getTranslations({ locale, namespace: 'email.welcome' });

    return (
        <BaseEmail
            preview={t('preview')}
            headerTitle={t('headerTitle')}
            headerGradient="linear-gradient(135deg, #4ade80 0%, #22c55e 100%)"
        >
            <Text style={emailStyles.greeting}>{t('greeting', { name })} 🎉</Text>

            <Text style={emailStyles.paragraph}>{t('paragraph1')}</Text>

            <Text style={emailStyles.paragraph}>{t('paragraph2')}</Text>

            <Section style={featureList}>
                <Text style={featureItem}>{t('feature1')}</Text>
                <Text style={featureItem}>{t('feature2')}</Text>
                <Text style={featureItem}>{t('feature3')}</Text>
                <Text style={featureItem}>{t('feature4')}</Text>
            </Section>

            {appUrl && (
                <Section style={emailStyles.buttonContainer}>
                    <Button
                        href={appUrl}
                        style={{
                            ...emailStyles.button,
                            backgroundColor: '#22c55e'
                        }}
                    >
                        {t('dashboardButton')}
                    </Button>
                </Section>
            )}

            <Text style={emailStyles.paragraph}>{t('paragraph3')}</Text>

            <Hr style={emailStyles.hr} />

            <Text style={emailStyles.footer}>{t('footerNote')}</Text>
        </BaseEmail>
    );
}

const featureList = {
    margin: '20px 0',
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
};

const featureItem = {
    fontSize: '16px',
    color: '#374151',
    margin: '8px 0',
    display: 'block'
};
