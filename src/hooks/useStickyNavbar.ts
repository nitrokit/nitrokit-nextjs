import { useEffect, useState } from 'react';

/**
 * Custom React hook to determine if the navbar should be sticky.
 *
 * This hook listens to the window's scroll event. When the vertical scroll
 * position (`window.scrollY`) is 90 pixels or more, it indicates that
 * the navbar should be sticky. Otherwise, it should not be sticky.
 *
 * @returns {boolean} `true` if the navbar should be sticky (i.e., scrollY >= 90), `false` otherwise.
 *
 * @example
 * ```tsx
 * import useStickyNavbar from './useStickyNavbar';
 *
 * function MyComponent() {
 *   const isNavbarSticky = useStickyNavbar();
 *
 *   return (
 *     <nav className={isNavbarSticky ? 'sticky-navbar' : 'normal-navbar'}>
 *       {...}
 *     </nav>
 *   );
 * }
 * ```
 *
 * @remarks
 * The hook adds a scroll event listener to the window. It's important to ensure
 * that this listener is cleaned up if the component using the hook unmounts,
 * though the current implementation does not explicitly handle cleanup.
 * The `useEffect` hook is missing a dependency array, which means the event
 * listener will be re-added on every render.
 */
function useStickyNavbar(): boolean {
    const [sticky, setSticky] = useState(false);
    const handleStickyNavbar = () => {
        if (window.scrollY >= 40) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleStickyNavbar);
    });
    return sticky;
}
export default useStickyNavbar;
