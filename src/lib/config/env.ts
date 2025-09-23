import { z } from 'zod';

import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
    server: {
        GOOGLE_SITE_VERIFICATION: z.string().optional(),
        GOOGLE_ANALYTICS: z.string().optional(),
        YANDEX_VERIFICATION: z.string().optional(),
        RESEND_API_KEY: z.string().optional(),
        RESEND_FROM_EMAIL: z.string().optional(),
        RESEND_AUDIENCE_ID: z.string().optional(),
    },
    client: {},
    runtimeEnv: {
        GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
        GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
        YANDEX_VERIFICATION: process.env.YANDEX_VERIFICATION,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
        RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
    },
});
