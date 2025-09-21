export function normalizeError(error: unknown): Error {
    if (error instanceof Error) {
        return error;
    }

    if (typeof error === 'string') {
        return new Error(error);
    }

    if (error && typeof error === 'object' && 'message' in error) {
        return new Error(String(error.message));
    }

    return new Error('An unknown error occurred');
}

export function getErrorMessage(error: unknown): string {
    return normalizeError(error).message;
}

export function getErrorStack(error: unknown): string | undefined {
    return normalizeError(error).stack;
}
