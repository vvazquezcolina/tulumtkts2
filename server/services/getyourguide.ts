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

  // Real Tulum experiences from your GetYourGuide partner account
  private getMockTulumData(options: any): GetYourGuideResponse {
    const realActivities: GetYourGuideActivity[] = [
      {
        activity_id: 'gyg-814206',
        title: 'Tulum: Zona Arqueológica (tour guiado)',
        abstract: 'Historia y vistas al Caribe con guía local.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/040b67511d57d3ab541d9e3cae988cfa8e1a24d1314da47630a1ebc58c478176.png',
        rating: 4.7,
        number_of_ratings: 1847,
        price: {
          values: [
            {
              amount: 45,
              currency: 'EUR'
            }
          ]
        },
        duration: '3 horas',
        location: {
          name: 'Tulum, Quintana Roo, Mexico',
          latitude: 20.2114,
          longitude: -87.4286
        },
        categories: ['archaeological', 'cultural', 'history'],
        url: 'https://www.getyourguide.com/tulum-l248/tulum-ruins-archaeological-zone-guided-walking-tour-t814206/?partner_id=EBGURF8',
        supplier: {
          name: 'GetYourGuide'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'gyg-473324',
        title: 'Ruinas de Tulum + 2 cenotes (medio día)',
        abstract: 'Ruinas + Mariposa y Chen-Ha. Transporte y guía.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/994a68adadeccec31d6d4cdfe621eccc08e77024e26ed6074e37d5773006244a.png',
        rating: 4.8,
        number_of_ratings: 1456,
        price: {
          values: [
            {
              amount: 89,
              currency: 'EUR'
            }
          ]
        },
        duration: '5 horas',
        location: {
          name: 'Riviera Maya, Mexico',
          latitude: 20.2242,
          longitude: -87.3478
        },
        categories: ['adventure', 'cenotes', 'archaeological'],
        url: 'https://www.getyourguide.com/riviera-maya-l1099/tulum-ruins-2-cenotes-half-day-tour-eco-t473324/?partner_id=EBGURF8',
        supplier: {
          name: 'GetYourGuide'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'gyg-697964',
        title: 'Cenotes Casa Tortuga (guiado)',
        abstract: 'Cenotes abiertos y cavernas con guía local.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/b6cc7d2dea6e6fc9b9f596168245a3f0ee4ea5defce1b1f133d293c85383fc58.jpeg',
        rating: 4.6,
        number_of_ratings: 987,
        price: {
          values: [
            {
              amount: 65,
              currency: 'EUR'
            }
          ]
        },
        duration: '4 horas',
        location: {
          name: 'Tulum, Mexico',
          latitude: 20.2114,
          longitude: -87.4286
        },
        categories: ['cenotes', 'adventure', 'nature'],
        url: 'https://www.getyourguide.com/tulum-l248/cenotes-casa-tortuga-guided-tour-with-basic-entry-ticket-t697964/?partner_id=EBGURF8',
        supplier: {
          name: 'GetYourGuide'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'gyg-671649',
        title: 'Sian Ka\'an: Canales mayas',
        abstract: 'Flotación en laguna y naturaleza, turismo sustentable.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/95b79a985cd5308e65c9e812033d12d973469cc5c943d69bcea208a5e0f50430.jpg',
        rating: 4.9,
        number_of_ratings: 743,
        price: {
          values: [
            {
              amount: 119,
              currency: 'EUR'
            }
          ]
        },
        duration: '8 horas',
        location: {
          name: 'Sian Ka\'an, Tulum',
          latitude: 20.0947,
          longitude: -87.6336
        },
        categories: ['nature', 'eco-tour', 'wildlife'],
        url: 'https://www.getyourguide.com/tulum-l248/riviera-maya-sian-ka-an-reserve-ancient-maya-canals-tour-t671649/?partner_id=EBGURF8',
        supplier: {
          name: 'GetYourGuide'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'gyg-13848',
        title: 'Sian Ka\'an: Paseo en lancha + lunch',
        abstract: 'Safari marino, snorkel en arrecife y playa.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/9a0a82c3af93d063.jpeg',
        rating: 4.7,
        number_of_ratings: 1234,
        price: {
          values: [
            {
              amount: 95,
              currency: 'EUR'
            }
          ]
        },
        duration: '6 horas',
        location: {
          name: 'Sian Ka\'an, Tulum',
          latitude: 20.0947,
          longitude: -87.6336
        },
        categories: ['marine', 'snorkeling', 'nature'],
        url: 'https://www.getyourguide.com/tulum-l248/sian-kaan-boat-trip-and-snorkel-adventure-t13848/?partner_id=EBGURF8',
        supplier: {
          name: 'GetYourGuide'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'gyg-625251',
        title: 'Akumal: snorkel con tortugas',
        abstract: 'Nado con tortugas + tiempo libre en la playa.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/28e8d0504b04e4ed08571f50d4984abcb91055ad07fe1ff1bb168d217d372cf1.jpg',
        rating: 4.8,
        number_of_ratings: 2156,
        price: {
          values: [
            {
              amount: 75,
              currency: 'EUR'
            }
          ]
        },
        duration: '5 horas',
        location: {
          name: 'Akumal, Riviera Maya',
          latitude: 20.3956,
          longitude: -87.3156
        },
        categories: ['snorkeling', 'wildlife', 'beach'],
        url: 'https://www.getyourguide.com/playa-del-carmen-l308/playa-del-carmentulum-akumal-beach-with-turtle-snorkeling-t625251/?partner_id=EBGURF8',
        supplier: {
          name: 'GetYourGuide'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'gyg-883336',
        title: 'Desde Tulum: Chichén Itzá + cenote + Valladolid',
        abstract: 'Best seller cultural en un día.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/c97aea4f0ecf3008661bc15361ac5c91e022e870f785edecc6f27be7353ae684.jpg',
        rating: 4.7,
        number_of_ratings: 3456,
        price: {
          values: [
            {
              amount: 129,
              currency: 'EUR'
            }
          ]
        },
        duration: '12 horas',
        location: {
          name: 'Chichén Itzá desde Tulum',
          latitude: 20.6843,
          longitude: -88.5678
        },
        categories: ['archaeological', 'cultural', 'day-trip'],
        url: 'https://www.getyourguide.com/tulum-l248/from-tulum-chichen-itza-cenote-saamal-and-valladolid-tour-t883336/?partner_id=EBGURF8',
        supplier: {
          name: 'GetYourGuide'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'gyg-354206',
        title: 'Aventura: ATV + cenote + tirolesas + rappel',
        abstract: 'Adrenalina en la selva con snack maya.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/5e1f5fd1c0888.jpeg',
        rating: 4.6,
        number_of_ratings: 1876,
        price: {
          values: [
            {
              amount: 109,
              currency: 'EUR'
            }
          ]
        },
        duration: '6 horas',
        location: {
          name: 'Selva Maya, Tulum',
          latitude: 20.2114,
          longitude: -87.4286
        },
        categories: ['adventure', 'extreme', 'nature'],
        url: 'https://www.getyourguide.com/cancun-l150/tulum-atv-cenote-and-rappelling-jungle-experience-t354206/?partner_id=EBGURF8',
        supplier: {
          name: 'GetYourGuide'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'gyg-486480',
        title: 'Tulum: navegación en catamarán (open bar)',
        abstract: 'Paseo de medio día con snorkel y paddle.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/64ab70608e0d3.jpeg',
        rating: 4.5,
        number_of_ratings: 987,
        price: {
          values: [
            {
              amount: 89,
              currency: 'EUR'
            }
          ]
        },
        duration: '4 horas',
        location: {
          name: 'Costa de Tulum',
          latitude: 20.1947,
          longitude: -87.4661
        },
        categories: ['sailing', 'beach', 'luxury'],
        url: 'https://www.getyourguide.com/tulum-l248/half-day-luxury-sailing-experience-in-tulum-with-open-bar-t486480/?partner_id=EBGURF8',
        supplier: {
          name: 'GetYourGuide'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'gyg-600898',
        title: 'Snorkel 2 h tortugas + arrecife (Tulum)',
        abstract: 'Tour corto ideal para agenda apretada.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/7bcf29e971c4753f07c51d757f401a4d3b14eb8deaf2ee06be0f712b1c3bf3e7.jpg',
        rating: 4.4,
        number_of_ratings: 654,
        price: {
          values: [
            {
              amount: 55,
              currency: 'EUR'
            }
          ]
        },
        duration: '2 horas',
        location: {
          name: 'Arrecife de Tulum',
          latitude: 20.1947,
          longitude: -87.4661
        },
        categories: ['snorkeling', 'wildlife', 'short-tour'],
        url: 'https://www.getyourguide.com/tulum-l248/tulum-2-hour-snorkeling-tour-with-sea-turtles-and-reef-t600898/?partner_id=EBGURF8',
        supplier: {
          name: 'GetYourGuide'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'gyg-4165',
        title: 'Temporada: Tiburón ballena (pick-up Tulum)',
        abstract: 'De mayo a sept: nado seguro con guía.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/4cfd31416a52c.png',
        rating: 4.9,
        number_of_ratings: 2234,
        price: {
          values: [
            {
              amount: 159,
              currency: 'EUR'
            }
          ]
        },
        duration: '10 horas',
        location: {
          name: 'Isla Mujeres desde Tulum',
          latitude: 21.2317,
          longitude: -86.7309
        },
        categories: ['wildlife', 'seasonal', 'marine'],
        url: 'https://www.getyourguide.com/cancun-l150/cancun-swim-with-whale-sharks-t4165/?partner_id=EBGURF8',
        supplier: {
          name: 'GetYourGuide'
        },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      }
    ];

    // Apply filtering based on options
    let filteredActivities = [...realActivities];
    
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
    const realData = this.getMockTulumData({});
    return realData.data.find(activity => activity.activity_id === activityId) || null;
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