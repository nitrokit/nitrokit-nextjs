import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, Mock, beforeAll } from 'vitest';
import { ConfettiOptions } from '../useCanvasConfetti'; // Yalnızca tipi import ediyoruz

// --- 1. MOCK OBJE TANIMLAMALARI ---
let mockConfetti: Mock;

// 2. vi.mock içindeki fonksiyonel tanım (Atamayı mock'tan sonra yapıyoruz)
// Mock'u önce tanımlıyoruz ki hoisting sorunu olmasın.
vi.mock('canvas-confetti', () => {
    const mockFn = vi.fn(() => Promise.resolve()) as Mock;
    mockConfetti = mockFn; // Atamayı burada yapıyoruz
    return {
        default: mockFn
    };
});

let useCanvasConfetti: any;

// BÜTÜN TESTLERDEN ÖNCE, MODÜLÜ MOCK'LARDAN SONRA YÜKLE
beforeAll(async () => {
    // Dinamik import ile test edilen hook'u yükle
    const module = await import('../useCanvasConfetti');
    useCanvasConfetti = module.useCanvasConfetti;
});

// Mock requestAnimationFrame (RAF)
const mockRAF = vi.fn().mockImplementation((cb: Function) => {
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
        // useCanvasConfetti'nin dinamik olarak yüklendiği global değişkeni kullanıyoruz
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

    // --- TEMEL SENARYOLAR VE YOĞUNLUK TESTLERİ ---

    // --- BASIC SCENARIOS ---
    it('should not call confetti when "enabled: false"', () => {
        const triggerConfetti = setupHook({ effect: 'basic', enabled: false });
        triggerConfetti();
        expect(mockConfetti).not.toHaveBeenCalled();
    });

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

    it('should call Basic effect with correct origin and default (medium) intensity settings', () => {
        const triggerConfetti = setupHook({ effect: 'basic', enabled: true });

        triggerConfetti();

        expect(mockConfetti).toHaveBeenCalledTimes(1);
        expect(mockConfetti).toHaveBeenCalledWith(
            expect.objectContaining({
                origin: expectedOrigin,
                particleCount: 60,
                spread: 55,
                scalar: 0.8
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

    // --- TIMER-BASED EFFECTS ---

    it('should call Burst effect 3 times with timers on high intensity', () => {
        const triggerConfetti = setupHook({ effect: 'burst', enabled: true, intensity: 'high' });
        triggerConfetti();

        // Zamanı 200ms ilerletiyoruz (3 çağrı için 0, 100, 200ms)
        vi.advanceTimersByTime(200);
        expect(mockConfetti).toHaveBeenCalledTimes(3);

        // Son çağrının high intensity ayarlarını aldığını kontrol et
        expect(mockConfetti).toHaveBeenLastCalledWith(
            expect.objectContaining({
                particleCount: 100,
                angle: expect.any(Number)
            })
        );
    });

    it('should call Stars effect with correct shape and high particle count', () => {
        const triggerConfetti = setupHook({ effect: 'stars', enabled: true, intensity: 'high' });

        triggerConfetti();

        expect(mockConfetti).toHaveBeenCalledTimes(1);
        expect(mockConfetti).toHaveBeenCalledWith(
            expect.objectContaining({
                origin: expectedOrigin,
                shapes: ['star'],
                particleCount: 80, // high intensity için beklenen değer
                scalar: 1.2 // high intensity için beklenen değer
            })
        );
    });

    it('should call Snow effect with gravity and zero Y origin (top of screen)', () => {
        const triggerConfetti = setupHook({ effect: 'snow', enabled: true });

        triggerConfetti();

        expect(mockConfetti).toHaveBeenCalledTimes(1);
        expect(mockConfetti).toHaveBeenCalledWith(
            expect.objectContaining({
                origin: { x: expectedOrigin.x, y: 0 }, // Kar, ekranın üstünden başlamalı
                shapes: ['circle'],
                gravity: 0.4,
                drift: 0.1
            })
        );
    });

    it('should call Realistic effect with multiple fire() calls (5 total) and correct origin', () => {
        const triggerConfetti = setupHook({ effect: 'realistic', enabled: true });

        triggerConfetti();

        // Realistic efekti 5 ayrı fire() çağrısı yapar.
        expect(mockConfetti).toHaveBeenCalledTimes(5);

        // İlk çağrının origin'i kullanması beklenir
        expect(mockConfetti).toHaveBeenCalledWith(
            expect.objectContaining({
                origin: expectedOrigin,
                startVelocity: 55 // İlk fire() çağrısının ayarı
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
                particleCount: 50
            })
        );
    });
});
