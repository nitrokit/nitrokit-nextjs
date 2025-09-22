import { SMSProvider } from '../types';
import { AWSProvider, AWSConfig } from './aws';
import { TwilioProvider, TwilioConfig } from './twilio';

export type SMSProviderType = 'aws' | 'twilio';

export interface SMSProviderConfig {
    aws?: AWSConfig;
    twilio?: TwilioConfig;
}

export function createSMSProvider(
    providerType: SMSProviderType,
    config: SMSProviderConfig
): SMSProvider {
    switch (providerType) {
        case 'aws':
            if (!config.aws) throw new Error('AWS config is required');
            return new AWSProvider(config.aws);

        case 'twilio':
            if (!config.twilio) throw new Error('Twilio config is required');
            return new TwilioProvider(config.twilio);

        default:
            throw new Error(`Unsupported SMS provider: ${providerType}`);
    }
}

export { AWSProvider, TwilioProvider };
