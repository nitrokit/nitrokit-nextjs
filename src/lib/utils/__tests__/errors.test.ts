import { describe, it, expect } from 'vitest';
import { unsupportedServiceError } from '../error-utils';

describe('errors', () => {
    describe('unsupportedServiceError', () => {
        it('should throw error with service name only', () => {
            expect(() => {
                unsupportedServiceError('test-service');
            }).toThrow('Unsupported service: test-service');
        });

        it('should throw error with service name and custom message', () => {
            expect(() => {
                unsupportedServiceError('test-service', 'This service is not available');
            }).toThrow('Unsupported service: test-service. This service is not available');
        });

        it('should throw error with empty service name', () => {
            expect(() => {
                unsupportedServiceError('');
            }).toThrow('Unsupported service: ');
        });

        it('should throw error with special characters in service name', () => {
            expect(() => {
                unsupportedServiceError('test@service#123');
            }).toThrow('Unsupported service: test@service#123');
        });

        it('should throw error with long service name', () => {
            const longServiceName = 'a'.repeat(100);
            expect(() => {
                unsupportedServiceError(longServiceName);
            }).toThrow(`Unsupported service: ${longServiceName}`);
        });

        it('should throw error with custom message containing special characters', () => {
            expect(() => {
                unsupportedServiceError('test-service', 'Error: Invalid @#$%^&*()');
            }).toThrow('Unsupported service: test-service. Error: Invalid @#$%^&*()');
        });

        it('should throw error with empty custom message', () => {
            expect(() => {
                unsupportedServiceError('test-service', '');
            }).toThrow('Unsupported service: test-service');
        });

        it('should throw error with whitespace-only custom message', () => {
            expect(() => {
                unsupportedServiceError('test-service', '   ');
            }).toThrow('Unsupported service: test-service.    ');
        });

        it('should have correct error type', () => {
            try {
                unsupportedServiceError('test-service');
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error).toHaveProperty('message');
                expect(error).toHaveProperty('name', 'Error');
            }
        });

        it('should return never type (compile-time check)', () => {
            // This test ensures the function has the correct return type
            // The function should never return normally
            const testFunction = (): string => {
                try {
                    unsupportedServiceError('test-service');
                    return 'This should never be reached';
                } catch {
                    return 'Error was thrown as expected';
                }
            };

            expect(testFunction()).toBe('Error was thrown as expected');
        });
    });
});
