// ─────────────────────────────────────────────────────────────
// Google Analytics 4 Helpers
// ─────────────────────────────────────────────────────────────
// Requires gtag script loaded in index.html

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Fire a GA4 event. No-op if gtag is not loaded. */
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params ?? {});
}

/** Track a successful contact form submission */
export function trackFormSubmission(service: string): void {
  trackEvent('form_submit', {
    event_category: 'engagement',
    event_label: 'contact_form',
    service,
  });
  // Also fire the GA4 recommended 'generate_lead' event
  trackEvent('generate_lead', { service });
}

/** Track a WhatsApp CTA click */
export function trackWhatsAppClick(source: 'floating_button' | 'contact_section' | 'hero'): void {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: source,
  });
}

/** Track a generic CTA button click */
export function trackButtonClick(label: string, location?: string): void {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: label,
    location,
  });
}

/** Track page views for SPA navigation */
export function trackPageView(path: string, title?: string): void {
  trackEvent('page_view', {
    page_path: path,
    page_title: title,
  });
}

/** Track scroll depth milestone (25, 50, 75, 100) */
export function trackScrollDepth(percent: 25 | 50 | 75 | 100): void {
  trackEvent('scroll', {
    event_category: 'engagement',
    event_label: `${percent}%`,
    value: percent,
  });
}
