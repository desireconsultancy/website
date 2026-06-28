// ─────────────────────────────────────────────────────────────
// Microsoft Clarity Helpers
// ─────────────────────────────────────────────────────────────

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/** Set a Clarity custom tag for additional segmentation */
export function clarityTag(key: string, value: string): void {
  if (typeof window === 'undefined' || !window.clarity) return;
  window.clarity('set', key, value);
}

/** Identify a user session with a custom identifier */
export function clarityIdentify(userId: string): void {
  if (typeof window === 'undefined' || !window.clarity) return;
  window.clarity('identify', userId);
}
