// Affiliate Link Management System
export interface AffiliateProvider {
  name: string;
  baseUrl: string;
  partnerId: string;
  campaign?: string;
  commission: number;
}

// GetYourGuide API Response Types
export interface GetYourGuideActivity {
  activity_id: string;
  title: string;
  abstract: string;
  image_url: string;
  rating: number;
  number_of_ratings: number;
  price: {
    values: {
      amount: number;
      currency: string;
    }[];
  };
  duration: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  categories: string[];
  url: string;
  supplier: {
    name: string;
  };
  bookable: boolean;
  instant_confirmation: boolean;
  free_cancellation: boolean;
}

export interface GetYourGuideResponse {
  data: GetYourGuideActivity[];
  meta: {
    total_count: number;
    page: number;
    per_page: number;
  };
}

export const AFFILIATE_PROVIDERS: Record<string, AffiliateProvider> = {
  getyourguide: {
    name: 'GetYourGuide',
    baseUrl: 'https://www.getyourguide.es',
    partnerId: 'EBGURF8',
    campaign: 'share_to_earn',
    commission: 8 // 8% commission rate
  }
};

// Generate affiliate link for GetYourGuide experiences
export function generateAffiliateLink(
  provider: keyof typeof AFFILIATE_PROVIDERS,
  productUrl?: string,
  activityId?: string
): string {
  const affiliate = AFFILIATE_PROVIDERS[provider];
  
  if (!affiliate) {
    throw new Error(`Unknown affiliate provider: ${provider}`);
  }

  // Base affiliate link with partner tracking
  let affiliateUrl = `${affiliate.baseUrl}?partner_id=${affiliate.partnerId}`;
  
  if (affiliate.campaign) {
    affiliateUrl += `&cmp=${affiliate.campaign}`;
  }

  // Add specific activity tracking if provided
  if (activityId) {
    affiliateUrl += `&activity_id=${activityId}`;
  }

  // Add source tracking for analytics
  affiliateUrl += '&utm_source=tulumtkts&utm_medium=affiliate&utm_campaign=tulum_experiences';

  return affiliateUrl;
}

// Track affiliate click events
export function trackAffiliateClick(
  provider: string,
  experienceTitle: string,
  experiencePrice: string,
  category: string
) {
  // Analytics tracking for affiliate performance
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'affiliate_click', {
      event_category: 'Affiliate',
      event_label: `${provider}_${category}`,
      value: parseInt(experiencePrice.replace(/[^0-9]/g, '')) || 0,
      custom_parameters: {
        provider,
        experience_title: experienceTitle,
        experience_price: experiencePrice,
        category
      }
    });
  }

  // Store click data for revenue tracking
  const clickData = {
    provider,
    experienceTitle,
    experiencePrice,
    category,
    timestamp: new Date().toISOString(),
    sessionId: Math.random().toString(36).substr(2, 9)
  };

  // Save to localStorage for tracking
  const existingClicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
  existingClicks.push(clickData);
  localStorage.setItem('affiliate_clicks', JSON.stringify(existingClicks.slice(-100))); // Keep last 100 clicks
}

// Revenue estimation based on clicks and conversion rates
export function estimateRevenue(clicks: number, averageOrderValue: number = 200): {
  estimatedBookings: number;
  estimatedRevenue: number;
  commission: number;
} {
  const conversionRate = 0.03; // 3% conversion rate estimate
  const estimatedBookings = Math.floor(clicks * conversionRate);
  const commission = estimatedBookings * averageOrderValue * 0.08; // 8% GetYourGuide commission
  
  return {
    estimatedBookings,
    estimatedRevenue: estimatedBookings * averageOrderValue,
    commission
  };
}

// Get analytics data for affiliate performance
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
  const categoryCount = clicks.reduce((acc, click) => {
    acc[click.category] = (acc[click.category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(categoryCount)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 5)
    .map(([category, count]) => ({ category, count }));
}

function getTopExperiences(clicks: any[]) {
  const experienceCount = clicks.reduce((acc, click) => {
    acc[click.experienceTitle] = (acc[click.experienceTitle] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(experienceCount)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 5)
    .map(([title, count]) => ({ title, count }));
}