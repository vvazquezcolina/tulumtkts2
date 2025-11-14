interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  liked: boolean;
  alt: string;
}

interface PexelsSearchResponse {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
  next_page?: string;
}

interface PexelsCuratedResponse {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
}

class PexelsService {
  private apiKey: string;
  private baseUrl = 'https://api.pexels.com/v1';

  constructor() {
    this.apiKey = process.env.PEXELS_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('PEXELS_API_KEY not found in environment variables. Pexels service will not work.');
    }
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
    if (!this.apiKey) {
      console.error('Pexels API key not configured');
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Authorization': this.apiKey,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        console.error(`Pexels API error: ${response.status} ${response.statusText}`);
        return null;
      }

      return await response.json() as T;
    } catch (error) {
      console.error('Error making request to Pexels API:', error);
      return null;
    }
  }

  /**
   * Search for photos by query
   */
  async searchPhotos(query: string, options: {
    per_page?: number;
    page?: number;
    orientation?: 'landscape' | 'portrait' | 'square';
    size?: 'large' | 'medium' | 'small';
    color?: string;
    locale?: string;
  } = {}): Promise<PexelsPhoto[] | null> {
    const params = new URLSearchParams({
      query,
      per_page: String(options.per_page || 15),
      page: String(options.page || 1),
    });

    if (options.orientation) params.append('orientation', options.orientation);
    if (options.size) params.append('size', options.size);
    if (options.color) params.append('color', options.color);
    if (options.locale) params.append('locale', options.locale);

    const response = await this.makeRequest<PexelsSearchResponse>(
      `/search?${params.toString()}`
    );

    return response?.photos || null;
  }

  /**
   * Get curated photos
   */
  async getCuratedPhotos(options: {
    per_page?: number;
    page?: number;
  } = {}): Promise<PexelsPhoto[] | null> {
    const params = new URLSearchParams({
      per_page: String(options.per_page || 15),
      page: String(options.page || 1),
    });

    const response = await this.makeRequest<PexelsCuratedResponse>(
      `/curated?${params.toString()}`
    );

    return response?.photos || null;
  }

  /**
   * Get a photo by ID
   */
  async getPhotoById(id: number): Promise<PexelsPhoto | null> {
    const response = await this.makeRequest<PexelsPhoto>(`/photos/${id}`);
    return response;
  }

  /**
   * Get a random photo for a specific query
   * Useful for blog posts
   */
  async getRandomPhotoForQuery(query: string, orientation: 'landscape' | 'portrait' | 'square' = 'landscape'): Promise<string | null> {
    const photos = await this.searchPhotos(query, {
      per_page: 10,
      orientation,
    });

    if (!photos || photos.length === 0) {
      return null;
    }

    // Return a random photo from the results
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
    return randomPhoto.src.large || randomPhoto.src.original;
  }

  /**
   * Get optimized image URL for blog posts
   * Returns large landscape image optimized for web
   */
  async getBlogImage(query: string, width: number = 800, height: number = 600): Promise<string | null> {
    const photos = await this.searchPhotos(query, {
      per_page: 5,
      orientation: 'landscape',
    });

    if (!photos || photos.length === 0) {
      return null;
    }

    // Select the first photo (most relevant)
    const photo = photos[0];
    
    // Return large2x for better quality on high-DPI screens
    // The API will handle the sizing
    return photo.src.large2x || photo.src.large || photo.src.original;
  }

  /**
   * Check if service is configured
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

export const pexelsService = new PexelsService();

