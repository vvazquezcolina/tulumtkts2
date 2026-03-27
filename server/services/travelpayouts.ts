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

  // Generate affiliate URL for flights via tp.media redirect
  generateFlightAffiliateUrl(origin: string, destination: string, departureDate?: string, returnDate?: string): string {
    const searchUrl = `https://www.aviasales.com/search/${origin}${departureDate || ''}${destination}${returnDate || ''}`;
    const encoded = encodeURIComponent(searchUrl);
    return `https://tp.media/r?marker=${this.marker}&p=4114&u=${encoded}&campaign_id=flights_${origin}_${destination}`;
  }

  // Generate affiliate URL for hotels via tp.media redirect
  generateHotelAffiliateUrl(location: string, checkIn?: string, checkOut?: string, hotelId?: string): string {
    const params = new URLSearchParams();
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (hotelId) params.set('hotelId', hotelId);
    const query = params.toString();
    const searchUrl = `https://www.hotellook.com/hotels/${location}${query ? '?' + query : ''}`;
    const encoded = encodeURIComponent(searchUrl);
    return `https://tp.media/r?marker=${this.marker}&p=4110&u=${encoded}&campaign_id=hotels_${location}`;
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

  // Generate affiliate URL for activities/tours via tp.media redirect
  generateActivityAffiliateUrl(targetUrl: string): string {
    const encoded = encodeURIComponent(targetUrl);
    return `https://tp.media/r?marker=${this.marker}&p=2074&u=${encoded}`;
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
      const { parseCSVActivities } = await import('./csv-parser.js');
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
      const { parseCSVActivities } = await import('./csv-parser.js');
      const allActivities = parseCSVActivities();
      return allActivities.find(activity => activity.activity_id === activityId) || null;
    } catch (error) {
      console.error('Error fetching activity details from CSV:', error);
      return null;
    }
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

