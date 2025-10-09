import {
    LOCALES_WITH_FLAG,
    LOCALES_FOR_METADATA,
    getLocaleName,
    getLocaleNativeName,
    getLocaleFlag,
    isValidLocale,
    getDefaultLocale,
    getAllLocaleNames
} from '../locale-utils'; // Assuming the utility file is renamed or located here
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// -----------------------------------------------------------
// MOCKING (Defining mocks before the test suite to prevent hoisting issues)
// -----------------------------------------------------------

// Mock the source of constants ('@/constants').
// We define all necessary mock constants INSIDE the factory function
// to prevent hoisting issues.
vi.mock('@/constants/locale', () => {
    // Mock language codes (Only 'tr' and 'en' to match original error context)
    const MOCK_LOCALES = ['tr', 'en'] as const;

    // Mock locale configuration
    const MOCK_LOCALE_CONFIG = {
        tr: {
            name: 'Turkish',
            nativeName: 'Türkçe',
            flag: '🇹🇷'
        },
        en: {
            name: 'English',
            nativeName: 'English',
            // Correcting the flag to match the expectation in the test assertion
            flag: '🇬🇧'
        }
    } as const;

    // Return the mocked exports
    return {
        LOCALES: MOCK_LOCALES,
        LOCALE_CONFIG: MOCK_LOCALE_CONFIG
    };
});

// Define the MockLocale type to represent all mock languages
type MockLocale = 'tr' | 'en';

describe('Locale Utilities Tests', () => {
    // --- Constant Array Generation Tests ---

    it('should generate LOCALES_WITH_FLAG array correctly', () => {
        // Updated expectation to 2, matching the current mock data
        expect(LOCALES_WITH_FLAG).toHaveLength(2);
        expect(LOCALES_WITH_FLAG).toEqual([
            { id: 'tr', name: 'Türkçe', flag: '🇹🇷' },
            { id: 'en', name: 'English', flag: '🇬🇧' }
        ]);
    });

    // --- Utility Function Tests ---

    it('getLocaleName should return English name', () => {
        // We cast the argument to `string` first, then to the expected return type
        // to bypass the strict signature checking from the imported module.
        expect(getLocaleName('tr' as MockLocale)).toBe('Turkish');
        expect(getLocaleName('en' as MockLocale)).toBe('English');
    });

    it('getLocaleNativeName should return native name', () => {
        expect(getLocaleNativeName('tr' as MockLocale)).toBe('Türkçe');
        expect(getLocaleNativeName('en' as MockLocale)).toBe('English');
    });

    it('getLocaleFlag should return flag emoji', () => {
        expect(getLocaleFlag('tr' as MockLocale)).toBe('🇹🇷');
        // This assertion now expects '🇬🇧' which matches the updated mock data.
        expect(getLocaleFlag('en' as MockLocale)).toBe('🇬🇧');
    });

    it('isValidLocale should validate correctly', () => {
        expect(isValidLocale('tr')).toBe(true);
        expect(isValidLocale('en')).toBe(true);
        expect(isValidLocale('fr')).toBe(false); // Not in the mock list
        expect(isValidLocale('zz')).toBe(false);
    });

    it('getDefaultLocale should return the first locale in the array', () => {
        expect(getDefaultLocale()).toBe('tr');
    });

    it('getAllLocaleNames should return native names when requested', () => {
        const nativeNames = getAllLocaleNames(true);
        expect(nativeNames).toEqual(['Türkçe', 'English']);
    });

    it('getAllLocaleNames should return default names (English) when not requested', () => {
        const names = getAllLocaleNames(false);
        expect(names).toEqual(['Turkish', 'English']);
    });

    // --- LOCALES_FOR_METADATA Tests (Global Dependencies) ---

    describe('LOCALES_FOR_METADATA', () => {
        const MOCK_BASE_URL = 'https://nitrokit.com';

        beforeEach(() => {
            // Stub window as undefined (simulating Server-side rendering)
            vi.stubGlobal('window', undefined);
            // Mock environment variable
            process.env.NEXT_PUBLIC_APP_URL = MOCK_BASE_URL;
        });

        afterEach(() => {
            vi.unstubAllGlobals();
            // Clear environment variable mock
            delete process.env.NEXT_PUBLIC_APP_URL;
        });

        it('should use NEXT_PUBLIC_APP_URL when window is undefined (SSR)', () => {
            const metadata = LOCALES_FOR_METADATA();
            expect(metadata).toEqual([
                { code: 'tr', url: `${MOCK_BASE_URL}/tr` },
                { code: 'en', url: `${MOCK_BASE_URL}/en` }
            ]);
        });

        it('should use window.location.origin when window is defined (Client)', () => {
            const MOCK_CLIENT_URL = 'https://client.app:3000';

            // Mock window.location.origin
            vi.stubGlobal('window', {
                location: { origin: MOCK_CLIENT_URL }
            });

            const metadata = LOCALES_FOR_METADATA();

            expect(metadata).toEqual([
                { code: 'tr', url: `${MOCK_CLIENT_URL}/tr` },
                { code: 'en', url: `${MOCK_CLIENT_URL}/en` }
            ]);
        });

        it('should use localhost default when both window and env are missing', () => {
            vi.stubGlobal('window', undefined);
            delete process.env.NEXT_PUBLIC_APP_URL;

            const metadata = LOCALES_FOR_METADATA();
            const DEFAULT_URL = 'http://localhost:3000';

            expect(metadata).toEqual([
                { code: 'tr', url: `${DEFAULT_URL}/tr` },
                { code: 'en', url: `${DEFAULT_URL}/en` }
            ]);
        });
    });
});
