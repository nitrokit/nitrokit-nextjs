import { EmailService } from './email-service';
import { EmailProviderType, EmailProviderConfig } from './providers';
import { logger } from '@/lib/services/logger';

let emailService: EmailService;

export function getEmailService(): EmailService {
    if (!emailService) {
        const providerType = (process.env.EMAIL_PROVIDER as EmailProviderType) || 'resend';

        logger.info('Initializing Email Service', { provider: providerType });

        const config: EmailProviderConfig = {};

        switch (providerType) {
            case 'resend':
                config.resend = {
                    apiKey: process.env.RESEND_API_KEY!,
                    from: process.env.RESEND_FROM_EMAIL!
                };
                break;

            default:
                throw new Error(`Unsupported email provider: ${providerType}`);
        }

        emailService = new EmailService(providerType, config);
    }

    return emailService;
}

export * from './types';
export * from './providers';
export { EmailService } from './email-service';
