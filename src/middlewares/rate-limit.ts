import { rateLimitManager } from '@nitrokit/core';
import { NextRequest, NextResponse } from 'next/server';

export async function handleRateLimit(request: NextRequest) {
    if (process.env.NODE_ENV === 'development') {
        return NextResponse.next();
    }

    const ip =
        (request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip')) ||
        // NextRequest may expose ip in some environments; fallback olarak 'anonymous'
        // (request.ip is not standard on NextRequest but included for robustness if available)
        // @ts-ignore
        (request.ip as string) ||
        'anonymous';

    try {
        // rateLimitManager, rate limiter yoksa fallback sonucu döndürür
        const rate = await rateLimitManager.checkApiRateLimit(ip);

        // Eğer bloke ise 429 dön ve header'ları ekle
        if (rate.blocked) {
            return NextResponse.json(
                {
                    error: 'Too many requests',
                    rateLimit: {
                        limit: rate.limit,
                        remaining: 0,
                        reset: new Date(rate.reset).toISOString()
                    }
                },
                {
                    status: 429,
                    headers: rateLimitManager.getRateLimitHeaders(rate)
                }
            );
        }

        // Başarılıysa response oluşturup header'ları ekleyin
        const response = NextResponse.next();
        const headers = rateLimitManager.getRateLimitHeaders(rate);
        response.headers.set('X-RateLimit-Limit', headers['X-RateLimit-Limit']);
        response.headers.set('X-RateLimit-Remaining', headers['X-RateLimit-Remaining']);
        response.headers.set('X-RateLimit-Reset', headers['X-RateLimit-Reset']);

        return response;
    } catch (error) {
        // Hata olursa (Upstash hatası vb.) isteği engellemek yerine geçiş yaptırıyoruz
        console.error('Rate limit error (bypassing):', error);
        return NextResponse.next();
    }
}
