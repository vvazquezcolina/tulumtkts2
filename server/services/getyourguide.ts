// GetYourGuide API Integration Service
import { Request, Response } from 'express';

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

class GetYourGuideService {
  private readonly baseUrl = 'https://api.getyourguide.com/1';
  private readonly partnerId = 'EBGURF8';
  private apiToken: string | null = null;

  constructor() {
    this.apiToken = process.env.GETYOURGUIDE_API_TOKEN || null;
  }

  // Generate affiliate URL with tracking
  generateAffiliateUrl(activityId?: string): string {
    let url = `https://www.getyourguide.es?partner_id=${this.partnerId}&cmp=share_to_earn`;
    
    if (activityId) {
      url += `&activity_id=${activityId}`;
    }
    
    // Add tracking parameters
    url += '&utm_source=tulumtkts&utm_medium=affiliate&utm_campaign=tulum_experiences';
    
    return url;
  }

  // Search activities in Tulum area
  async searchTulumActivities(options: {
    page?: number;
    per_page?: number;
    category?: string;
    sort_by?: 'popularity' | 'price' | 'rating';
    language?: string;
    currency?: string;
  } = {}): Promise<GetYourGuideResponse | null> {
    
    // For now, return mock data structure that matches GetYourGuide format
    // This will be replaced with real API calls once we have the API token
    return this.getMockTulumData(options);
  }

  // Get specific activity details
  async getActivityDetails(activityId: string): Promise<GetYourGuideActivity | null> {
    if (!this.apiToken) {
      console.log('GetYourGuide API token not available, using mock data');
      return this.getMockActivityDetails(activityId);
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/activities/${activityId}?cnt_language=es&currency=EUR`,
        {
          headers: {
            'Accept': 'application/json',
            'X-ACCESS-TOKEN': this.apiToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GetYourGuide API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching activity details:', error);
      return this.getMockActivityDetails(activityId);
    }
  }

  // Mock data that represents actual Tulum experiences format
  private getMockTulumData(options: any): GetYourGuideResponse {
    const mockActivities: GetYourGuideActivity[] = [
      {
        activity_id: 'tulum-ruins-001',
        title: 'Tulum Archaeological Zone Skip-the-Line Tour',
        abstract: 'Explore the stunning clifftop Mayan ruins of Tulum with an expert guide. Skip the lines and discover the history of this ancient coastal fortress.',
        image_url: 'https://images.unsplash.com/photo-1574181419028-e8c44c95a6d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        rating: 4.8,
        number_of_ratings: 2847,
        price: {
          values: [
            {
              amount: 65,
              currency: 'EUR'
            }
          ]
        },
        duration: '4 hours',
        location: {
          name: 'Tulum, Quintana Roo, Mexico',
          latitude: 20.2114,
          longitude: -87.4286
        },
        categories: ['archaeological', 'cultural', 'history'],
        url: this.generateAffiliateUrl('tulum-ruins-001'),
        supplier: {
          name: 'Tulum Archaeological Tours'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'cenote-dos-ojos-002',
        title: 'Cenote Dos Ojos Snorkeling Adventure',
        abstract: 'Swim and snorkel in the crystal-clear waters of Cenote Dos Ojos, one of Tulum\'s most beautiful underground cave systems.',
        image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        rating: 4.9,
        number_of_ratings: 1923,
        price: {
          values: [
            {
              amount: 89,
              currency: 'EUR'
            }
          ]
        },
        duration: '5 hours',
        location: {
          name: 'Dos Ojos, Tulum, Mexico',
          latitude: 20.2242,
          longitude: -87.3478
        },
        categories: ['adventure', 'cenotes', 'snorkeling'],
        url: this.generateAffiliateUrl('cenote-dos-ojos-002'),
        supplier: {
          name: 'Cenote Adventures Tulum'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'chichen-itza-003',
        title: 'Chichen Itza Day Trip from Tulum',
        abstract: 'Discover one of the New Seven Wonders of the World on this full-day tour to Chichen Itza with expert guide and transportation included.',
        image_url: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        rating: 4.7,
        number_of_ratings: 3156,
        price: {
          values: [
            {
              amount: 159,
              currency: 'EUR'
            }
          ]
        },
        duration: '12 hours',
        location: {
          name: 'Chichen Itza from Tulum',
          latitude: 20.6843,
          longitude: -88.5678
        },
        categories: ['archaeological', 'cultural', 'day-trip'],
        url: this.generateAffiliateUrl('chichen-itza-003'),
        supplier: {
          name: 'Mayan Heritage Tours'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'xel-ha-snorkel-004',
        title: 'Xel-Há All-Inclusive Eco Park Adventure',
        abstract: 'Enjoy unlimited snorkeling, river floating, and cenote swimming at Xel-Há natural aquarium with all food and drinks included.',
        image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        rating: 4.6,
        number_of_ratings: 2134,
        price: {
          values: [
            {
              amount: 119,
              currency: 'EUR'
            }
          ]
        },
        duration: '8 hours',
        location: {
          name: 'Xel-Há, Riviera Maya',
          latitude: 20.3147,
          longitude: -87.3589
        },
        categories: ['adventure', 'snorkeling', 'eco-park'],
        url: this.generateAffiliateUrl('xel-ha-snorkel-004'),
        supplier: {
          name: 'Xcaret Experiences'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'tulum-beach-club-005',
        title: 'Tulum Beach Club Day Pass with Lunch',
        abstract: 'Relax at exclusive Tulum beach clubs with crystal-clear waters, white sand beaches, and gourmet lunch included.',
        image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        rating: 4.5,
        number_of_ratings: 987,
        price: {
          values: [
            {
              amount: 75,
              currency: 'EUR'
            }
          ]
        },
        duration: '6 hours',
        location: {
          name: 'Tulum Beach Zone',
          latitude: 20.1947,
          longitude: -87.4661
        },
        categories: ['beach', 'relaxation', 'luxury'],
        url: this.generateAffiliateUrl('tulum-beach-club-005'),
        supplier: {
          name: 'Tulum Beach Experiences'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'coba-bike-tour-006',
        title: 'Coba Mayan Ruins Bike Tour and Cenote Swim',
        abstract: 'Bike through the jungle to climb the tallest pyramid in Yucatan at Coba, then cool off in a pristine cenote.',
        image_url: 'https://images.unsplash.com/photo-1574181261513-2e7dc4c10362?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
        rating: 4.8,
        number_of_ratings: 1456,
        price: {
          values: [
            {
              amount: 95,
              currency: 'EUR'
            }
          ]
        },
        duration: '7 hours',
        location: {
          name: 'Coba, Quintana Roo',
          latitude: 20.4947,
          longitude: -87.7336
        },
        categories: ['archaeological', 'adventure', 'cycling'],
        url: this.generateAffiliateUrl('coba-bike-tour-006'),
        supplier: {
          name: 'Jungle Adventures Tulum'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      }
    ];

    // Apply filtering based on options
    let filteredActivities = [...mockActivities];
    
    if (options.category) {
      filteredActivities = filteredActivities.filter(activity => 
        activity.categories.includes(options.category)
      );
    }

    // Apply sorting
    if (options.sort_by === 'rating') {
      filteredActivities.sort((a, b) => b.rating - a.rating);
    } else if (options.sort_by === 'price') {
      filteredActivities.sort((a, b) => a.price.values[0].amount - b.price.values[0].amount);
    }

    // Pagination
    const page = options.page || 1;
    const perPage = options.per_page || 10;
    const startIndex = (page - 1) * perPage;
    const paginatedResults = filteredActivities.slice(startIndex, startIndex + perPage);

    return {
      data: paginatedResults,
      meta: {
        total_count: filteredActivities.length,
        page: page,
        per_page: perPage
      }
    };
  }

  private getMockActivityDetails(activityId: string): GetYourGuideActivity | null {
    const mockData = this.getMockTulumData({});
    return mockData.data.find(activity => activity.activity_id === activityId) || null;
  }

  // Check if API is properly configured
  isConfigured(): boolean {
    return this.apiToken !== null;
  }

  // Get configuration status for admin dashboard
  getStatus() {
    return {
      configured: this.isConfigured(),
      partnerId: this.partnerId,
      hasApiToken: !!this.apiToken,
      baseUrl: this.baseUrl
    };
  }
}

export const getYourGuideService = new GetYourGuideService();