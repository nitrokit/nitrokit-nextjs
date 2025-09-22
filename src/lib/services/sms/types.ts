export interface SMSResult {
    success: boolean;
    messageId?: string;
    error?: string;
    retryAfter?: number;
}

export interface SMSProvider {
    sendSMS(phoneNumber: string, message: string): Promise<SMSResult>;
    validateConfig(): void;
}

export interface BaseProviderConfig {
    provider: string;
}
