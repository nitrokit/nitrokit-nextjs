import { describe, it, expect } from 'vitest';
import { unsupportedServiceError } from '../error-utils';

describe('Error Utilities', () => {
    describe('unsupportedServiceError', () => {
        const serviceName = 'TestService';

        // 1. Standart kullanım testi (Sadece servis adı ile)
        it('should throw an error with the service name when no custom message is provided', () => {
            const expectedMessage = `Unsupported service: ${serviceName}`;

            // expect(() => fn()).toThrow(message) yapısını kullanıyoruz.
            // Bu, fonksiyonun çağrılmasını bekler ve fırlatılan hatanın metnini kontrol eder.
            expect(() => unsupportedServiceError(serviceName)).toThrow(expectedMessage);
        });

        // 2. Özel mesaj testi
        it('should throw an error including both the service name and the custom message', () => {
            const customMessage = 'This feature is deprecated in version 3.0.';
            const expectedMessage = `Unsupported service: ${serviceName}. ${customMessage}`;

            expect(() => unsupportedServiceError(serviceName, customMessage)).toThrow(
                expectedMessage
            );
        });

        // 3. Hatanın instance'ını (Error sınıfı) kontrol etme (Best Practice)
        it('should throw an instance of the standard Error class', () => {
            // Hatanın Error sınıfından fırlatıldığını garanti eder.
            expect(() => unsupportedServiceError(serviceName)).toThrow(Error);
        });
    });
});
