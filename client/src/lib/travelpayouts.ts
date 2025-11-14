// Travelpayouts API Response Types
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

export interface ActivitiesResponse {
  data: TravelpayoutsActivity[];
  meta: {
    total_count: number;
    page: number;
    per_page: number;
  };
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



