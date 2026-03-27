import { useState } from "react";
import { useLocation } from "wouter";
import { CrossSell } from "@/components/cross-sell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Navigation } from "@/components/ui/navigation";
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema } from "@/components/json-ld";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { useI18n } from "@/contexts/i18n-context";
import { useLocalizedLink } from "@/hooks/use-localized-link";
import { TripPlanner } from "@/components/trip-planner";
import { generateHotelLink, generateTransferLink, trackAffiliateClick } from "@/lib/affiliate";
import {
  Search,
  Filter,
  Star,
  Heart,
  Users,
  Bed,
  Bath,
  Wifi,
  Car,
  Utensils,
  Waves,
  TreePine,
  MapPin,
  Calendar,
  ExternalLink
} from "lucide-react";

export default function Villas() {
  const { t } = useI18n();
  const { getLocalizedLink } = useLocalizedLink();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceRange, setPriceRange] = useState([100, 1000]);
  const [guestFilter, setGuestFilter] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const villas = [
    {
      id: "1",
      title: "Villa Soliman Beach - Frente al Mar",
      description: "Moderna villa en la zona de la playa de Tulum con piscina infinita y chef privado. Acceso directo a la playa privada de Soliman Bay con vistas espectaculares al Caribe.",
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
      location: "Playa",
      area: "Soliman Bay",
      pricePerNight: 450,
      rating: 4.9,
      reviews: 127,
      images: [
        "https://images.unsplash.com/photo-1571041804726-53e8bf082096?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        "https://images.unsplash.com/photo-1570213489059-0aac6626cade?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      ],
      amenities: ["Playa privada", "Piscina infinity", "Chef privado disponible", "WiFi", "Estacionamiento", "Aire acondicionado"],
      featured: true
    },
    {
      id: "2", 
      title: "Eco-Villa en la Jungla - Desconexión Total",
      description: "Eco-villa en la jungla para desconexión total. Refugio ecológico de 3 habitaciones rodeado de naturaleza virgen, perfecto para reconectar con la naturaleza.",
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      location: "Jungla",
      area: "Zona Hotelera",
      pricePerNight: 285,
      rating: 4.8,
      reviews: 89,
      images: [
        "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      ],
      amenities: ["Piscina natural", "Yoga shala", "Bicicletas incluidas", "WiFi", "Cocina completa", "Hamacas"],
      featured: true
    },
    {
      id: "3",
      title: "Penthouse Pueblo - Centro de Tulum",
      description: "Penthouse moderno de 2 habitaciones en el corazón de Tulum pueblo, cerca de restaurantes, bares y sitios arqueológicos.",
      bedrooms: 2,
      bathrooms: 2,
      guests: 4,
      location: "Pueblo",
      area: "Centro Tulum",
      pricePerNight: 180,
      rating: 4.7,
      reviews: 156,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      ],
      amenities: ["Terraza", "Cocina equipada", "WiFi", "Aire acondicionado", "Estacionamiento", "Cercano a todo"],
      featured: false
    },
    {
      id: "4",
      title: "Villa Tankah - Laguna Privada",
      description: "Villa exclusiva de 5 habitaciones con acceso a laguna privada, ideal para grupos grandes que buscan privacidad y lujo.",
      bedrooms: 5,
      bathrooms: 4,
      guests: 10,
      location: "Laguna",
      area: "Tankah Bay",
      pricePerNight: 650,
      rating: 4.9,
      reviews: 67,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      ],
      amenities: ["Laguna privada", "Kayaks", "Chef disponible", "WiFi", "Estacionamiento", "Spa al aire libre"],
      featured: true
    },
    {
      id: "5",
      title: "Elegante Condominio en Aldea Zamá",
      description: "Elegante condominio en Aldea Zamá (zona residencial). Loft contemporáneo de 1 habitación perfecto para parejas que buscan comodidad y estilo moderno.",
      bedrooms: 1,
      bathrooms: 1,
      guests: 2,
      location: "Pueblo",
      area: "Aldea Zamá",
      pricePerNight: 120,
      rating: 4.6,
      reviews: 203,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      ],
      amenities: ["Piscina común", "Gym", "WiFi", "Aire acondicionado", "Cocina equipada", "Seguridad 24h"],
      featured: false
    },
    {
      id: "6",
      title: "Beach House Tulum - Vista al Mar",
      description: "Casa de playa de 3 habitaciones con vistas panorámicas al Caribe, ideal para familias que buscan el equilibrio perfecto.",
      bedrooms: 3,
      bathrooms: 3,
      guests: 6,
      location: "Playa",
      area: "Zona Hotelera",
      pricePerNight: 380,
      rating: 4.8,
      reviews: 134,
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
      ],
      amenities: ["Acceso a playa", "Piscina", "WiFi", "Estacionamiento", "Cocina completa", "Terraza con vista"],
      featured: false
    }
  ];

  const locations = [
    t('villas.filters.allLocations'),
    t('villas.locations.beach'),
    t('villas.locations.pueblo'),
    t('villas.locations.jungle'),
    t('villas.locations.lagoon')
  ];
  const guestOptions = [
    t('villas.filters.anyGuests'),
    t('villas.filters.guests1to2'),
    t('villas.filters.guests3to4'),
    t('villas.filters.guests5to8'),
    t('villas.filters.guests9plus')
  ];

  const filteredVillas = villas.filter(villa => {
    const matchesSearch = villa.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         villa.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         villa.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || locationFilter === t('villas.filters.allLocations') || villa.location === locationFilter;
    const matchesPrice = villa.pricePerNight >= priceRange[0] && villa.pricePerNight <= priceRange[1];
    const matchesGuests = !guestFilter || guestFilter === t('villas.filters.anyGuests') || 
                         (guestFilter === t('villas.filters.guests1to2') && villa.guests <= 2) ||
                         (guestFilter === t('villas.filters.guests3to4') && villa.guests >= 3 && villa.guests <= 4) ||
                         (guestFilter === t('villas.filters.guests5to8') && villa.guests >= 5 && villa.guests <= 8) ||
                         (guestFilter === t('villas.filters.guests9plus') && villa.guests >= 9);
    
    return matchesSearch && matchesLocation && matchesPrice && matchesGuests;
  });

  const getLocationIcon = (location: string) => {
    switch (location) {
      case t('villas.locations.beach'):
      case "Playa": return <Waves className="w-4 h-4" />;
      case t('villas.locations.jungle'):
      case "Jungla": return <TreePine className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={t('villas.title')}
        description={t('villas.description')}
        keywords={[
          'hoteles tulum',
          'hoteles en tulum',
          'tulum hotels',
          'hoteles tulum mexico',
          'villas tulum',
          'resorts tulum',
          'best hotels tulum',
          'tulum all inclusive',
          'hoteles tulum playa',
          'alojamiento tulum'
        ]}
        canonicalUrl={`${siteUrl}/villas`}
        ogType="website"
        currentPath="/villas"
      />
      <WebsiteSchema siteUrl={siteUrl} siteName="TulumTkts" />
      
      {/* FAQs Schema */}
      <FAQSchema faqs={[
        { question: t('villas.faqs.q1.question'), answer: t('villas.faqs.q1.answer') },
        { question: t('villas.faqs.q2.question'), answer: t('villas.faqs.q2.answer') },
        { question: t('villas.faqs.q3.question'), answer: t('villas.faqs.q3.answer') },
        { question: t('villas.faqs.q4.question'), answer: t('villas.faqs.q4.answer') },
        { question: t('villas.faqs.q5.question'), answer: t('villas.faqs.q5.answer') },
        { question: t('villas.faqs.q6.question'), answer: t('villas.faqs.q6.answer') },
        { question: t('villas.faqs.q7.question'), answer: t('villas.faqs.q7.answer') },
      ]} />
      
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <a href={getLocalizedLink("/")} className="hover:text-primary">{t('villas.breadcrumb.home')}</a>
            <span className="mx-2">/</span>
            <a href={getLocalizedLink("/tulum-guia-completa")} className="hover:text-primary">{t('villas.breadcrumb.guide')}</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{t('villas.breadcrumb.current')}</span>
          </nav>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t('villas.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              {t('villas.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4 md:mb-0">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={t('villas.filters.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Location Filter */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t('villas.filters.location')} />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Guests Filter */}
            <Select value={guestFilter} onValueChange={setGuestFilter}>
              <SelectTrigger>
                <Users className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t('villas.filters.guests')} />
              </SelectTrigger>
              <SelectContent>
                {guestOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('villas.filters.priceRange')}</label>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  min={50}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>€{priceRange[0]}</span>
                  <span>€{priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Villas */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('villas.featured.title')}</h2>
            <p className="text-gray-600">{t('villas.featured.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {filteredVillas.filter(villa => villa.featured).map((villa) => (
              <Card key={villa.id} className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="relative">
                  <img 
                    src={villa.images[0]} 
                    alt={villa.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-secondary text-white">{t('villas.villa.featured')}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(villa.id);
                      }}
                    >
                      <Heart 
                        className={`w-4 h-4 ${favorites.has(villa.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                      />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
                      <span className="text-sm">{t('villas.villa.from')}</span>
                      <div className="text-2xl font-bold">€{villa.pricePerNight}</div>
                      <span className="text-xs">/{t('villas.villa.perNight')}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({villa.rating}) {villa.reviews} {t('villas.villa.reviews')}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {villa.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{villa.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{villa.bedrooms} {t('villas.villa.bedrooms')}</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>{villa.bathrooms} {t('villas.villa.bathrooms')}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{villa.guests} {t('villas.villa.guests')}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      {getLocationIcon(villa.location)}
                      <span className="ml-1">{villa.area}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {villa.amenities.slice(0, 4).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {villa.amenities.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{villa.amenities.length - 4} {t('villas.villa.more')}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-primary text-white hover:bg-primary/90"
                      onClick={() => {
                        const url = generateHotelLink('Tulum');
                        trackAffiliateClick('hotellook', villa.title, String(villa.pricePerNight), 'villas');
                        window.open(url, '_blank');
                      }}
                    >
                      {t('villas.villa.viewAvailability')} <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* All Villas */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {t('villas.allVillas.title')} ({filteredVillas.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVillas.map((villa) => (
                <Card key={villa.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="relative">
                    <img 
                      src={villa.images[0]} 
                      alt={villa.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {villa.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-secondary text-white text-xs">{t('villas.villa.featured')}</Badge>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/80 backdrop-blur-sm rounded-full hover:bg-white h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(villa.id);
                        }}
                      >
                        <Heart 
                          className={`w-3 h-3 ${favorites.has(villa.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                        />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-xs text-gray-600">({villa.rating}) {villa.reviews} {t('villas.villa.reviews')}</span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {villa.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Bed className="w-3 h-3 mr-1" />
                          <span>{villa.bedrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath className="w-3 h-3 mr-1" />
                          <span>{villa.bathrooms}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          <span>{villa.guests}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {getLocationIcon(villa.location)}
                        <span className="ml-1">{villa.location}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {villa.amenities.slice(0, 3).map((amenity, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {villa.amenities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{villa.amenities.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-500">desde</span>
                        <div className="text-lg font-bold text-gray-900">€{villa.pricePerNight}</div>
                        <span className="text-xs text-gray-500">/noche</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-primary text-white hover:bg-primary/90"
                        onClick={() => {
                          const url = generateHotelLink('Tulum');
                          trackAffiliateClick('hotellook', villa.title, String(villa.pricePerNight), 'villas');
                          window.open(url, '_blank');
                        }}
                      >
                        Ver Villa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Buscar más opciones de hospedaje - Hotellook affiliate */}
      <section className="py-14 bg-gradient-to-br from-teal-50 to-cyan-50 border-t border-teal-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-100">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <Badge className="mb-3 bg-teal-100 text-teal-800 border-0">Hospedaje en Tulum</Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  ¿No encontraste lo que buscas?
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Busca entre cientos de hoteles, villas y hostales en Tulum con los mejores precios garantizados. Compara opciones y reserva con total seguridad.
                </p>
                <ul className="mt-3 space-y-1 text-sm text-gray-500">
                  <li className="flex items-center gap-2"><span className="text-teal-500">✓</span> Más de 500 propiedades en Tulum</li>
                  <li className="flex items-center gap-2"><span className="text-teal-500">✓</span> Cancelación gratuita en la mayoría</li>
                  <li className="flex items-center gap-2"><span className="text-teal-500">✓</span> Precio más bajo garantizado</li>
                </ul>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold"
                  onClick={() => {
                    trackAffiliateClick('hotellook', 'Buscar hospedaje Tulum', '0', 'villas_search_cta');
                    window.open(generateHotelLink('Tulum'), '_blank');
                  }}
                >
                  Buscar Hospedaje <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-gray-400 text-center">Vía Hotellook — sin cargo extra</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Necesitas transporte? — Kiwitaxi transfer affiliate */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-cyan-600 to-teal-600 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">¿Necesitas transporte desde el aeropuerto?</h2>
                <p className="text-white/90 leading-relaxed">
                  Llega a tu villa sin estrés. Reserva un traslado privado desde el Aeropuerto de Cancún directamente a tu alojamiento en Tulum.
                </p>
                <p className="mt-2 text-white/75 text-sm">~2 horas de trayecto • Conductor privado • Precio fijo</p>
              </div>
              <div className="flex flex-col gap-3 min-w-[200px]">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-teal-700 hover:bg-white/90 font-semibold"
                  onClick={() => {
                    trackAffiliateClick('kiwitaxi', 'Traslado Cancun-Tulum', '0', 'villas_transfer_cta');
                    window.open(generateTransferLink('Cancun Airport', 'Tulum'), '_blank');
                  }}
                >
                  Reservar Traslado <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-white/60 text-center">Vía Kiwitaxi — precio fijo garantizado</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TripPlanner */}
      <section className="py-14 bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Planifica todo tu viaje a Tulum</h2>
            <p className="text-gray-600 mt-2">Vuelos, hospedaje, traslados y actividades en un solo lugar.</p>
          </div>
          <TripPlanner />
        </div>
      </section>

      <CrossSell exclude={["hoteles"]} />
    </div>
  );
}