import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimitManager } from '@nitrokit/core';
import { getTranslations } from 'next-intl/server';

export async function GET(req: Request) {
    const translate = await getTranslations();
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json(
                { success: false, error: translate('common.newsletter.invalidToken') },
                { status: 400 }
            );
        }

        if (!rateLimitManager.isAvailable()) {
            return NextResponse.json(
                { success: false, error: translate('common.errors.rate_limit_unavailable') },
                { status: 500 }
            );
        }

        //ToDo: Enable rate limiting after testing
        // const rate = await apiRateLimit.limit(`newsletter-confirm-${token}`);
        // if (!rate.success) {
        //     return new NextResponse(
        //         JSON.stringify({
        //             success: false,
        //             error: translate('common.errors.rate_limit_exceeded'),
        //         }),
        //         {
        //             status: 429,
        //             headers: getRateLimitHeaders(rate),
        //         }
        //     );
        // }

        const subscriber = await prisma.newsletterSubscriber.findFirst({ where: { token } });
        if (!subscriber) {
            return NextResponse.json(
                { success: false, error: translate('common.newsletter.invalidToken') },
                { status: 404 }
            );
        }

        if (subscriber.verified) {
            return NextResponse.json({
                success: true,
                message: translate('common.newsletter.alreadySubscribed')
            });
        }

        await prisma.newsletterSubscriber.update({
            where: { id: subscriber.id },
            data: { verified: true, verifiedAt: new Date(), token: null }
        });

        return NextResponse.json({
            success: true,
            message: translate('common.newsletter.confirmSuccess')
        });
    } catch {
        return NextResponse.json(
            { success: false, error: translate('common.errors.general') },
            { status: 500 }
        );
    }
}
