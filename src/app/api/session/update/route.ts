import { updateSessionInfo } from '@/lib/auth/session-tracking';
import {
    SessionTokenRequestBody,
    SessionTokenRequestSchema
} from '@/lib/validations/auth/session-schema';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
    try {
        const rawBody: unknown = await request.json();
        const validatedData: SessionTokenRequestBody = SessionTokenRequestSchema.parse(rawBody);
        const { sessionToken, userAgent, ip } = validatedData;

        await updateSessionInfo(sessionToken, {
            userAgent: userAgent,
            ip: ip || null
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Invalid request body', details: error.issues },
                { status: 400 }
            );
        }

        console.error('Session Update API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
