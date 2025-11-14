import { PushNotificationProvider } from '../types';
import { createFCMProvider, FCMProviderConfig } from './fcm';
import { unsupportedServiceError } from '@/lib';

export type PushProviderType = 'fcm' | 'onesignal';

export interface PushProviderConfig {
    fcm?: FCMProviderConfig;
    onesignal?: unknown;
}

export function createPushNotificationProvider(
    providerType: PushProviderType,
    config: PushProviderConfig
): PushNotificationProvider {
    switch (providerType) {
        case 'fcm':
            if (!config.fcm) throw new Error('FCM provider config is missing');
            return createFCMProvider(config.fcm);
        default:
            unsupportedServiceError('Push Notification Provider', providerType);
    }
}
