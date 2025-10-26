/**
 * Formats a number into a compact, human-readable string (e.g., 1200 -> "1.2K").
 * Uses the Intl.NumberFormat API for robust, locale-aware formatting.
 *
 * @param num The number to format. Can be null or undefined.
 * @param locale The locale to use for formatting (e.g., 'en-US', 'tr-TR'). Defaults to 'en-US'.
 * @returns A compact string representation of the number, or '0' if the input is null/undefined.
 */
export function formatCompactNumber(
    num: number | null | undefined,
    locale: string = 'en-US'
): string {
    if (num === null || num === undefined) {
        return '0';
    }

    // Intl.NumberFormat with 'compact' notation is the modern and standard way to format large numbers.
    // It automatically handles thousands (K), millions (M), billions (B), etc.
    const formatter = new Intl.NumberFormat(locale, {
        notation: 'compact',
        compactDisplay: 'short'
    });

    return formatter.format(num);
}
