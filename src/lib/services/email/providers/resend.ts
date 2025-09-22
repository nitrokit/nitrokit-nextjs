import { EmailProvider, EmailData, EmailResult } from '../types';
import { logger } from '@/lib/services/logger';
import { sanitizeEmailTags } from '@/lib/security/sanitization';

export interface ResendConfig {
    apiKey: string;
    from: string;
}

interface ResendEmailOptions {
    from: string;
    to: string[];
    subject: string;
    text: string;
    html?: string;
    cc?: string[];
    bcc?: string[];
    replyTo?: string;
    attachments?: Array<{
        filename: string;
        content: string | Buffer;
    }>;
    tags?: Array<{
        name: string;
        value: string;
    }>;
}

export class ResendProvider implements EmailProvider {
    constructor(private config: ResendConfig) {
        this.validateConfig();
    }

    getProviderName(): string {
        return 'resend';
    }

    validateConfig(): void {
        if (!this.config.apiKey) {
            throw new Error('Resend API key is required');
        }
        if (!this.config.from) {
            throw new Error('Resend from address is required');
        }
    }

    private htmlToText(html: string): string {
        return html
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/p>/gi, '\n\n')
            .replace(/<\/div>/gi, '\n')
            .replace(/<\/h[1-6]>/gi, '\n\n')
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .trim()
            .replace(/\n\s*\n\s*\n/g, '\n\n');
    }

    async sendEmail(data: EmailData): Promise<EmailResult> {
        try {
            logger.info('Sending email via Resend', {
                provider: 'resend',
                to: Array.isArray(data.to) ? data.to.length : 1,
                subject: data.subject,
                hasHtml: !!data.html,
                hasAttachments: !!data.attachments?.length,
            });

            const { Resend } = await import('resend');
            const resend = new Resend(this.config.apiKey);

            const textContent =
                data.text || (data.html ? this.htmlToText(data.html) : '') || 'Email content';

            const emailOptions: ResendEmailOptions = {
                from: this.config.from,
                to: Array.isArray(data.to) ? data.to : [data.to],
                subject: data.subject,
                text: textContent,
            };

            if (data.html) emailOptions.html = data.html;
            if (data.cc) emailOptions.cc = Array.isArray(data.cc) ? data.cc : [data.cc];
            if (data.bcc) emailOptions.bcc = Array.isArray(data.bcc) ? data.bcc : [data.bcc];
            if (data.replyTo) emailOptions.replyTo = data.replyTo;

            if (data.attachments?.length) {
                emailOptions.attachments = data.attachments.map((att) => ({
                    filename: att.filename,
                    content: att.content,
                }));
            }

            // ✨ Sanitize metadata tags
            if (data.metadata) {
                const metadataKeys = Object.keys(data.metadata);
                const sanitizedKeys = sanitizeEmailTags(metadataKeys);

                emailOptions.tags = sanitizedKeys.map((key) => ({
                    name: key,
                    value: String(data.metadata![key]),
                }));
            }

            const result = await resend.emails.send(emailOptions);

            if (result.error) {
                throw new Error(`Resend API error: ${result.error.message}`);
            }

            logger.info('Email sent successfully via Resend', {
                provider: 'resend',
                messageId: result.data?.id,
            });

            return {
                success: true,
                messageId: result.data?.id,
            };
        } catch (error) {
            logger.error('Resend email failed', error instanceof Error ? error : undefined, {
                provider: 'resend',
                to: Array.isArray(data.to) ? data.to.length : 1,
            });

            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }
}
