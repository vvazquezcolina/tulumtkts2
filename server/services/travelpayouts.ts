// Travelpayouts API Integration Service
export interface TravelpayoutsFlight {
  origin: string;
  destination: string;
  airline: string;
  departure_at: string;
  return_at?: string;
  expires_at: string;
  price: number;
  flight_number: string;
  transfers: number;
  currency?: string;
}

export interface TravelpayoutsHotel {
  hotel_id: string;
  name: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  rating: number;
  price: number;
  currency: string;
  image_url?: string;
  url: string;
  stars?: number;
  address?: string;
  description?: string;
  amenities?: string[];
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export interface HotelSearchResult {
  searchId?: string;
  hotels: TravelpayoutsHotel[];
  total: number;
  currency: string;
}

export interface TravelpayoutsActivity {
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

export interface TravelpayoutsResponse<T> {
  data: T;
  currency?: string;
  success: boolean;
}

export interface ActivitiesResponse {
  data: TravelpayoutsActivity[];
  meta: {
    total_count: number;
    page: number;
    per_page: number;
  };
}

class TravelpayoutsService {
  private readonly baseUrl = 'https://api.travelpayouts.com/v1';
  private readonly token: string;
  private readonly marker: string; // Partner marker for affiliate links

  constructor() {
    const apiToken = process.env.TRAVELPAYOUTS_API_TOKEN;
    if (!apiToken) {
      console.warn('⚠️  TRAVELPAYOUTS_API_TOKEN not set. Some features may not work correctly.');
      console.warn('   Please set TRAVELPAYOUTS_API_TOKEN in your environment variables.');
    }
    this.token = apiToken || '';
    // Travelpayouts marker is typically the same as token or can be configured separately
    this.marker = process.env.TRAVELPAYOUTS_MARKER || this.token;
  }

  // Generate affiliate URL for flights
  generateFlightAffiliateUrl(origin: string, destination: string, departureDate?: string, returnDate?: string): string {
    const baseUrl = 'https://www.aviasales.com';
    let url = `${baseUrl}/search/${origin}${departureDate ? departureDate : ''}${destination}${returnDate ? returnDate : ''}`;
    url += `?marker=${this.marker}`;
    url += '&utm_source=tulumtkts&utm_medium=affiliate&utm_campaign=tulum_flights';
    return url;
  }

  // Generate affiliate URL for hotels
  generateHotelAffiliateUrl(location: string, checkIn?: string, checkOut?: string, hotelId?: string): string {
    const baseUrl = 'https://www.hotellook.com';
    let url = `${baseUrl}/hotels/${location}`;
    const params = new URLSearchParams();
    
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (hotelId) params.set('hotelId', hotelId);
    params.set('marker', this.marker);
    params.set('utm_source', 'tulumtkts');
    params.set('utm_medium', 'affiliate');
    params.set('utm_campaign', 'tulum_hotels');
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    return url;
  }

  // Search hotels using Hotellook API
  async searchHotels(options: {
    location: string; // IATA code or location name
    checkIn?: string; // YYYY-MM-DD
    checkOut?: string; // YYYY-MM-DD
    adults?: number;
    children?: number;
    currency?: string;
    lang?: string;
  }): Promise<HotelSearchResult | null> {
    try {
      // First, try to lookup the location
      const lookupResponse = await fetch(
        `http://engine.hotellook.com/api/v2/lookup.json?query=${encodeURIComponent(options.location)}&token=${this.token}`
      );

      if (!lookupResponse.ok) {
        throw new Error(`Hotellook lookup error: ${lookupResponse.status}`);
      }

      const lookupData = await lookupResponse.json();
      
      // Find Tulum or Cancun location
      let locationCode = null;
      if (lookupData.results && lookupData.results.length > 0) {
        // Try to find Tulum or Cancun
        const tulumLocation = lookupData.results.find((loc: any) => 
          loc.name?.toLowerCase().includes('tulum') || 
          loc.name?.toLowerCase().includes('cancun') ||
          loc.iata === 'CUN'
        );
        locationCode = tulumLocation?.iata || tulumLocation?.locationId || lookupData.results[0].iata;
      }

      if (!locationCode) {
        // Default to Cancun airport (CUN) for Tulum area
        locationCode = 'CUN';
      }

      // Start hotel search
      const searchParams = new URLSearchParams({
        iata: locationCode,
        token: this.token,
        marker: this.marker,
        lang: options.lang || 'es',
        currency: options.currency || 'USD',
        checkIn: options.checkIn || new Date().toISOString().split('T')[0],
        checkOut: options.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0],
        adultsCount: (options.adults || 2).toString(),
        waitForResult: '1', // Wait for results
      });

      if (options.children) {
        searchParams.set('childrenCount', options.children.toString());
      }

      const searchResponse = await fetch(
        `http://engine.hotellook.com/api/v2/search/start.json?${searchParams}`
      );

      if (!searchResponse.ok) {
        throw new Error(`Hotellook search error: ${searchResponse.status}`);
      }

      const searchData = await searchResponse.json();
      
      if (searchData.status === 'ok' && searchData.results) {
        // Get hotel results
        const hotels = searchData.results.hotels || [];
        
        const formattedHotels: TravelpayoutsHotel[] = hotels.slice(0, 50).map((hotel: any) => ({
          hotel_id: hotel.hotelId?.toString() || hotel.id?.toString() || '',
          name: hotel.name || hotel.hotelName || 'Hotel',
          location: {
            name: hotel.location?.name || hotel.locationName || options.location,
            latitude: hotel.location?.lat || hotel.latitude || 20.2114,
            longitude: hotel.location?.lon || hotel.longitude || -87.4286,
          },
          rating: hotel.rating || hotel.stars || 0,
          stars: hotel.stars || 0,
          price: hotel.priceFrom || hotel.price || 0,
          currency: options.currency || 'USD',
          image_url: hotel.image || hotel.imageUrl || `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600`,
          url: this.generateHotelAffiliateUrl(locationCode, options.checkIn, options.checkOut, hotel.hotelId?.toString()),
          address: hotel.address || hotel.location?.address,
          description: hotel.description || hotel.shortDescription,
          amenities: hotel.amenities || [],
          checkIn: options.checkIn,
          checkOut: options.checkOut,
          guests: (options.adults || 2) + (options.children || 0),
        }));

        return {
          searchId: searchData.searchId,
          hotels: formattedHotels,
          total: hotels.length,
          currency: options.currency || 'USD',
        };
      }

      return null;
    } catch (error) {
      console.error('Error searching hotels:', error);
      return null;
    }
  }

  // Get hotel details by ID
  async getHotelDetails(hotelId: string, options: {
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    currency?: string;
  }): Promise<TravelpayoutsHotel | null> {
    try {
      // Use search with hotel ID filter
      const searchResult = await this.searchHotels({
        location: 'CUN', // Cancun area
        checkIn: options.checkIn,
        checkOut: options.checkOut,
        adults: options.adults,
        currency: options.currency,
      });

      if (searchResult) {
        const hotel = searchResult.hotels.find(h => h.hotel_id === hotelId);
        return hotel || null;
      }

      return null;
    } catch (error) {
      console.error('Error fetching hotel details:', error);
      return null;
    }
  }

  // Generate affiliate URL for activities/tours
  // Note: Activities come from CSV with affiliate URLs, which we track through Travelpayouts system
  generateActivityAffiliateUrl(activityId?: string, destination: string = 'tulum'): string {
    // For activities, we use the URLs from the CSV but track clicks through Travelpayouts
    // This is a fallback - the CSV parser should provide the URLs directly
    const baseUrl = 'https://www.travelpayouts.com';
    let url = `${baseUrl}/search?destination=${destination}`;
    if (activityId) {
      url += `&activity=${activityId}`;
    }
    url += `&marker=${this.marker}`;
    url += '&utm_source=tulumtkts&utm_medium=affiliate&utm_campaign=tulum_experiences';
    return url;
  }

  // Search flights
  async searchFlights(options: {
    origin: string;
    destination: string;
    departureDate?: string;
    returnDate?: string;
    currency?: string;
  }): Promise<TravelpayoutsResponse<Record<string, TravelpayoutsFlight>> | null> {
    try {
      const params = new URLSearchParams({
        token: this.token,
        origin: options.origin,
        destination: options.destination,
      });

      if (options.currency) {
        params.set('currency', options.currency);
      }

      const response = await fetch(`${this.baseUrl}/city-directions?${params}`);

      if (!response.ok) {
        throw new Error(`Travelpayouts API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching flights:', error);
      return null;
    }
  }

  // Get cheap flights
  async getCheapFlights(options: {
    origin: string;
    destination: string;
    currency?: string;
  }): Promise<TravelpayoutsResponse<Record<string, Record<string, TravelpayoutsFlight>>> | null> {
    try {
      const params = new URLSearchParams({
        token: this.token,
        origin: options.origin,
        destination: options.destination,
      });

      if (options.currency) {
        params.set('currency', options.currency);
      }

      const response = await fetch(`${this.baseUrl}/prices/cheap?${params}`);

      if (!response.ok) {
        throw new Error(`Travelpayouts API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cheap flights:', error);
      return null;
    }
  }

  // Get monthly flight prices
  async getMonthlyFlights(options: {
    origin: string;
    destination: string;
    currency?: string;
  }): Promise<TravelpayoutsResponse<Record<string, TravelpayoutsFlight>> | null> {
    try {
      const params = new URLSearchParams({
        token: this.token,
        origin: options.origin,
        destination: options.destination,
      });

      if (options.currency) {
        params.set('currency', options.currency);
      }

      const response = await fetch(`${this.baseUrl}/prices/monthly?${params}`);

      if (!response.ok) {
        throw new Error(`Travelpayouts API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching monthly flights:', error);
      return null;
    }
  }

  // Get calendar of prices (lowest prices for each day of month)
  async getCalendarPrices(options: {
    origin: string;
    destination: string;
    month?: string; // Format: YYYY-MM
    currency?: string;
  }): Promise<any> {
    try {
      const params = new URLSearchParams({
        token: this.token,
        origin: options.origin,
        destination: options.destination,
      });

      if (options.month) {
        params.set('month', options.month);
      }

      if (options.currency) {
        params.set('currency', options.currency);
      }

      const response = await fetch(`${this.baseUrl}/prices/calendar?${params}`);

      if (!response.ok) {
        throw new Error(`Travelpayouts API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching calendar prices:', error);
      return null;
    }
  }

  // Get list of airports
  async getAirports(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/data/airports.json`);

      if (!response.ok) {
        throw new Error(`Travelpayouts API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching airports:', error);
      return null;
    }
  }

  // Get list of cities
  async getCities(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/data/cities.json`);

      if (!response.ok) {
        throw new Error(`Travelpayouts API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      return null;
    }
  }

  // Get list of airlines
  async getAirlines(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/data/airlines.json`);

      if (!response.ok) {
        throw new Error(`Travelpayouts API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching airlines:', error);
      return null;
    }
  }

  // Search Tulum activities using real CSV data
  async searchTulumActivities(options: {
    page?: number;
    per_page?: number;
    category?: string;
    sort_by?: 'popularity' | 'price' | 'rating';
    language?: string;
    currency?: string;
  } = {}): Promise<ActivitiesResponse | null> {
    try {
      // Import CSV parser
      const { parseCSVActivities } = await import('./csv-parser');
      const allActivities = parseCSVActivities();
      
      if (allActivities.length === 0) {
        console.error('WARNING: CSV parser returned 0 activities. Check CSV file path and format.');
        return {
          data: [],
          meta: {
            total_count: 0,
            page: options.page || 1,
            per_page: options.per_page || 12
          }
        };
      }
      
      console.log(`Loaded ${allActivities.length} activities from CSV`);

      // Apply filtering
      let filteredActivities = [...allActivities];

      if (options.category) {
        filteredActivities = filteredActivities.filter(activity =>
          activity.categories.some(cat =>
            cat.toLowerCase().includes(options.category!.toLowerCase())
          )
        );
      }

      // Apply sorting
      if (options.sort_by === 'rating') {
        filteredActivities.sort((a, b) => b.rating - a.rating);
      } else if (options.sort_by === 'price') {
        filteredActivities.sort((a, b) =>
          a.price.values[0].amount - b.price.values[0].amount
        );
      } else {
        // Default: popularity (by number of ratings)
        filteredActivities.sort((a, b) => b.number_of_ratings - a.number_of_ratings);
      }

      // Pagination
      const page = options.page || 1;
      const perPage = options.per_page || 12;
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
    } catch (error) {
      console.error('Error fetching activities from CSV:', error);
      console.error('Error details:', error);
      // Return empty result instead of fallback mock data
      return {
        data: [],
        meta: {
          total_count: 0,
          page: options.page || 1,
          per_page: options.per_page || 12
        }
      };
    }
  }

  // Get specific activity details
  async getActivityDetails(activityId: string): Promise<TravelpayoutsActivity | null> {
    try {
      const { parseCSVActivities } = await import('./csv-parser');
      const allActivities = parseCSVActivities();
      return allActivities.find(activity => activity.activity_id === activityId) || null;
    } catch (error) {
      console.error('Error fetching activity details from CSV:', error);
      return null;
    }
  }

  // DEPRECATED: This fallback should not be used. CSV parser should always work.
  // Keeping for reference only - should return empty instead
  private getRealTulumData(options: any): ActivitiesResponse {
    const realActivities: TravelpayoutsActivity[] = [
      // 🏛️ ARQUEOLOGÍA Y CULTURA
      {
        activity_id: 'tp-814206',
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
        url: this.generateActivityAffiliateUrl('tp-814206'),
        supplier: { name: 'Travelpayouts' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'tp-529582',
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
        url: this.generateActivityAffiliateUrl('tp-529582'),
        supplier: { name: 'Travelpayouts Partner' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'tp-599923',
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
        url: this.generateActivityAffiliateUrl('tp-599923'),
        supplier: { name: 'Travelpayouts Partner' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      // 🏊 CENOTES Y LAGUNAS
      {
        activity_id: 'tp-697964',
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
        url: this.generateActivityAffiliateUrl('tp-697964'),
        supplier: { name: 'Travelpayouts Partner' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'tp-751044',
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
        url: this.generateActivityAffiliateUrl('tp-751044'),
        supplier: { name: 'Travelpayouts Partner' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'tp-828977',
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
        url: this.generateActivityAffiliateUrl('tp-828977'),
        supplier: { name: 'Travelpayouts Partner' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      // 🤿 SNORKEL Y BUCEO
      {
        activity_id: 'tp-600898',
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
        url: this.generateActivityAffiliateUrl('tp-600898'),
        supplier: { name: 'Travelpayouts Partner' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      {
        activity_id: 'tp-832301',
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
        url: this.generateActivityAffiliateUrl('tp-832301'),
        supplier: { name: 'Travelpayouts Partner' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      // ⛵ NAVEGACIÓN Y CATAMARANES
      {
        activity_id: 'tp-486480',
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
        url: this.generateActivityAffiliateUrl('tp-486480'),
        supplier: { name: 'Travelpayouts Partner' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      // 🌿 AVENTURA EN LA SELVA
      {
        activity_id: 'tp-354206',
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
        url: this.generateActivityAffiliateUrl('tp-354206'),
        supplier: { name: 'Travelpayouts Partner' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      // 🏞️ PARQUES Y RESERVAS
      {
        activity_id: 'tp-671649',
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
        url: this.generateActivityAffiliateUrl('tp-671649'),
        supplier: { name: 'Travelpayouts Partner' },
        bookable: true,
        instant_confirmation: true,
        free_cancellation: true
      },
      // 🍽️ GASTRONOMÍA Y CIUDAD
      {
        activity_id: 'tp-150560',
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
        url: this.generateActivityAffiliateUrl('tp-150560'),
        supplier: { name: 'Travelpayouts Partner' },
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

  // Check if API is properly configured
  isConfigured(): boolean {
    return !!this.token && this.token.length > 0;
  }

  // Get configuration status for admin dashboard
  getStatus() {
    return {
      configured: this.isConfigured(),
      marker: this.marker,
      hasApiToken: !!this.token,
      baseUrl: this.baseUrl,
      tokenLength: this.token?.length || 0
    };
  }
  
  // Get marker for affiliate links (public method)
  getMarker(): string {
    return this.marker;
  }
}

export const travelpayoutsService = new TravelpayoutsService();

