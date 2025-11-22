import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, Search, Filter, Star, Heart } from "lucide-react";
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema } from "@/components/json-ld";
import { Navigation } from "@/components/ui/navigation";
import { EventSchema, EventSeriesSchema } from "@/components/event-schema";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { useI18n } from "@/contexts/i18n-context";

export default function Eventos() {
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
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

  const events = [
    {
      id: "1",
      title: "Temporada Año Nuevo 2025-26 en Tulum",
      description: "Celebra el Año Nuevo en las mejores fiestas de Tulum con DJs internacionales y experiencias únicas en la playa.",
      date: "31 Dic 2025",
      time: "20:00",
      location: "Playa Paraíso",
      category: "Festivales",
      price: "€85",
      featured: true,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "2",
      title: "Tulum Music Festival 2025",
      description: "Festival de música electrónica con los mejores DJs internacionales en un ambiente mágico frente al mar.",
      date: "15 Feb 2025",
      time: "18:00",
      location: "Playa Tulum",
      category: "Festivales de Música",
      price: "€120",
      featured: true,
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "3",
      title: "Beach Party Sunset",
      description: "Fiesta en la playa con música en vivo, cocktails artesanales y la mejor puesta de sol de Tulum.",
      date: "Todos los viernes",
      time: "17:00",
      location: "Taboo Beach Club",
      category: "Beach Parties",
      price: "€45",
      featured: false,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      id: "4",
      title: "Noche de Luna Llena",
      description: "Experiencia única de baile bajo la luna llena con ceremonias ancestrales y música tribal.",
      date: "20 Ene 2025",
      time: "21:00",
      location: "Cenote Sagrado",
      category: "Ceremonias",
      price: "€65",
      featured: false,
      image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    }
  ];

  const categories = ["Todos", "Festivales de Música", "Beach Parties", "Nightclubs", "Ceremonias", "Conciertos"];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === "Todos" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={t('eventos.title')}
        description={t('eventos.description')}
        keywords={[
          'eventos tulum',
          'eventos en tulum',
          'tulum events',
          'festivales tulum',
          'tulum festival',
          'fiestas tulum',
          'eventos tulum mexico',
          'calendario eventos tulum',
          'tulum nightlife',
          'vida nocturna tulum'
        ]}
        canonicalUrl={`${siteUrl}/eventos`}
        ogType="website"
        currentPath="/eventos"
      />
      <WebsiteSchema siteUrl={siteUrl} siteName="TulumTkts" />
      
      {/* Event Schema para eventos destacados */}
      <EventSeriesSchema 
        events={events.filter(e => e.featured).map(event => ({
          name: event.title,
          description: event.description,
          startDate: event.date === "31 Dic 2025" ? "2025-12-31T20:00:00-06:00" : 
                    event.date === "15 Feb 2025" ? "2025-02-15T18:00:00-06:00" : 
                    event.date === "20 Ene 2025" ? "2025-01-20T21:00:00-06:00" : 
                    new Date().toISOString(),
          location: {
            name: event.location,
            city: "Tulum",
            country: "México"
          },
          image: event.image,
          price: parseFloat(event.price.replace('€', '')),
          priceCurrency: 'EUR',
          url: `${siteUrl}/eventos#${event.id}`
        }))}
        seriesName="Eventos en Tulum México 2025"
      />
      
      {/* FAQs Schema */}
      <FAQSchema faqs={[
        {
          question: "¿Qué eventos hay en Tulum?",
          answer: "Tulum ofrece una amplia variedad de eventos durante todo el año, incluyendo festivales de música electrónica (Tulum Music Festival), fiestas en la playa (Beach Party Sunset), ceremonias ancestrales (Noche de Luna Llena), eventos de bienestar (yoga, meditación), y celebraciones especiales (Año Nuevo, Full Moon Parties). La temporada alta de eventos va de noviembre a abril."
        },
        {
          question: "¿Cuál es el mejor evento en Tulum?",
          answer: "El Tulum Music Festival es uno de los eventos más populares de Tulum, atrayendo DJs internacionales y miles de visitantes cada año. Las fiestas de Año Nuevo en Tulum también son legendarias, con celebraciones en múltiples playas y clubes. Los eventos de playa como Beach Party Sunset son perfectos para experiencias más íntimas."
        },
        {
          question: "¿Dónde están los eventos en Tulum?",
          answer: "Los eventos en Tulum se realizan principalmente en la zona hotelera de la playa (Playa Paraíso, Playa Tulum), clubes de playa (Taboo Beach Club, Ziggy Beach), y en cenotes sagrados para ceremonias especiales. Muchos eventos también se realizan en hoteles y resorts de la zona."
        },
        {
          question: "¿Cuánto cuestan los eventos en Tulum?",
          answer: "Los precios de eventos en Tulum varían desde $45 USD (€45) para eventos regulares como Beach Party Sunset, hasta $120+ USD (€120+) para festivales grandes como Tulum Music Festival. Las celebraciones de Año Nuevo suelen costar $85-150 USD (€85-150). Los precios incluyen acceso al evento y pueden incluir bebidas según el tipo de evento."
        },
        {
          question: "¿Necesito reservar con anticipación para eventos en Tulum?",
          answer: "Sí, se recomienda reservar con anticipación, especialmente para eventos destacados como festivales de música y celebraciones de Año Nuevo, ya que se agotan rápidamente. Los eventos regulares como fiestas de playa pueden reservarse con menos anticipación, pero es mejor reservar al menos unos días antes."
        }
      ]} />
      
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <a href="/" className="hover:text-primary">{t('eventos.breadcrumb.home')}</a>
            <span className="mx-2">/</span>
            <a href="/tulum-guia-completa" className="hover:text-primary">{t('eventos.breadcrumb.guide')}</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{t('eventos.breadcrumb.current')}</span>
          </nav>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t('eventos.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              {t('eventos.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={t('eventos.filters.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t('eventos.filters.category')} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Events */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('eventos.featured.title')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredEvents.filter(event => event.featured).map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                  <div className="relative">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-secondary text-white">{t('eventos.event.featured')}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(event.id);
                        }}
                      >
                        <Heart 
                          className={`w-4 h-4 ${favorites.has(event.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                        />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
                        <span className="text-2xl font-bold">{event.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{event.category}</Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{event.date}</span>
                        <Clock className="w-4 h-4 ml-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-primary text-white hover:bg-primary/90">
                      {t('eventos.event.buyTickets')}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Events */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('eventos.upcoming.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="relative">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {event.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-secondary text-white text-xs">Destacado</Badge>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/80 backdrop-blur-sm rounded-full hover:bg-white h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(event.id);
                        }}
                      >
                        <Heart 
                          className={`w-3 h-3 ${favorites.has(event.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                        />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <Badge variant="outline" className="text-xs mb-2">{event.category}</Badge>
                    
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-1 mb-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{event.date}</span>
                        <Clock className="w-3 h-3 ml-3 mr-1" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">{event.price}</span>
                      <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                        Tickets
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}