import { type RefObject, useEffect, useState } from 'react';

/**
 * Reusable React hook to track element intersection visibility.
 * Unobserves the target element once it becomes visible (one-time trigger)
 * to prevent unnecessary re-renders.
 */
export function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { threshold = 0.1, rootMargin, root } = options;

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(node);
      }
    }, { threshold, rootMargin, root });

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [elementRef, threshold, rootMargin, root]);

  return isIntersecting;
}
