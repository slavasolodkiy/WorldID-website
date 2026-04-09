/**
 * Funnel analytics event catalog.
 * All key conversion actions must be tracked through this module.
 *
 * In production: push to window.dataLayer (Google Tag Manager) or swap for
 * any analytics provider (Segment, PostHog, Plausible, etc.).
 * In development: events are logged to the console.
 */

export type FunnelEvent =
  // End-user acquisition
  | { event: "cta_app_store_click"; location: string }
  | { event: "cta_google_play_click"; location: string }
  // Operator/agent acquisition
  | { event: "cta_become_operator_click"; location: string }
  | { event: "orb_location_viewed"; city: string; country: string }
  // Developer acquisition
  | { event: "cta_developer_docs_click"; destination: string; location: string }
  | { event: "cta_github_click"; repo: string; location: string }
  // Ecosystem
  | { event: "ecosystem_app_click"; app: string; category: string }
  | { event: "ecosystem_filter_changed"; category: string }
  // Newsletter
  | { event: "newsletter_subscribe_attempt"; location: string }
  | { event: "newsletter_subscribe_success"; location: string }
  | { event: "newsletter_subscribe_error"; location: string }
  // Navigation
  | { event: "nav_link_click"; destination: string };

declare global {
  interface Window {
    dataLayer?: object[];
  }
}

export function track(payload: FunnelEvent): void {
  if (typeof window === "undefined") return;

  // Push to GTM dataLayer if available
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  // Always log in development
  if (import.meta.env.DEV) {
    console.log("[analytics]", payload);
  }
}
