import { translateRichSafely } from '@/lib';
import { BaseEmail } from './base-email';
import { Button, Section, Text, Hr } from '@react-email/components';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface ContactEmailProps {
    name: string;
    email: string;
    message: string;
    locale: Locale;
}

export async function ContactEmail({ name, email, message, locale }: ContactEmailProps) {
    const t = await getTranslations({ locale, namespace: 'email.contactMessage' });
    return (
        <BaseEmail
            preview={t('preview', { name: name })}
            headerTitle={t('headerTitle')}
            headerGradient="linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
        >
            <Section style={section}>
                <Text style={heading}>{t('introText')}</Text>
            </Section>

            <Hr style={divider} />

            <Section style={section}>
                <div style={infoContainer}>
                    <div style={infoRow}>
                        <Text style={infoLabel}>{t('fromLabel')}</Text>
                        <Text style={infoValue}>{name}</Text>
                    </div>

                    <div style={infoRow}>
                        <Text style={infoLabel}>{t('emailLabel')}</Text>
                        <Text style={infoValue}>{email}</Text>
                    </div>
                </div>
            </Section>

            <Hr style={divider} />

            <Section style={section}>
                <Text style={infoLabel}>{t('messageLabel')}</Text>
                <div style={messageContainer}>
                    <Text style={messageText}>{message}</Text>
                </div>
            </Section>

            <Section style={buttonContainer}>
                <Button
                    href={`mailto:${email}?subject=Re: Your message to Nitrokit`}
                    style={replyButton}
                >
                    {t('replyButton', { name: name })}
                </Button>
            </Section>

            <Hr style={divider} />

            <Section style={section}>
                <Text style={footerText}>
                    {translateRichSafely(t, `footerText`, {
                        email: (chunks) => <strong>{chunks}</strong>
                    })}
                </Text>
            </Section>
        </BaseEmail>
    );
}

const section = {
    padding: '0 24px',
    margin: '16px 0'
};

const heading = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0 0 16px 0',
    textAlign: 'center' as const
};

const divider = {
    borderColor: '#e5e7eb',
    margin: '24px 0'
};

const infoContainer = {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '20px',
    margin: '16px 0'
};

const infoRow = {
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
};

const infoLabel = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#475569',
    margin: '0',
    minWidth: '80px'
};

const infoValue = {
    fontSize: '16px',
    color: '#1e293b',
    margin: '0',
    fontWeight: '500'
};

const messageContainer = {
    backgroundColor: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    padding: '20px',
    margin: '12px 0'
};

const messageText = {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#334155',
    margin: '0',
    whiteSpace: 'pre-wrap' as const,
    fontFamily: 'Georgia, serif'
};

const buttonContainer = {
    textAlign: 'center' as const,
    margin: '32px 0'
};

const replyButton = {
    backgroundColor: '#0891b2',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '12px 24px',
    border: 'none',
    cursor: 'pointer'
};

const footerText = {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '20px',
    textAlign: 'center' as const,
    margin: '0'
};
