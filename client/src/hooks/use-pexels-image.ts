import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface PexelsImageResponse {
  imageUrl: string;
}

/**
 * Hook to fetch an image from Pexels API for blog posts
 * Falls back to the provided fallback image if Pexels is unavailable or fails
 */
export function usePexelsImage(query: string | undefined, fallbackImage: string): string {
  const [imageUrl, setImageUrl] = useState<string>(fallbackImage);

  const { data, isLoading, error } = useQuery<PexelsImageResponse>({
    queryKey: ['pexels-image', query],
    queryFn: async () => {
      if (!query) {
        throw new Error('No query provided');
      }

      const response = await fetch(`/api/pexels/blog-image?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch image from Pexels');
      }

      return response.json();
    },
    enabled: !!query,
    staleTime: 1000 * 60 * 60 * 24 * 7, // Cache for 7 days
    gcTime: 1000 * 60 * 60 * 24 * 30, // Keep in cache for 30 days
    retry: false, // Don't retry on failure, just use fallback
  });

  useEffect(() => {
    if (data?.imageUrl) {
      setImageUrl(data.imageUrl);
    } else if (error || !query) {
      // Use fallback if error or no query
      setImageUrl(fallbackImage);
    }
  }, [data, error, query, fallbackImage]);

  return imageUrl;
}

