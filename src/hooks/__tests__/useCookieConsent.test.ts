import { renderHook, act } from '@testing-library/react';
import { useCookieConsent } from '../useCookieConsent';
import { describe, it, expect, vi, beforeEach, afterEach, MockInstance } from 'vitest';

interface MockCookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
}

let storageEventHandler: ((e: StorageEvent) => void) | null = null;
let addEventListenerSpy: MockInstance<typeof window.addEventListener>;
let removeEventListenerSpy: MockInstance<typeof window.removeEventListener>;
const mockGetItem = vi.fn((key: string) => null as string | null);

const MOCK_PREFERENCES: MockCookiePreferences = {
    necessary: true,
    analytics: true,
    marketing: false,
    functional: true
};

const triggerStorageEvent = (preferences: MockCookiePreferences) => {
    if (storageEventHandler) {
        const event = new StorageEvent('storage', {
            key: 'nitrokit-cookie-preferences',
            newValue: JSON.stringify(preferences)
        });
        storageEventHandler(event);
    }
};

describe('useCookieConsent Hook', () => {
    beforeEach(() => {
        vi.stubGlobal('localStorage', { getItem: mockGetItem });

        addEventListenerSpy = vi
            .spyOn(window, 'addEventListener')
            .mockImplementation((event, handler) => {
                if (event === 'storage') {
                    storageEventHandler = handler as (e: StorageEvent) => void;
                }
            });

        removeEventListenerSpy = vi
            .spyOn(window, 'removeEventListener')
            .mockImplementation(() => {});

        vi.stubGlobal('navigator', {
            userAgent: 'test-browser'
        });
    });

    afterEach(() => {
        mockGetItem.mockClear();

        vi.unstubAllGlobals();
        vi.restoreAllMocks();
        storageEventHandler = null;
    });

    it('should set isLoading to false and hasConsent to false when no consent found', () => {
        let result: any;

        act(() => {
            result = renderHook(() => useCookieConsent()).result;
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.hasConsent).toBe(false);
        expect(result.current.preferences).toBeNull();
        expect(addEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));
    });

    it('should detect bot and bypass consent logic', () => {
        vi.stubGlobal('navigator', {
            userAgent: 'googlebot/2.1'
        });

        let result: any;

        act(() => {
            result = renderHook(() => useCookieConsent()).result;
        });

        expect(result.current.isBotDetected).toBe(true);
        expect(result.current.isLoading).toBe(false);

        expect(result.current.canUseAnalytics).toBe(true);
        expect(result.current.canUseMarketing).toBe(true);
        expect(result.current.canUseFunctional).toBe(true);

        expect(addEventListenerSpy).not.toHaveBeenCalled();
    });

    it('should load existing preferences and set hasConsent to true', () => {
        mockGetItem.mockImplementation((key: string) => {
            if (key === 'nitrokit-cookie-consent') return 'true';
            if (key === 'nitrokit-cookie-preferences') return JSON.stringify(MOCK_PREFERENCES);
            return null;
        });

        let result: any;
        act(() => {
            result = renderHook(() => useCookieConsent()).result;
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.hasConsent).toBe(true);
        expect(result.current.preferences).toEqual(MOCK_PREFERENCES);
    });

    it('should correctly calculate usage flags based on loaded preferences', () => {
        mockGetItem.mockImplementation((key: string) => {
            if (key === 'nitrokit-cookie-consent') return 'true';
            if (key === 'nitrokit-cookie-preferences') return JSON.stringify(MOCK_PREFERENCES);
            return null;
        });

        let result: any;
        act(() => {
            result = renderHook(() => useCookieConsent()).result;
        });

        expect(result.current.hasConsent).toBe(true);
        expect(result.current.canUseAnalytics).toBe(true);
        expect(result.current.canUseMarketing).toBe(false);
        expect(result.current.canUseFunctional).toBe(true);
    });

    it('should return false for usage flags when hasConsent is false', () => {
        mockGetItem.mockImplementation(() => null);

        let result: any;
        act(() => {
            result = renderHook(() => useCookieConsent()).result;
        });

        expect(result.current.hasConsent).toBe(false);
        expect(result.current.canUseAnalytics).toBe(false);
        expect(result.current.canUseMarketing).toBe(false);
        expect(result.current.canUseFunctional).toBe(false);
    });

    it('should update preferences when a storage event is triggered', () => {
        mockGetItem.mockImplementation((key: string) => {
            if (key === 'nitrokit-cookie-consent') return 'true';
            if (key === 'nitrokit-cookie-preferences') return JSON.stringify(MOCK_PREFERENCES);
            return null;
        });

        let result: any;
        act(() => {
            result = renderHook(() => useCookieConsent()).result;
        });

        expect(result.current.preferences).toEqual(MOCK_PREFERENCES);
        expect(result.current.preferences?.marketing).toBe(false);

        const NEW_PREFERENCES: MockCookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: true,
            functional: true
        };

        act(() => {
            triggerStorageEvent(NEW_PREFERENCES);
        });

        expect(result.current.hasConsent).toBe(true);
        expect(result.current.preferences).toEqual(NEW_PREFERENCES);
        expect(result.current.canUseMarketing).toBe(true);
    });

    it('should remove event listener on unmount', () => {
        let hook: any;
        act(() => {
            hook = renderHook(() => useCookieConsent());
        });

        hook.unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    });
});
