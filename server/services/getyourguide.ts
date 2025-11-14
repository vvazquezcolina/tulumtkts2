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
    
    // Return real Tulum data from CSV
    return this.getRealTulumData(options);
  }

  // Get specific activity details
  async getActivityDetails(activityId: string): Promise<GetYourGuideActivity | null> {
    if (!this.apiToken) {
      console.log('GetYourGuide API token not available, using real data');
      return this.getRealActivityDetails(activityId);
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
      return this.getRealActivityDetails(activityId);
    }
  }

  // Real Tulum experiences from CSV data
  private getRealTulumData(options: any): GetYourGuideResponse {
    const realActivities: GetYourGuideActivity[] = [
      // 🏛️ ARQUEOLOGÍA Y CULTURA
      {
        activity_id: 'gyg-814206',
        title: 'Tulum: Zona Arqueológica – tour guiado a pie',
        abstract: 'Tour guiado por la Zona Arqueológica de Tulum con guías locales certificados.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/040b67511d57d3ab541d9e3cae988cfa8e1a24d1314da47630a1ebc58c478176.png',
        rating: 4.7,
        number_of_ratings: 1847,
        price: {
          values: [{ amount: 32, currency: 'USD' }]
        },
        duration: '3 horas',
        location: { name: 'Tulum, Quintana Roo, Mexico', latitude: 20.2114, longitude: -87.4286 },
        categories: ['arqueologia', 'cultura', 'historia'],
        url: 'https://www.getyourguide.com/tulum-l248/tulum-ruins-archaeological-zone-guided-walking-tour-t814206/?partner_id=EBGURF8&cmp=tulumtkts',
        supplier: { name: 'GetYourGuide' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'gyg-529582',
        title: 'Coba: Ruinas + Cenote (desde Tulum)',
        abstract: 'Excursión a Cobá con subida a estructuras y nado en cenote cercano.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/040b67511d57d3ab541d9e3cae988cfa8e1a24d1314da47630a1ebc58c478176.png',
        rating: 4.8,
        number_of_ratings: 1456,
        price: {
          values: [{ amount: 175, currency: 'USD' }]
        },
        duration: '8 horas',
        location: { name: 'Cobá desde Tulum', latitude: 20.2242, longitude: -87.3478 },
        categories: ['arqueologia', 'cenotes', 'aventura'],
        url: 'https://www.getyourguide.com/tulum-l248/from-tulum-coba-ruins-and-cenote-swim-tour-t529582/?partner_id=EBGURF8&cmp=tulumtkts',
        supplier: { name: 'GetYourGuide' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'gyg-599923',
        title: 'Ek Balam + cenote Xcanché',
        abstract: 'Acrópolis monumental y nado en cenote cercano.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/040b67511d57d3ab541d9e3cae988cfa8e1a24d1314da47630a1ebc58c478176.png',
        rating: 4.6,
        number_of_ratings: 987,
        price: {
          values: [{ amount: 140, currency: 'USD' }]
        },
        duration: '10 horas',
        location: { name: 'Ek Balam desde Tulum', latitude: 20.2114, longitude: -87.4286 },
        categories: ['arqueologia', 'cenotes', 'cultura'],
        url: 'https://www.getyourguide.com/chichen-itza-l785/chichen-itza-and-ek-balam-ruins-cenote-with-lunch-tour-t599923/?partner_id=EBGURF8&cmp=tulumtkts&lc=l45',
        supplier: { name: 'GetYourGuide' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },

      // 🏊 CENOTES Y LAGUNAS
      {
        activity_id: 'gyg-697964',
        title: 'Tulum: Tour guiado Cenotes Casa Tortuga (entrada básica)',
        abstract: 'Visita guiada a 4 cenotes en Casa Tortuga: 2 semiabiertos y 2 abiertos.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/b6cc7d2dea6e6fc9b9f596168245a3f0ee4ea5defce1b1f133d293c85383fc58.jpeg',
        rating: 4.6,
        number_of_ratings: 987,
        price: {
          values: [{ amount: 11, currency: 'USD' }]
        },
        duration: '4 horas',
        location: { name: 'Tulum, Mexico', latitude: 20.2114, longitude: -87.4286 },
        categories: ['cenotes', 'aventura', 'naturaleza'],
        url: 'https://www.getyourguide.com/tulum-l248/cenotes-casa-tortuga-guided-tour-with-basic-entry-ticket-t697964/?partner_id=EBGURF8&cmp=tulumtkts',
        supplier: { name: 'GetYourGuide' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'gyg-751044',
        title: 'Tulum: Laguna Kaan Luum + 3 Cenotes',
        abstract: 'Combo de naturaleza: laguna Kaan Luum y 3 cenotes icónicos.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/b6cc7d2dea6e6fc9b9f596168245a3f0ee4ea5defce1b1f133d293c85383fc58.jpeg',
        rating: 4.9,
        number_of_ratings: 743,
        price: {
          values: [{ amount: 137, currency: 'USD' }]
        },
        duration: '8 horas',
        location: { name: 'Laguna Kaan Luum, Tulum', latitude: 20.0947, longitude: -87.6336 },
        categories: ['cenotes', 'lagunas', 'naturaleza'],
        url: 'https://www.getyourguide.com/tulum-l248/tulum-kaan-luum-lagoon-3-cenotes-adventure-t751044/?partner_id=EBGURF8&cmp=tulumtkts',
        supplier: { name: 'GetYourGuide' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'gyg-828977',
        title: 'Cenote Dos Ojos: entrada / tour',
        abstract: 'Sistema de cuevas con tonos azules; ideal para fotos y snorkel.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/b6cc7d2dea6e6fc9b9f596168245a3f0ee4ea5defce1b1f133d293c85383fc58.jpeg',
        rating: 4.7,
        number_of_ratings: 1234,
        price: {
          values: [{ amount: 108, currency: 'USD' }]
        },
        duration: '4 horas',
        location: { name: 'Cenote Dos Ojos, Tulum', latitude: 20.0947, longitude: -87.6336 },
        categories: ['cenotes', 'snorkel', 'fotografia'],
        url: 'https://www.getyourguide.com/tulum-l248/tulum-dos-ojos-cenote-2-scuba-dives-with-transfer-option-t828977/?partner_id=EBGURF8&cmp=tulumtkts',
        supplier: { name: 'GetYourGuide' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },

      // 🤿 SNORKEL Y BUCEO
      {
        activity_id: 'gyg-600898',
        title: 'Tulum: Snorkel en 2 puntos del Arrecife (2h)',
        abstract: 'Salida en lancha para snorkelear en dos puntos del arrecife dentro del Parque Nacional.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/d1a32888cdfe62a2c31b1f79d735a604f16d5e2457cc3ad816987893f4af12b3.png',
        rating: 4.8,
        number_of_ratings: 2156,
        price: {
          values: [{ amount: 47, currency: 'USD' }]
        },
        duration: '2 horas',
        location: { name: 'Arrecife de Tulum', latitude: 20.1947, longitude: -87.4661 },
        categories: ['snorkel', 'arrecife', 'marino'],
        url: 'https://www.getyourguide.com/tulum-l248/tulum-2-hour-snorkeling-in-two-spots-of-tulum-s-reef-t600898/?partner_id=EBGURF8&cmp=tulumtkts',
        supplier: { name: 'GetYourGuide' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'gyg-832301',
        title: 'Yal-Kú: snorkel laguna',
        abstract: 'Estuario con peces tropicales, ideal para principiantes.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/d1a32888cdfe62a2c31b1f79d735a604f16d5e2457cc3ad816987893f4af12b3.png',
        rating: 4.5,
        number_of_ratings: 654,
        price: {
          values: [{ amount: 81, currency: 'USD' }]
        },
        duration: '3 horas',
        location: { name: 'Yal-Kú, Akumal', latitude: 20.3956, longitude: -87.3156 },
        categories: ['snorkel', 'laguna', 'principiantes'],
        url: 'https://www.getyourguide.com/akumal-l2807/from-tulum-yal-ku-lagoon-and-turtle-observation-tour-t832301/?partner_id=EBGURF8&cmp=tulumtkts',
        supplier: { name: 'GetYourGuide' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },

      // ⛵ NAVEGACIÓN Y CATAMARANES
      {
        activity_id: 'gyg-486480',
        title: 'Tulum: Velero de lujo medio día con barra libre',
        abstract: 'Experiencia premium en catamarán con barra libre, snorkel y paddle.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/64ab70608e0d3.jpeg',
        rating: 4.5,
        number_of_ratings: 987,
        price: {
          values: [{ amount: 149, currency: 'USD' }]
        },
        duration: '4 horas',
        location: { name: 'Costa de Tulum', latitude: 20.1947, longitude: -87.4661 },
        categories: ['catamaran', 'lujo', 'snorkel'],
        url: 'https://www.getyourguide.com/tulum-l248/half-day-luxury-sailing-experience-in-tulum-with-open-bar-t486480/?partner_id=EBGURF8&cmp=tulumtkts',
        supplier: { name: 'GetYourGuide' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },

      // 🌿 AVENTURA EN LA SELVA
      {
        activity_id: 'gyg-354206',
        title: 'Tulum: ATV + Cenote + Tirolesas + Rappel',
        abstract: 'Aventura en la selva: ATV, rappel, tirolesas y cenote.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/d1a32888cdfe62a2c31b1f79d735a604f16d5e2457cc3ad816987893f4af12b3.png',
        rating: 4.6,
        number_of_ratings: 1876,
        price: {
          values: [{ amount: 89, currency: 'USD' }]
        },
        duration: '6 horas',
        location: { name: 'Selva Maya, Tulum', latitude: 20.2114, longitude: -87.4286 },
        categories: ['aventura', 'atv', 'tirolesas'],
        url: 'https://www.getyourguide.com/cancun-l150/tulum-atv-cenote-and-rappelling-jungle-experience-t354206/?partner_id=EBGURF8&cmp=tulumtkts',
        supplier: { name: 'GetYourGuide' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },

      // 🏞️ PARQUES Y RESERVAS
      {
        activity_id: 'gyg-671649',
        title: 'Sian Ka\'an: Reserva y canales mayas (Muyil)',
        abstract: 'Reserva de Sian Ka\'an: paseo en lancha y flotado por canales mayas.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/95b79a985cd5308e65c9e812033d12d973469cc5c943d69bcea208a5e0f50430.jpg',
        rating: 4.9,
        number_of_ratings: 743,
        price: {
          values: [{ amount: 160, currency: 'USD' }]
        },
        duration: '8 horas',
        location: { name: 'Sian Ka\'an, Tulum', latitude: 20.0947, longitude: -87.6336 },
        categories: ['reserva', 'naturaleza', 'eco-tour'],
        url: 'https://www.getyourguide.com/tulum-l248/riviera-maya-sian-ka-an-reserve-ancient-maya-canals-tour-t671649/?partner_id=EBGURF8&cmp=tulumtkts',
        supplier: { name: 'GetYourGuide' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },

      // 🍽️ GASTRONOMÍA Y CIUDAD
      {
        activity_id: 'gyg-150560',
        title: 'Tulum Bike Tour',
        abstract: 'City tour en bici por playas, arte y spots foodie.',
        image_url: 'https://cdn.getyourguide.com/image/format%3Dauto%2Cfit%3Dcontain%2Cgravity%3Dauto%2Cquality%3D60%2Cwidth%3D1440%2Cheight%3D650%2Cdpr%3D1/tour_img/040b67511d57d3ab541d9e3cae988cfa8e1a24d1314da47630a1ebc58c478176.png',
        rating: 4.7,
        number_of_ratings: 1234,
        price: {
          values: [{ amount: 95, currency: 'USD' }]
        },
        duration: '4 horas',
        location: { name: 'Tulum Centro', latitude: 20.2114, longitude: -87.4286 },
        categories: ['ciudad', 'bicicleta', 'gastronomia'],
        url: 'https://www.getyourguide.com/tulum-l248/tulum-guided-bike-tour-ruins-tacos-and-cenote-t150560/?partner_id=EBGURF8&cmp=tulumtkts',
        supplier: { name: 'GetYourGuide' },
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

  private getRealActivityDetails(activityId: string): GetYourGuideActivity | null {
    const realData = this.getRealTulumData({});
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