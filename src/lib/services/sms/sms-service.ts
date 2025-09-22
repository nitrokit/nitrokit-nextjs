import { SMSProvider, SMSResult } from './types';
import { createSMSProvider, SMSProviderType, SMSProviderConfig } from './providers';
import { logger } from '@/lib/services/logger';

export class SMSService {
    private provider: SMSProvider;
    private providerType: SMSProviderType;

    private readonly isRateLimitingEnabled = process.env.SMS_RATE_LIMITING_ENABLED === 'true';
    private failedAttempts = new Map<
        string,
        {
            count: number;
            lastFailure: number;
            blockedUntil?: number;
        }
    >();

    private readonly MAX_FAILURES = 3;
    private readonly BLOCK_DURATION = 5 * 60 * 1000; // 5 minutes
    private readonly FAILURE_WINDOW = 10 * 60 * 1000; // 10 minutes

    constructor(providerType: SMSProviderType, config: SMSProviderConfig) {
        this.providerType = providerType;
        this.provider = createSMSProvider(providerType, config);

        logger.info('SMS Service initialized', {
            provider: providerType,
            rateLimitingEnabled: this.isRateLimitingEnabled,
        });
    }

    async sendSMS(phoneNumber: string, message: string): Promise<SMSResult> {
        try {
            const blockCheck = this.checkIfBlocked(phoneNumber);
            if (blockCheck.blocked) {
                logger.warn('SMS sending blocked due to rate limiting', {
                    phoneNumber: phoneNumber.slice(-4),
                    retryAfter: blockCheck.retryAfter,
                });

                return {
                    success: false,
                    error: 'Rate limit exceeded',
                    retryAfter: blockCheck.retryAfter,
                };
            }

            const result = await this.provider.sendSMS(phoneNumber, message);

            if (result.success) {
                this.clearFailedAttempts(phoneNumber);
            } else {
                this.recordFailure(phoneNumber);
            }

            return result;
        } catch (error) {
            this.recordFailure(phoneNumber);

            logger.error('SMS Service error', error instanceof Error ? error : undefined, {
                provider: this.providerType,
                phoneNumber: phoneNumber.slice(-4),
            });

            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to send SMS',
                retryAfter: this.isRateLimitingEnabled ? this.getRetryDelay(phoneNumber) : 0,
            };
        }
    }

    private checkIfBlocked(phoneNumber: string): { blocked: boolean; retryAfter?: number } {
        if (!this.isRateLimitingEnabled) return { blocked: false };

        const attempt = this.failedAttempts.get(phoneNumber);
        if (!attempt) return { blocked: false };

        const now = Date.now();

        if (attempt.blockedUntil && now < attempt.blockedUntil) {
            return {
                blocked: true,
                retryAfter: Math.ceil((attempt.blockedUntil - now) / 1000),
            };
        }

        if (now - attempt.lastFailure > this.FAILURE_WINDOW) {
            this.clearFailedAttempts(phoneNumber);
            return { blocked: false };
        }

        if (attempt.count >= this.MAX_FAILURES) {
            const blockedUntil = now + this.BLOCK_DURATION;
            this.failedAttempts.set(phoneNumber, {
                ...attempt,
                blockedUntil,
            });

            return {
                blocked: true,
                retryAfter: Math.ceil(this.BLOCK_DURATION / 1000),
            };
        }

        return { blocked: false };
    }

    private recordFailure(phoneNumber: string): void {
        if (!this.isRateLimitingEnabled) return;

        const now = Date.now();
        const existing = this.failedAttempts.get(phoneNumber);

        if (existing && now - existing.lastFailure < this.FAILURE_WINDOW) {
            this.failedAttempts.set(phoneNumber, {
                count: existing.count + 1,
                lastFailure: now,
            });
        } else {
            this.failedAttempts.set(phoneNumber, {
                count: 1,
                lastFailure: now,
            });
        }
    }

    private clearFailedAttempts(phoneNumber: string): void {
        this.failedAttempts.delete(phoneNumber);
    }

    private getRetryDelay(phoneNumber: string): number {
        if (!this.isRateLimitingEnabled) return 0;

        const attempt = this.failedAttempts.get(phoneNumber);
        if (!attempt) return 0;

        if (attempt.blockedUntil) {
            return Math.ceil((attempt.blockedUntil - Date.now()) / 1000);
        }

        const baseDelay = 30;
        return Math.min(baseDelay * attempt.count, 300);
    }

    public cleanup(): void {
        if (!this.isRateLimitingEnabled) return;

        const now = Date.now();
        const expiredThreshold = now - this.FAILURE_WINDOW;

        for (const [phoneNumber, attempt] of this.failedAttempts.entries()) {
            if (
                attempt.lastFailure < expiredThreshold &&
                (!attempt.blockedUntil || now > attempt.blockedUntil)
            ) {
                this.failedAttempts.delete(phoneNumber);
            }
        }
    }

    public getProviderType(): SMSProviderType {
        return this.providerType;
    }

    public isRateLimitingActive(): boolean {
        return this.isRateLimitingEnabled;
    }
}
