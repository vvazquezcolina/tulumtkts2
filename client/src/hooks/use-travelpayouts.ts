import { useQuery } from '@tanstack/react-query';
import { TravelpayoutsActivity, ActivitiesResponse } from '@/lib/travelpayouts';

// Fetch Tulum experiences from Travelpayouts API (CSV data)
export function useTulumExperiences(options: {
  page?: number;
  per_page?: number;
  category?: string;
  sort_by?: 'popularity' | 'price' | 'rating';
  enabled?: boolean;
} = {}) {
  return useQuery<ActivitiesResponse>({
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
  return useQuery<TravelpayoutsActivity>({
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
      type: 'activity',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to track affiliate click');
  }

  return response.json();
}



