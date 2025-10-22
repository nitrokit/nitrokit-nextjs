/**
 * Map of country calling codes to their respective flag emojis.
 */
const COUNTRY_FLAGS_MAP: Readonly<Record<string, string>> = {
    // North America & Caribbean
    '1': '🇺🇸',
    '1242': '🇧🇸',
    '1876': '🇯🇲',
    // Europe (Extended)
    '44': '🇬🇧',
    '33': '🇫🇷',
    '49': '🇩🇪',
    '39': '🇮🇹',
    '34': '🇪🇸',
    '31': '🇳🇱',
    '46': '🇸🇪',
    '47': '🇳🇴',
    '45': '🇩🇰',
    '358': '🇫🇮',
    '41': '🇨🇭',
    '43': '🇦🇹',
    '32': '🇧🇪',
    '351': '🇵🇹',
    '30': '🇬🇷',
    '48': '🇵🇱',
    '420': '🇨🇿',
    '36': '🇭🇺',
    '353': '🇮🇪',
    '7': '🇷🇺',
    // Middle East & Asia
    '90': '🇹🇷',
    '91': '🇮🇳',
    '86': '🇨🇳',
    '81': '🇯🇵',
    '82': '🇰🇷',
    '971': '🇦🇪',
    '966': '🇸🇦',
    // South America
    '55': '🇧🇷',
    '54': '🇦🇷',
    '52': '🇲🇽',
    // Oceania
    '61': '🇦🇺',
    '64': '🇳🇿'
};

const DEFAULT_FLAG = '🌍';
const MIN_DIGITS = 7;
const MAX_DIGITS = 15;

/**
 * Cleans the phone number, removing non-digit characters (except '+')
 * and ensures it starts with a '+' for E.164-like formatting.
 * E.g., 905551234567 -> +905551234567
 */
export const formatPhoneNumber = (value: string): string => {
    // Only keep digits and '+'
    let cleaned = value.replace(/[^\d+]/g, '');

    // Remove any '+' signs and ensure only one is at the start
    cleaned = cleaned.replace(/\+/g, '');

    return '+' + cleaned;
};

/**
 * Extracts digits for database storage, removing '+' and all non-digit characters.
 * E.g., +90 555 123 4567 -> 905551234567
 */
export const getCleanPhoneNumber = (formatted: string): string => {
    return formatted.replace(/[^\d]/g, '');
};

/**
 * Validates the phone number length (7-15 digits, excluding '+').
 */
export const validatePhoneNumber = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= MIN_DIGITS && digits.length <= MAX_DIGITS;
};

/**
 * Formats the phone number for display with grouping and '+' prefix.
 * Attempts to intelligently separate country code from the rest of the number.
 */
export const formatPhoneForDisplay = (phone: string): string => {
    const cleaned = phone.replace(/[^\d+]/g, '');

    if (!cleaned.startsWith('+')) return cleaned;

    const withoutPlus = cleaned.substring(1);

    let countryCode = '';
    let remainingDigits = withoutPlus;

    // Try to find the country code using the longest possible match (3, 2, 1 digits)
    for (let length = 3; length >= 1; length--) {
        const code = withoutPlus.substring(0, length);
        if (COUNTRY_FLAGS_MAP[code]) {
            countryCode = code;
            remainingDigits = withoutPlus.substring(length);
            break;
        }
    }

    // If no country code is found, return the cleaned string
    if (!countryCode) return cleaned;

    // Group the remaining digits into 3s for readability (e.g., TR format)
    const parts = [];
    for (let i = 0; i < remainingDigits.length; i += 3) {
        parts.push(remainingDigits.substring(i, i + 3));
    }

    return `+${countryCode} ${parts.join(' ')}`;
};

/**
 * Retrieves the country flag emoji based on the phone number's country code.
 */
export const getCountryFlag = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');

    // Check for 3, 2, then 1 digit codes
    for (let length = 3; length >= 1; length--) {
        const code = digits.substring(0, length);
        if (code && COUNTRY_FLAGS_MAP[code]) {
            return COUNTRY_FLAGS_MAP[code];
        }
    }

    return DEFAULT_FLAG;
};
