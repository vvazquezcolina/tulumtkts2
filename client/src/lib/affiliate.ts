// Affiliate Link Management System - Travelpayouts Only (tp.media redirect)
const TP_MARKER = '9a350c3ebd492165ade7135359165af9';

// Travelpayouts program IDs
export const TP_PROGRAMS = {
  aviasales: '4114',      // Flights
  hotellook: '4110',      // Hotels
  viator: '2584',         // Activities/Tours (Viator) - primary activities provider
  discovercars: '3958',   // Car Rental
  kiwitaxi: '1944',       // Transfers
  safetyWing: '4068',     // Travel Insurance
} as const;

export type TPProgram = keyof typeof TP_PROGRAMS;

/**
 * Generate a Travelpayouts affiliate link using tp.media redirect.
 * This wraps any target URL through TP tracking.
 */
export function generateAffiliateLink(
  targetUrl: string,
  program: TPProgram = 'viator',
  campaignId?: string
): string {
  const programId = TP_PROGRAMS[program];
  const encoded = encodeURIComponent(targetUrl);
  let url = `https://tp.media/r?marker=${TP_MARKER}&p=${programId}&u=${encoded}`;
  if (campaignId) {
    url += `&campaign_id=${campaignId}`;
  }
  return url;
}

/**
 * Format a date string from YYYY-MM-DD to DDMM for Aviasales search URLs.
 * Returns the original string unchanged if it cannot be parsed.
 */
function formatDateForAviasales(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}${month}`;
}

/**
 * Generate flight search affiliate link
 */
export function generateFlightLink(
  origin: string,
  destination: string,
  departureDate?: string,
  returnDate?: string
): string {
  const formattedDeparture = departureDate ? formatDateForAviasales(departureDate) : '';
  const formattedReturn = returnDate ? formatDateForAviasales(returnDate) : '';
  const searchUrl = `https://www.aviasales.com/search/${origin}${formattedDeparture}${destination}${formattedReturn}`;
  return generateAffiliateLink(searchUrl, 'aviasales', `flights_${origin}_${destination}`);
}

/**
 * Generate hotel search affiliate link
 */
export function generateHotelLink(
  location: string,
  checkIn?: string,
  checkOut?: string
): string {
  const params = new URLSearchParams();
  if (checkIn) params.set('checkIn', checkIn);
  if (checkOut) params.set('checkOut', checkOut);
  const query = params.toString();
  const searchUrl = `https://www.hotellook.com/hotels/${location}${query ? '?' + query : ''}`;
  return generateAffiliateLink(searchUrl, 'hotellook', `hotels_${location}`);
}

/**
 * Generate car rental affiliate link
 */
export function generateCarRentalLink(location: string = 'Cancun'): string {
  const searchUrl = `https://www.discovercars.com/search?location=${encodeURIComponent(location)}`;
  return generateAffiliateLink(searchUrl, 'discovercars', `cars_${location}`);
}

/**
 * Generate transfer affiliate link
 */
export function generateTransferLink(from: string = 'Cancun Airport', to: string = 'Tulum'): string {
  const searchUrl = `https://kiwitaxi.com/mexico/${encodeURIComponent(from)}+to+${encodeURIComponent(to)}`;
  return generateAffiliateLink(searchUrl, 'kiwitaxi', `transfer_${from}_${to}`);
}

// Track affiliate click events
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
      value: parseInt(experiencePrice.replace(/[^0-9]/g, '')) || 0,
      custom_parameters: {
        program,
        experience_title: experienceTitle,
        experience_price: experiencePrice,
        category
      }
    });
  }

  const clickData = {
    program,
    experienceTitle,
    experiencePrice,
    category,
    timestamp: new Date().toISOString(),
    sessionId: Math.random().toString(36).substring(2, 11)
  };

  const existingClicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
  existingClicks.push(clickData);
  localStorage.setItem('affiliate_clicks', JSON.stringify(existingClicks.slice(-100)));
}

// Revenue estimation
export function estimateRevenue(clicks: number, averageOrderValue: number = 200): {
  estimatedBookings: number;
  estimatedRevenue: number;
  commission: number;
} {
  const conversionRate = 0.03;
  const estimatedBookings = Math.floor(clicks * conversionRate);
  const commission = estimatedBookings * averageOrderValue * 0.06; // ~6% blended average

  return {
    estimatedBookings,
    estimatedRevenue: estimatedBookings * averageOrderValue,
    commission
  };
}

// Get analytics data
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
    topExperiences: getTopExperiences(clicks)
  };
}

function getTopCategories(clicks: any[]) {
  const categoryCount = clicks.reduce((acc: Record<string, number>, click: any) => {
    acc[click.category] = (acc[click.category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(categoryCount)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 5)
    .map(([category, count]) => ({ category, count }));
}

function getTopExperiences(clicks: any[]) {
  const experienceCount = clicks.reduce((acc: Record<string, number>, click: any) => {
    acc[click.experienceTitle] = (acc[click.experienceTitle] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(experienceCount)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 5)
    .map(([title, count]) => ({ title, count }));
}
