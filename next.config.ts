import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin({
    requestConfig: './src/lib/i18n/request.ts',
    experimental: {
        createMessagesDeclaration: './messages/en.json',
    },
});

const config: NextConfig = {};

export default withNextIntl(config);
