import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useNextTheme } from '../useNextTheme';

// Mock next-themes
const mockSetTheme = vi.fn();
const mockUseTheme = vi.fn();

vi.mock('next-themes', () => ({
    useTheme: () => mockUseTheme()
}));

describe('useNextTheme', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();

        // Default mock implementation
        mockUseTheme.mockReturnValue({
            theme: 'light',
            setTheme: mockSetTheme,
            resolvedTheme: 'light'
        });
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should return initial values when not mounted', () => {
        const { result } = renderHook(() => useNextTheme());

        expect(result.current[0]).toBe('light'); // theme
        expect(result.current[1]).toBe(true); // mounted (useEffect runs immediately in test)
        expect(typeof result.current[2]).toBe('function'); // setThemeWithSync
        expect(result.current[3]).toBe('light'); // resolvedTheme
    });

    it('should set mounted to true after mount', () => {
        const { result } = renderHook(() => useNextTheme());

        act(() => {
            vi.advanceTimersByTime(0);
        });

        expect(result.current[1]).toBe(true); // mounted
    });

    it('should call setTheme when setThemeWithSync is called', () => {
        const { result } = renderHook(() => useNextTheme());

        act(() => {
            vi.advanceTimersByTime(0);
        });

        const setThemeWithSync = result.current[2];

        act(() => {
            setThemeWithSync('dark');
        });

        expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('should handle theme change with user action flag', () => {
        const { result } = renderHook(() => useNextTheme());

        act(() => {
            vi.advanceTimersByTime(0);
        });

        const setThemeWithSync = result.current[2];

        act(() => {
            setThemeWithSync('dark');
        });

        expect(mockSetTheme).toHaveBeenCalledWith('dark');

        // Advance time to reset user action flag
        act(() => {
            vi.advanceTimersByTime(2000);
        });

        // Should be able to call again
        act(() => {
            setThemeWithSync('light');
        });

        expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('should return correct theme from useTheme', () => {
        mockUseTheme.mockReturnValue({
            theme: 'dark',
            setTheme: mockSetTheme,
            resolvedTheme: 'dark'
        });

        const { result } = renderHook(() => useNextTheme());

        expect(result.current[0]).toBe('dark');
        expect(result.current[3]).toBe('dark');
    });

    it('should handle undefined theme', () => {
        mockUseTheme.mockReturnValue({
            theme: undefined,
            setTheme: mockSetTheme,
            resolvedTheme: undefined
        });

        const { result } = renderHook(() => useNextTheme());

        expect(result.current[0]).toBe('light'); // fallback
        expect(result.current[3]).toBe('light'); // fallback
    });

    it('should handle system theme', () => {
        mockUseTheme.mockReturnValue({
            theme: 'system',
            setTheme: mockSetTheme,
            resolvedTheme: 'dark'
        });

        const { result } = renderHook(() => useNextTheme());

        expect(result.current[0]).toBe('system');
        expect(result.current[3]).toBe('dark');
    });

    it('should handle multiple theme changes', () => {
        const { result } = renderHook(() => useNextTheme());

        act(() => {
            vi.advanceTimersByTime(0);
        });

        const setThemeWithSync = result.current[2];

        act(() => {
            setThemeWithSync('dark');
        });

        expect(mockSetTheme).toHaveBeenCalledWith('dark');

        act(() => {
            setThemeWithSync('light');
        });

        expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('should handle timeout for user action reset', () => {
        const { result } = renderHook(() => useNextTheme());

        act(() => {
            vi.advanceTimersByTime(0);
        });

        const setThemeWithSync = result.current[2];

        act(() => {
            setThemeWithSync('dark');
        });

        expect(mockSetTheme).toHaveBeenCalledWith('dark');

        // Fast forward time to reset user action flag
        act(() => {
            vi.advanceTimersByTime(2000);
        });

        // Should be able to call again
        act(() => {
            setThemeWithSync('light');
        });

        expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('should handle loadUserTheme timeout', () => {
        const { result } = renderHook(() => useNextTheme());

        // Initially mounted (useEffect runs immediately in test)
        expect(result.current[1]).toBe(true);

        // Advance time to trigger loadUserTheme timeout
        act(() => {
            vi.advanceTimersByTime(100);
        });

        // Should still be mounted
        expect(result.current[1]).toBe(true);
    });
});
