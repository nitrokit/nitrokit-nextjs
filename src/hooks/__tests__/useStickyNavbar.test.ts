import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useStickyNavbar } from '../useStickyNavbar';

describe('useStickyNavbar', () => {
    let mockAddEventListener: ReturnType<typeof vi.fn>;
    let mockRemoveEventListener: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockAddEventListener = vi.fn();
        mockRemoveEventListener = vi.fn();

        // Mock window.addEventListener and removeEventListener
        Object.defineProperty(window, 'addEventListener', {
            value: mockAddEventListener,
            writable: true
        });
        Object.defineProperty(window, 'removeEventListener', {
            value: mockRemoveEventListener,
            writable: true
        });

        // Mock window.scrollY
        Object.defineProperty(window, 'scrollY', {
            value: 0,
            writable: true
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return false initially', () => {
        const { result } = renderHook(() => useStickyNavbar());

        expect(result.current).toBe(false);
    });

    it('should add scroll event listener on mount', () => {
        renderHook(() => useStickyNavbar());

        expect(mockAddEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
    });

    it('should return true when scrollY is 40 or more', () => {
        const { result } = renderHook(() => useStickyNavbar());

        // Get the scroll event listener
        const scrollListener = mockAddEventListener.mock.calls[0][1];

        // Mock scrollY to 40
        Object.defineProperty(window, 'scrollY', {
            value: 40,
            writable: true
        });

        act(() => {
            scrollListener();
        });

        expect(result.current).toBe(true);
    });

    it('should return true when scrollY is more than 40', () => {
        const { result } = renderHook(() => useStickyNavbar());

        const scrollListener = mockAddEventListener.mock.calls[0][1];

        // Mock scrollY to 100
        Object.defineProperty(window, 'scrollY', {
            value: 100,
            writable: true
        });

        act(() => {
            scrollListener();
        });

        expect(result.current).toBe(true);
    });

    it('should return false when scrollY is less than 40', () => {
        const { result } = renderHook(() => useStickyNavbar());

        const scrollListener = mockAddEventListener.mock.calls[0][1];

        // Mock scrollY to 39
        Object.defineProperty(window, 'scrollY', {
            value: 39,
            writable: true
        });

        act(() => {
            scrollListener();
        });

        expect(result.current).toBe(false);
    });

    it('should return false when scrollY is 0', () => {
        const { result } = renderHook(() => useStickyNavbar());

        const scrollListener = mockAddEventListener.mock.calls[0][1];

        // Mock scrollY to 0
        Object.defineProperty(window, 'scrollY', {
            value: 0,
            writable: true
        });

        act(() => {
            scrollListener();
        });

        expect(result.current).toBe(false);
    });

    it('should handle multiple scroll events', () => {
        const { result } = renderHook(() => useStickyNavbar());

        const scrollListener = mockAddEventListener.mock.calls[0][1];

        // First scroll - should be sticky
        Object.defineProperty(window, 'scrollY', {
            value: 50,
            writable: true
        });

        act(() => {
            scrollListener();
        });

        expect(result.current).toBe(true);

        // Second scroll - should not be sticky
        Object.defineProperty(window, 'scrollY', {
            value: 20,
            writable: true
        });

        act(() => {
            scrollListener();
        });

        expect(result.current).toBe(false);
    });

    it('should handle edge case at exactly 40', () => {
        const { result } = renderHook(() => useStickyNavbar());

        const scrollListener = mockAddEventListener.mock.calls[0][1];

        // Mock scrollY to exactly 40
        Object.defineProperty(window, 'scrollY', {
            value: 40,
            writable: true
        });

        act(() => {
            scrollListener();
        });

        expect(result.current).toBe(true);
    });

    it('should handle negative scroll values', () => {
        const { result } = renderHook(() => useStickyNavbar());

        const scrollListener = mockAddEventListener.mock.calls[0][1];

        // Mock scrollY to negative value
        Object.defineProperty(window, 'scrollY', {
            value: -10,
            writable: true
        });

        act(() => {
            scrollListener();
        });

        expect(result.current).toBe(false);
    });

    it('should handle very large scroll values', () => {
        const { result } = renderHook(() => useStickyNavbar());

        const scrollListener = mockAddEventListener.mock.calls[0][1];

        // Mock scrollY to very large value
        Object.defineProperty(window, 'scrollY', {
            value: 10000,
            writable: true
        });

        act(() => {
            scrollListener();
        });

        expect(result.current).toBe(true);
    });
});
