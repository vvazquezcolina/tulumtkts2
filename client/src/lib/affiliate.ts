// Affiliate Link Management System - Travelpayouts (direct marker injection)
//
// 2026-05 rewrite: tp.media redirects (`https://tp.media/r?p=PROGRAM&u=URL`)
// return HTTP 400 for every program except p=4114 (Aviasales) on this account.
// Verified working approach: append `?marker=MARKER` directly onto the partner
// URL — Aviasales, Hotellook, Kiwitaxi and Discovercars all attribute the click
// when the marker is a top-level query parameter.
//
// Public API (generateAffiliateLink, generateFlightLink, generateHotelLink,
// generateCarRentalLink, generateTransferLink) is unchanged so callers don't
// need to know the URLs are no longer wrapped through tp.media.

const TP_MARKER = '9a350c3ebd492165ade7135359165af9';

// Travelpayouts program IDs — kept for backwards compat / analytics labels.
// The redirect path is *no longer* used for URL generation, only the labels are.
export const TP_PROGRAMS = {
  aviasales: '4114',
  hotellook: '4110',
  viator: '2584',
  discovercars: '3958',
  kiwitaxi: '1944',
  safetyWing: '4068',
  travelpayouts: '101',
} as const;

export type TPProgram = keyof typeof TP_PROGRAMS;

const PARTNER_HOSTS_WITH_MARKER = new Set([
  'aviasales.com',
  'www.aviasales.com',
  'hotellook.com',
  'www.hotellook.com',
  'search.hotellook.com',
  'kiwitaxi.com',
  'www.kiwitaxi.com',
  'discovercars.com',
  'www.discovercars.com',
  'airalo.com',
  'www.airalo.com',
  'ektatraveling.com',
  'www.ektatraveling.com',
  'safetywing.com',
  'www.safetywing.com',
  'travelpayouts.com',
  'www.travelpayouts.com',
]);

/**
 * Inject `marker` (and optional `campaign_id`) directly into the target URL.
 * Returns the URL unchanged for hosts that aren't recognised TP partners.
 */
export function generateAffiliateLink(
  targetUrl: string,
  program: TPProgram = 'travelpayouts',
  campaignId?: string
): string {
  try {
    const url = new URL(targetUrl);

    if (PARTNER_HOSTS_WITH_MARKER.has(url.hostname)) {
      if (!url.searchParams.has('marker')) url.searchParams.set('marker', TP_MARKER);
      if (campaignId && !url.searchParams.has('campaign_id')) {
        url.searchParams.set('campaign_id', campaignId);
      }
      // Keep program as a label hint for downstream tracking (no behaviour change).
      if (!url.searchParams.has('utm_source')) url.searchParams.set('utm_source', 'tulumtkts');
      if (!url.searchParams.has('utm_medium')) url.searchParams.set('utm_medium', `tp_${program}`);
      return url.toString();
    }

    return targetUrl;
  } catch {
    return targetUrl;
  }
}

/**
 * Format a date string from YYYY-MM-DD to DDMM for Aviasales search URLs.
 * If the input is already DDMM (4 digits, no dashes), it is returned untouched
 * — the previous version double-formatted such inputs into garbage.
 */
function formatDateForAviasales(dateStr: string): string {
  if (!dateStr) return '';
  if (/^\d{4}$/.test(dateStr)) return dateStr; // already DDMM
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}${month}`;
}

/**
 * Build an Aviasales search URL with marker injected.
 * Format: aviasales.com/search/{ORIGIN}{DDMM}{DEST}{DDMM}?marker=...
 */
export function generateFlightLink(
  origin: string,
  destination: string,
  departureDate?: string,
  returnDate?: string
): string {
  const dep = departureDate ? formatDateForAviasales(departureDate) : '';
  const ret = returnDate ? formatDateForAviasales(returnDate) : '';
  const path = `${origin.toUpperCase()}${dep}${destination.toUpperCase()}${ret}`;
  const searchUrl = `https://www.aviasales.com/search/${path}`;
  return generateAffiliateLink(searchUrl, 'aviasales', `flights_${origin}_${destination}`);
}

/**
 * Build a Hotellook search URL with marker injected.
 */
export function generateHotelLink(
  location: string,
  checkIn?: string,
  checkOut?: string
): string {
  const params = new URLSearchParams({ destination: location });
  if (checkIn) params.set('checkIn', checkIn);
  if (checkOut) params.set('checkOut', checkOut);
  const searchUrl = `https://search.hotellook.com/?${params.toString()}`;
  return generateAffiliateLink(searchUrl, 'hotellook', `hotels_${location.replace(/\s+/g, '_')}`);
}

/**
 * Build a Discovercars rental URL with marker injected.
 */
export function generateCarRentalLink(location: string = 'Cancun'): string {
  const params = new URLSearchParams({ location });
  const searchUrl = `https://www.discovercars.com/search?${params.toString()}`;
  return generateAffiliateLink(searchUrl, 'discovercars', `cars_${location.replace(/\s+/g, '_')}`);
}

/**
 * Build a Kiwitaxi transfer URL with marker injected.
 * Kiwitaxi's deep link to Cancun-airport → Tulum search is `/cancun-airport/tulum`.
 */
export function generateTransferLink(from: string = 'cancun-airport', to: string = 'tulum'): string {
  const slug = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const searchUrl = `https://kiwitaxi.com/${slug(from)}/${slug(to)}`;
  return generateAffiliateLink(searchUrl, 'kiwitaxi', `transfer_${slug(from)}_${slug(to)}`);
}

// ─── Analytics (unchanged behaviour) ────────────────────────────────────────────

export function trackAffiliateClick(
  program: string,
  experienceTitle: string,
  experiencePrice: string,
  category: string
) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'affiliate_click', {
      event_category: 'Affiliate',
      event_label: `${program}_${category}`,
      value: parseInt(experiencePrice.replace(/[^0-9]/g, ''), 10) || 0,
      custom_parameters: {
        program,
        experience_title: experienceTitle,
        experience_price: experiencePrice,
        category,
      },
    });
  }

  if (typeof window !== 'undefined') {
    const clickData = {
      program,
      experienceTitle,
      experiencePrice,
      category,
      timestamp: new Date().toISOString(),
      sessionId: Math.random().toString(36).substring(2, 11),
    };

    const existingClicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
    existingClicks.push(clickData);
    localStorage.setItem('affiliate_clicks', JSON.stringify(existingClicks.slice(-100)));
  }
}

export function estimateRevenue(
  clicks: number,
  averageOrderValue: number = 200
): {
  estimatedBookings: number;
  estimatedRevenue: number;
  commission: number;
} {
  const conversionRate = 0.03;
  const estimatedBookings = Math.floor(clicks * conversionRate);
  const commission = estimatedBookings * averageOrderValue * 0.06;

  return {
    estimatedBookings,
    estimatedRevenue: estimatedBookings * averageOrderValue,
    commission,
  };
}

export function getAffiliateAnalytics() {
  if (typeof window === 'undefined') return null;

  const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
  const totalClicks = clicks.length;
  const last30Days = clicks.filter((click: any) => {
    const clickDate = new Date(click.timestamp);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return clickDate > thirtyDaysAgo;
  });

  return {
    totalClicks,
    clicksLast30Days: last30Days.length,
    revenue: estimateRevenue(totalClicks),
    topCategories: getTopCategories(clicks),
    topExperiences: getTopExperiences(clicks),
  };
}

function getTopCategories(clicks: any[]) {
  const categoryCount = clicks.reduce((acc: Record<string, number>, click: any) => {
    acc[click.category] = (acc[click.category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(categoryCount)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 5)
    .map(([category, count]) => ({ category, count }));
}

function getTopExperiences(clicks: any[]) {
  const experienceCount = clicks.reduce((acc: Record<string, number>, click: any) => {
    acc[click.experienceTitle] = (acc[click.experienceTitle] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(experienceCount)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 5)
    .map(([title, count]) => ({ title, count }));
}
