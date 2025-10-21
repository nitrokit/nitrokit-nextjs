import { ContactFormSchema, ContactFormData } from '../contact-form-schema';
import { describe, it, expect, vi } from 'vitest';
import { ZodError } from 'zod';

// Mock the translation function (t) to control error messages
const mockT = vi.fn((key: string) => `MOCK_MESSAGE_${key.toUpperCase()}`);

describe('Contact Form Zod Schema Validation', () => {
    // Schema instance using the mock translation function
    const schema = ContactFormSchema(mockT);

    // --- Success Case ---

    it('should successfully parse valid contact data', () => {
        const validData: ContactFormData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            message: 'This is a test message.'
        };

        // Expect the parse to succeed without throwing an error
        expect(() => schema.parse(validData)).not.toThrow();

        // Check if the output matches the input
        expect(schema.parse(validData)).toEqual(validData);
    });

    // --- Failure Cases (Individual Fields) ---

    describe('Failure Cases', () => {
        // Test 1: Empty Fields (name, message)
        it('should fail validation and return required messages for empty fields', () => {
            const invalidData = {
                name: '', // Required
                email: 'test@test.com',
                message: '' // Required
            };

            try {
                schema.parse(invalidData);
            } catch (e) {
                const error = e as ZodError;
                const fieldErrors = error.flatten().fieldErrors as Record<string, string[]>;

                expect(fieldErrors.name).toEqual(['MOCK_MESSAGE_VALIDATIONS.REQUIRED.NAME']);
                expect(fieldErrors.message).toEqual(['MOCK_MESSAGE_VALIDATIONS.REQUIRED.MESSAGE']);

                // Ensure no unexpected errors
                expect(fieldErrors.email).toBeUndefined();
            }
        });

        // Test 2: Name minimum length check
        it('should fail if name is shorter than 3 characters', () => {
            const invalidData = {
                name: 'Jo', // Too short
                email: 'test@test.com',
                message: 'a'
            };

            try {
                schema.parse(invalidData);
            } catch (e) {
                const error = e as ZodError;
                const fieldErrors = error.flatten().fieldErrors as Record<string, string[]>;

                expect(fieldErrors.name).toEqual(['MOCK_MESSAGE_VALIDATIONS.REQUIRED.NAME']);
                expect(fieldErrors.email).toBeUndefined();
            }
        });

        // Test 3: Email format check
        it('should fail if email is not in a valid format', () => {
            const invalidData = {
                name: 'Valid Name',
                email: 'not-an-email', // Invalid format
                message: 'a'
            };

            try {
                schema.parse(invalidData);
            } catch (e) {
                const error = e as ZodError;
                const fieldErrors = error.flatten().fieldErrors as Record<string, string[]>;

                expect(fieldErrors.email).toEqual(['MOCK_MESSAGE_VALIDATIONS.INVALID.EMAIL']);
                expect(fieldErrors.name).toBeUndefined();
            }
        });

        // Test 4: Missing email
        it('should fail with required message if email is empty', () => {
            const invalidData = {
                name: 'Valid Name',
                email: '', // Empty
                message: 'a'
            };

            try {
                schema.parse(invalidData);
            } catch (e) {
                const error = e as ZodError;
                const fieldErrors = error.flatten().fieldErrors as Record<string, string[]>;

                expect(fieldErrors.email).toEqual([
                    'MOCK_MESSAGE_VALIDATIONS.REQUIRED.EMAIL',
                    'MOCK_MESSAGE_VALIDATIONS.INVALID.EMAIL' // Zod, boş dize için hem required hem invalid hatası döndürür.
                ]);
            }
        });
    });
});
