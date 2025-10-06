import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { SMSProvider, SMSResult } from '../types';
import { logger } from '@/lib/services/logger';

export interface AWSConfig {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
}

export class AWSProvider implements SMSProvider {
    private snsClient: SNSClient;

    constructor(private config: AWSConfig) {
        this.validateConfig();
        this.snsClient = new SNSClient({
            region: this.config.region,
            credentials: {
                accessKeyId: this.config.accessKeyId,
                secretAccessKey: this.config.secretAccessKey
            }
        });
    }

    validateConfig(): void {
        if (!this.config.accessKeyId) {
            throw new Error('AWS access key ID is required');
        }
        if (!this.config.secretAccessKey) {
            throw new Error('AWS secret access key is required');
        }
        if (!this.config.region) {
            throw new Error('AWS region is required');
        }
    }

    async sendSMS(phoneNumber: string, message: string): Promise<SMSResult> {
        try {
            logger.info('Sending SMS via AWS SNS', {
                provider: 'aws',
                phoneNumber: phoneNumber.slice(-4), // Log only last 4 digits
                messageLength: message.length
            });

            const command = new PublishCommand({
                PhoneNumber: phoneNumber,
                Message: message,
                MessageAttributes: {
                    'AWS.SNS.SMS.SMSType': {
                        DataType: 'String',
                        StringValue: 'Transactional'
                    }
                }
            });

            const result = await this.snsClient.send(command);

            logger.info('SMS sent successfully via AWS SNS', {
                provider: 'aws',
                messageId: result.MessageId
            });

            return {
                success: true,
                messageId: result.MessageId
            };
        } catch (error) {
            logger.error('AWS SNS SMS failed', error instanceof Error ? error : undefined, {
                provider: 'aws',
                phoneNumber: phoneNumber.slice(-4)
            });

            throw error;
        }
    }
}
