import { PushProviderConfig, PushProviderType } from './providers';
import { PushNotificationService } from './push-notification-service';
import { unsupportedServiceError } from '@/lib';

let pushNotificationService: PushNotificationService;

export function getPushNotificationService(): PushNotificationService {
    if (!pushNotificationService) {
        const providerType = (process.env.PUSH_PROVIDER as PushProviderType) || 'fcm';

        const config: PushProviderConfig = {};

        switch (providerType) {
            case 'fcm':
                if (!process.env.FCM_SERVICE_ACCOUNT) {
                    throw new Error('FCM_SERVICE_ACCOUNT environment variable is not set.');
                }
                config.fcm = {
                    serviceAccount: process.env.FCM_SERVICE_ACCOUNT
                };
                break;

            default:
                unsupportedServiceError('Push Notification Provider', providerType);
        }

        pushNotificationService = new PushNotificationService(providerType, config);
    }

    return pushNotificationService;
}

export * from './types';
export { PushNotificationService } from './push-notification-service';
