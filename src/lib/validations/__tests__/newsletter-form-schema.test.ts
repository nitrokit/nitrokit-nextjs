import { z, ZodError } from 'zod';
import { describe, it, expect, vi } from 'vitest';
import {
    NewsletterConfirmResponseSchema,
    NewsletterFormSchema,
    NewsletterSubscriptionResponseSchema
} from '../newsletter-form-schema';

// Define the Mock translation function
const mockT = vi.fn((key: string) => `MOCK_MESSAGE_${key.toUpperCase()}`);

describe('Newsletter Zod Schemas Validation', () => {
    // -----------------------------------------------------------
    // NewsletterFormSchema Tests (Email Input Validation)
    // -----------------------------------------------------------
    describe('NewsletterFormSchema Validation', () => {
        const formSchema = NewsletterFormSchema(mockT);

        it('should successfully parse a valid email address', () => {
            const validData = { email: 'test@example.com' };
            expect(() => formSchema.parse(validData)).not.toThrow();
            expect(formSchema.parse(validData)).toEqual(validData);
        });
    });

    // -----------------------------------------------------------
    // NewsletterConfirmResponseSchema Tests (API Response Structure)
    // -----------------------------------------------------------
    describe('NewsletterConfirmResponseSchema Validation', () => {
        const schema = NewsletterConfirmResponseSchema;

        it('should successfully parse a minimal success response', () => {
            const data = { success: true };
            expect(() => schema.parse(data)).not.toThrow();
            expect(schema.parse(data)).toEqual(data);
        });

        it('should successfully parse a success response with a message', () => {
            const data = { success: true, message: 'Confirmed successfully.' };
            expect(() => schema.parse(data)).not.toThrow();
            expect(schema.parse(data)).toEqual(data);
        });

        it('should successfully parse a failure response with an error', () => {
            const data = { success: false, error: 'Token expired.' };
            expect(() => schema.parse(data)).not.toThrow();
            expect(schema.parse(data)).toEqual(data);
        });

        it('should fail if success field is missing or wrong type', () => {
            const data = { message: 'no success field' };
            expect(() => schema.parse(data)).toThrow(ZodError);

            const dataInvalidType = { success: 'true' };
            expect(() => schema.parse(dataInvalidType)).toThrow(ZodError);
        });
    });

    // -----------------------------------------------------------
    // NewsletterSubscriptionResponseSchema Tests (API Response Structure)
    // -----------------------------------------------------------
    describe('NewsletterSubscriptionResponseSchema Validation', () => {
        const schema = NewsletterSubscriptionResponseSchema;

        it('should successfully parse a minimal success response', () => {
            const data = { success: true };
            expect(() => schema.parse(data)).not.toThrow();
            expect(schema.parse(data)).toEqual(data);
        });

        it('should successfully parse a failure response with an error message', () => {
            const data = { success: false, error: 'Already subscribed.' };
            expect(() => schema.parse(data)).not.toThrow();
            expect(schema.parse(data)).toEqual(data);
        });

        it('should fail if success field is missing', () => {
            const data = { error: 'Missing success status.' };
            expect(() => schema.parse(data)).toThrow(ZodError);
        });
    });
});
