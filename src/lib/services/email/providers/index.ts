import { unsupportedServiceError } from '@/lib';
import { EmailProvider } from '../types';
import { ResendProvider, ResendConfig } from './resend';

export type EmailProviderType = 'resend';

export interface EmailProviderConfig {
    resend?: ResendConfig;
}

export function createEmailProvider(
    providerType: EmailProviderType,
    config: EmailProviderConfig
): EmailProvider {
    switch (providerType) {
        case 'resend':
            if (!config.resend) throw new Error('Resend config is required');
            return new ResendProvider(config.resend);

        default:
            unsupportedServiceError('E-mail Provider', providerType);
    }
}

export { ResendProvider };
