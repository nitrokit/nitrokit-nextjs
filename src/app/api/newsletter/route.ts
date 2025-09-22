import { env } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        // Resend API configuration
        const resendApiKey = env.RESEND_API_KEY;
        const audienceId = env.RESEND_AUDIENCE_ID;

        if (!resendApiKey || !audienceId) {
            console.error('Missing Resend configuration');
            return NextResponse.json(
                { error: 'Newsletter service not configured' },
                { status: 500 }
            );
        }

        // Add contact to Resend Audience
        const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                first_name: '',
                last_name: '',
                unsubscribed: false,
            }),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Resend API Error:', errorData);

            // Check if email already exists
            if (response.status === 400 && errorData.includes('already exists')) {
                return NextResponse.json({ error: 'Email is already subscribed' }, { status: 400 });
            }

            return NextResponse.json(
                { error: 'Failed to subscribe to newsletter' },
                { status: 500 }
            );
        }

        const result = await response.json();
        console.log('Successfully added contact:', result);

        return NextResponse.json({
            message: 'Successfully subscribed to newsletter!',
            success: true,
        });
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
