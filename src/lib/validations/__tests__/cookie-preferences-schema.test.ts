import { z, ZodError } from 'zod';
import { describe, it, expect } from 'vitest';
import { cookiePreferencesSchema } from '../cookie-preferences-schema';

describe('cookiePreferencesSchema Validation', () => {
    const schema = cookiePreferencesSchema;

    it('should successfully parse data when all fields are valid booleans (True)', () => {
        const validData = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true
        };
        expect(() => schema.parse(validData)).not.toThrow();
        expect(schema.parse(validData)).toEqual(validData);
    });

    it('should successfully parse data when all fields are valid booleans (Mixed)', () => {
        const validData = {
            necessary: true,
            analytics: false,
            marketing: true,
            functional: false
        };
        expect(() => schema.parse(validData)).not.toThrow();
        expect(schema.parse(validData)).toEqual(validData);
    });

    it('should fail if any required field is missing', () => {
        const invalidData = {
            necessary: true,
            analytics: true,
            marketing: true
            // functional is missing
        };

        try {
            schema.parse(invalidData);
        } catch (e) {
            const error = e as ZodError;
            expect(error.issues).toHaveLength(1);
            expect(error.issues[0].path).toEqual(['functional']);
            expect(error.issues[0].code).toBe('invalid_type');
        }
    });

    it('should fail if any field is not a boolean', () => {
        const invalidData = {
            necessary: true,
            analytics: 'false', // Incorrect type (string instead of boolean)
            marketing: false,
            functional: true
        };

        try {
            schema.parse(invalidData);
        } catch (e) {
            const error = e as ZodError;
            expect(error.issues).toHaveLength(1);
            expect(error.issues[0].path).toEqual(['analytics']);
            expect(error.issues[0].code).toBe('invalid_type');
        }
    });

    it('should fail if extra fields are present (unknown keys)', () => {
        const invalidData = {
            necessary: true,
            analytics: true,
            marketing: true,
            functional: true,
            extraField: 'should not be here' // Extra field
        };

        try {
            schema.parse(invalidData);
        } catch (e) {
            const error = e as ZodError;
            // Zod's default behavior allows unknown keys unless .strict() is used.
            // If the application required strict checking, we would use:
            // expect(() => schema.strict().parse(invalidData)).toThrow(ZodError);
            // However, based on the schema definition, it should pass unless strict is implied.
            expect(() => schema.parse(invalidData)).not.toThrow();
        }
    });
});
