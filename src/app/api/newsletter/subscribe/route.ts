import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';
import { getEmailService } from '@/lib/services/email';
import { NewsletterFormSchema } from '@/lib/validations';
import { getBaseUrl } from '@/lib/config';
import { render } from '@react-email/render';
import { NewsletterConfirmationEmail } from '@/components/emails';
import { emailResendRateLimit } from '@/lib/security/rate-limit';
import { getTranslations } from 'next-intl/server';

export async function POST(req: Request) {
    const translate = await getTranslations();
    try {
        const body = await req.json();
        const t = (key: string) => key;
        const schema = NewsletterFormSchema(t);
        const parsed = schema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: parsed.error.issues[0].message },
                { status: 400 }
            );
        }
        const { email } = parsed.data;

        if (!emailResendRateLimit) {
            return NextResponse.json(
                { success: false, error: translate('app.errors.rate_limit_unavailable') },
                { status: 500 }
            );
        }

        //ToDo: Rate limit by IP address too
        // const rate = await emailResendRateLimit.limit(email);
        // if (!rate.success) {
        //     return new NextResponse(
        //         JSON.stringify({
        //             success: false,
        //             error: translate('app.errors.rate_limit_exceeded'),
        //         }),
        //         {
        //             status: 429,
        //             headers: getRateLimitHeaders(rate),
        //         }
        //     );
        // }

        const emailToSearch = email.toLowerCase();
        const existing = await prisma.newsletterSubscriber.findUnique({
            where: {
                email: emailToSearch,
            },
        });

        if (existing && existing.verified) {
            return NextResponse.json(
                { success: false, error: translate('app.newsletter.alreadySubscribed') },
                { status: 409 }
            );
        }

        const token = randomUUID();
        await prisma.newsletterSubscriber.upsert({
            where: { email },
            update: { token, verified: false },
            create: { email, token },
        });

        const emailService = getEmailService();
        const confirmUrl = `${getBaseUrl()}?newsletter_confirm=${token}`;
        const emailHtml = await render(NewsletterConfirmationEmail({ confirmUrl }));

        await emailService.sendEmail({
            to: email,
            subject: translate('app.newsletter.subscriptionConfirmation'),
            html: emailHtml,
            text: translate('app.newsletter.confirmationLink', { confirmUrl }),
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { success: false, error: translate('app.errors.general') },
            { status: 500 }
        );
    }
}
