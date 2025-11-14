/**
 * Google Analytics 4 (GA4) tracking utilities
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GA4_MEASUREMENT_ID = 'G-CRBMC4X6QE';

/**
 * Check if GA4 is loaded and available
 */
export const isGA4Loaded = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Track a page view
 */
export const trackPageView = (path: string, title?: string): void => {
  if (!isGA4Loaded()) return;

  window.gtag('config', GA4_MEASUREMENT_ID, {
    page_path: path,
    page_title: title || document.title,
  });
};

/**
 * Track a custom event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: {
    [key: string]: any;
  }
): void => {
  if (!isGA4Loaded()) return;

  window.gtag('event', eventName, eventParams);
};

/**
 * Track affiliate link clicks
 */
export const trackAffiliateClick = (
  activityId: string,
  activityTitle: string,
  price?: string,
  location?: string
): void => {
  trackEvent('affiliate_click', {
    activity_id: activityId,
    activity_title: activityTitle,
    price: price,
    location: location,
  });
};

/**
 * Track search actions
 */
export const trackSearch = (
  searchQuery: string,
  filters?: {
    date?: string;
    guests?: string;
    category?: string;
  }
): void => {
  trackEvent('search', {
    search_term: searchQuery,
    ...filters,
  });
};

/**
 * Track newsletter signups
 */
export const trackNewsletterSignup = (email: string): void => {
  trackEvent('newsletter_signup', {
    email: email, // Note: Consider hashing email for privacy
  });
};

/**
 * Track favorite toggles
 */
export const trackFavoriteToggle = (
  activityId: string,
  activityTitle: string,
  isFavorite: boolean
): void => {
  trackEvent('favorite_toggle', {
    activity_id: activityId,
    activity_title: activityTitle,
    action: isFavorite ? 'add' : 'remove',
  });
};

/**
 * Track category clicks
 */
export const trackCategoryClick = (categoryName: string): void => {
  trackEvent('category_click', {
    category_name: categoryName,
  });
};

/**
 * Track social media clicks
 */
export const trackSocialClick = (platform: string, url?: string): void => {
  trackEvent('social_click', {
    platform: platform,
    url: url,
  });
};

/**
 * Track button clicks (generic)
 */
export const trackButtonClick = (
  buttonName: string,
  location?: string,
  additionalData?: { [key: string]: any }
): void => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
    ...additionalData,
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmit = (
  formName: string,
  formData?: { [key: string]: any }
): void => {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData,
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, linkText?: string): void => {
  trackEvent('external_link_click', {
    link_url: url,
    link_text: linkText,
  });
};

