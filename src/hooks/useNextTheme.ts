// import { useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef, useCallback } from 'react';

export function useNextTheme() {
    const { theme, setTheme: setNextTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const hasLoadedPrefs = useRef(false);
    const isUserAction = useRef(false);
    // const { status } = useSession();

    useEffect(() => {
        setMounted(true);
    }, []);

    const loadUserTheme = useCallback(async () => {
        // First check conditions
        if (!mounted || hasLoadedPrefs.current || isUserAction.current) {
            return;
        }
        // try {
        //     if (status === 'authenticated') {
        //         const response = await fetch('/api/user/preferences');
        //         if (response.ok) {
        //             const result = await response.json();
        //             if (result.success && result.preferences.theme) {
        //                 const userTheme = result.preferences.theme;
        //                 if (userTheme !== theme) {
        //                     setNextTheme(userTheme);
        //                 }
        //             }
        //         }
        //     }
        // } catch (error) {
        //     console.error('❌ Failed to load user theme:', error);
        // } finally {
        //     hasLoadedPrefs.current = true;
        // }
        // }, [mounted, theme, setNextTheme, status]);
    }, [mounted]);

    // Run only once when mounted
    useEffect(() => {
        if (mounted && !hasLoadedPrefs.current) {
            const timeoutId = setTimeout(loadUserTheme, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [mounted, loadUserTheme]);

    // Enhanced setTheme with user sync
    const setThemeWithSync = useCallback(
        async (newTheme: string) => {
            // Mark as user action
            isUserAction.current = true;

            // Change theme immediately
            setNextTheme(newTheme);

            try {
                // const response = await fetch('/api/user/preferences', {
                //     method: 'PUT',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ theme: newTheme }),
                // });
                // if (response.ok) {
                //     const result = await response.json();
                //     if (result.success && result.themeChanged) {
                //         console.log('💾 Theme preference saved to database');
                //     }
                // }
            } catch (error) {
                console.debug('⚠️ Theme sync failed:', error);
            } finally {
                // 2 seconds later reset user action flag
                setTimeout(() => {
                    isUserAction.current = false;
                }, 2000);
            }
        },
        [setNextTheme]
    );

    return [theme || 'light', mounted, setThemeWithSync, resolvedTheme || 'light'] as const;
}
