import twilio, { Twilio } from 'twilio';
import { SMSProvider, SMSResult } from '../types';
import { logger } from '@/lib/services/logger';

export interface TwilioConfig {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
}

export class TwilioProvider implements SMSProvider {
    private client: Twilio;

    constructor(private config: TwilioConfig) {
        this.validateConfig();
        this.client = twilio(this.config.accountSid, this.config.authToken);
    }

    validateConfig(): void {
        if (!this.config.accountSid) {
            throw new Error('Twilio Account SID is required');
        }
        if (!this.config.authToken) {
            throw new Error('Twilio Auth Token is required');
        }
        if (!this.config.phoneNumber) {
            throw new Error('Twilio Phone Number is required');
        }
    }

    async sendSMS(phoneNumber: string, message: string): Promise<SMSResult> {
        try {
            logger.info('Sending SMS via Twilio', {
                provider: 'twilio',
                from: this.config.phoneNumber,
                to: phoneNumber.slice(-4),
                messageLength: message.length
            });

            const result = await this.client.messages.create({
                body: message,
                from: this.config.phoneNumber,
                to: phoneNumber
            });

            logger.info('SMS sent successfully via Twilio', {
                provider: 'twilio',
                messageId: result.sid,
                status: result.status
            });

            return {
                success: true,
                messageId: result.sid
            };
        } catch (error) {
            logger.error('Twilio SMS failed', error instanceof Error ? error : undefined, {
                provider: 'twilio',
                phoneNumber: phoneNumber.slice(-4)
            });

            throw error;
        }
    }
}
