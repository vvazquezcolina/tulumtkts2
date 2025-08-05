import { useQuery } from '@tanstack/react-query';
import { GetYourGuideResponse, GetYourGuideActivity } from '@/lib/affiliate';

// Fetch Tulum experiences from GetYourGuide API
export function useTulumExperiences(options: {
  page?: number;
  per_page?: number;
  category?: string;
  sort_by?: 'popularity' | 'price' | 'rating';
  enabled?: boolean;
} = {}) {
  return useQuery<GetYourGuideResponse>({
    queryKey: ['tulum-experiences', options],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      
      if (options.page) searchParams.set('page', options.page.toString());
      if (options.per_page) searchParams.set('per_page', options.per_page.toString());
      if (options.category) searchParams.set('category', options.category);
      if (options.sort_by) searchParams.set('sort_by', options.sort_by);
      
      const response = await fetch(`/api/experiences/tulum?${searchParams}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch experiences: ${response.statusText}`);
      }
      
      return response.json();
    },
    enabled: options.enabled !== false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2
  });
}

// Fetch specific activity details
export function useActivityDetails(activityId: string | null) {
  return useQuery<GetYourGuideActivity>({
    queryKey: ['activity-details', activityId],
    queryFn: async () => {
      if (!activityId) throw new Error('Activity ID is required');
      
      const response = await fetch(`/api/experiences/${activityId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch activity: ${response.statusText}`);
      }
      
      return response.json();
    },
    enabled: !!activityId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Check GetYourGuide API status
export function useGetYourGuideStatus() {
  return useQuery({
    queryKey: ['getyourguide-status'],
    queryFn: async () => {
      const response = await fetch('/api/getyourguide/status');
      
      if (!response.ok) {
        throw new Error('Failed to check API status');
      }
      
      return response.json();
    },
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Track affiliate click and get URL
export async function trackAffiliateClickAPI(
  activityId: string,
  title: string,
  price: string,
  category: string
): Promise<{ affiliateUrl: string; partnerId: string }> {
  const response = await fetch('/api/affiliate/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      activityId,
      title,
      price,
      category,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to track affiliate click');
  }

  return response.json();
}