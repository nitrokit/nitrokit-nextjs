import { render } from '@react-email/render';
import { ContactEmail } from '@/components/emails/contact-email';
import { PUBLIC_EMAIL } from '@/constants';
import { getEmailService } from '@/lib/services/email';

interface SendContactEmailProps {
    name: string;
    email: string;
    message: string;
    userId?: string;
}

export interface EmailServiceResult {
    success: boolean;
    error?: string;
    data?: {
        id?: string;
        message: string;
        [key: string]: unknown;
    };
}

export async function sendContactEmail({
    name,
    email,
    message,
    userId
}: SendContactEmailProps): Promise<EmailServiceResult> {
    try {
        // Use your existing template exactly as before
        const emailHtml = await render(
            ContactEmail({
                name,
                email,
                message
            })
        );

        const emailService = getEmailService();

        // Send email using new service but same structure
        const result = await emailService.sendEmail({
            to: PUBLIC_EMAIL,
            subject: `💬 New Contact: ${name}`,
            html: emailHtml,
            replyTo: email,
            metadata: {
                type: 'contact_form',
                fromName: name,
                fromEmail: email,
                userId: userId || 'anonymous'
            }
        });

        if (!result.success) {
            return {
                success: false,
                error: `Failed to send contact email: ${result.error}`
            };
        }

        return {
            success: true,
            data: {
                id: result.messageId,
                message: 'Email sent successfully'
            }
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to send email'
        };
    }
}
