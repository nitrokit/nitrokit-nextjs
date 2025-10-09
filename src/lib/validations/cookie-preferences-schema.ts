import { z } from 'zod';

export const CookiePreferencesSchema = z.object({
    necessary: z.boolean(),
    analytics: z.boolean(),
    marketing: z.boolean(),
    functional: z.boolean()
});

export type CookiePreferences = z.infer<typeof CookiePreferencesSchema>;
