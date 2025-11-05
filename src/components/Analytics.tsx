import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Analytics IDs - These should match the IDs in index.html
// Get GA4 Measurement ID from: https://analytics.google.com/
// Get Meta Pixel ID from: https://business.facebook.com/events_manager
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 Measurement ID
const META_PIXEL_ID = 'YOUR_PIXEL_ID';      // Replace with your actual Meta Pixel ID

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route change
    if (window.gtag) {
      window.gtag('config', GA4_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }

    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);

  return null;
};

export default Analytics;

// Helper functions to track events (use these throughout your app)
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackPhoneCall = () => {
  trackEvent('phone_call', {
    event_category: 'engagement',
    event_label: 'Click to Call',
    value: 1
  });

  if (window.fbq) {
    window.fbq('track', 'Contact');
  }
};

export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submission', {
    event_category: 'engagement',
    event_label: formName,
    value: 1
  });

  if (window.fbq) {
    window.fbq('track', 'Lead');
  }
};

export const trackSearchQuery = (query: string, resultsCount: number) => {
  trackEvent('search', {
    event_category: 'engagement',
    event_label: 'Inmate Search',
    search_term: query,
    results_count: resultsCount,
    value: 1
  });
};

// Declare global window types
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
