import { useEffect } from 'react';
import Lenis from 'lenis';

/**
  * Custom hook to initialize and run Lenis smooth scroll.
  */
export function useLenis() {
  useEffect(() => {
    // Avoid double initialization in React StrictMode
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Sync scroll event (if any scroll triggers need it)
    const handleScroll = () => {
      // Can dispatch scroll event or sync with trigger if needed
    };
    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);
}
