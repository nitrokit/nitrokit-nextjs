import { renderHook } from '@testing-library/react';
import { useCanvasConfetti, ConfettiOptions } from '../useCanvasConfetti';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

var mockConfetti: ReturnType<typeof vi.fn>;

vi.mock('canvas-confetti', () => {
    const mockFn = vi.fn(() => Promise.resolve());
    mockConfetti = mockFn;

    return {
        default: mockFn
    };
});

const mockRAF = vi.fn().mockImplementation((cb) => {
    setTimeout(() => cb(), 0);
    return 1;
});

const MOCK_WINDOW_WIDTH = 1000;
const MOCK_WINDOW_HEIGHT = 800;
const MOCK_RECT = {
    left: 100,
    top: 200,
    width: 50,
    height: 50,
    x: 100,
    y: 200,
    bottom: 250,
    right: 150,
    toJSON: () => ({})
} as DOMRect;

describe('useCanvasConfetti Hook', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        mockConfetti.mockClear();
        vi.stubGlobal('innerWidth', MOCK_WINDOW_WIDTH);
        vi.stubGlobal('innerHeight', MOCK_WINDOW_HEIGHT);
        vi.stubGlobal('requestAnimationFrame', mockRAF);
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
    });

    const setupHook = (options: ConfettiOptions) => {
        const { result } = renderHook(() => useCanvasConfetti(options));

        result.current.containerRef.current = {
            getBoundingClientRect: () => MOCK_RECT
        } as unknown as HTMLElement;

        return result.current.triggerConfetti;
    };

    const expectedOrigin = {
        x: (MOCK_RECT.left + MOCK_RECT.width / 2) / MOCK_WINDOW_WIDTH,
        y: (MOCK_RECT.top + MOCK_RECT.height / 2) / MOCK_WINDOW_HEIGHT
    };

    // --- BASIC SCENARIOS ---

    it('should not call confetti when "enabled: false"', () => {
        const triggerConfetti = setupHook({ effect: 'basic', enabled: false });

        triggerConfetti();

        expect(mockConfetti).not.toHaveBeenCalled();
    });

    it('should not call confetti when "effect: none"', () => {
        const triggerConfetti = setupHook({ effect: 'none', enabled: true });

        triggerConfetti();

        expect(mockConfetti).not.toHaveBeenCalled();
    });

    // --- INTENSITY AND EFFECT TESTS ---

    it('should call Basic effect with correct origin and default (medium) intensity settings', () => {
        const triggerConfetti = setupHook({ effect: 'basic', enabled: true });

        triggerConfetti();

        expect(mockConfetti).toHaveBeenCalledTimes(1);
        expect(mockConfetti).toHaveBeenCalledWith(
            expect.objectContaining({
                origin: expectedOrigin,
                particleCount: 60, // medium intensity
                spread: 55, // medium intensity
                scalar: 0.8 // medium intensity
            })
        );
    });

    it('should apply High intensity settings correctly', () => {
        const triggerConfetti = setupHook({ effect: 'basic', enabled: true, intensity: 'high' });

        triggerConfetti();

        expect(mockConfetti).toHaveBeenCalledWith(
            expect.objectContaining({
                particleCount: 100,
                spread: 70,
                scalar: 1.2
            })
        );
    });

    it('should apply Low intensity settings correctly', () => {
        const triggerConfetti = setupHook({ effect: 'basic', enabled: true, intensity: 'low' });

        triggerConfetti();

        expect(mockConfetti).toHaveBeenCalledWith(
            expect.objectContaining({
                particleCount: 30,
                spread: 45,
                scalar: 0.6
            })
        );
    });

    // --- TIMER-BASED EFFECTS ---

    it('should call Burst effect 3 times with timers on high intensity', () => {
        const triggerConfetti = setupHook({ effect: 'burst', enabled: true, intensity: 'high' });

        triggerConfetti();

        // Advance time by 0ms to trigger the first setTimeout
        vi.advanceTimersByTime(0);

        // First call (i=0) should happen immediately after 0ms advancement
        expect(mockConfetti).toHaveBeenCalledTimes(1);

        // Advance 100ms (i=1)
        vi.advanceTimersByTime(100);
        expect(mockConfetti).toHaveBeenCalledTimes(2);

        // Advance 100ms (i=2, total 200ms)
        vi.advanceTimersByTime(100);
        expect(mockConfetti).toHaveBeenCalledTimes(3);

        // No more calls expected
        vi.advanceTimersByTime(100);
        expect(mockConfetti).toHaveBeenCalledTimes(3);

        expect(mockConfetti).toHaveBeenLastCalledWith(
            expect.objectContaining({
                particleCount: 100, // high intensity
                angle: expect.any(Number)
            })
        );
    });

    it('should call Fireworks effect repeatedly via setInterval for the duration', async () => {
        const triggerConfetti = setupHook({
            effect: 'fireworks',
            enabled: true,
            intensity: 'medium'
        });

        triggerConfetti();

        // Advance 250ms to catch the first interval call
        vi.advanceTimersByTime(250);
        expect(mockConfetti).toHaveBeenCalledTimes(1);

        // Advance the remaining 1750ms (Total 2000ms duration)
        vi.advanceTimersByTime(1750);

        // Expected 7 calls in total (T=250, 500, ..., 1750)
        expect(mockConfetti).toHaveBeenCalledTimes(7);

        // Advance past the duration (T=2000ms is where the interval stops)
        vi.advanceTimersByTime(500);
        expect(mockConfetti).toHaveBeenCalledTimes(7); // Should remain at 7
    });

    // --- SPECIAL EFFECTS ---

    it('should call School-Pride effect using requestAnimationFrame with opposite origins', () => {
        const triggerConfetti = setupHook({
            effect: 'school-pride',
            enabled: true,
            intensity: 'medium'
        });

        triggerConfetti();

        // requestAnimationFrame is mocked to run once synchronously
        expect(mockConfetti).toHaveBeenCalledTimes(2);

        // Left side
        expect(mockConfetti).toHaveBeenCalledWith(
            expect.objectContaining({
                origin: { x: 0 },
                angle: 60,
                colors: ['#3b82f6', '#1d4ed8']
            })
        );

        // Right side
        expect(mockConfetti).toHaveBeenCalledWith(
            expect.objectContaining({
                origin: { x: 1 },
                angle: 120,
                colors: ['#ef4444', '#dc2626']
            })
        );
    });

    it('should call Emoji effect with correct origin and custom emoji shapes', () => {
        const customEmojis = ['🔥', '💻'];
        const triggerConfetti = setupHook({
            effect: 'emoji',
            enabled: true,
            emoji: customEmojis
        });

        triggerConfetti();

        expect(mockConfetti).toHaveBeenCalledTimes(1);
        expect(mockConfetti).toHaveBeenCalledWith(
            expect.objectContaining({
                origin: expectedOrigin,
                shapes: customEmojis,
                particleCount: 50, // default
                scalar: 1 // default
            })
        );
    });
});
