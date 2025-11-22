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
import { SEOHead } from "@/components/seo-head";
import { WebsiteSchema } from "@/components/json-ld";
import { FAQSchema, FAQAccordion } from "@/components/faq-schema";
import { useI18n } from "@/contexts/i18n-context";
import { useLocalizedLink } from "@/hooks/use-localized-link";
import {
  trackFavoriteToggle,
  trackAffiliateClick as trackGA4AffiliateClick,
} from "@/lib/analytics";

// Use TravelpayoutsActivity as the main type
type Experience = TravelpayoutsActivity;

export default function Experiencias() {
  const { t } = useI18n();
  const { getLocalizedLink } = useLocalizedLink();
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

  const toggleFavorite = (id: string, title: string) => {
    const newFavorites = new Set(favorites);
    const isFavorite = newFavorites.has(id);
    if (isFavorite) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
    
    // Track favorite toggle in GA4
    trackFavoriteToggle(id, title, !isFavorite);
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
    t('experiencias.filters.all'),
    t('experiencias.filters.categories.archaeology'),
    t('experiencias.filters.categories.cenotes'), 
    t('experiencias.filters.categories.snorkel'),
    t('experiencias.filters.categories.navigation'),
    t('experiencias.filters.categories.adventure'),
    t('experiencias.filters.categories.parks'),
    t('experiencias.filters.categories.gastronomy'),
    t('experiencias.filters.categories.wellness'),
    t('experiencias.filters.categories.transport'),
    t('experiencias.filters.categories.excursions')
  ];

  const filteredExperiences = experiences.filter(experience => {
    try {
      const searchText = experience.abstract || '';
      const matchesSearch = !searchQuery || 
        experience.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchText.toLowerCase().includes(searchQuery.toLowerCase());
      
      const experienceCategory = mapCategory(experience.categories?.[0] || 'otros');
      const matchesCategory = !categoryFilter || categoryFilter === t('experiencias.filters.all') || 
                             experienceCategory === categoryFilter;
      return matchesSearch && matchesCategory;
    } catch (error) {
      // TODO: Log error to error tracking service
      return false;
    }
  });

  // Función para mapear categorías del CSV a las categorías de la web
  const mapCategoryFromCSV = (category: string): string => {
    const categoryMap: Record<string, string> = {
      'arqueologia': t('experiencias.filters.categories.archaeology'),
      'cultura': t('experiencias.filters.categories.archaeology'),
      'historia': t('experiencias.filters.categories.archaeology'),
      'cenotes': t('experiencias.filters.categories.cenotes'),
      'lagunas': t('experiencias.filters.categories.cenotes'),
      'naturaleza': t('experiencias.filters.categories.cenotes'),
      'snorkel': t('experiencias.filters.categories.snorkel'),
      'arrecife': t('experiencias.filters.categories.snorkel'),
      'marino': t('experiencias.filters.categories.snorkel'),
      'laguna': t('experiencias.filters.categories.snorkel'),
      'principiantes': t('experiencias.filters.categories.snorkel'),
      'catamaran': t('experiencias.filters.categories.navigation'),
      'lujo': t('experiencias.filters.categories.navigation'),
      'aventura': t('experiencias.filters.categories.adventure'),
      'atv': t('experiencias.filters.categories.adventure'),
      'tirolesas': t('experiencias.filters.categories.adventure'),
      'reserva': t('experiencias.filters.categories.parks'),
      'eco-tour': t('experiencias.filters.categories.parks'),
      'ciudad': t('experiencias.filters.categories.gastronomy'),
      'bicicleta': t('experiencias.filters.categories.gastronomy'),
      'gastronomia': t('experiencias.filters.categories.gastronomy'),
      'bienestar': t('experiencias.filters.categories.wellness'),
      'transporte': t('experiencias.filters.categories.transport'),
      'excursiones': t('experiencias.filters.categories.excursions')
    };
    return categoryMap[category.toLowerCase()] || t('experiencias.filters.categories.archaeology');
  };

  const experiencesByCategory = categories.slice(1).reduce((acc, category) => {
    acc[category] = experiences.filter(exp => {
      const experienceCategory = mapCategoryFromCSV(exp.categories?.[0] || 'otros');
      return experienceCategory === category;
    });
    return acc;
  }, {} as Record<string, typeof experiences>);

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tulumtkts.com';

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={t('experiencias.title')}
        description={t('experiencias.description')}
        keywords={[
          'tours tulum',
          'tours en tulum',
          'tulum tours',
          'tours tulum mexico',
          'cenotes tulum',
          'tours cenotes tulum',
          'ruinas mayas tulum',
          'experiencias tulum',
          'best tours tulum',
          'tulum mexico tours'
        ]}
        canonicalUrl={`${siteUrl}/experiencias`}
        ogType="website"
        currentPath="/experiencias"
      />
      <WebsiteSchema siteUrl={siteUrl} siteName="TulumTkts" />
      
      {/* FAQs Schema */}
      <FAQSchema faqs={[
        { question: t('experiencias.faqs.q1.question'), answer: t('experiencias.faqs.q1.answer') },
        { question: t('experiencias.faqs.q2.question'), answer: t('experiencias.faqs.q2.answer') },
        { question: t('experiencias.faqs.q3.question'), answer: t('experiencias.faqs.q3.answer') },
        { question: t('experiencias.faqs.q4.question'), answer: t('experiencias.faqs.q4.answer') },
        { question: t('experiencias.faqs.q5.question'), answer: t('experiencias.faqs.q5.answer') },
        { question: t('experiencias.faqs.q6.question'), answer: t('experiencias.faqs.q6.answer') },
        { question: t('experiencias.faqs.q7.question'), answer: t('experiencias.faqs.q7.answer') },
        {
          question: "¿Puedo cancelar o cambiar mi tour en Tulum?",
          answer: "Las políticas de cancelación varían según el operador y tipo de tour. La mayoría de tours permiten cancelaciones gratuitas hasta 24-48 horas antes del tour. Cancelaciones más cercanas al día del tour pueden incurrir en cargos. Cambios de fecha generalmente están disponibles sujetos a disponibilidad. Verifica las políticas específicas al momento de reservar."
        }
      ]} />
      
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-600">
            <a href={getLocalizedLink("/")} className="hover:text-primary">{t('experiencias.breadcrumb.home')}</a>
            <span className="mx-2">/</span>
            <a href={getLocalizedLink("/tulum-guia-completa")} className="hover:text-primary">{t('experiencias.breadcrumb.guide')}</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{t('experiencias.breadcrumb.current')}</span>
          </nav>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t('experiencias.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              {t('experiencias.hero.subtitle')}
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
                placeholder={t('experiencias.filters.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[250px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t('experiencias.filters.category')} />
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
              <TabsTrigger value="todos" className="text-xs sm:text-sm">{t('experiencias.tabs.all')}</TabsTrigger>
              <TabsTrigger value="arqueologia" className="text-xs sm:text-sm">{t('experiencias.tabs.archaeology')}</TabsTrigger>
              <TabsTrigger value="cenotes" className="text-xs sm:text-sm">{t('experiencias.tabs.cenotes')}</TabsTrigger>
              <TabsTrigger value="snorkel" className="text-xs sm:text-sm">{t('experiencias.tabs.snorkel')}</TabsTrigger>
              <TabsTrigger value="navegacion" className="text-xs sm:text-sm">{t('experiencias.tabs.navigation')}</TabsTrigger>
              <TabsTrigger value="aventura" className="text-xs sm:text-sm">{t('experiencias.tabs.adventure')}</TabsTrigger>
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
                  <p className="text-gray-500 mb-4">{t('experiencias.errors.loadError')}</p>
                  <p className="text-sm text-gray-400">{t('experiencias.errors.loadErrorSubtitle')}</p>
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
                    t={t}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="arqueologia">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('experiencias.categories.archaeology.title')}</h3>
                <p className="text-gray-600">{t('experiencias.categories.archaeology.description')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory["Arqueología y Cultura"]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.activity_id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    mapCategory={mapCategory}
                    t={t}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="snorkel">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('experiencias.categories.snorkel.title')}</h3>
                <p className="text-gray-600">{t('experiencias.categories.snorkel.description')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory[t('experiencias.filters.categories.snorkel')]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.activity_id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    mapCategory={mapCategory}
                    t={t}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="navegacion">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('experiencias.categories.navigation.title')}</h3>
                <p className="text-gray-600">{t('experiencias.categories.navigation.description')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory[t('experiencias.filters.categories.navigation')]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.activity_id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    mapCategory={mapCategory}
                    t={t}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cenotes">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('experiencias.categories.cenotes.title')}</h3>
                <p className="text-gray-600">{t('experiencias.categories.cenotes.description')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory[t('experiencias.filters.categories.cenotes')]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.activity_id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    mapCategory={mapCategory}
                    t={t}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="aventura">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('experiencias.categories.adventure.title')}</h3>
                <p className="text-gray-600">{t('experiencias.categories.adventure.description')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory[t('experiencias.filters.categories.adventure')]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.activity_id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    mapCategory={mapCategory}
                    t={t}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bienestar">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('experiencias.categories.wellness.title')}</h3>
                <p className="text-gray-600">{t('experiencias.categories.wellness.description')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory[t('experiencias.filters.categories.wellness')]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.activity_id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    mapCategory={mapCategory}
                    t={t}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="parques">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('experiencias.categories.parks.title')}</h3>
                <p className="text-gray-600">{t('experiencias.categories.parks.description')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiencesByCategory[t('experiencias.filters.categories.parks')]?.map((experience) => (
                  <ExperienceCard 
                    key={experience.activity_id} 
                    experience={experience} 
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    mapCategory={mapCategory}
                    t={t}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('experiencias.faqs.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('experiencias.faqs.subtitle')}
            </p>
          </div>
          
          <FAQAccordion faqs={[
            { question: t('experiencias.faqs.q1.question'), answer: t('experiencias.faqs.q1.answer') },
            { question: t('experiencias.faqs.q2.question'), answer: t('experiencias.faqs.q2.answer') },
            { question: t('experiencias.faqs.q3.question'), answer: t('experiencias.faqs.q3.answer') },
            { question: t('experiencias.faqs.q4.question'), answer: t('experiencias.faqs.q4.answer') },
            { question: t('experiencias.faqs.q5.question'), answer: t('experiencias.faqs.q5.answer') },
            { question: t('experiencias.faqs.q6.question'), answer: t('experiencias.faqs.q6.answer') },
            { question: t('experiencias.faqs.q7.question'), answer: t('experiencias.faqs.q7.answer') },
            { question: t('experiencias.faqs.q8.question'), answer: t('experiencias.faqs.q8.answer') },
          ]} className="bg-white rounded-lg shadow-md p-6" />
        </div>
      </section>
    </div>
  );
}

function ExperienceCard({ experience, favorites, toggleFavorite, mapCategory, t }: {
  experience: Experience;
  favorites: Set<string>;
  toggleFavorite: (id: string, title: string) => void;
  mapCategory: (category: string) => string;
  t: (key: string) => string;
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
              toggleFavorite(experience.activity_id, experience.title);
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
            ({experience.rating.toFixed(1)}) {experience.number_of_ratings} {t('experiencias.experience.reviews')}
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
            <span className="text-xs text-gray-500">{t('experiencias.experience.from')}</span>
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
              const category = experience.categories?.[0] || 'Experiencias';
              
              try {
                await trackAffiliateClickAPI(activityId, experience.title, price, category);
                // Track in GA4
                trackGA4AffiliateClick(activityId, experience.title, price, category);
                window.open(affiliateUrl, '_blank');
              } catch (error) {
                // Track in GA4 even if API fails
                trackGA4AffiliateClick(activityId, experience.title, price, category);
                window.open(affiliateUrl, '_blank');
              }
            }}
          >
            {t('experiencias.experience.bookNow')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}