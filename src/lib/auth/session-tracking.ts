import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

interface DeviceInfo {
    deviceType: 'desktop' | 'mobile' | 'tablet';
    browser: string;
    os: string;
}

export function parseUserAgent(userAgent: string): DeviceInfo {
    const ua = userAgent.toLowerCase();

    let deviceType: 'desktop' | 'mobile' | 'tablet' = 'desktop';
    if (/mobile|android|iphone|ipad|phone/i.test(ua)) {
        deviceType = /ipad|tablet/i.test(ua) ? 'tablet' : 'mobile';
    }

    let browser = 'Unknown';
    if (ua.includes('chrome') && !ua.includes('edg')) browser = 'Chrome';
    else if (ua.includes('firefox')) browser = 'Firefox';
    else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari';
    else if (ua.includes('edg')) browser = 'Edge';
    else if (ua.includes('opera')) browser = 'Opera';

    // OS Detection
    let os = 'Unknown';
    if (ua.includes('windows')) os = 'Windows';
    else if (ua.includes('mac')) os = 'macOS';
    else if (ua.includes('linux')) os = 'Linux';
    else if (ua.includes('android')) os = 'Android';
    else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';

    return { deviceType, browser, os };
}

export async function getLocationFromIP(ip: string): Promise<string> {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        if (response.ok) {
            const data = await response.json();
            return `${data.city}, ${data.country_name}`;
        }
    } catch (error) {
        console.error('Failed to get location:', error);
    }
    return 'Unknown Location';
}

export function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');

    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    if (realIP) {
        return realIP;
    }

    return '127.0.0.1';
}

export async function updateSessionInfo(
    sessionToken: string,
    info: { userAgent: string; ip: string | null }
) {
    try {
        const userAgent = info.userAgent || '';
        const deviceInfo = parseUserAgent(userAgent);
        const ipAddress = info.ip;

        const existingSession = await prisma.session.findUnique({
            where: { sessionToken }
        });

        if (!existingSession) {
            console.log('Session not found in database, skipping update');
            return;
        }

        const location = `${ipAddress} Location`;

        await prisma.session.update({
            where: { sessionToken },
            data: {
                ipAddress,
                userAgent,
                deviceType: deviceInfo.deviceType,
                browser: deviceInfo.browser,
                os: deviceInfo.os,
                location,
                lastActive: new Date()
            }
        });
    } catch (error) {
        console.error('Failed to update session info:', error);
    }
}

export async function createOrUpdateSessionInfo(
    sessionToken: string,
    userId: string,
    request: NextRequest
) {
    try {
        const userAgent = request.headers.get('user-agent') || '';
        const ipAddress = getClientIP(request);
        const deviceInfo = parseUserAgent(userAgent);
        const location = `${ipAddress} Location`;

        await prisma.session.upsert({
            where: { sessionToken },
            update: {
                ipAddress,
                userAgent,
                deviceType: deviceInfo.deviceType,
                browser: deviceInfo.browser,
                os: deviceInfo.os,
                location,
                lastActive: new Date()
            },
            create: {
                sessionToken,
                userId,
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
                ipAddress,
                userAgent,
                deviceType: deviceInfo.deviceType,
                browser: deviceInfo.browser,
                os: deviceInfo.os,
                location,
                lastActive: new Date()
            }
        });
    } catch (error) {
        console.error('Failed to create/update session info:', error);
    }
}
