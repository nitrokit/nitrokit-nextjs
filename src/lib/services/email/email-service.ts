import { EmailProvider, EmailData, EmailResult, EmailTemplate, BulkEmailResult } from './types';
import { createEmailProvider, EmailProviderType, EmailProviderConfig } from './providers';
import { logger } from '@/lib/services/logger';

export class EmailService {
    private provider: EmailProvider;
    private providerType: EmailProviderType;
    private templates: Map<string, EmailTemplate> = new Map();

    private rateLimitMap = new Map<string, { count: number; resetTime: number }>();
    private readonly RATE_LIMIT = 100; // emails per hour
    private readonly RATE_WINDOW = 60 * 60 * 1000; // 1 hour

    constructor(providerType: EmailProviderType, config: EmailProviderConfig) {
        this.providerType = providerType;
        this.provider = createEmailProvider(providerType, config);

        logger.info('Email Service initialized', {
            provider: providerType
        });
    }

    async sendEmail(data: EmailData): Promise<EmailResult> {
        try {
            this.validateEmailData(data);

            if (!this.checkRateLimit(Array.isArray(data.to) ? data.to[0] : data.to)) {
                logger.warn('Email rate limit exceeded', {
                    to: Array.isArray(data.to) ? data.to[0] : data.to
                });

                return {
                    success: false,
                    error: 'Rate limit exceeded. Please try again later.'
                };
            }

            const processedData = this.processTemplate(data);

            const result = await this.provider.sendEmail(processedData);

            if (result.success) {
                logger.info('Email sent successfully', {
                    provider: this.providerType,
                    messageId: result.messageId,
                    to: Array.isArray(data.to) ? data.to.length : 1
                });
            }

            return result;
        } catch (error) {
            logger.error('Email service error', error instanceof Error ? error : undefined, {
                provider: this.providerType,
                to: Array.isArray(data.to) ? data.to.length : 1
            });

            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    async sendBulkEmails(
        emailsData: EmailData[],
        batchSize: number = 10
    ): Promise<BulkEmailResult> {
        const results: EmailResult[] = [];
        let successful = 0;

        logger.info('Starting bulk email send', {
            total: emailsData.length,
            batchSize,
            provider: this.providerType
        });

        for (let i = 0; i < emailsData.length; i += batchSize) {
            const batch = emailsData.slice(i, i + batchSize);
            const batchPromises = batch.map((emailData) => this.sendEmail(emailData));
            const batchResults = await Promise.allSettled(batchPromises);

            batchResults.forEach((result) => {
                if (result.status === 'fulfilled') {
                    results.push(result.value);
                    if (result.value.success) successful++;
                } else {
                    const errorMessage =
                        result.reason instanceof Error ? result.reason.message : 'Unknown error';

                    results.push({
                        success: false,
                        error: errorMessage
                    });
                }
            });

            // Delay between batches
            if (i + batchSize < emailsData.length) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }

        logger.info('Bulk email send completed', {
            total: emailsData.length,
            successful,
            failed: emailsData.length - successful,
            provider: this.providerType
        });

        return {
            total: emailsData.length,
            successful,
            failed: emailsData.length - successful,
            results
        };
    }

    registerTemplate(template: EmailTemplate): void {
        this.templates.set(template.id, template);
        logger.info('Email template registered', {
            templateId: template.id,
            name: template.name
        });
    }

    getTemplate(id: string): EmailTemplate | undefined {
        return this.templates.get(id);
    }

    async sendEmailWithTemplate(
        templateId: string,
        data: Omit<EmailData, 'html' | 'text' | 'subject'>,
        variables: Record<string, string | number | boolean>
    ): Promise<EmailResult> {
        const template = this.getTemplate(templateId);
        if (!template) {
            throw new Error(`Template not found: ${templateId}`);
        }

        return this.sendEmail({
            ...data,
            subject: this.replaceVariables(template.subject, variables),
            html: this.replaceVariables(template.html, variables),
            text: template.text ? this.replaceVariables(template.text, variables) : undefined,
            templateData: variables
        });
    }

    private validateEmailData(data: EmailData): void {
        if (!data.to || (Array.isArray(data.to) && data.to.length === 0)) {
            throw new Error('Recipient email is required');
        }
        if (!data.subject) throw new Error('Email subject is required');
        if (!data.text && !data.html) throw new Error('Email content (text or html) is required');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validateEmail = (email: string): void => {
            if (!emailRegex.test(email)) {
                throw new Error(`Invalid email format: ${email}`);
            }
        };

        if (Array.isArray(data.to)) {
            data.to.forEach(validateEmail);
        } else {
            validateEmail(data.to);
        }
    }

    private checkRateLimit(email: string): boolean {
        const now = Date.now();
        const limit = this.rateLimitMap.get(email);

        if (!limit || now > limit.resetTime) {
            this.rateLimitMap.set(email, { count: 1, resetTime: now + this.RATE_WINDOW });
            return true;
        }

        if (limit.count >= this.RATE_LIMIT) {
            return false;
        }

        limit.count++;
        return true;
    }

    private processTemplate(data: EmailData): EmailData {
        if (!data.templateData) return data;

        return {
            ...data,
            html: data.html ? this.replaceVariables(data.html, data.templateData) : data.html,
            text: data.text ? this.replaceVariables(data.text, data.templateData) : data.text,
            subject: this.replaceVariables(data.subject, data.templateData)
        };
    }

    private replaceVariables(
        content: string,
        variables: Record<string, string | number | boolean>
    ): string {
        let result = content;
        Object.entries(variables).forEach(([key, value]) => {
            const placeholder = new RegExp(`{{${key}}}`, 'g');
            result = result.replace(placeholder, String(value));
        });
        return result;
    }

    public getProviderType(): EmailProviderType {
        return this.providerType;
    }

    public cleanup(): void {
        const now = Date.now();
        for (const [email, data] of this.rateLimitMap.entries()) {
            if (now > data.resetTime) {
                this.rateLimitMap.delete(email);
            }
        }
    }
}
