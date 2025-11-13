import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Search, Filter, Star, Heart, Users, Camera } from "lucide-react";
import { trackAffiliateClick } from "@/lib/affiliate";
import { AffiliateBanner } from "@/components/ui/affiliate-banner";
import { useTulumExperiences, trackAffiliateClickAPI } from "@/hooks/use-travelpayouts";
import { TravelpayoutsActivity } from "@/lib/travelpayouts";
import { ApiStatusIndicator } from "@/components/ui/api-status-indicator";
import { Navigation } from "@/components/ui/navigation";

// Use TravelpayoutsActivity as the main type
type Experience = TravelpayoutsActivity;

export default function Experiencias() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Read search parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const date = params.get('date');
    const guests = params.get('guests');
    
    if (q) setSearchQuery(q);
    // You can use date and guests for additional filtering if needed
  }, [location]);

  // Fetch real experiences from Travelpayouts API (CSV data)
  const { data: experiencesData, isLoading, error } = useTulumExperiences({
    page: currentPage,
    per_page: 12,
    category: categoryFilter || undefined,
    sort_by: 'popularity'
  });

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  // Format price for display
  const formattedExperiences = (experiencesData?.data || []).map(exp => {
    try {
      const amount = exp?.price?.values?.[0]?.amount || 0;
      const currency = exp?.price?.values?.[0]?.currency || 'USD';
      return {
        ...exp,
        price_usd: currency === 'USD' ? `$${Math.round(amount)} USD` : `$${Math.round(amount * 1.08)} USD`
      };
    } catch (error) {
      console.error('Error formatting experience:', error, exp);
      return {
        ...exp,
        price_usd: '$0 USD'
      };
    }
  });

  // Use real Travelpayouts data from CSV
  const experiences: Experience[] = formattedExperiences;

  // Helper function to map categories from CSV to display categories
  const mapCategory = (category: string): string => {
    return mapCategoryFromCSV(category);
  };

  // Categorías organizadas basadas en los datos reales del CSV
  const categories = [
    "Todos",
    "Arqueología y Cultura",
    "Cenotes y Lagunas", 
    "Snorkel y Buceo",
    "Navegación y Catamaranes",
    "Aventura en la Selva",
    "Parques y Reservas",
    "Gastronomía y Ciudad",
    "Bienestar y Cultura",
    "Transporte",
    "Excursiones"
  ];

  const filteredExperiences = experiences.filter(experience => {
    try {
      const searchText = experience.abstract || '';
      const matchesSearch = !searchQuery || 
        experience.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchText.toLowerCase().includes(searchQuery.toLowerCase());
      
      const experienceCategory = mapCategory(experience.categories?.[0] || 'otros');
      const matchesCategory = !categoryFilter || categoryFilter === "Todos" || 
                             experienceCategory === categoryFilter;
      return matchesSearch && matchesCategory;
    } catch (error) {
      console.error('Error filtering experience:', error, experience);
      return false;
    }
  });

  // Función para mapear categorías del CSV a las categorías de la web
  const mapCategoryFromCSV = (category: string): string => {
    const categoryMap: Record<string, string> = {
      'arqueologia': 'Arqueología y Cultura',
      'cultura': 'Arqueología y Cultura',
      'historia': 'Arqueología y Cultura',
      'cenotes': 'Cenotes y Lagunas',
      'lagunas': 'Cenotes y Lagunas',
      'naturaleza': 'Cenotes y Lagunas',
      'snorkel': 'Snorkel y Buceo',
      'arrecife': 'Snorkel y Buceo',
      'marino': 'Snorkel y Buceo',
      'laguna': 'Snorkel y Buceo',
      'principiantes': 'Snorkel y Buceo',
      'catamaran': 'Navegación y Catamaranes',
      'lujo': 'Navegación y Catamaranes',
      'aventura': 'Aventura en la Selva',
      'atv': 'Aventura en la Selva',
      'tirolesas': 'Aventura en la Selva',
      'reserva': 'Parques y Reservas',
      'eco-tour': 'Parques y Reservas',
      'ciudad': 'Gastronomía y Ciudad',
      'bicicleta': 'Gastronomía y Ciudad',
      'gastronomia': 'Gastronomía y Ciudad',
      'bienestar': 'Bienestar y Cultura',
      'transporte': 'Transporte',
      'excursiones': 'Excursiones'
    };
    return categoryMap[category.toLowerCase()] || 'Otros';
  };

  const experiencesByCategory = categories.slice(1).reduce((acc, category) => {
    acc[category] = experiences.filter(exp => {
      const experienceCategory = mapCategoryFromCSV(exp.categories?.[0] || 'otros');
      return experienceCategory === category;
    });
    return acc;
  }, {} as Record<string, typeof experiences>);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Experiencias y Tours
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Vive aventuras únicas en Tulum y la Riviera Maya
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
                placeholder="Buscar experiencias, tours, actividades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[250px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Categoría" />
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

      {/* Affiliate Banner */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-4">
            <ApiStatusIndicator />
          </div>
          <AffiliateBanner />
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="todos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 mb-6 md:mb-8 h-auto p-1">
              <TabsTrigger value="todos" className="text-xs sm:text-sm">Todos</TabsTrigger>
              <TabsTrigger value="arqueologia" className="text-xs sm:text-sm">Arqueología</TabsTrigger>
              <TabsTrigger value="cenotes" className="text-xs sm:text-sm">Cenotes</TabsTrigger>
              <TabsTrigger value="snorkel" className="text-xs sm:text-sm">Snorkel</TabsTrigger>
              <TabsTrigger value="navegacion" className="text-xs sm:text-sm">Navegación</TabsTrigger>
              <TabsTrigger value="aventura" className="text-xs sm:text-sm">Aventura</TabsTrigger>
            </TabsList>

            <TabsContent value="todos">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded mb-4"></div>
                        <div className="flex justify-between">
                          <div className="h-8 w-20 bg-gray-200 rounded"></div>
                          <div className="h-8 w-20 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">Error al cargar experiencias</p>
                  <p className="text-sm text-gray-400">Mostrando experiencias de ejemplo</p>
                </div>
              ) : null}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExperiences.map((experience) => (
                  <ExperienceCard 
                    key={experience.activity_id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    mapCategory={mapCategory}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="arqueologia">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Arqueología y Cultura</h3>
                <p className="text-gray-600">Exploraciones guiadas a los sitios arqueológicos emblemáticos de la región con guías expertos que relatan las leyendas y arquitectura de estos antiguos imperios mayas.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory["Arqueología y Cultura"]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.activity_id || experience.id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="snorkel">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Snorkel y Buceo</h3>
                <p className="text-gray-600">Explora el mundo submarino de la Riviera Maya. Desde arrecifes de coral hasta lagunas cristalinas, descubre la vida marina en su hábitat natural.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory["Snorkel y Buceo"]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.activity_id || experience.id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="navegacion">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Navegación y Catamaranes</h3>
                <p className="text-gray-600">Navega por las aguas turquesas del Caribe en catamaranes de lujo. Experiencias premium con barra libre, snorkel y vistas espectaculares.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory["Navegación y Catamaranes"]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.activity_id || experience.id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cenotes">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Cenotes y Lagunas</h3>
                <p className="text-gray-600">Descubre los famosos cenotes de la región - ríos subterráneos de agua dulce cristalina. Vive una aventura refrescante explorando cenotes ocultos y snorkeleando con tortugas.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory["Cenotes y Lagunas"]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.activity_id || experience.id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="aventura">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Aventura en la Selva</h3>
                <p className="text-gray-600">Actividades para descargar adrenalina en los alrededores selváticos. Emoción garantizada con vehículos todo-terreno, tirolesas y chapuzones en cenotes escondidos.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory["Aventura en la Selva"]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.activity_id || experience.id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bienestar">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Bienestar y Cultura</h3>
                <p className="text-gray-600">Tulum es un epicentro bohemio y holístico. Actividades que conectan con la cultura local y el bienestar personal, desde ceremonias ancestrales hasta gastronomía yucateca.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory["Bienestar y Cultura"]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.activity_id || experience.id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="parques">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Parques y Reservas</h3>
                <p className="text-gray-600">Aprovecha la ubicación estratégica de Tulum con entradas y tours a parques reconocidos de la Riviera Maya, desde parques acuáticos hasta santuarios de rescate animal.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory["Parques y Reservas"]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.activity_id || experience.id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

function ExperienceCard({ experience, favorites, toggleFavorite, mapCategory }: {
  experience: Experience;
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  mapCategory: (category: string) => string;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
      <div className="relative">
        <img 
          src={experience.image_url} 
          alt={experience.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1574181419028-e8c44c95a6d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600';
          }}
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary text-white text-xs">
            {mapCategory(experience.categories?.[0] || 'otros')}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/80 backdrop-blur-sm rounded-full hover:bg-white h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(experience.activity_id);
            }}
          >
            <Heart 
              className={`w-3 h-3 ${favorites.has(experience.activity_id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 text-xs">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(experience.rating) ? 'fill-current' : ''}`} />
            ))}
          </div>
          <span className="ml-2 text-xs text-gray-600">
            ({experience.rating.toFixed(1)}) {experience.number_of_ratings} reseñas
          </span>
        </div>
        
        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {experience.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {experience.abstract}
        </p>
        
        <div className="space-y-1 mb-3 text-xs text-gray-500">
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{experience.location.name}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">Desde</span>
            <div className="text-lg font-bold text-gray-900">
              ${Math.round(experience.price.values[0].amount)} {experience.price.values[0].currency}
            </div>
          </div>
          <Button 
            size="sm" 
            className="bg-primary text-white hover:bg-primary/90"
            onClick={async () => {
              const price = `$${Math.round(experience.price.values[0].amount)} ${experience.price.values[0].currency}`;
              const activityId = experience.activity_id;
              const affiliateUrl = experience.url;
              
              try {
                await trackAffiliateClickAPI(activityId, experience.title, price, experience.categories?.[0] || 'Experiencias');
                window.open(affiliateUrl, '_blank');
              } catch (error) {
                window.open(affiliateUrl, '_blank');
              }
            }}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}