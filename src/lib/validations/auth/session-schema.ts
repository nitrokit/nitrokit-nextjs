import { z } from 'zod';

export interface SessionTokenRequestBody {
    sessionToken: string;
    userAgent: string;
    ip?: string;
}

export const SessionTokenRequestSchema = z.object({
    sessionToken: z.string().min(1, 'Session token must not be empty'),
    userAgent: z.string().min(1, 'User agent must not be empty'),
    ip: z.string().optional()
});

export type SessionTokenRequestBodyType = z.infer<typeof SessionTokenRequestSchema>;
