import { BaseEmail, emailStyles } from './base-email';
import { Button, Section, Text, Hr } from '@react-email/components';

export function NewsletterConfirmationEmail({ confirmUrl }: { confirmUrl: string }) {
    return (
        <BaseEmail
            preview="Haber Bülteni Aboneliği Onayı"
            headerTitle="📰 Haber Bülteni Onayı"
            headerGradient="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
        >
            <Section>
                <Text style={emailStyles.greeting}>Aboneliğinizi tamamlayın!</Text>
                <Text style={emailStyles.paragraph}>
                    Haber bültenimize abone olduğunuz için teşekkürler. En güncel gelişmelerden ve
                    özel içeriklerden haberdar olmak için aboneliğinizi onaylamanız gerekiyor.
                </Text>
            </Section>

            <Section style={emailStyles.buttonContainer}>
                <Button
                    href={confirmUrl}
                    style={{
                        ...emailStyles.button,
                        background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
                        boxShadow: '0 2px 8px rgba(99,102,241,0.15)',
                    }}
                >
                    Aboneliği Onayla
                </Button>
            </Section>

            <Hr style={emailStyles.hr} />

            <Section>
                <Text style={emailStyles.linkText}>
                    Eğer bu isteği siz yapmadıysanız, bu e-postayı dikkate almayabilirsiniz.
                    <br />
                    Her zaman abonelikten çıkabilirsiniz.
                </Text>
            </Section>
        </BaseEmail>
    );
}
