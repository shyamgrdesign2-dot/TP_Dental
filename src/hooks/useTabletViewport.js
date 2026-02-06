import { useState, useEffect } from 'react';

/**
 * Tablet viewport breakpoints (px).
 * Matches typical tablet widths: iPad mini (768), iPad (1024), etc.
 */
const TABLET_MIN_WIDTH = 768;
const TABLET_MAX_WIDTH = 1180;

/**
 * Returns whether the current viewport is in the tablet width range.
 * Uses window width + resize/orientation listeners so layout updates on rotate or resize.
 *
 * @returns {boolean} true when viewport width is >= 768 and <= 1180
 */
export function useTabletViewport() {
  const [isTabletViewport, setIsTabletViewport] = useState(() => {
    if (typeof window === 'undefined') return false;
    const w = window.innerWidth;
    return w >= TABLET_MIN_WIDTH && w <= TABLET_MAX_WIDTH;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = () => {
      const w = window.innerWidth;
      const next = w >= TABLET_MIN_WIDTH && w <= TABLET_MAX_WIDTH;
      setIsTabletViewport(prev => (prev === next ? prev : next));
    };

    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return isTabletViewport;
}

export default useTabletViewport;
