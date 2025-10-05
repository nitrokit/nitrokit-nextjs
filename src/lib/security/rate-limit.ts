import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let redis: Redis | null = null;

try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        redis = new Redis({
            url: process.env.UPSTASH_REDIS_REST_URL,
            token: process.env.UPSTASH_REDIS_REST_TOKEN
        });
    }
} catch (error) {
    console.log(error);
    redis = null;
}

export const apiRateLimit = redis
    ? new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
          analytics: true,
          prefix: 'api'
      })
    : null;

export const emailResendRateLimit = redis
    ? new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 attempts per hour
          analytics: true,
          prefix: 'email_resend'
      })
    : null;

export const authRateLimit = redis
    ? new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 attempts per 15 minutes
          analytics: true,
          prefix: 'auth'
      })
    : null;

export const smsRateLimit = redis
    ? new Ratelimit({
          redis,
          limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 SMS per hour
          analytics: true,
          prefix: 'sms'
      })
    : null;

export const fallbackRateLimit = {
    limit: async (key: string) => {
        console.log(key);
        return {
            success: true,
            limit: 100,
            remaining: 99,
            reset: Date.now() + 60000
        };
    }
};

export async function checkRateLimit(
    rateLimit: Ratelimit | null,
    identifier: string
): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
    blocked?: boolean;
}> {
    try {
        if (!rateLimit) {
            return fallbackRateLimit.limit(identifier);
        }

        const result = await rateLimit.limit(identifier);

        return {
            ...result,
            blocked: !result.success
        };
    } catch (error) {
        console.error('Rate limit error:', error);
        return fallbackRateLimit.limit(identifier);
    }
}

// Utility functions
export function getRateLimitHeaders(result: {
    limit: number;
    remaining: number;
    reset: number;
}): Record<string, string> {
    return {
        'X-RateLimit-Limit': result.limit.toString(),
        'X-RateLimit-Remaining': result.remaining.toString(),
        'X-RateLimit-Reset': result.reset.toString()
    };
}

export function isRateLimited(result: { success: boolean }): boolean {
    return !result.success;
}
