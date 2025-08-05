// Enhanced responsive utility components and improvements

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Clock, Users, MapPin } from "lucide-react";

interface ExperienceCardProps {
  experience: {
    id: string;
    title: string;
    description: string;
    duration: string;
    location: string;
    price: string;
    rating: number;
    reviews: number;
    groupSize: string;
    image: string;
    includes: string[];
  };
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
}

export function ExperienceCard({ experience, favorites, toggleFavorite }: ExperienceCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={experience.image} 
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 hover:bg-white h-8 w-8"
            onClick={() => toggleFavorite(experience.id)}
          >
            <Heart 
              className={`w-4 h-4 ${
                favorites.has(experience.id) 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-gray-600'
              }`} 
            />
          </Button>
        </div>
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary text-white">
            {experience.price}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 leading-tight">
            {experience.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {experience.description}
          </p>
          
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{experience.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{experience.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{experience.groupSize}</span>
            </div>
          </div>
        </div>
        
        <div className="pt-3 mt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-sm">{experience.rating}</span>
              <span className="text-gray-500 text-sm">({experience.reviews})</span>
            </div>
            <Button 
              size="sm" 
              className="bg-primary text-white hover:bg-primary/90 px-4"
            >
              Ver Detalles
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface VillaCardProps {
  villa: {
    id: string;
    title: string;
    description: string;
    bedrooms: number;
    bathrooms: number;
    guests: number;
    location: string;
    area: string;
    pricePerNight: number;
    rating: number;
    reviews: number;
    images: string[];
    amenities: string[];
    featured?: boolean;
  };
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
}

export function VillaCard({ villa, favorites, toggleFavorite }: VillaCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={villa.images[0]} 
          alt={villa.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 hover:bg-white h-8 w-8"
            onClick={() => toggleFavorite(villa.id)}
          >
            <Heart 
              className={`w-4 h-4 ${
                favorites.has(villa.id) 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-gray-600'
              }`} 
            />
          </Button>
        </div>
        {villa.featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-secondary text-white">
              Destacada
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 leading-tight">
            {villa.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {villa.description}
          </p>
          
          <div className="grid grid-cols-3 gap-2 text-sm text-gray-500 mb-3">
            <div className="text-center">
              <div className="font-medium text-gray-900">{villa.bedrooms}</div>
              <div>Habitaciones</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">{villa.bathrooms}</div>
              <div>Baños</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-gray-900">{villa.guests}</div>
              <div>Huéspedes</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <MapPin className="w-4 h-4" />
            <span>{villa.area}</span>
          </div>
        </div>
        
        <div className="pt-3 mt-3 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-sm">{villa.rating}</span>
              <span className="text-gray-500 text-sm">({villa.reviews})</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">€{villa.pricePerNight}</div>
              <div className="text-sm text-gray-500">por noche</div>
            </div>
          </div>
          <Button 
            className="w-full bg-primary text-white hover:bg-primary/90"
          >
            Ver Disponibilidad
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function ResponsiveContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function ResponsiveGrid({ children, cols = "1 md:2 lg:3" }: { children: React.ReactNode; cols?: string }) {
  return (
    <div className={`grid grid-cols-${cols} gap-6`}>
      {children}
    </div>
  );
}