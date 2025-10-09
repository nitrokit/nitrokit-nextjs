import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useHotkeys, type Shortcut } from '../useHotkeys';

describe('useHotkeys', () => {
    let mockAddEventListener: ReturnType<typeof vi.fn>;
    let mockRemoveEventListener: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockAddEventListener = vi.fn();
        mockRemoveEventListener = vi.fn();

        // Mock document.addEventListener and removeEventListener
        Object.defineProperty(document, 'addEventListener', {
            value: mockAddEventListener,
            writable: true
        });
        Object.defineProperty(document, 'removeEventListener', {
            value: mockRemoveEventListener,
            writable: true
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should add and remove event listener on mount and unmount', () => {
        const shortcuts: Shortcut[] = [
            {
                key: 's',
                action: vi.fn()
            }
        ];

        const { unmount } = renderHook(() => useHotkeys(shortcuts));

        expect(mockAddEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));

        unmount();

        expect(mockRemoveEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
    });

    it('should call action when matching shortcut is pressed', () => {
        const mockAction = vi.fn();
        const shortcuts: Shortcut[] = [
            {
                key: 's',
                action: mockAction
            }
        ];

        renderHook(() => useHotkeys(shortcuts));

        // Get the event listener function
        const eventListener = mockAddEventListener.mock.calls[0][1];

        // Create a mock keyboard event
        const mockEvent = {
            key: 's',
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
            preventDefault: vi.fn()
        } as unknown as KeyboardEvent;

        // Simulate keydown event
        eventListener(mockEvent);

        expect(mockAction).toHaveBeenCalledWith(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should not call action when non-matching shortcut is pressed', () => {
        const mockAction = vi.fn();
        const shortcuts: Shortcut[] = [
            {
                key: 's',
                action: mockAction
            }
        ];

        renderHook(() => useHotkeys(shortcuts));

        const eventListener = mockAddEventListener.mock.calls[0][1];

        const mockEvent = {
            key: 'a', // Different key
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
            preventDefault: vi.fn()
        } as unknown as KeyboardEvent;

        eventListener(mockEvent);

        expect(mockAction).not.toHaveBeenCalled();
    });

    it('should handle meta key combinations', () => {
        const mockAction = vi.fn();
        const shortcuts: Shortcut[] = [
            {
                key: 's',
                metaKey: true,
                action: mockAction
            }
        ];

        renderHook(() => useHotkeys(shortcuts));

        const eventListener = mockAddEventListener.mock.calls[0][1];

        const mockEvent = {
            key: 's',
            metaKey: true,
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
            preventDefault: vi.fn()
        } as unknown as KeyboardEvent;

        eventListener(mockEvent);

        expect(mockAction).toHaveBeenCalledWith(mockEvent);
    });

    it('should handle ctrl key combinations', () => {
        const mockAction = vi.fn();
        const shortcuts: Shortcut[] = [
            {
                key: 's',
                ctrlKey: true,
                action: mockAction
            }
        ];

        renderHook(() => useHotkeys(shortcuts));

        const eventListener = mockAddEventListener.mock.calls[0][1];

        const mockEvent = {
            key: 's',
            metaKey: false,
            ctrlKey: true,
            shiftKey: false,
            altKey: false,
            preventDefault: vi.fn()
        } as unknown as KeyboardEvent;

        eventListener(mockEvent);

        expect(mockAction).toHaveBeenCalledWith(mockEvent);
    });

    it('should handle shift key combinations', () => {
        const mockAction = vi.fn();
        const shortcuts: Shortcut[] = [
            {
                key: 's',
                shiftKey: true,
                action: mockAction
            }
        ];

        renderHook(() => useHotkeys(shortcuts));

        const eventListener = mockAddEventListener.mock.calls[0][1];

        const mockEvent = {
            key: 's',
            metaKey: false,
            ctrlKey: false,
            shiftKey: true,
            altKey: false,
            preventDefault: vi.fn()
        } as unknown as KeyboardEvent;

        eventListener(mockEvent);

        expect(mockAction).toHaveBeenCalledWith(mockEvent);
    });

    it('should handle alt key combinations', () => {
        const mockAction = vi.fn();
        const shortcuts: Shortcut[] = [
            {
                key: 's',
                altKey: true,
                action: mockAction
            }
        ];

        renderHook(() => useHotkeys(shortcuts));

        const eventListener = mockAddEventListener.mock.calls[0][1];

        const mockEvent = {
            key: 's',
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: true,
            preventDefault: vi.fn()
        } as unknown as KeyboardEvent;

        eventListener(mockEvent);

        expect(mockAction).toHaveBeenCalledWith(mockEvent);
    });

    it('should be case insensitive', () => {
        const mockAction = vi.fn();
        const shortcuts: Shortcut[] = [
            {
                key: 'S', // Uppercase
                action: mockAction
            }
        ];

        renderHook(() => useHotkeys(shortcuts));

        const eventListener = mockAddEventListener.mock.calls[0][1];

        const mockEvent = {
            key: 's', // Lowercase
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
            preventDefault: vi.fn()
        } as unknown as KeyboardEvent;

        eventListener(mockEvent);

        expect(mockAction).toHaveBeenCalledWith(mockEvent);
    });

    it('should handle multiple shortcuts', () => {
        const mockAction1 = vi.fn();
        const mockAction2 = vi.fn();
        const shortcuts: Shortcut[] = [
            {
                key: 's',
                action: mockAction1
            },
            {
                key: 'a',
                action: mockAction2
            }
        ];

        renderHook(() => useHotkeys(shortcuts));

        const eventListener = mockAddEventListener.mock.calls[0][1];

        // Test first shortcut
        const mockEvent1 = {
            key: 's',
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
            preventDefault: vi.fn()
        } as unknown as KeyboardEvent;

        eventListener(mockEvent1);

        expect(mockAction1).toHaveBeenCalledWith(mockEvent1);
        expect(mockAction2).not.toHaveBeenCalled();

        // Test second shortcut
        const mockEvent2 = {
            key: 'a',
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
            preventDefault: vi.fn()
        } as unknown as KeyboardEvent;

        eventListener(mockEvent2);

        expect(mockAction2).toHaveBeenCalledWith(mockEvent2);
    });

    it('should re-attach event listener when dependencies change', () => {
        const shortcuts: Shortcut[] = [
            {
                key: 's',
                action: vi.fn()
            }
        ];

        const { rerender } = renderHook(
            ({ deps }: { deps: React.DependencyList }) => useHotkeys(shortcuts, deps),
            {
                initialProps: { deps: [] as React.DependencyList }
            }
        );

        expect(mockAddEventListener).toHaveBeenCalledTimes(1);
        expect(mockRemoveEventListener).toHaveBeenCalledTimes(0);

        // Change dependencies
        rerender({ deps: ['dependency'] as React.DependencyList });

        expect(mockRemoveEventListener).toHaveBeenCalledTimes(1);
        expect(mockAddEventListener).toHaveBeenCalledTimes(2);
    });
});
