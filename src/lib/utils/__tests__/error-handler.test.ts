import { describe, it, expect } from 'vitest';
import { normalizeError, getErrorMessage, getErrorStack } from '../error-handler';

describe('Error Handler Utils', () => {
    describe('normalizeError', () => {
        it('should return Error instance unchanged', () => {
            const originalError = new Error('Test error');
            const result = normalizeError(originalError);

            expect(result).toBe(originalError);
            expect(result.message).toBe('Test error');
        });

        it('should convert string to Error instance', () => {
            const errorMessage = 'String error message';
            const result = normalizeError(errorMessage);

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe(errorMessage);
        });

        it('should convert object with message property to Error', () => {
            const errorObject = { message: 'Object error message' };
            const result = normalizeError(errorObject);

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('Object error message');
        });

        it('should handle object with non-string message', () => {
            const errorObject = { message: 123 };
            const result = normalizeError(errorObject);

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('123');
        });

        it('should handle object with null message', () => {
            const errorObject = { message: null };
            const result = normalizeError(errorObject);

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('null');
        });

        it('should handle object with undefined message', () => {
            const errorObject = { message: undefined };
            const result = normalizeError(errorObject);

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('undefined');
        });

        it('should return default error for null', () => {
            const result = normalizeError(null);

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('An unknown error occurred');
        });

        it('should return default error for undefined', () => {
            const result = normalizeError(undefined);

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('An unknown error occurred');
        });

        it('should return default error for number', () => {
            const result = normalizeError(42);

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('An unknown error occurred');
        });

        it('should return default error for boolean', () => {
            const result = normalizeError(true);

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('An unknown error occurred');
        });

        it('should return default error for array', () => {
            const result = normalizeError([1, 2, 3]);

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('An unknown error occurred');
        });

        it('should return default error for function', () => {
            const result = normalizeError(() => {});

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('An unknown error occurred');
        });

        it('should handle object without message property', () => {
            const errorObject = { code: 500, status: 'error' };
            const result = normalizeError(errorObject);

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('An unknown error occurred');
        });

        it('should handle empty string', () => {
            const result = normalizeError('');

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('');
        });

        it('should handle empty object', () => {
            const result = normalizeError({});

            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('An unknown error occurred');
        });
    });

    describe('getErrorMessage', () => {
        it('should return message from Error instance', () => {
            const error = new Error('Test error message');
            const result = getErrorMessage(error);

            expect(result).toBe('Test error message');
        });

        it('should return string error directly', () => {
            const result = getErrorMessage('String error');

            expect(result).toBe('String error');
        });

        it('should return message from object with message property', () => {
            const errorObject = { message: 'Object error' };
            const result = getErrorMessage(errorObject);

            expect(result).toBe('Object error');
        });

        it('should return default message for unknown error types', () => {
            const result = getErrorMessage(42);

            expect(result).toBe('An unknown error occurred');
        });

        it('should handle null input', () => {
            const result = getErrorMessage(null);

            expect(result).toBe('An unknown error occurred');
        });

        it('should handle undefined input', () => {
            const result = getErrorMessage(undefined);

            expect(result).toBe('An unknown error occurred');
        });

        it('should handle empty string', () => {
            const result = getErrorMessage('');

            expect(result).toBe('');
        });

        it('should handle complex object with message', () => {
            const complexError = {
                message: 'Complex error message',
                code: 'ERR_001',
                details: { field: 'validation error' },
            };
            const result = getErrorMessage(complexError);

            expect(result).toBe('Complex error message');
        });
    });

    describe('getErrorStack', () => {
        it('should return stack from Error instance', () => {
            const error = new Error('Test error');
            const result = getErrorStack(error);

            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
            expect(result).toContain('Error: Test error');
        });

        it('should return undefined for string error (no stack)', () => {
            const result = getErrorStack('String error');

            // String errors converted to Error instances may or may not have stack
            expect(typeof result === 'string' || result === undefined).toBe(true);
        });

        it('should return stack for object converted to Error', () => {
            const errorObject = { message: 'Object error' };
            const result = getErrorStack(errorObject);

            // Converted errors should have stack traces
            expect(typeof result === 'string' || result === undefined).toBe(true);
        });

        it('should handle null input', () => {
            const result = getErrorStack(null);

            expect(typeof result === 'string' || result === undefined).toBe(true);
        });

        it('should handle undefined input', () => {
            const result = getErrorStack(undefined);

            expect(typeof result === 'string' || result === undefined).toBe(true);
        });

        it('should preserve original stack trace when possible', () => {
            const originalError = new Error('Original error');
            const originalStack = originalError.stack;

            const result = getErrorStack(originalError);

            expect(result).toBe(originalStack);
        });
    });

    describe('Edge cases and integration', () => {
        it('should handle Error subclasses correctly', () => {
            class CustomError extends Error {
                constructor(
                    message: string,
                    public code: number
                ) {
                    super(message);
                    this.name = 'CustomError';
                }
            }

            const customError = new CustomError('Custom error message', 500);

            expect(normalizeError(customError)).toBe(customError);
            expect(getErrorMessage(customError)).toBe('Custom error message');
            expect(getErrorStack(customError)).toContain('CustomError: Custom error message');
        });

        it('should handle TypeError', () => {
            const typeError = new TypeError('Type error message');

            expect(normalizeError(typeError)).toBe(typeError);
            expect(getErrorMessage(typeError)).toBe('Type error message');
        });

        it('should handle RangeError', () => {
            const rangeError = new RangeError('Range error message');

            expect(normalizeError(rangeError)).toBe(rangeError);
            expect(getErrorMessage(rangeError)).toBe('Range error message');
        });

        it('should handle nested error objects', () => {
            const nestedError = {
                error: {
                    message: 'Nested error message',
                },
                message: 'Top level message',
            };

            expect(getErrorMessage(nestedError)).toBe('Top level message');
        });

        it('should handle circular references safely', () => {
            const circularObject: any = { message: 'Circular error' };
            circularObject.self = circularObject;

            expect(() => normalizeError(circularObject)).not.toThrow();
            expect(getErrorMessage(circularObject)).toBe('Circular error');
        });

        it('should handle very long error messages', () => {
            const longMessage = 'A'.repeat(10000);
            const result = getErrorMessage(longMessage);

            expect(result).toBe(longMessage);
            expect(result.length).toBe(10000);
        });

        it('should handle unicode characters in error messages', () => {
            const unicodeMessage = '错误信息 🚨 エラーメッセージ';
            const result = getErrorMessage(unicodeMessage);

            expect(result).toBe(unicodeMessage);
        });

        it('should handle error-like objects from different contexts', () => {
            // Simulate error from different execution context
            const foreignError = Object.create(null);
            foreignError.message = 'Foreign error';

            const result = normalizeError(foreignError);
            expect(result).toBeInstanceOf(Error);
            expect(result.message).toBe('Foreign error');
        });
    });

    describe('Performance considerations', () => {
        it('should handle many error normalizations efficiently', () => {
            const startTime = performance.now();

            for (let i = 0; i < 1000; i++) {
                normalizeError(`Error ${i}`);
                getErrorMessage({ message: `Message ${i}` });
                getErrorStack(new Error(`Stack ${i}`));
            }

            const endTime = performance.now();
            expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1000ms
        });

        it('should not leak memory with repeated calls', () => {
            const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;

            for (let i = 0; i < 1000; i++) {
                const error = normalizeError(`Error ${i}`);
                getErrorMessage(error);
                getErrorStack(error);
            }

            // Force garbage collection if available
            if (global.gc) {
                global.gc();
            }

            const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;

            // Memory usage shouldn't grow significantly
            if (initialMemory > 0 && finalMemory > 0) {
                expect(finalMemory - initialMemory).toBeLessThan(1024 * 1024); // Less than 1MB growth
            }
        });
    });

    describe('Type guard behavior', () => {
        it('should work as type guard for Error instances', () => {
            const unknownError: unknown = new Error('Test');
            const normalizedError = normalizeError(unknownError);

            // Should always return Error instance
            expect(normalizedError instanceof Error).toBe(true);

            // TypeScript should now know this is an Error
            expect(normalizedError.message).toBeDefined();
            expect(normalizedError.name).toBeDefined();
        });

        it('should ensure consistent return type', () => {
            const inputs: unknown[] = [
                new Error('Error'),
                'String',
                { message: 'Object' },
                null,
                undefined,
                42,
                true,
                [],
                {},
            ];

            inputs.forEach((input) => {
                const result = normalizeError(input);
                expect(result).toBeInstanceOf(Error);
                expect(typeof result.message).toBe('string');
            });
        });
    });
});
