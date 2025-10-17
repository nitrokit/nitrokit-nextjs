import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
    requestConfig: './src/lib/i18n/request.ts',
    experimental: {
        createMessagesDeclaration: './messages/declarations.json'
    }
});

const config: NextConfig = {
    trailingSlash: true,
    typedRoutes: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
                pathname: '/**'
            }
        ]
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    }
                ]
            },
            {
                source: '/sw.js',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/javascript; charset=utf-8'
                    },
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self'"
                    }
                ]
            }
        ];
    }
};

export default withNextIntl(config);
