import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useHoverEffects } from '../useHoverEffects';
import React from 'react';

// --- MOCK SETUP ---

// Mock data for the container element's bounding box
const MOCK_CONTAINER_RECT = {
    left: 100,
    top: 100,
    width: 200,
    height: 100,
    right: 300,
    bottom: 200,
    x: 100,
    y: 100,
    toJSON: vi.fn()
};

// Mock mouse event (client coordinates relative to the bounding box)
const MOCK_MOUSE_EVENT = {
    clientX: 150, // 50px offset from container.left
    clientY: 130 // 30px offset from container.top
} as unknown as React.MouseEvent;

// Spy instances for global functions
let appendChildSpy: any;
let createElementSpy: any;
let requestAnimationFrameSpy: any;
let setTimeoutSpy: any;

// Mock HTMLElement factory that allows tracking append/removal
let mockContainer: HTMLElement;
const createdElements: HTMLElement[] = [];

// Helper function to mock document.createElement for particle creation
const mockDocumentCreateElement = () => {
    createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
        const element = {
            style: {} as CSSStyleDeclaration,
            className: '',
            innerHTML: '',
            remove: vi.fn()
        } as unknown as HTMLElement;
        return element;
    });
};

// Setup global mocks and spies
beforeEach(() => {
    vi.useFakeTimers();

    // 1. Mock Container Setup
    mockContainer = {
        getBoundingClientRect: vi.fn(() => MOCK_CONTAINER_RECT),
        style: {} as CSSStyleDeclaration,
        appendChild: vi.fn((child: HTMLElement) => {
            createdElements.push(child);
            return child;
        }),
        remove: vi.fn(),
        innerHTML: '',
        className: ''
    } as unknown as HTMLElement;
    appendChildSpy = vi.spyOn(mockContainer, 'appendChild');

    // 2. Mock requestAnimationFrame (RAF) - Rely on Vitest's built-in fake implementation
    requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame');

    // 3. Spy on setTimeout
    setTimeoutSpy = vi.spyOn(window, 'setTimeout');
});

afterEach(() => {
    vi.useRealTimers();

    // Restore element remove mocks
    createdElements.forEach((element) => {
        if (vi.isMockFunction(element.remove)) {
            (element.remove as any).mockRestore();
        }
    });

    // Restore global spies
    vi.restoreAllMocks();
    createdElements.length = 0; // Clear created elements for next test
});

// --- TESTS ---

describe('useHoverEffects Hook', () => {
    // Basic Structure Test
    it('should return containerRef and handleMouseEnter handler', () => {
        const { result } = renderHook(() => useHoverEffects({ effect: 'confetti', enabled: true }));

        expect(result.current.containerRef).toBeDefined();
        expect(result.current.handleMouseEnter).toBeInstanceOf(Function);
    });

    // Disabled State Tests
    it('should not create any particles if enabled is false', () => {
        const { result } = renderHook(() =>
            useHoverEffects({ effect: 'confetti', enabled: false })
        );
        mockDocumentCreateElement();

        act(() => {
            result.current.containerRef.current = mockContainer;
            result.current.handleMouseEnter(MOCK_MOUSE_EVENT);
        });

        expect(createElementSpy).not.toHaveBeenCalled();
        expect(appendChildSpy).not.toHaveBeenCalled();
    });

    it('should not create any particles if effect is "none"', () => {
        const { result } = renderHook(() => useHoverEffects({ effect: 'none', enabled: true }));
        mockDocumentCreateElement();

        act(() => {
            result.current.containerRef.current = mockContainer;
            result.current.handleMouseEnter(MOCK_MOUSE_EVENT);
        });

        expect(createElementSpy).not.toHaveBeenCalled();
        expect(appendChildSpy).not.toHaveBeenCalled();
    });

    // --- EFFECT TESTS (Asynchronous / DOM) ---

    describe('Fireworks Effect', () => {
        it('should create 8 particles (medium intensity default) and use requestAnimationFrame', () => {
            const { result } = renderHook(() =>
                useHoverEffects({ effect: 'fireworks', enabled: true, intensity: 'medium' })
            );
            mockDocumentCreateElement();

            act(() => {
                // 1. Trigger handler (8 initial RAF calls)
                result.current.containerRef.current = mockContainer;
                result.current.handleMouseEnter(MOCK_MOUSE_EVENT);
            });

            // Initial 8 calls for 8 particles
            expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(8);

            act(() => {
                // 2. Run the 8 pending callbacks (This calls RAF 8 more times internally)
                vi.runOnlyPendingTimers();
            });

            // Total calls should be 8 (initial) + 8 (first frame callbacks) = 16 calls
            expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(16);

            // Check final state after cleanup (e.g., after 50 frames)
            act(() => {
                // Run the remaining animation frames to ensure cleanup logic works
                for (let i = 0; i < 50; i++) {
                    vi.runOnlyPendingTimers();
                }
            });

            // All particles should eventually be removed (checking the first particle's remove mock)
            const firstParticle = createElementSpy.mock.results[0].value as HTMLElement;
            expect(firstParticle.remove).toHaveBeenCalled();
        });

        it('should create 12 particles for high intensity', () => {
            const { result } = renderHook(() =>
                useHoverEffects({ effect: 'fireworks', enabled: true, intensity: 'high' })
            );
            mockDocumentCreateElement();

            act(() => {
                result.current.containerRef.current = mockContainer;
                result.current.handleMouseEnter(MOCK_MOUSE_EVENT);
            });

            expect(createElementSpy).toHaveBeenCalledTimes(12);
        });

        it('should position particles relative to the container click', () => {
            const { result } = renderHook(() =>
                useHoverEffects({ effect: 'fireworks', enabled: true, color: 'red' })
            );
            mockDocumentCreateElement();

            act(() => {
                result.current.containerRef.current = mockContainer;
                result.current.handleMouseEnter(MOCK_MOUSE_EVENT);
            });

            const firstParticle = createElementSpy.mock.results[0].value as HTMLElement;

            // Position must be checked BEFORE requestAnimationFrame executes its callback (animation starts)
            expect(firstParticle.style.left).toBe('50px');
            expect(firstParticle.style.top).toBe('30px');
            expect(firstParticle.style.background).toBe('red');
        });
    });

    describe('Sparkles Effect', () => {
        it('should create 5 particles (medium intensity default) and schedule removal via setTimeout', () => {
            const { result } = renderHook(() =>
                useHoverEffects({ effect: 'sparkles', enabled: true, intensity: 'medium' })
            );
            mockDocumentCreateElement();

            act(() => {
                result.current.containerRef.current = mockContainer;
                result.current.handleMouseEnter(MOCK_MOUSE_EVENT);
            });

            expect(createElementSpy).toHaveBeenCalledTimes(5);
            expect(appendChildSpy).toHaveBeenCalledTimes(5);

            expect(setTimeoutSpy).toHaveBeenCalledTimes(5);

            act(() => {
                vi.advanceTimersByTime(1000);
            });

            for (let i = 0; i < 5; i++) {
                const particle = createElementSpy.mock.results[i].value as HTMLElement;
                expect(particle.remove).toHaveBeenCalledTimes(1);
            }
        });

        it('should use "✨" emoji in particles', () => {
            const { result } = renderHook(() =>
                useHoverEffects({ effect: 'sparkles', enabled: true })
            );
            mockDocumentCreateElement();

            act(() => {
                result.current.containerRef.current = mockContainer;
                result.current.handleMouseEnter(MOCK_MOUSE_EVENT);
            });

            const firstParticle = createElementSpy.mock.results[0].value as HTMLElement;
            expect(firstParticle.innerHTML).toBe('✨');
        });
    });

    describe('Confetti Effect', () => {
        it('should create 10 particles (medium intensity default) and schedule removal via setTimeout', () => {
            const { result } = renderHook(() =>
                useHoverEffects({ effect: 'confetti', enabled: true, intensity: 'medium' })
            );
            mockDocumentCreateElement();

            act(() => {
                result.current.containerRef.current = mockContainer;
                result.current.handleMouseEnter(MOCK_MOUSE_EVENT);
            });

            expect(createElementSpy).toHaveBeenCalledTimes(10);
            expect(appendChildSpy).toHaveBeenCalledTimes(10);

            expect(setTimeoutSpy).toHaveBeenCalledTimes(10);

            act(() => {
                vi.advanceTimersByTime(2500);
            });

            for (let i = 0; i < 10; i++) {
                const particle = createElementSpy.mock.results[i].value as HTMLElement;
                expect(particle.remove).toHaveBeenCalledTimes(1);
            }
        });

        it('should create 15 particles for high intensity', () => {
            const { result } = renderHook(() =>
                useHoverEffects({ effect: 'confetti', enabled: true, intensity: 'high' })
            );
            mockDocumentCreateElement();

            act(() => {
                result.current.containerRef.current = mockContainer;
                result.current.handleMouseEnter(MOCK_MOUSE_EVENT);
            });

            expect(createElementSpy).toHaveBeenCalledTimes(15);
        });
    });

    describe('Ripple Effect', () => {
        it('should create 1 particle and schedule removal after 600ms', () => {
            const { result } = renderHook(() =>
                useHoverEffects({ effect: 'ripple', enabled: true, color: 'blue' })
            );
            mockDocumentCreateElement();

            act(() => {
                result.current.containerRef.current = mockContainer;
                result.current.handleMouseEnter(MOCK_MOUSE_EVENT);
            });

            expect(createElementSpy).toHaveBeenCalledTimes(1);
            expect(appendChildSpy).toHaveBeenCalledTimes(1);

            const ripple = createElementSpy.mock.results[0].value as HTMLElement;
            expect(ripple.style.left).toBe('50px');
            expect(ripple.style.top).toBe('30px');
            expect(ripple.style.animation).toContain('ripple 0.6s');

            expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
            expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 600);

            act(() => {
                vi.advanceTimersByTime(600);
            });

            expect(ripple.remove).toHaveBeenCalledTimes(1);
        });
    });
});
