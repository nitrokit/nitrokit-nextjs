import React from 'react';

export interface Shortcut {
    key: string;
    metaKey?: boolean;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    action: (event: KeyboardEvent) => void;
}

/**
 * A custom React hook that listens for keyboard shortcuts and executes corresponding actions.
 *
 * It attaches a 'keydown' event listener to the document to capture keyboard events.
 * When a registered shortcut combination is detected, it prevents the default browser
 * action for that event and calls the specified action handler.
 *
 * @param shortcuts - An array of `Shortcut` objects. Each object defines a keyboard shortcut.
 *   A `Shortcut` object should have the following properties:
 *   - `key`: The primary key to listen for (e.g., 's', 'Enter', 'ArrowUp'). Case-insensitive.
 *   - `action`: A function to be called when the shortcut is triggered. It receives the `KeyboardEvent` as an argument.
 *   - `metaKey` (optional): A boolean indicating if the Meta key (Command key on macOS, Windows key on Windows)
 *     must be pressed. Defaults to `false` (Meta key must not be pressed).
 *   - `ctrlKey` (optional): A boolean indicating if the Control key must be pressed.
 *     Defaults to `false` (Control key must not be pressed).
 *   - `shiftKey` (optional): A boolean indicating if the Shift key must be pressed.
 *     Defaults to `false` (Shift key must not be pressed).
 *   - `altKey` (optional): A boolean indicating if the Alt key (Option key on macOS) must be pressed.
 *     Defaults to `false` (Alt key must not be pressed).
 * @param dependencies - An optional array of dependencies for the `React.useEffect` hook.
 *   The event listener will be re-attached if any of these dependencies change.
 *   The `shortcuts` array itself is always included as a dependency. Defaults to `[]`.
 */
export function useHotkeys(shortcuts: Shortcut[], dependencies: React.DependencyList = []) {
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            for (const shortcut of shortcuts) {
                const metaKeyMatch = (shortcut.metaKey ?? false) === e.metaKey;
                const ctrlKeyMatch = (shortcut.ctrlKey ?? false) === e.ctrlKey;
                const shiftKeyMatch = (shortcut.shiftKey ?? false) === e.shiftKey;
                const altKeyMatch = (shortcut.altKey ?? false) === e.altKey;

                if (
                    e.key.toLowerCase() === shortcut.key.toLowerCase() &&
                    metaKeyMatch &&
                    ctrlKeyMatch &&
                    shiftKeyMatch &&
                    altKeyMatch
                ) {
                    e.preventDefault();
                    shortcut.action(e);
                    return;
                }
            }
        };

        document.addEventListener('keydown', down);
        return () => {
            document.removeEventListener('keydown', down);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies, shortcuts]);
}
