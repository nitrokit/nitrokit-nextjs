/**
 * Throws a type-safe error for an unsupported service.
 *
 * @param service - The name of the service that caused the error.
 * @param message - An optional custom message explaining the reason for the error.
 * @returns The function returns the `never` type because it never returns normally.
 */
export function unsupportedServiceError(service: string, message?: string): never {
    const errorMsg = message
        ? `Unsupported service: ${service}. ${message}`
        : `Unsupported service: ${service}`;

    throw new Error(errorMsg);
}
