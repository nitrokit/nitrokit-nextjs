import { NextRequest, NextResponse } from 'next/server';
import { apiRateLimit, fallbackRateLimit } from '@/lib/security/rate-limit';

export async function handleRateLimit(request: NextRequest) {
    if (process.env.NODE_ENV === 'development') {
        return NextResponse.next();
    }

    const ip =
        request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'anonymous';

    try {
        const rateLimit = apiRateLimit || fallbackRateLimit;
        const { success, limit, remaining, reset } = await rateLimit.limit(ip);

        if (!success) {
            return NextResponse.json(
                {
                    error: 'Too many requests',
                    rateLimit: {
                        limit,
                        remaining: 0,
                        reset: new Date(reset).toISOString(),
                    },
                },
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': limit.toString(),
                        'X-RateLimit-Remaining': '0',
                        'X-RateLimit-Reset': new Date(reset).toISOString(),
                    },
                }
            );
        }

        const response = NextResponse.next();
        response.headers.set('X-RateLimit-Limit', limit.toString());
        response.headers.set('X-RateLimit-Remaining', remaining.toString());
        response.headers.set('X-RateLimit-Reset', new Date(reset).toISOString());

        return response;
    } catch (error) {
        console.error('Rate limit error (bypassing):', error);
        return NextResponse.next();
    }
}
