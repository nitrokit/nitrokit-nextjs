import { createPushNotificationProvider, PushProviderConfig, PushProviderType } from './providers';
import {
    PushNotificationProvider,
    PushNotificationData,
    PushNotificationResult,
    BulkPushNotificationResult
} from './types';

export class PushNotificationService {
    private provider: PushNotificationProvider;
    private providerType: PushProviderType;

    constructor(providerType: PushProviderType, config: PushProviderConfig) {
        this.providerType = providerType;
        this.provider = createPushNotificationProvider(providerType, config);
    }

    async sendNotification(data: PushNotificationData): Promise<PushNotificationResult> {
        try {
            this.validateNotificationData(data);

            // Rate limiting eklenebilir.

            const result = await this.provider.sendNotification(data);

            return result;
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    async sendBulkNotifications(
        notifications: PushNotificationData[],
        batchSize: number = 100
    ): Promise<BulkPushNotificationResult> {
        const results: PushNotificationResult[] = [];
        let successful = 0;

        for (let i = 0; i < notifications.length; i += batchSize) {
            const batch = notifications.slice(i, i + batchSize);
            const batchPromises = batch.map((notificationData) =>
                this.sendNotification(notificationData)
            );
            const batchResults = await Promise.allSettled(batchPromises);

            batchResults.forEach((result) => {
                if (result.status === 'fulfilled') {
                    results.push(result.value);
                    if (result.value.success) successful++;
                } else {
                    results.push({
                        success: false,
                        error:
                            result.reason instanceof Error ? result.reason.message : 'Unknown error'
                    });
                }
            });
        }

        return {
            total: notifications.length,
            successful,
            failed: notifications.length - successful,
            results
        };
    }

    private validateNotificationData(data: PushNotificationData): void {
        if (!data.to || (Array.isArray(data.to) && data.to.length === 0)) {
            throw new Error('Recipient token/topic is required');
        }
        if (!data.title) throw new Error('Notification title is required');
        if (!data.body) throw new Error('Notification body is required');
    }

    public getProviderType(): PushProviderType {
        return this.providerType;
    }
}
